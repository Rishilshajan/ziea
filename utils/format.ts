// Shared formatting helpers — the single source for date/time and currency
// display so the same value never renders two different ways across the app.
import { formatINR } from "@/utils/price";

export { formatINR };

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/**
 * Deterministic date ("23 Jul 2026") built from UTC parts — identical on the
 * server and client, so it never triggers a hydration mismatch.
 */
export function shortDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getUTCDate()} ${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

/** Deterministic date + time ("23 Jul 2026, 14:39"), UTC-based and SSR-safe. */
export function fullDate(dateStr: string): string {
  const d = new Date(dateStr);
  const hh = String(d.getUTCHours()).padStart(2, "0");
  const mm = String(d.getUTCMinutes()).padStart(2, "0");
  return `${shortDate(dateStr)}, ${hh}:${mm}`;
}

/**
 * Relative time ("2 hr ago"). Uses Date.now(), so only render this on the
 * client (or in transient/loading UI) to avoid hydration mismatches.
 */
export function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} d ago`;
  return shortDate(dateStr);
}

/** Compact rupees with no space ("₹1,234") — for chat messages and dense tables. */
export function rupees(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
