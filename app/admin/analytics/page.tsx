import React from 'react';
import Link from 'next/link';
import {
  MdOutlineInventory2,
  MdOutlineVisibility,
  MdOutlineFavoriteBorder,
  MdOutlineShoppingCart,
} from 'react-icons/md';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { DonutChart } from '@/components/ui/DonutChart';
import { ActivityRow } from '@/components/ui/ActivityRow';
import { AnalyticsTrends } from '@/components/client/admin/AnalyticsTrends';
import { getAnalytics } from '@/utils/analytics';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Analytics | ZIEA Admin',
  robots: { index: false },
};

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      {/* Header */}
      <div className="border-b border-[#d6c3b3]/30 pb-6 mb-6">
        <h1 className="font-jost text-2xl lg:text-3xl font-bold text-[#2C3829] mb-2">Analytics</h1>
        <p className="text-[#2C3829]/70">Store engagement and product performance at a glance.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Total Products"
          value={data.stats.totalProducts.toLocaleString()}
          subtitle="In catalog"
          icon={MdOutlineInventory2}
        />
        <MetricCard
          title="Total Views"
          value={data.stats.totalViews.toLocaleString()}
          subtitle="Across all products"
          icon={MdOutlineVisibility}
        />
        <MetricCard
          title="Wishlisted"
          value={data.stats.wishlisted.toLocaleString()}
          subtitle="Wishlist items"
          icon={MdOutlineFavoriteBorder}
        />
        <MetricCard
          title="In Carts"
          value={data.stats.cartCount.toLocaleString()}
          subtitle="Cart items"
          icon={MdOutlineShoppingCart}
        />
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left: Trends */}
        <Card className="lg:col-span-2 p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="font-jost font-semibold text-[#2C3829]">User Interaction Trends</h2>
            <p className="text-[#2C3829]/60 text-sm">Traffic &amp; conversion flows</p>
          </div>
          <AnalyticsTrends initial={data.trend} />
        </Card>

        {/* Right: Popular Products */}
        <Card className="p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="font-jost font-semibold text-[#2C3829]">Popular Products</h2>
            <p className="text-[#2C3829]/60 text-sm">View distribution</p>
          </div>
          <DonutChart
            segments={data.popularProducts}
            centerTitle="Top Product"
            centerValue={data.topProduct.title}
          />
        </Card>
      </div>

      {/* Activity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Wishlist Activity */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-jost font-semibold text-[#2C3829]">Wishlist Activity</h2>
            <Link
              href="/admin/analytics/wishlist"
              className="text-[#4c623d] text-sm hover:underline"
            >
              View All &rarr;
            </Link>
          </div>
          {data.wishlistActivity.length > 0 ? (
            <div className="space-y-4">
              {data.wishlistActivity.map((item, i) => (
                <ActivityRow key={`wishlist-${i}`} {...item} />
              ))}
            </div>
          ) : (
            <p className="text-[#2C3829]/60 text-sm py-6 text-center">No wishlist activity yet.</p>
          )}
        </div>

        {/* Cart Additions */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-jost font-semibold text-[#2C3829]">Cart Additions</h2>
            <Link
              href="/admin/analytics/cart"
              className="text-[#4c623d] text-sm hover:underline"
            >
              View All &rarr;
            </Link>
          </div>
          {data.cartAdditions.length > 0 ? (
            <div className="space-y-4">
              {data.cartAdditions.map((item, i) => (
                <ActivityRow key={`cart-${i}`} {...item} />
              ))}
            </div>
          ) : (
            <p className="text-[#2C3829]/60 text-sm py-6 text-center">No cart activity yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}
