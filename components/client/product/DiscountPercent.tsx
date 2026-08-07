"use client";

/**
 * Shows the savings percentage, computed live on the client from the original
 * and discounted price (not stored in the DB). Renders nothing when there is
 * no genuine discount.
 */
export default function DiscountPercent({
  original,
  discounted,
}: {
  original?: number | null;
  discounted?: number | null;
}) {
  const o = Number(original) || 0;
  const d = Number(discounted) || 0;
  if (o <= 0 || d <= 0 || o <= d) return null;

  const percent = Math.round(((o - d) / o) * 100);
  if (percent <= 0) return null;

  return (
    <span className="font-jost text-sm md:text-base font-semibold text-[#9e5638]">
      ({percent}% OFF)
    </span>
  );
}
