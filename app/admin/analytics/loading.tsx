import React from "react";
import { Skeleton } from "@/components/ui/Skeleton";

/** Route-level loading UI mirroring the Analytics page layout. */
export default function Loading() {
  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#d6c3b3]/30 pb-6 mb-6">
        <Skeleton className="h-8 w-48 mb-3" />
        <Skeleton className="h-4 w-72" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={`stat-${i}`} className="h-32 rounded-xl" />
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Skeleton className="lg:col-span-2 h-80 rounded-xl" />
        <Skeleton className="h-80 rounded-xl" />
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, col) => (
          <div key={`col-${col}`}>
            <Skeleton className="h-5 w-40 mb-6" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={`row-${col}-${i}`} className="h-[86px] rounded-xl" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
