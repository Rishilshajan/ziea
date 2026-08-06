import { createClient } from "@/utils/supabase/server";
import type { SupabaseClient } from "@supabase/supabase-js";

// ── Types ───────────────────────────────────────────────────────────────────

export interface BarDatum {
  label: string;
  /** Optional secondary line under the axis label (e.g. the date under a weekday). */
  subLabel?: string;
  value: number;
}

export interface DonutSegment {
  label: string;
  value: number;
  color: string;
}

export interface ActivityItem {
  imageUrl?: string;
  title: string;
  subtitle: string;
  rightPrimary?: string;
  tone?: "sage" | "terracotta" | "error" | "muted";
  href?: string;
}

export type InteractionRange = "daily" | "weekly" | "monthly";

export interface ProductViewRow {
  productCode: string;
  name: string;
  views: number;
}

export interface AnalyticsData {
  stats: {
    totalProducts: number;
    totalViews: number;
    wishlisted: number;
    cartCount: number;
  };
  trend: {
    range: InteractionRange;
    offset: number;
    windowLabel: string;
    bars: BarDatum[];
  };
  popularProducts: DonutSegment[];
  topProduct: { title: string; value: string };
  /** Top 5 products by view count (preview list on the Analytics page). */
  productViews: ProductViewRow[];
  wishlistActivity: ActivityItem[];
  cartAdditions: ActivityItem[];
}

// ── Palette ───────────────────────────────────────────────────────────────────

export const DONUT_PALETTE = [
  "#4c623d",
  "#C4856A",
  "#7A7068",
  "#865139",
  "#A8BC9A",
  "#2C3829",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Admin-noise exclusion: keep only customer-facing activity. Rows whose `type`
 * matches Admin/Product/Category are dropped, leaving Customer Login/Registration,
 * Wishlist, Cart, Enquiry, and Newsletter.
 */
const ADMIN_EXCLUDE_RE = /(Admin|Product|Category)/i;

const WEEKDAY_MON = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Monday-based start of the week containing `d`. */
function startOfWeek(d: Date): Date {
  const x = startOfDay(d);
  const day = (x.getDay() + 6) % 7; // 0 = Monday
  x.setDate(x.getDate() - day);
  return x;
}

function startOfMonth(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  x.setDate(1);
  return x;
}

interface Bucket {
  label: string;
  subLabel?: string;
  start: number; // inclusive (ms)
  end: number; // exclusive (ms)
  value: number;
}

/**
 * Build a zero-filled interaction time-series from `activity_logs`, excluding
 * admin-noise rows. `offset` pages backwards in whole windows (0 = current window).
 */
export async function buildInteractionSeries(
  supabase: SupabaseClient,
  range: InteractionRange,
  offset: number,
): Promise<{ bars: BarDatum[]; windowLabel: string }> {
  const now = new Date();
  const buckets: Bucket[] = [];
  let windowStart: Date;
  let windowEnd: Date;
  let windowLabel: string;

  if (range === "daily") {
    // Fixed Mon–Sun calendar week containing (now − offset weeks).
    const weekStart = startOfWeek(new Date(now.getTime() - offset * 7 * DAY_MS)); // Monday
    for (let i = 0; i < 7; i++) {
      const dayStart = new Date(weekStart.getTime() + i * DAY_MS);
      const dayEnd = new Date(dayStart.getTime() + DAY_MS);
      buckets.push({
        label: WEEKDAY_MON[i],
        subLabel: String(dayStart.getDate()), // date under the weekday
        start: dayStart.getTime(),
        end: dayEnd.getTime(),
        value: 0,
      });
    }
    const lastDay = new Date(weekStart.getTime() + 6 * DAY_MS);
    windowStart = weekStart;
    windowEnd = new Date(weekStart.getTime() + 7 * DAY_MS);
    windowLabel =
      weekStart.getMonth() === lastDay.getMonth()
        ? `${weekStart.getDate()}–${lastDay.getDate()} ${MONTH_SHORT[lastDay.getMonth()]} ${lastDay.getFullYear()}`
        : `${weekStart.getDate()} ${MONTH_SHORT[weekStart.getMonth()]} – ${lastDay.getDate()} ${MONTH_SHORT[lastDay.getMonth()]} ${lastDay.getFullYear()}`;
  } else if (range === "weekly") {
    // 8 weeks ending at now − offset*8w.
    const endWeek = startOfWeek(new Date(now.getTime() - offset * 8 * 7 * DAY_MS));
    const firstWeek = new Date(endWeek.getTime() - 7 * 7 * DAY_MS);
    for (let i = 0; i < 8; i++) {
      const wkStart = new Date(firstWeek.getTime() + i * 7 * DAY_MS);
      const wkEnd = new Date(wkStart.getTime() + 7 * DAY_MS);
      buckets.push({
        // Split into date + month so it stays legible on mobile (no truncation).
        label: String(wkStart.getDate()),
        subLabel: MONTH_SHORT[wkStart.getMonth()],
        start: wkStart.getTime(),
        end: wkEnd.getTime(),
        value: 0,
      });
    }
    windowStart = firstWeek;
    windowEnd = new Date(endWeek.getTime() + 7 * DAY_MS);
    windowLabel = `${firstWeek.getDate()} ${MONTH_SHORT[firstWeek.getMonth()]} – ${endWeek.getDate()} ${MONTH_SHORT[endWeek.getMonth()]} ${endWeek.getFullYear()}`;
  } else {
    // monthly: 6 months ending at now − offset*6m.
    const anchor = startOfMonth(now);
    anchor.setMonth(anchor.getMonth() - offset * 6);
    const firstMonth = new Date(anchor);
    firstMonth.setMonth(firstMonth.getMonth() - 5);
    for (let i = 0; i < 6; i++) {
      const mStart = new Date(firstMonth);
      mStart.setMonth(mStart.getMonth() + i);
      const mEnd = new Date(mStart);
      mEnd.setMonth(mEnd.getMonth() + 1);
      buckets.push({
        label: MONTH_SHORT[mStart.getMonth()],
        start: mStart.getTime(),
        end: mEnd.getTime(),
        value: 0,
      });
    }
    windowStart = firstMonth;
    const lastMonthEnd = new Date(anchor);
    lastMonthEnd.setMonth(lastMonthEnd.getMonth() + 1);
    windowEnd = lastMonthEnd;
    // e.g. "Jun 2026" (the last month in the window)
    windowLabel = `${MONTH_SHORT[anchor.getMonth()]} ${anchor.getFullYear()}`;
  }

  const { data, error } = await supabase
    .from("activity_logs")
    .select("type, created_at")
    .gte("created_at", windowStart.toISOString())
    .lt("created_at", windowEnd.toISOString());

  if (error) console.error("buildInteractionSeries:", error.message);

  const rows = (data ?? []) as { type: string | null; created_at: string }[];

  for (const row of rows) {
    if (ADMIN_EXCLUDE_RE.test(row.type ?? "")) continue;
    const t = new Date(row.created_at).getTime();
    const bucket = buckets.find((b) => t >= b.start && t < b.end);
    if (bucket) bucket.value += 1;
  }

  return {
    bars: buckets.map((b) => ({ label: b.label, subLabel: b.subLabel, value: b.value })),
    windowLabel,
  };
}

// ── Main query ────────────────────────────────────────────────────────────────

interface ActivityRelRow {
  product_id: string;
  created_at: string;
  products: { name: string | null; images: { url?: string }[] | null } | null;
}

/** Aggregate wishlist/cart rows by product into ActivityItems (newest first, capped). */
function aggregateActivity(
  rows: ActivityRelRow[],
  subtitleFor: (n: number) => string,
  tone: ActivityItem["tone"],
  href: string,
  cap = 5,
): ActivityItem[] {
  // Preserve newest-first order of first appearance.
  const order: string[] = [];
  const map = new Map<string, { count: number; row: ActivityRelRow }>();

  for (const r of rows) {
    const existing = map.get(r.product_id);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(r.product_id, { count: 1, row: r });
      order.push(r.product_id);
    }
  }

  return order.slice(0, cap).map((id) => {
    const { count, row } = map.get(id)!;
    return {
      imageUrl: row.products?.images?.[0]?.url,
      title: row.products?.name ?? "Unknown product",
      subtitle: subtitleFor(count),
      tone,
      href,
    };
  });
}

/** Fetch every metric for the admin Analytics page in a single Promise.all. */
export async function getAnalytics(): Promise<AnalyticsData> {
  const supabase = await createClient();

  const [
    productsCountRes,
    viewsRes,
    wishlistCountRes,
    cartCountRes,
    popularRes,
    wishlistActivityRes,
    cartActivityRes,
    trend,
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("products").select("view_count"),
    supabase.from("wishlist_items").select("*", { count: "exact", head: true }),
    supabase.from("cart_items").select("*", { count: "exact", head: true }),
    supabase.from("products").select("product_code, name, view_count"),
    supabase
      .from("wishlist_items")
      .select("product_id, created_at, products(name, images)")
      .order("created_at", { ascending: false }),
    supabase
      .from("cart_items")
      .select("product_id, created_at, products(name, images)")
      .order("created_at", { ascending: false }),
    buildInteractionSeries(supabase, "daily", 0),
  ]);

  const totalProducts = productsCountRes.count ?? 0;

  const viewRows = (viewsRes.data ?? []) as { view_count: number | null }[];
  const totalViews = viewRows.reduce((sum, r) => sum + (r.view_count ?? 0), 0);

  const wishlisted = wishlistCountRes.count ?? 0;
  const cartCount = cartCountRes.count ?? 0;

  // Popular products (top 5 by view_count desc).
  const popularRows = (popularRes.data ?? []) as {
    product_code: string;
    name: string | null;
    view_count: number | null;
  }[];
  const sortedPopular = [...popularRows].sort(
    (a, b) => (b.view_count ?? 0) - (a.view_count ?? 0),
  );
  const top5 = sortedPopular.slice(0, 5);
  const popularProducts: DonutSegment[] = top5.map((p, i) => ({
    label: p.name ?? "Unnamed",
    value: p.view_count ?? 0,
    color: DONUT_PALETTE[i % DONUT_PALETTE.length],
  }));

  // Top 5 products by views (product + code + view count) for the preview table.
  const productViews: ProductViewRow[] = top5.map((p) => ({
    productCode: p.product_code ?? "—",
    name: p.name ?? "Unnamed",
    views: p.view_count ?? 0,
  }));

  const topRow = sortedPopular[0];
  const topProduct =
    topRow && (topRow.view_count ?? 0) > 0
      ? { title: topRow.name ?? "—", value: `${topRow.view_count} views` }
      : { title: "—", value: "No views yet" };

  const wishlistActivity = aggregateActivity(
    (wishlistActivityRes.data ?? []) as unknown as ActivityRelRow[],
    (n) => `Added by ${n} user${n === 1 ? "" : "s"}`,
    "terracotta",
    "/admin/analytics/wishlist",
  );

  const cartAdditions = aggregateActivity(
    (cartActivityRes.data ?? []) as unknown as ActivityRelRow[],
    (n) => `In ${n} cart${n === 1 ? "" : "s"}`,
    "sage",
    "/admin/analytics/cart",
  );

  return {
    stats: { totalProducts, totalViews, wishlisted, cartCount },
    trend: {
      range: "daily",
      offset: 0,
      windowLabel: trend.windowLabel,
      bars: trend.bars,
    },
    popularProducts,
    topProduct,
    productViews,
    wishlistActivity,
    cartAdditions,
  };
}
