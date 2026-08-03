"use server";

import { revalidateTag } from "next/cache";

/**
 * Invalidate cached storefront data after an admin mutation. Admin edits run
 * through the browser Supabase client, so the client calls this action once a
 * write succeeds to refresh the cached (`unstable_cache`) storefront reads.
 */
export async function revalidateStorefront(tag: "categories" | "products" | "branding") {
  // 'max' = stale-while-revalidate: the storefront serves the last value and
  // refreshes in the background on the next visit (recommended for catalogs).
  revalidateTag(tag, "max");
}
