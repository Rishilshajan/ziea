"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUserId } from "@/utils/supabase/user";
import { logProductInteraction } from "@/app/actions/activity";

/**
 * Toggle a product in the current user's wishlist.
 * Returns { wishlisted } reflecting the new state, or { error: 'unauthenticated' }.
 *
 * Identity resolved locally from the JWT (`getUserId`, no Auth-server hop); RLS
 * enforces per-user ownership. Logging is deferred with `after()`.
 */
export async function toggleWishlist(productId: string) {
  const userId = await getUserId();
  if (!userId) return { error: "unauthenticated" as const };

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("wishlist_items")
    .select("id")
    .eq("user_id", userId)
    .eq("product_id", productId)
    .maybeSingle();

  if (existing) {
    await supabase.from("wishlist_items").delete().eq("id", existing.id);
    revalidatePath("/wishlist");
    return { wishlisted: false };
  }

  await supabase
    .from("wishlist_items")
    .insert({ user_id: userId, product_id: productId });
  after(() => logProductInteraction(productId, "Wishlist"));
  revalidatePath("/wishlist");
  return { wishlisted: true };
}

/** Remove a product from the current user's wishlist. */
export async function removeWishlistItem(productId: string) {
  const userId = await getUserId();
  if (!userId) return { error: "unauthenticated" as const };

  const supabase = await createClient();
  await supabase
    .from("wishlist_items")
    .delete()
    .eq("user_id", userId)
    .eq("product_id", productId);
  revalidatePath("/wishlist");
  return { success: true };
}

/** Product ids currently wishlisted by the signed-in user (for initial heart state). */
export async function getWishlistProductIds(): Promise<string[]> {
  // Read path: resolve the user id from the JWT locally (no Auth-server hop).
  const userId = await getUserId();
  if (!userId) return [];

  const supabase = await createClient();
  const { data } = await supabase
    .from("wishlist_items")
    .select("product_id")
    .eq("user_id", userId);

  return (data ?? []).map((row) => row.product_id as string);
}
