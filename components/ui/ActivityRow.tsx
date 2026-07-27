import React from "react";
import Link from "next/link";
import type { ActivityItem } from "@/utils/analytics";

const TONE_COLOR: Record<NonNullable<ActivityItem["tone"]>, string> = {
  sage: "#4c623d",
  terracotta: "#C4856A",
  error: "#E63946",
  muted: "#7A7068",
};

/**
 * A single presentational activity row (thumb + title/subtitle + tone pill).
 * When `href` is provided the whole row becomes an interactive Next.js link.
 */
export function ActivityRow({
  imageUrl,
  title,
  subtitle,
  rightPrimary,
  tone = "muted",
  href,
}: ActivityItem) {
  const toneColor = TONE_COLOR[tone];

  const inner = (
    <>
      <div className="w-14 h-14 rounded-xl overflow-hidden bg-[#FAF7F2] flex-shrink-0">
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-jost text-[#2C3829] truncate">{title}</p>
        <p className="text-xs text-[#2C3829]/60 truncate">{subtitle}</p>
      </div>
      {rightPrimary && (
        <span
          className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-jost font-medium"
          style={{ backgroundColor: `${toneColor}1a`, color: toneColor }}
        >
          {rightPrimary}
        </span>
      )}
    </>
  );

  const baseClass =
    "flex items-center gap-4 bg-white rounded-xl p-4 shadow-[0px_2px_16px_rgba(44,56,41,0.08)]";

  if (href) {
    return (
      <Link
        href={href}
        className={`${baseClass} hover:bg-[#FAF7F2] hover:scale-[1.01] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4c623d] focus-visible:ring-offset-2`}
      >
        {inner}
      </Link>
    );
  }

  return <div className={baseClass}>{inner}</div>;
}
