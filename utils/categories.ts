import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/utils/supabase/public";

export interface StoreCategory {
  id: string;
  name: string;
  image_url: string;
  image_pos_x?: string;
  image_pos_y?: string;
  image_zoom?: number;
}

/**
 * Storefront categories, ordered by creation.
 *
 * Cached across requests with `unstable_cache` so the Footer (every page),
 * Collections, and CategoryPills don't each hit Supabase. Invalidated instantly
 * when an admin changes categories via `revalidateTag('categories')`, with a
 * 1-hour fallback. Uses the cookie-less public client (required inside a cache).
 */
export const getCategories = unstable_cache(
  async (): Promise<StoreCategory[]> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("categories")
      .select("id, name, image_url, image_pos_x, image_pos_y, image_zoom")
      .order("created_at", { ascending: true });
    return (data ?? []) as StoreCategory[];
  },
  ["storefront-categories"],
  { tags: ["categories"], revalidate: 3600 },
);
