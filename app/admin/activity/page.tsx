import React from 'react';
import { ActivityClient } from '@/components/client/admin/ActivityClient';

export const dynamic = 'force-dynamic';

export default function ActivityPage() {
  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      {/* Page Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 mb-6 border-b border-[#d6c3b3]/30 pb-6">
        <div>
          <h1 className="font-jost text-2xl lg:text-3xl text-[#2C3829] mb-2 font-bold">Activity</h1>
          <p className="font-body-md lg:font-body-lg text-[#2C3829]/70">
            Monitor what happened in the last 30 days across your store.
          </p>
        </div>
      </div>

      <ActivityClient />
    </main>
  );
}
