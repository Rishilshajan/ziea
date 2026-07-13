import React from 'react';
import AdminNavigation from '@/components/client/admin/AdminNavigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#F5F0E8] font-body-md text-body-md overflow-x-hidden pb-0 lg:pl-72 min-h-screen">
      <AdminNavigation />
      
      {/* Main Content Canvas */}
      {children}
    </div>
  );
}
