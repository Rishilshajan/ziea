/**
 * Notify the Header (and any other listener) that wishlist/cart counts changed,
 * so badges refresh immediately without waiting for a navigation.
 */
export function notifyCountsChanged() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("ziea:counts-changed"));
  }
}
