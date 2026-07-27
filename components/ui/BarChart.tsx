import React from "react";
import type { BarDatum } from "@/utils/analytics";

interface BarChartProps {
  data: BarDatum[];
  highlightLabel?: string;
  className?: string;
}

/**
 * Presentational vertical bar chart. Heights are normalised against the max
 * value; the highlighted bar (or, absent an explicit `highlightLabel`, the
 * tallest one) is drawn in deep forest, the rest in a sage tint.
 */
export function BarChart({ data, highlightLabel, className = "" }: BarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div
        className={`h-64 flex items-center justify-center text-[#2C3829]/50 font-jost text-sm ${className}`}
      >
        No data yet
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const max = Math.max(...values, 1);

  // Resolve which bar to emphasise: explicit label if present in the data,
  // otherwise the tallest bar.
  const highlighted =
    highlightLabel && data.some((d) => d.label === highlightLabel)
      ? highlightLabel
      : data[values.indexOf(Math.max(...values))]?.label;

  const ariaSummary = data.map((d) => `${d.label}: ${d.value}`).join(", ");

  return (
    <div
      className={className}
      role="img"
      aria-label={`Bar chart. ${ariaSummary}.`}
    >
      <div className="h-64 flex items-end gap-2 sm:gap-3">
        {data.map((d, i) => {
          const isHi = d.label === highlighted;
          const heightPct = (d.value / max) * 100;
          return (
            <div
              key={`${d.label}-${i}`}
              className="group flex-1 flex flex-col justify-end items-center h-full min-w-0 gap-1.5"
            >
              {/* count label above the bar */}
              <span
                className={`font-jost text-xs leading-none ${
                  isHi
                    ? "font-bold text-[#2C3829]"
                    : d.value > 0
                      ? "text-[#2C3829]/70"
                      : "text-[#2C3829]/30"
                }`}
              >
                {d.value}
              </span>
              <div
                className={`w-full rounded-t-lg origin-bottom animate-[barGrowIn_0.5s_ease-out_both] transition-colors group-hover:opacity-90 ${
                  isHi ? "bg-[#2C3829]" : "bg-[#A8BC9A] group-hover:bg-[#8aa27a]"
                }`}
                style={{
                  height: `${heightPct}%`,
                  minHeight: d.value > 0 ? "4px" : "0",
                  animationDelay: `${i * 60}ms`,
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-3 flex gap-2 sm:gap-3">
        {data.map((d, i) => {
          const isHi = d.label === highlighted;
          return (
            <span
              key={`${d.label}-label-${i}`}
              className={`flex-1 min-w-0 truncate text-center text-xs uppercase tracking-widest ${
                isHi
                  ? "font-semibold text-[#2C3829]"
                  : "text-[#2C3829]/60"
              }`}
            >
              {d.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}
