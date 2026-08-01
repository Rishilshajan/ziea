import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

export interface AdminClaims {
  userId: string;
  role: string | null;
}

export interface AdminProfile {
  userId: string;
  role: string | null;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
}

interface UserRow {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  role: string | null;
}

/**
 * One `users` row fetch per request, shared (via React.cache) between the role
 * fallback in `getAdminClaims` and `getAdminProfile` — so the two never issue
 * separate lookups of the same row.
 */
const fetchUserRow = cache(async (userId: string): Promise<UserRow | null> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("users")
    .select("first_name, last_name, email, role")
    .eq("id", userId)
    .maybeSingle();
  return (data as UserRow | null) ?? null;
});

/**
 * Fast identity + role for the admin gate. Verifies the JWT locally via
 * `getClaims()` (no Auth-server round-trip once asymmetric signing keys are on)
 * and reads the role from the `user_role` custom claim. If that claim isn't
 * present yet (auth hook not configured), it falls back to a single `users`
 * lookup — still cheaper than the old `getUser()` + separate role query.
 *
 * `React.cache` dedupes it so the layout and any page share one call per request.
 */
export const getAdminClaims = cache(async (): Promise<AdminClaims | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims as Record<string, unknown> | undefined;
  const userId = claims?.sub;
  if (typeof userId !== "string") return null;

  let role =
    typeof claims?.user_role === "string" ? (claims.user_role as string) : null;

  if (!role) {
    // Fallback: custom-claim hook not applied yet. Shares the row with
    // getAdminProfile so we don't query the same user twice.
    role = (await fetchUserRow(userId))?.role ?? null;
  }

  return { userId, role };
});

/**
 * Full admin profile (name + role) for pages that display the admin's name
 * (dashboard greeting, customers export, nav). One DB query per request,
 * deduped via `React.cache`. Kept separate from `getAdminClaims` so the
 * per-page gate never pays for a name it doesn't need.
 */
export const getAdminProfile = cache(async (): Promise<AdminProfile | null> => {
  const claims = await getAdminClaims();
  if (!claims) return null;

  const row = await fetchUserRow(claims.userId);

  return {
    userId: claims.userId,
    role: row?.role ?? claims.role,
    firstName: row?.first_name ?? null,
    lastName: row?.last_name ?? null,
    email: row?.email ?? null,
  };
});
