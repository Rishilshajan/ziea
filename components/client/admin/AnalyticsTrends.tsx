"use client";

import React, { useState, useTransition } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { BarChart } from "@/components/ui/BarChart";
import { getInteractionSeries } from "@/app/actions/analytics";
import type { BarDatum, InteractionRange } from "@/utils/analytics";

interface AnalyticsTrendsProps {
  initial: {
    range: InteractionRange;
    offset: number;
    windowLabel: string;
    bars: BarDatum[];
  };
}

const RANGES: { value: InteractionRange; label: string }[] = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

/**
 * Interactive interaction-trend island: range toggle + window pager over a
 * presentational BarChart. Fetches new series via the `getInteractionSeries`
 * server action inside a transition.
 */
export function AnalyticsTrends({ initial }: AnalyticsTrendsProps) {
  const [range, setRange] = useState<InteractionRange>(initial.range);
  const [offset, setOffset] = useState(initial.offset);
  const [bars, setBars] = useState<BarDatum[]>(initial.bars);
  const [windowLabel, setWindowLabel] = useState(initial.windowLabel);
  const [isPending, startTransition] = useTransition();

  const load = (nextRange: InteractionRange, nextOffset: number) => {
    setRange(nextRange);
    setOffset(nextOffset);
    startTransition(async () => {
      const res = await getInteractionSeries(nextRange, nextOffset);
      setBars(res.bars);
      setWindowLabel(res.windowLabel);
    });
  };

  // Highlight the label of the tallest bar.
  const highlightLabel = bars.reduce<{ label: string; value: number } | null>(
    (best, b) => (best === null || b.value > best.value ? b : best),
    null,
  )?.label;

  const canGoForward = offset > 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Range toggle */}
        <div className="inline-flex bg-[#f9ebe1] rounded-full p-1">
          {RANGES.map((r) => {
            const active = r.value === range;
            return (
              <button
                key={r.value}
                type="button"
                aria-pressed={active}
                onClick={() => load(r.value, 0)}
                className={`px-4 py-1.5 rounded-full text-sm font-jost font-medium transition-colors ${
                  active
                    ? "bg-white text-[#2C3829] shadow-sm"
                    : "text-[#2C3829]/60 hover:text-[#2C3829]"
                }`}
              >
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Window pager */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous window"
            onClick={() => load(range, offset + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-[#d6c3b3]/30 text-[#2C3829] hover:bg-[#FAF7F2] transition-colors"
          >
            <MdChevronLeft className="text-xl" />
          </button>
          <span className="font-jost text-sm text-[#2C3829] min-w-[9rem] text-center">
            {windowLabel}
          </span>
          <button
            type="button"
            aria-label="Next window"
            aria-disabled={!canGoForward}
            disabled={!canGoForward}
            onClick={() => canGoForward && load(range, offset - 1)}
            className={`w-8 h-8 flex items-center justify-center rounded-full border border-[#d6c3b3]/30 text-[#2C3829] transition-colors ${
              canGoForward
                ? "hover:bg-[#FAF7F2]"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <MdChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      <div className={isPending ? "opacity-40 transition-opacity" : "transition-opacity"}>
        <BarChart data={bars} highlightLabel={highlightLabel} />
      </div>
    </div>
  );
}
