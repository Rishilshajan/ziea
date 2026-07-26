import { createClient } from "@/utils/supabase/server";
import type { Product } from "@/types/product";

// Single source of truth for the storefront product shape.
const PRODUCT_SELECT = `
  id, product_code, name, description, category_id,
  original_price, discounted_price, material, care_instructions,
  shipping_info, contents, delivery_days, images, sizes, badges, is_published, status, created_at
`;

interface ListParams {
  category?: string; // category_id
  q?: string;
  page?: number;
  pageSize?: number;
}

/** Published products for the storefront, with optional category filter, search, and pagination. */
export async function getPublishedProducts({
  category,
  q,
  page = 1,
  pageSize = 12,
}: ListParams = {}): Promise<{ items: Product[]; total: number }> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT, { count: "exact" })
    .eq("is_published", true)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (category) query = query.eq("category_id", category);
  if (q && q.trim()) {
    const term = q.trim().replace(/[%,]/g, "");
    query = query.or(`name.ilike.%${term}%,description.ilike.%${term}%`);
  }

  const from = (page - 1) * pageSize;
  query = query.range(from, from + pageSize - 1);

  const { data, count, error } = await query;
  if (error) console.error("getPublishedProducts:", error.message);
  return { items: (data ?? []) as Product[], total: count ?? 0 };
}

/** The effective (sale-aware) price used for price filtering and price sorting. */
function effectivePrice(p: Product): number {
  return p.discounted_price ?? p.original_price ?? 0;
}

export type ProductSort = "newest" | "price_asc" | "price_desc" | "popular";

interface FilterParams {
  category?: string; // category_id
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  onSale?: boolean;
  badges?: string[];
  inStock?: boolean;
  sizes?: string[];
  materials?: string[];
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
}

/**
 * Fetch-all + in-memory filter/sort for the storefront Collections page.
 * DB-level filtering is limited to `category` and `q` (search); everything else
 * (cross-column sale, JSONB stock/size, material, price bounds) is applied in JS
 * because the catalog is small and these predicates are awkward in the query builder.
 */
export async function getFilteredProducts({
  category,
  q,
  minPrice,
  maxPrice,
  onSale,
  badges,
  inStock,
  sizes,
  materials,
  sort = "newest",
  page = 1,
  pageSize = 12,
}: FilterParams = {}): Promise<{ items: Product[]; total: number }> {
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select(`${PRODUCT_SELECT}, view_count`)
    .eq("is_published", true)
    .eq("status", "published");

  if (category) query = query.eq("category_id", category);
  if (q && q.trim()) {
    const term = q.trim().replace(/[%,]/g, "");
    query = query.or(`name.ilike.%${term}%,description.ilike.%${term}%`);
  }

  const { data, error } = await query;
  if (error) console.error("getFilteredProducts:", error.message);

  let items = (data ?? []) as Product[];

  // Price bounds (each optional; NaN is guarded by the callers).
  if (typeof minPrice === "number" && !Number.isNaN(minPrice)) {
    items = items.filter((p) => effectivePrice(p) >= minPrice);
  }
  if (typeof maxPrice === "number" && !Number.isNaN(maxPrice)) {
    items = items.filter((p) => effectivePrice(p) <= maxPrice);
  }

  // On sale only.
  if (onSale) {
    items = items.filter(
      (p) =>
        p.discounted_price != null &&
        p.original_price != null &&
        p.discounted_price < p.original_price,
    );
  }

  // Badge/tag intersection.
  if (badges && badges.length > 0) {
    items = items.filter((p) =>
      (p.badges ?? []).some((b) => badges.includes(b)),
    );
  }

  // In stock only.
  if (inStock) {
    items = items.filter((p) => (p.sizes ?? []).some((s) => s.quantity > 0));
  }

  // Size: has ANY selected size with quantity > 0.
  if (sizes && sizes.length > 0) {
    items = items.filter((p) =>
      (p.sizes ?? []).some((s) => sizes.includes(s.size) && s.quantity > 0),
    );
  }

  // Material exact match against selected set.
  if (materials && materials.length > 0) {
    items = items.filter((p) => !!p.material && materials.includes(p.material));
  }

  // Sort.
  switch (sort) {
    case "price_asc":
      items.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "price_desc":
      items.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "popular":
      items.sort((a, b) => (b.view_count ?? 0) - (a.view_count ?? 0));
      break;
    case "newest":
    default:
      items.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      break;
  }

  const total = items.length;
  const from = (page - 1) * pageSize;
  const paged = items.slice(from, from + pageSize);

  return { items: paged, total };
}

export interface ProductFacets {
  badges: string[];
  materials: string[];
  minPrice: number;
  maxPrice: number;
}

/** Distinct filter option data computed from ALL published products. */
export async function getProductFacets(): Promise<ProductFacets> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("original_price, discounted_price, material, badges")
    .eq("is_published", true)
    .eq("status", "published");
  if (error) console.error("getProductFacets:", error.message);

  const rows = (data ?? []) as Pick<
    Product,
    "original_price" | "discounted_price" | "material" | "badges"
  >[];

  const badgeSet = new Set<string>();
  const materialSet = new Set<string>();
  let min = Infinity;
  let max = 0;

  for (const r of rows) {
    for (const b of r.badges ?? []) if (b) badgeSet.add(b);
    if (r.material && r.material.trim()) materialSet.add(r.material.trim());
    const price = r.discounted_price ?? r.original_price ?? 0;
    if (price < min) min = price;
    if (price > max) max = price;
  }

  return {
    badges: [...badgeSet].sort((a, b) => a.localeCompare(b)),
    materials: [...materialSet].sort((a, b) => a.localeCompare(b)),
    minPrice: Number.isFinite(min) ? Math.floor(min) : 0,
    maxPrice: Math.ceil(max),
  };
}

/** A single published product by its DB-generated product_code (the storefront slug). */
export async function getProductByCode(code: string): Promise<Product | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("product_code", code)
    .eq("is_published", true)
    .eq("status", "published")
    .maybeSingle();
  if (error) console.error("getProductByCode:", error.message);
  return (data ?? null) as Product | null;
}

/** Related products in the same category (excluding the current one). */
export async function getRelatedProducts(
  categoryId: string | null,
  excludeId: string,
  limit = 4,
): Promise<Product[]> {
  const supabase = await createClient();
  let query = supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_published", true)
    .eq("status", "published")
    .neq("id", excludeId)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (categoryId) query = query.eq("category_id", categoryId);
  const { data, error } = await query;
  if (error) console.error("getRelatedProducts:", error.message);
  return (data ?? []) as Product[];
}
