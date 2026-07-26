/** Formats a number as Indian Rupees, e.g. 2499 -> "₹ 2,499". */
export function formatINR(value: number | null | undefined): string {
  const n = Number(value) || 0;
  return `₹ ${Math.round(n).toLocaleString("en-IN")}`;
}

/**
 * Computes the "Deliverable by" label from a lead time in days, relative to today,
 * so it always stays current. Returns e.g. "2 Aug 2026", or null when no lead time.
 */
export function deliveryByLabel(days: number | null | undefined): string | null {
  if (days == null || Number.isNaN(Number(days))) return null;
  const d = new Date();
  d.setDate(d.getDate() + Number(days));
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Resolves the price to display and whether the original should be struck through.
 * Rule: show discounted_price; show a struck original only when it's genuinely higher.
 */
export function resolvePrice(
  originalPrice: number | null | undefined,
  discountedPrice: number | null | undefined,
) {
  const original = Number(originalPrice) || 0;
  const discounted = Number(discountedPrice ?? originalPrice) || 0;
  return {
    price: formatINR(discounted),
    original: original > discounted ? formatINR(original) : null,
    hasDiscount: original > discounted,
  };
}
