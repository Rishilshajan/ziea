"use client";

import { useEffect, useRef } from "react";
import { incrementProductView } from "@/app/actions/views";

/**
 * Fires a single view increment per genuine product open. Guards against React's
 * dev double-invoke and client-side navigation between products (counts once per
 * distinct productId it sees). Renders nothing.
 */
export default function ProductViewTracker({ productId }: { productId: string }) {
  const lastCounted = useRef<string | null>(null);

  useEffect(() => {
    if (lastCounted.current === productId) return;
    lastCounted.current = productId;
    incrementProductView(productId);
  }, [productId]);

  return null;
}
