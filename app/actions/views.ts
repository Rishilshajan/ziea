"use server";

import { createClient } from "@/utils/supabase/server";

/**
 * Increment a product's view counter. Best-effort; works for both anonymous and
 * logged-in visitors (the underlying RPC is SECURITY DEFINER).
 */
export async function incrementProductView(productId: string) {
  try {
    const supabase = await createClient();
    await supabase.rpc("increment_product_view_count", { p_id: productId });
  } catch {
    /* best-effort: never block the page */
  }
}
