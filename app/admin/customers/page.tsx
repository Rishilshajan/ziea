import React from 'react';
import { MdOutlineGroup, MdOutlinePersonOutline, MdOutlineStarBorder, MdOutlineTrendingUp } from 'react-icons/md';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { CustomersTableWithSearch } from '@/components/client/admin/CustomersTableWithSearch';
import { createClient } from "@/utils/supabase/server";
import { getAdminProfile } from "@/utils/admin/session";

export default async function CustomersPage() {
  const supabase = await createClient();

  // Users, wishlist rows, and the admin's own profile (for the export byline)
  // all fetched concurrently — no second getUser() and no post-batch waterfall.
  const [profile, usersResponse, wishlistResponse] = await Promise.all([
    getAdminProfile(),
    supabase.from('users').select('*').order('created_at', { ascending: false }),
    supabase.from('wishlist_items').select('user_id'),
  ]);
  const { data: users } = usersResponse;

  const totalUsers = users ? users.length : 0;

  // Active users - users seen (browsed the site) within the last 15 days
  const fifteenDaysAgo = new Date();
  fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);
  const activeUsers = users ? users.filter(u => {
    const seen = u.last_seen_at || u.last_login_at; // fall back to login until last_seen_at is populated
    return seen && new Date(seen) > fifteenDaysAgo;
  }).length : 0;

  // New (30d) - users created in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newUsers = users ? users.filter(u => new Date(u.created_at) > thirtyDaysAgo).length : 0;

  // Wishlist Activity — % of customers who have added at least one item to their wishlist
  const wishlistUserIds = new Set(
    (wishlistResponse.data ?? []).map((r: { user_id: string }) => r.user_id)
  );
  const customerList = (users ?? []).filter((u: { role?: string }) => u.role === 'Customer');
  const totalCustomers = customerList.length;
  const customersWithWishlist = customerList.filter(
    (u: { id: string }) => wishlistUserIds.has(u.id)
  ).length;
  const wishlistPct =
    totalCustomers > 0 ? Math.round((customersWithWishlist / totalCustomers) * 100) : 0;

  // Admin name for the export byline — from the shared profile (already fetched).
  const adminName =
    `${profile?.firstName || ''} ${profile?.lastName || ''}`.trim() || 'Admin';

  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      <CustomersTableWithSearch initialUsers={users || []} adminName={adminName}>
        {/* Stats Overview (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 lg:mb-10">
          <MetricCard
            title="Total"
            value={totalUsers.toLocaleString()}
            subtitle="Total registered"
            icon={MdOutlineGroup}
          />
          <MetricCard
            title="Active"
            value={activeUsers.toLocaleString()}
            subtitle="Estimated active"
            icon={MdOutlinePersonOutline}
          />
          <MetricCard
            title="New (30d)"
            value={newUsers.toLocaleString()}
            subtitle="Past 30 days"
            icon={MdOutlineStarBorder}
          />
          <MetricCard
            title="Wishlist Activity"
            value={`${wishlistPct}%`}
            subtitle="Added items to wishlist"
            icon={MdOutlineStarBorder}
          />
        </div>
      </CustomersTableWithSearch>
    </main>
  );
}
