"use server";

import { createClient } from "@/utils/supabase/server";
import {
  buildInteractionSeries,
  type BarDatum,
  type InteractionRange,
} from "@/utils/analytics";

/**
 * Fetch a paged interaction time-series for the admin Analytics trend chart.
 * Best-effort: on any failure it returns an empty series rather than throwing
 * to the client.
 */
export async function getInteractionSeries(
  range: InteractionRange,
  offset: number,
): Promise<{ bars: BarDatum[]; windowLabel: string }> {
  try {
    const supabase = await createClient();
    return await buildInteractionSeries(supabase, range, offset);
  } catch (err) {
    console.error("getInteractionSeries:", err);
    return { bars: [], windowLabel: "" };
  }
}
