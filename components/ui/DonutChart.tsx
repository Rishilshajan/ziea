import React from "react";
import type { DonutSegment } from "@/utils/analytics";

interface DonutChartProps {
  segments: DonutSegment[];
  centerTitle?: string;
  centerValue?: string;
}

/**
 * Presentational SVG donut chart. Uses a radius of 15.915 so that the
 * circumference equals 100, letting stroke-dasharray values be read directly as
 * percentages of the total.
 */
export function DonutChart({ segments, centerTitle, centerValue }: DonutChartProps) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  if (segments.length === 0 || total <= 0) {
    return (
      <div className="flex items-center justify-center h-48 text-[#2C3829]/50 font-jost text-sm">
        No data yet
      </div>
    );
  }

  // Pre-compute each segment's percentage and cumulative offset.
  let cumulative = 0;
  const arcs = segments.map((s) => {
    const pct = (s.value / total) * 100;
    const offset = cumulative;
    cumulative += pct;
    return { ...s, pct, offset };
  });

  const ariaSummary = arcs
    .map((a) => `${a.label}: ${Math.round(a.pct)}%`)
    .join(", ");

  return (
    <div>
      <div className="relative w-44 h-44 mx-auto">
        <svg
          viewBox="0 0 36 36"
          className="w-full h-full -rotate-90"
          role="img"
          aria-label={`Donut chart. ${ariaSummary}.`}
        >
          <circle
            cx="18"
            cy="18"
            r="15.915"
            fill="none"
            stroke="#f3e6dc"
            strokeWidth="3"
          />
          {arcs.map((a, i) => (
            <circle
              key={`${a.label}-${i}`}
              cx="18"
              cy="18"
              r="15.915"
              fill="none"
              stroke={a.color}
              strokeWidth="3"
              strokeDasharray={`${a.pct} ${100 - a.pct}`}
              strokeDashoffset={-a.offset}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          {centerTitle && (
            <span className="text-[10px] uppercase tracking-widest text-[#2C3829]/60">
              {centerTitle}
            </span>
          )}
          {centerValue && (
            <span className="cormorant text-2xl text-[#2C3829] leading-tight">
              {centerValue}
            </span>
          )}
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {arcs.map((a, i) => (
          <li
            key={`${a.label}-legend-${i}`}
            className="flex items-center gap-3 text-sm font-jost"
          >
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: a.color }}
            />
            <span className="flex-1 min-w-0 truncate text-[#2C3829]">
              {a.label}
            </span>
            <span className="text-[#2C3829]/60 tabular-nums">
              {Math.round(a.pct)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
