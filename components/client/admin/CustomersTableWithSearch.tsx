"use client";

import React, { useState } from 'react';
import { MdSearch, MdMoreHoriz, MdChevronLeft, MdChevronRight, MdOutlineGroup, MdOutlinePersonOutline, MdOutlineStarBorder, MdOutlineTrendingUp } from 'react-icons/md';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { ExportUsersButton } from '@/components/client/admin/ExportUsersButton';

interface CustomersTableWithSearchProps {
  initialUsers: any[];
  adminName: string;
  children?: React.ReactNode;
}

export function CustomersTableWithSearch({ initialUsers, adminName, children }: CustomersTableWithSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = initialUsers.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    const fullName = `${user.first_name || ''} ${user.last_name || ''}`.toLowerCase();
    const email = (user.email || '').toLowerCase();
    
    return fullName.includes(searchLower) || email.includes(searchLower);
  });

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6 lg:mb-10 w-full">
        <h1 className="font-jost font-semibold text-2xl lg:text-3xl text-[#2C3829]">Customers</h1>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="w-full md:w-80 group">
            <Input 
              leftElement={<MdSearch className="text-[#2C3829]/50 text-xl" />}
              placeholder="Search customers..." 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Export Buttons */}
          <ExportUsersButton users={filteredUsers} adminName={adminName} />
        </div>
      </div>

      {children}

      {/* Customer List Section */}
      <section className="mt-6 lg:mt-10">
        <Card className="!rounded-xl !p-0 border border-[#d6c3b3]/30 overflow-hidden">
          
          {/* Mobile View: Cards */}
          <div className="md:hidden divide-y divide-[#d6c3b3]/30">
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => {
                const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'U';
                const avatarColor = user.role === 'admin' ? 'bg-[#7A9268] text-white' : 'bg-[#d6c3b3]/30 text-[#2C3829]';
                
                return (
                  <div key={user.id} className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-jost font-medium text-sm ${avatarColor}`}>
                          {initials}
                        </div>
                        <span className="font-medium text-[#2C3829] font-body-md truncate max-w-[150px]">
                          {user.first_name} {user.last_name}
                        </span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-[#2C3829]/10 text-[#2C3829] text-[10px] font-bold uppercase tracking-wider whitespace-nowrap">
                        {user.role || 'User'}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2 mt-2 bg-white/50 p-3 rounded-lg border border-[#d6c3b3]/30">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#2C3829]/50 font-label-sm uppercase tracking-wider text-xs">Email</span>
                        <span className="text-[#2C3829]/80 font-body-sm truncate max-w-[180px]">{user.email}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-[#2C3829]/50 font-label-sm uppercase tracking-wider text-xs">Phone</span>
                        <span className="text-[#2C3829]/80 font-body-sm">{user.phone || '-'}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-8 text-center text-[#2C3829]/60 font-body-md">
                No customers found.
              </div>
            )}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length > 0 ? (
                  paginatedUsers.map((user) => {
                    const initials = `${user.first_name?.[0] || ''}${user.last_name?.[0] || ''}`.toUpperCase() || 'U';
                    const avatarColor = user.role === 'admin' ? 'bg-[#7A9268] text-white' : 'bg-[#d6c3b3]/30 text-[#2C3829]';
                    
                    return (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-jost font-medium text-sm transition-transform group-hover:scale-105 ${avatarColor}`}>
                              {initials}
                            </div>
                            <span className="font-medium text-[#2C3829] font-body-md">
                              {user.first_name} {user.last_name}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-[#2C3829]/70 font-body-md">{user.email}</TableCell>
                        <TableCell className="text-[#2C3829]/70 font-body-md">{user.phone || '-'}</TableCell>
                        <TableCell>
                          <span className="px-3 py-1 rounded-full bg-[#2C3829]/10 text-[#2C3829] text-xs font-bold uppercase tracking-wider">
                            {user.role || 'User'}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-[#2C3829]/60 font-body-md py-10">
                      No customers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#d6c3b3]/30 bg-[#2C3829]/5">
            <span className="font-label-sm text-[#2C3829]/60 text-center sm:text-left">
              Showing {filteredUsers.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} customers
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-[#d6c3b3]/50 text-[#2C3829] hover:bg-[#d6c3b3]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MdChevronLeft className="text-xl" />
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg border border-[#d6c3b3]/50 text-[#2C3829] hover:bg-[#d6c3b3]/30 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <MdChevronRight className="text-xl" />
              </button>
            </div>
          </div>
        </Card>
      </section>
    </>
  );
}
