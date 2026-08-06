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
  user_id?: string | null;
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
  // The current admin's own id. Their own actions are logged for everyone else,
  // but self-suppressed here so they don't get notified about what they just did.
  const selfIdRef = useRef<string | null>(null);

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
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const start = async () => {
      // Resolve the current admin first so we can filter out their own actions
      // both in the initial fetch and in the realtime stream.
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!isMounted) return;
      const self = user?.id ?? null;
      selfIdRef.current = self;

      const { data } = await supabase
        .from('activity_logs')
        .select('id, type, description, created_at, user_id')
        .order('created_at', { ascending: false })
        .limit(12);

      if (!isMounted) return;

      const rows = (data ?? []) as ActivityRow[];
      const seen = lastSeenRef.current;
      // Keep only unread (newer than lastSeen) AND not performed by this admin.
      setRecent(
        seen
          ? rows.filter((r) => r.created_at > seen && r.user_id !== self)
          : []
      );

      channel = supabase
        .channel('admin-activity')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'activity_logs' },
          (payload) => {
            const row = payload.new as ActivityRow;
            // Self-suppression: don't notify the admin who performed the action.
            if (row.user_id && row.user_id === selfIdRef.current) return;
            setRecent((prev) => [row, ...prev].slice(0, 50));
          }
        )
        .subscribe();
    };

    start();

    return () => {
      isMounted = false;
      if (channel) supabase.removeChannel(channel);
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
