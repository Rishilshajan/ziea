import React from 'react';
import { MdOutlineInventory2, MdOutlineVisibility, MdOutlineGroup, MdOutlineCategory, MdOutlineChevronRight } from "react-icons/md";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  // Fetch users count
  const { count: usersCount } = await supabase
    .from('users')
    .select('*', { count: 'exact', head: true });

  const { data: { user } } = await supabase.auth.getUser();
  let firstName = "Admin";
  if (user) {
    const { data: profileData } = await supabase
      .from('users')
      .select('first_name')
      .eq('id', user.id)
      .maybeSingle();
    if (profileData?.first_name) {
      firstName = profileData.first_name;
    }
  }

  const displayCustomersCount = usersCount || 0;

  const dummyActivities = [
    { id: 1, action: 'New product', target: '"Keralite Silk Kimono" (Z-0001)', suffix: 'was added to inventory.', time: '2 mins ago', color: 'bg-[#7A9268]' },
    { id: 2, action: 'User Amina K.', target: 'added items', suffix: 'to her wishlist.', time: '15 mins ago', color: 'bg-[#C4856A]' },
    { id: 3, action: 'New category', target: '"Sustainable Seekers"', suffix: 'was created.', time: '1 hour ago', color: 'bg-[#A8BC9A]' },
    { id: 4, action: 'Inventory alert:', target: '"Linen Dream Set" (Z-0012)', suffix: 'is low on stock.', time: '2 hours ago', color: 'bg-[#E8D5C4]' },
    { id: 5, action: 'User Rohan S.', target: 'logged in', suffix: 'to the application.', time: '3 hours ago', color: 'bg-[#7A9268]' },
    { id: 6, action: 'Product', target: '"Temple Border Saree" (Z-0045)', suffix: 'was updated.', time: '4 hours ago', color: 'bg-[#7A9268]' },
    { id: 7, action: 'User Priya M.', target: 'added 3 items', suffix: 'to their cart.', time: '5 hours ago', color: 'bg-[#C4856A]' },
    { id: 8, action: 'Category', target: '"Heritage Weaves"', suffix: 'was edited.', time: '6 hours ago', color: 'bg-[#A8BC9A]' },
  ];

  return (
    <main className="pt-24 lg:pt-10 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10">
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

      {/* Metrics Grid (2x2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-6 lg:mb-10">
        {/* Products in Stock */}
        <Card className="p-6 flex flex-col justify-between aspect-[16/10] md:aspect-auto hover:-translate-y-1 transition-transform cursor-default">
          <div className="flex justify-between items-start">
            <div className="bg-[#2C3829]/10 p-3 rounded-lg">
              <MdOutlineInventory2 className="text-[#2C3829] text-2xl" />
            </div>
            <span className="text-[#2C3829]/60 font-label-sm">+12% vs last month</span>
          </div>
          <div className="mt-8">
            <span className="text-[#2C3829] font-jost font-semibold block text-4xl mb-1">1,248</span>
            <span className="text-[#2C3829]/80 font-label-md uppercase tracking-widest text-xs">Products in Stock</span>
          </div>
        </Card>

        {/* Users Viewed */}
        <Card className="p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-default">
          <div className="flex justify-between items-start">
            <div className="bg-[#2C3829]/10 p-3 rounded-lg">
              <MdOutlineVisibility className="text-[#2C3829] text-2xl" />
            </div>
            <span className="text-[#2C3829]/60 font-label-sm">+4.2k today</span>
          </div>
          <div className="mt-8">
            <span className="text-[#2C3829] font-jost font-semibold block text-4xl mb-1">14,892</span>
            <span className="text-[#2C3829]/80 font-label-md uppercase tracking-widest text-xs">Users Viewed</span>
          </div>
        </Card>

        {/* Customers */}
        <Card className="p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-default">
          <div className="flex justify-between items-start">
            <div className="bg-[#2C3829]/10 p-3 rounded-lg">
              <MdOutlineGroup className="text-[#2C3829] text-2xl" />
            </div>
            <span className="text-[#2C3829]/60 font-label-sm">Active base</span>
          </div>
          <div className="mt-8">
            <span className="text-[#2C3829] font-jost font-semibold block text-4xl mb-1">{displayCustomersCount.toLocaleString()}</span>
            <span className="text-[#2C3829]/80 font-label-md uppercase tracking-widest text-xs">Customers</span>
          </div>
        </Card>

        {/* Categories */}
        <Card className="p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform cursor-default">
          <div className="flex justify-between items-start">
            <div className="bg-[#2C3829]/10 p-3 rounded-lg">
              <MdOutlineCategory className="text-[#2C3829] text-2xl" />
            </div>
            <span className="text-[#2C3829]/60 font-label-sm">8 New added</span>
          </div>
          <div className="mt-8">
            <span className="text-[#2C3829] font-jost font-semibold block text-4xl mb-1">24</span>
            <span className="text-[#2C3829]/80 font-label-md uppercase tracking-widest text-xs">Categories</span>
          </div>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <section className="mb-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-jost font-semibold text-2xl text-[#2C3829]">Recent Activity</h3>
          <button className="text-[#7A9268] font-label-md hover:underline font-medium">View All</button>
        </div>
        <Card className="!rounded-xl !p-0 border border-[#d6c3b3]/30">
          <div className="divide-y divide-[#d6c3b3]/30">
            {dummyActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-6 hover:bg-white/50 transition-colors group cursor-pointer">
                <div className={`w-3 h-3 rounded-full ${activity.color} ring-4 ring-black/5 flex-shrink-0`}></div>
                <div className="flex-1">
                  <p className="text-[#2C3829] font-body-md">
                    {activity.action} <span className="font-semibold opacity-80">{activity.target}</span> {activity.suffix}
                  </p>
                  <span className="text-[#2C3829]/60 font-label-sm text-xs">{activity.time}</span>
                </div>
                <MdOutlineChevronRight className="text-[#d6c3b3] opacity-0 group-hover:opacity-100 transition-opacity text-xl" />
              </div>
            ))}
          </div>
        </Card>
      </section>

    </main>
  );
}
