import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

/**
 * The signed-in user's id, resolved by verifying the session JWT locally
 * (`getClaims`) instead of calling the Auth server (`getUser`), which avoids a
 * network round-trip on every render. Wrapped in `React.cache` so repeated calls
 * within a single request (e.g. a page + its nested server components) run once.
 *
 * Read paths (listings, badges, initial wishlist state) should use this.
 * Mutations keep using `supabase.auth.getUser()` for the stronger guarantee.
 */
export const getUserId = cache(async (): Promise<string | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const sub = data?.claims?.sub;
  return typeof sub === "string" ? sub : null;
});
