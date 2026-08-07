"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { getUserId } from "@/utils/supabase/user";
import { logProductInteraction } from "@/app/actions/activity";

/**
 * Add a product (optionally sized) to the current user's cart.
 * If the same (product, size) already exists, its quantity is incremented.
 * Stock capping is intentionally skipped for v1.
 *
 * Identity is resolved from the session JWT locally (`getUserId`) — no Auth-server
 * round-trip — and RLS enforces per-user ownership at the DB. Activity logging is
 * deferred with `after()` so it never delays the add.
 */
export async function addToCart(
  productId: string,
  size: string | null = null,
  qty: number = 1
) {
  const userId = await getUserId();
  if (!userId) return { error: "unauthenticated" as const };

  const supabase = await createClient();

  let query = supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", userId)
    .eq("product_id", productId);
  query = size === null ? query.is("size", null) : query.eq("size", size);

  const { data: existing } = await query.maybeSingle();

  if (existing) {
    await supabase
      .from("cart_items")
      .update({ quantity: existing.quantity + qty })
      .eq("id", existing.id);
  } else {
    await supabase.from("cart_items").insert({
      user_id: userId,
      product_id: productId,
      size,
      quantity: qty,
    });
    after(() => logProductInteraction(productId, "Cart"));
  }

  revalidatePath("/cart");
  return { success: true };
}

/** Update a cart line's quantity; deletes the line if qty falls below 1. */
export async function updateCartQty(cartItemId: string, qty: number) {
  const userId = await getUserId();
  if (!userId) return { error: "unauthenticated" as const };

  const supabase = await createClient();

  if (qty < 1) {
    await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId)
      .eq("user_id", userId);
  } else {
    await supabase
      .from("cart_items")
      .update({ quantity: qty })
      .eq("id", cartItemId)
      .eq("user_id", userId);
  }

  revalidatePath("/cart");
  return { success: true };
}

/** Remove a single cart line. */
export async function removeCartItem(cartItemId: string) {
  const userId = await getUserId();
  if (!userId) return { error: "unauthenticated" as const };

  const supabase = await createClient();
  await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", userId);

  revalidatePath("/cart");
  return { success: true };
}
