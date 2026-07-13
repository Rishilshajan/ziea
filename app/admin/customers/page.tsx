import React from 'react';
import { MdOutlineGroup, MdOutlinePersonOutline, MdOutlineStarBorder, MdOutlineTrendingUp } from 'react-icons/md';
import { Card } from '@/components/ui/Card';
import { MetricCard } from '@/components/ui/MetricCard';
import { CustomersTableWithSearch } from '@/components/client/admin/CustomersTableWithSearch';
import { createClient } from "@/utils/supabase/server";

export default async function CustomersPage() {
  const supabase = await createClient();

  // Fetch all users and auth user in parallel
  const usersPromise = supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: false });

  const authPromise = supabase.auth.getUser();

  const [usersResponse, authResponse] = await Promise.all([usersPromise, authPromise]);
  const { data: users, error } = usersResponse;
  const adminUser = authResponse.data?.user;

  const totalUsers = users ? users.length : 0;

  // Active users - mock logic based on users length for now
  const activeUsers = users ? Math.floor(users.length * 0.7) : 0;

  // New (30d) - users created in last 30 days
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newUsers = users ? users.filter(u => new Date(u.created_at) > thirtyDaysAgo).length : 0;

  const retentionRate = "78%"; // Mock metric

  // Fetch admin name for export
  let adminName = "Admin";
  if (adminUser) {
    const { data: profileData } = await supabase
      .from('users')
      .select('first_name, last_name')
      .eq('id', adminUser.id)
      .maybeSingle();
    if (profileData) {
      adminName = `${profileData.first_name || ''} ${profileData.last_name || ''}`.trim() || 'Admin';
    }
  }

  return (
    <main className="pt-24 lg:pt-10 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
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
            title="Retention"
            value={retentionRate}
            subtitle="Avg retention"
            icon={MdOutlineTrendingUp}
          />
        </div>
      </CustomersTableWithSearch>
    </main>
  );
}
