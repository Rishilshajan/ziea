import React from "react";

/** Generic shimmer block for loading states. */
export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse bg-muted/40 rounded ${className}`} />;
}

/** Loading placeholder matching a product card's footprint. */
export function SkeletonProductCard() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="aspect-[4/5] w-full rounded-xl bg-muted/40 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-3/4 rounded bg-muted/40 animate-pulse" />
        <div className="h-4 w-1/3 rounded bg-muted/40 animate-pulse" />
      </div>
    </div>
  );
}
