import React from "react";
import { Card } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";

/** Route-level loading UI for the Cart Additions detail page. */
export default function Loading() {
  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#d6c3b3]/30 pb-6 mb-6">
        <Skeleton className="h-4 w-24 mb-3" />
        <Skeleton className="h-8 w-56 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>

      <Card className="!rounded-xl !p-0 border border-[#d6c3b3]/30 overflow-hidden">
        <div className="divide-y divide-[#d6c3b3]/30">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={`row-${i}`} className="flex items-center gap-4 p-4">
              <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-56" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
