import { createClient } from "@supabase/supabase-js";

/**
 * A cookie-less Supabase client for PUBLIC storefront data (categories,
 * published products, facets). Because it never reads request cookies, it is
 * safe to call inside `unstable_cache`/`use cache` scopes — unlike the SSR
 * client, which reads `cookies()` and therefore can't be cached.
 *
 * Only use this for data that is identical for every visitor. Anything
 * user-specific (cart, wishlist, profile) must keep using the SSR client.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { persistSession: false } },
  );
}
