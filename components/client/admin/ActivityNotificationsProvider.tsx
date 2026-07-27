"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createClient } from '@/utils/supabase/client';

export type ActivityRow = {
  id: string;
  type: string;
  description: string;
  created_at: string;
};

type ActivityNotificationsContextValue = {
  unreadCount: number;
  recent: ActivityRow[];
  markAllRead: () => void;
};

const SEEN_STORAGE_KEY = 'ziea_admin_activity_seen';

const ActivityNotificationsContext =
  createContext<ActivityNotificationsContextValue | null>(null);

export function useActivityNotifications() {
  const ctx = useContext(ActivityNotificationsContext);
  if (!ctx) {
    throw new Error(
      'useActivityNotifications must be used within an ActivityNotificationsProvider'
    );
  }
  return ctx;
}

export default function ActivityNotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createClient(), []);

  // `recent` holds only unread (new) notifications; the count is derived from it.
  const [recent, setRecent] = useState<ActivityRow[]>([]);

  // Keep lastSeen in a ref so the effect deps stay stable ([supabase] only).
  const lastSeenRef = useRef<string | null>(null);

  useEffect(() => {
    // Read lastSeen from localStorage; if missing, set it to now (so the
    // first-ever load shows 0 unread — no backlog spam).
    let lastSeen = window.localStorage.getItem(SEEN_STORAGE_KEY);
    if (!lastSeen) {
      lastSeen = new Date().toISOString();
      window.localStorage.setItem(SEEN_STORAGE_KEY, lastSeen);
    }
    lastSeenRef.current = lastSeen;

    let isMounted = true;

    const fetchRecent = async () => {
      const { data } = await supabase
        .from('activity_logs')
        .select('id, type, description, created_at')
        .order('created_at', { ascending: false })
        .limit(12);

      if (!isMounted) return;

      const rows = (data ?? []) as ActivityRow[];
      const seen = lastSeenRef.current;
      // Only keep unread (newer than lastSeen).
      setRecent(seen ? rows.filter((r) => r.created_at > seen) : []);
    };

    fetchRecent();

    const channel = supabase
      .channel('admin-activity')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'activity_logs' },
        (payload) => {
          const row = payload.new as ActivityRow;
          setRecent((prev) => [row, ...prev].slice(0, 50));
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const markAllRead = () => {
    setRecent([]); // clear the list → dropdown shows "No new notifications"
    const now = new Date().toISOString();
    lastSeenRef.current = now;
    window.localStorage.setItem(SEEN_STORAGE_KEY, now);
  };

  const value = useMemo<ActivityNotificationsContextValue>(
    () => ({ unreadCount: recent.length, recent, markAllRead }),
    [recent]
  );

  return (
    <ActivityNotificationsContext.Provider value={value}>
      {children}
    </ActivityNotificationsContext.Provider>
  );
}
