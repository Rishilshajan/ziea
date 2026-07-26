import React from "react";
import { getBadgeColor } from "@/utils/badge";

interface BadgeProps {
  label: string;
  /** Render as a diagonal corner ribbon (used on mobile product cards). */
  ribbon?: boolean;
  className?: string;
}

/** Consistent product badge pill (color from the shared getBadgeColor util). */
export function Badge({ label, ribbon = false, className = "" }: BadgeProps) {
  if (!label) return null;

  if (ribbon) {
    return (
      <div className="absolute top-0 left-0 h-20 w-20 overflow-hidden z-10 pointer-events-none">
        <span
          className="jost absolute top-[16px] -left-[26px] w-[120px] -rotate-45 py-1 text-center text-[9px] font-semibold uppercase tracking-wide text-white shadow-md"
          style={{ backgroundColor: getBadgeColor(label) }}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <span
      className={`jost inline-block text-white px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase shadow-sm ${className}`}
      style={{ backgroundColor: getBadgeColor(label) }}
    >
      {label}
    </span>
  );
}
