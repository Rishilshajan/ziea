import { unstable_cache } from "next/cache";
import { createPublicClient } from "@/utils/supabase/public";
import { parseBranding, type Branding } from "@/utils/branding";

/**
 * All storefront branding, parsed into typed shapes. Cached like getCategories
 * (tag `branding`, invalidated on admin save via revalidateStorefront). Empty
 * slots come back as null/[] — consuming components apply fallbacks.
 */
export const getBranding = unstable_cache(
  async (): Promise<Branding> => {
    const supabase = createPublicClient();
    const { data } = await supabase
      .from("branding_assets")
      .select("section_name, images");
    const bySection = new Map<string, Record<string, unknown>>();
    for (const row of data ?? []) {
      bySection.set(
        row.section_name as string,
        (row.images ?? {}) as Record<string, unknown>,
      );
    }
    return parseBranding(bySection);
  },
  ["storefront-branding"],
  { tags: ["branding"], revalidate: 3600 },
);
