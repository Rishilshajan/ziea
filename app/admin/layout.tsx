import React from 'react';
import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import AdminNavigation from '@/components/client/admin/AdminNavigation';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?next=/admin');
  }

  // Check role
  const { data: userData } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  if (!userData || userData.role !== 'Admin') {
    redirect('/');
  }

  return (
    <div className="bg-[#F5F0E8] font-body-md text-body-md overflow-x-hidden pb-0 lg:pl-72 min-h-screen">
      <AdminNavigation />
      
      {/* Main Content Canvas */}
      {children}
    </div>
  );
}
