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

type OrdersContextValue = {
  /** Count of new (Initiated) orders — drives the sidebar badge. */
  newCount: number;
  refresh: () => void;
};

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used within an OrdersProvider");
  return ctx;
}

export default function OrdersProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [newCount, setNewCount] = useState(0);

  const refresh = useCallback(async () => {
    const { count } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "Initiated");
    setNewCount(count ?? 0);
  }, [supabase]);

  useEffect(() => {
    let isMounted = true;
    const run = async () => {
      const { count } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "Initiated");
      if (isMounted) setNewCount(count ?? 0);
    };
    run();

    const channel = supabase
      .channel("admin-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => run()
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  const value = useMemo<OrdersContextValue>(
    () => ({ newCount, refresh }),
    [newCount, refresh]
  );

  return <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>;
}
