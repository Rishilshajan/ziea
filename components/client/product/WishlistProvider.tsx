"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { toggleWishlist } from "@/app/actions/wishlist";
import { notifyCountsChanged } from "@/utils/counts";

type WishlistContextValue = {
  /** Whether a product is in the signed-in user's wishlist. */
  isWishlisted: (productId: string) => boolean;
  /** Optimistically toggle a product; persists via the server action. */
  toggle: (productId: string) => void;
};

// Safe default so cards never crash if rendered outside the provider.
const WishlistContext = createContext<WishlistContextValue>({
  isWishlisted: () => false,
  toggle: () => {},
});

export function useWishlist() {
  return useContext(WishlistContext);
}

/**
 * Holds the signed-in user's wishlisted product ids on the CLIENT, so the
 * product grids never need a server-side (cookie-reading) wishlist fetch. This
 * keeps the home + product pages statically renderable — the heart state
 * streams in on the client after hydration instead of forcing dynamic SSR.
 */
export default function WishlistProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const router = useRouter();
  const [ids, setIds] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      setIds(new Set());
      return;
    }
    const { data } = await supabase
      .from("wishlist_items")
      .select("product_id")
      .eq("user_id", session.user.id);
    setIds(new Set((data ?? []).map((r) => r.product_id as string)));
  }, [supabase]);

  useEffect(() => {
    load();
    // Re-sync on login/logout and whenever any wishlist/cart mutation fires
    // (incl. removals from the wishlist page's ListManager).
    const { data: sub } = supabase.auth.onAuthStateChange(() => load());
    const onChanged = () => load();
    window.addEventListener("ziea:counts-changed", onChanged);
    return () => {
      sub.subscription.unsubscribe();
      window.removeEventListener("ziea:counts-changed", onChanged);
    };
  }, [supabase, load]);

  const isWishlisted = useCallback((productId: string) => ids.has(productId), [ids]);

  const toggle = useCallback(
    (productId: string) => {
      const wasIn = ids.has(productId);
      // Optimistic flip.
      setIds((prev) => {
        const next = new Set(prev);
        if (wasIn) next.delete(productId);
        else next.add(productId);
        return next;
      });

      (async () => {
        const res = await toggleWishlist(productId);
        if (res && "error" in res && res.error === "unauthenticated") {
          // Revert and send to login.
          setIds((prev) => {
            const next = new Set(prev);
            if (wasIn) next.add(productId);
            else next.delete(productId);
            return next;
          });
          router.push("/login");
          return;
        }
        notifyCountsChanged();
      })();
    },
    [ids, router]
  );

  const value = useMemo<WishlistContextValue>(
    () => ({ isWishlisted, toggle }),
    [isWishlisted, toggle]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}
