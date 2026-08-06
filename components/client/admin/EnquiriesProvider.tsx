"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createClient } from "@/utils/supabase/client";

type EnquiriesContextValue = {
  /** Number of unread (is_read = false) enquiries — drives the sidebar badge. */
  unreadCount: number;
  /** Re-query the unread count from the DB (call after toggling read state). */
  refresh: () => void;
};

const EnquiriesContext = createContext<EnquiriesContextValue | null>(null);

export function useEnquiries() {
  const ctx = useContext(EnquiriesContext);
  if (!ctx) {
    throw new Error("useEnquiries must be used within an EnquiriesProvider");
  }
  return ctx;
}

export default function EnquiriesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createClient(), []);
  const [unreadCount, setUnreadCount] = useState(0);

  const refresh = useCallback(async () => {
    const { count } = await supabase
      .from("contact_messages")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);
    setUnreadCount(count ?? 0);
  }, [supabase]);

  useEffect(() => {
    let isMounted = true;

    const run = async () => {
      const { count } = await supabase
        .from("contact_messages")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);
      if (isMounted) setUnreadCount(count ?? 0);
    };

    run();

    // Live-update the badge: a new Contact Us submission (INSERT) bumps it, and
    // marking one read/unread (UPDATE) recounts. Same realtime pattern as the
    // activity notifications channel.
    const channel = supabase
      .channel("admin-enquiries")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contact_messages" },
        () => {
          run();
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const value = useMemo<EnquiriesContextValue>(
    () => ({ unreadCount, refresh }),
    [unreadCount, refresh]
  );

  return (
    <EnquiriesContext.Provider value={value}>
      {children}
    </EnquiriesContext.Provider>
  );
}
