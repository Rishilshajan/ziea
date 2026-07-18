import React from 'react';
import Link from 'next/link';
import { MdOutlineInventory2, MdOutlineVisibility, MdOutlineGroup, MdOutlineCategory, MdOutlineChevronRight, MdOutlineTimeline } from "react-icons/md";
import { Card } from "@/components/ui/Card";
import { MetricCard } from "@/components/ui/MetricCard";
import { Button } from "@/components/ui/Button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  // getSession is fast and local (JWT decode). layout.tsx already did the secure getUser() check.
  const { data: { session } } = await supabase.auth.getSession();
  const userId = session?.user?.id;

  // Parallelize ALL queries into a single batch
  const usersCountPromise = supabase.from('users').select('*', { count: 'exact', head: true });
  const categoriesCountPromise = supabase.from('categories').select('*', { count: 'exact', head: true });
  const profilePromise = userId
    ? supabase.from('users').select('first_name').eq('id', userId).maybeSingle()
    : Promise.resolve({ data: null });

  const activitiesPromise = supabase.from('activity_logs').select('*').order('created_at', { ascending: false }).limit(10);

  const productsCountPromise = supabase.from('products').select('*', { count: 'exact', head: true });

  const [countResponse, categoriesCountResponse, profileResponse, activitiesResponse, productsCountResponse] = await Promise.all([
    usersCountPromise,
    categoriesCountPromise,
    profilePromise,
    activitiesPromise,
    productsCountPromise
  ]);

  const { count: usersCount } = countResponse;
  const firstName = profileResponse.data?.first_name || "Admin";

  const displayCustomersCount = usersCount || 0;
  const { count: categoriesCount } = categoriesCountResponse;
  const displayCategoriesCount = categoriesCount || 0;

  const { count: productsCount } = productsCountResponse;
  const displayProductsCount = productsCount || 0;

  const recentActivities = activitiesResponse.data || [];

  const getActivityColor = (type: string) => {
    if (type?.includes('Login') || type?.includes('Registration')) return 'bg-blue-500';
    if (type?.includes('Product')) return 'bg-green-500';
    if (type?.includes('Category')) return 'bg-purple-500';
    return 'bg-[#7A9268]'; // default
  };

  const getTypeBadgeClass = (type: string) => {
    if (type?.includes('Login') || type?.includes('Registration')) return 'bg-blue-50 text-blue-700 border-blue-200';
    if (type?.includes('Product')) return 'bg-green-50 text-green-700 border-green-200';
    if (type?.includes('Category')) return 'bg-purple-50 text-purple-700 border-purple-200';
    return 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} mins ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10">
      {/* Header Section (Mobile & Desktop) */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0 mb-6 border-b border-[#d6c3b3]/30 pb-6">
        <div>
          <h1 className="font-jost text-2xl lg:text-3xl text-[#2C3829] mb-2 font-bold">Welcome back, {firstName}</h1>
          <p className="font-body-md lg:font-body-lg text-[#2C3829]/70">Here is an overview of ZIEA's natural elegance and performance today.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full lg:w-auto">
          <Button variant="auth-social" className="w-full sm:!w-auto px-6">Generate Report</Button>
          <Button variant="auth-primary" className="w-full sm:!w-auto !py-3.5 !text-sm px-6">Add New Product</Button>
        </div>
      </div>

      {/* Metrics Grid (4 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 lg:mb-10">
        <MetricCard
          title="Products in Stock"
          value={displayProductsCount.toLocaleString()}
          subtitle="Active Stock"
          icon={MdOutlineInventory2}
        />
        <MetricCard
          title="Users Viewed"
          value="14,892"
          subtitle="+4.2k today"
          icon={MdOutlineVisibility}
        />
        <MetricCard
          title="Customers"
          value={displayCustomersCount.toLocaleString()}
          subtitle="Active base"
          icon={MdOutlineGroup}
        />
        <MetricCard
          title="Categories"
          value={displayCategoriesCount.toLocaleString()}
          subtitle="Active segments"
          icon={MdOutlineCategory}
        />
      </div>

      {/* Recent Activity Section */}
      <section className="mb-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-jost font-semibold text-2xl text-[#2C3829]">Recent Activity</h3>
          <Link href="/admin/activity" className="text-[#7A9268] font-label-md hover:underline font-medium">View All</Link>
        </div>
        <Card className="!rounded-xl !p-0 border border-[#d6c3b3]/30 overflow-hidden">
          {/* Mobile View: Cards */}
          <div className="md:hidden divide-y divide-[#d6c3b3]/30">
            {recentActivities.length > 0 ? (
              recentActivities.map((activity) => (
                <div key={activity.id} className="flex flex-col gap-3 p-5 sm:p-6 hover:bg-white/50 transition-colors group cursor-pointer">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-3 h-3 rounded-full ${getActivityColor(activity.type)} ring-4 ring-black/5 flex-shrink-0`}></div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getTypeBadgeClass(activity.type)}`}>
                        {activity.type}
                      </span>
                    </div>
                    <span className="text-[#2C3829]/60 font-label-sm text-xs whitespace-nowrap">{formatTimeAgo(activity.created_at)}</span>
                  </div>
                  <div className="pl-7">
                    <p className="text-[#2C3829] font-body-md leading-relaxed">
                      {activity.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-3 p-12 text-center">
                <MdOutlineTimeline className="text-[#2C3829]/30 text-5xl" />
                <span className="text-[#2C3829]/60 font-body-md">
                  No recent activity. Actions taken in the app will appear here.
                </span>
              </div>
            )}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Activity</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivities.length > 0 ? (
                  recentActivities.map((activity) => {
                    const dateObj = new Date(activity.created_at);
                    const formattedDate = dateObj.toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    });
                    const formattedTime = dateObj.toLocaleTimeString('en-IN', {
                      hour: '2-digit', minute: '2-digit'
                    });

                    return (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <span className="font-medium text-[#2C3829] font-body-md">
                            {activity.description}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getTypeBadgeClass(activity.type)}`}>
                            {activity.type}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-[#2C3829] font-medium font-jost text-sm">
                              {formattedDate}
                            </span>
                            <span className="text-[#2C3829]/60 font-jost text-xs mt-0.5">
                              {formattedTime}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-16">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <MdOutlineTimeline className="text-[#2C3829]/30 text-5xl" />
                        <span className="text-[#2C3829]/60 font-body-md">
                          No recent activity. Actions taken in the app will appear here.
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </section>

    </main>
  );
}
