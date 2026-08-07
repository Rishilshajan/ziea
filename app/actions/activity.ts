"use server";
import { createClient } from "@/utils/supabase/server";
import { getUserId } from "@/utils/supabase/user";

/** Logs a customer's wishlist/cart add to activity_logs. Skips admins. Best-effort. */
export async function logProductInteraction(productId: string, kind: "Wishlist" | "Cart") {
  try {
    const userId = await getUserId();
    if (!userId) return;

    const supabase = await createClient();
    const { data: profile } = await supabase
      .from("users")
      .select("role, first_name, last_name")
      .eq("id", userId)
      .maybeSingle();
    if (!profile || profile.role === "Admin") return; // only log real customers

    const { data: product } = await supabase
      .from("products")
      .select("name, product_code")
      .eq("id", productId)
      .maybeSingle();
    if (!product) return;

    const name = `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim() || "A customer";
    const description = `${name} added ${product.name} (${product.product_code}) to ${kind}`;
    await supabase.rpc("log_activity", { p_type: kind, p_description: description });
  } catch {
    /* best-effort: never block the add */
  }
}
