"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";

/**
 * Add a product (optionally sized) to the current user's cart.
 * If the same (product, size) already exists, its quantity is incremented.
 * Stock capping is intentionally skipped for v1.
 */
export async function addToCart(
  productId: string,
  size: string | null = null,
  qty: number = 1
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "unauthenticated" as const };

  let query = supabase
    .from("cart_items")
    .select("id, quantity")
    .eq("user_id", user.id)
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
      user_id: user.id,
      product_id: productId,
      size,
      quantity: qty,
    });
  }

  revalidatePath("/cart");
  return { success: true };
}

/** Update a cart line's quantity; deletes the line if qty falls below 1. */
export async function updateCartQty(cartItemId: string, qty: number) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "unauthenticated" as const };

  if (qty < 1) {
    await supabase
      .from("cart_items")
      .delete()
      .eq("id", cartItemId)
      .eq("user_id", user.id);
  } else {
    await supabase
      .from("cart_items")
      .update({ quantity: qty })
      .eq("id", cartItemId)
      .eq("user_id", user.id);
  }

  revalidatePath("/cart");
  return { success: true };
}

/** Remove a single cart line. */
export async function removeCartItem(cartItemId: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "unauthenticated" as const };

  await supabase
    .from("cart_items")
    .delete()
    .eq("id", cartItemId)
    .eq("user_id", user.id);

  revalidatePath("/cart");
  return { success: true };
}
