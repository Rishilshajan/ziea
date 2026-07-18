"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { MdSearch, MdOutlineTimeline, MdOutlineChevronRight, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { createClient } from '@/utils/supabase/client';

export function ActivityClient() {
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("Last 30 Days");
  const [typeFilter, setTypeFilter] = useState("All Activity");
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const supabase = createClient();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('activity_logs')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching activity logs:", error);
        } else {
          setActivities(data || []);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivities();
  }, [supabase]);

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      // 1. Search filter
      const matchesSearch = (activity.description || '').toLowerCase().includes(searchTerm.toLowerCase());

      // 2. Time filter
      let matchesTime = true;
      if (timeFilter === "Last 30 Days") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        matchesTime = new Date(activity.created_at) >= thirtyDaysAgo;
      } else if (timeFilter === "Last 3 Months") {
        const date = new Date();
        date.setMonth(date.getMonth() - 3);
        matchesTime = new Date(activity.created_at) >= date;
      } else if (timeFilter === "Last 6 Months") {
        const date = new Date();
        date.setMonth(date.getMonth() - 6);
        matchesTime = new Date(activity.created_at) >= date;
      }

      // 3. Type filter
      let matchesType = true;
      if (typeFilter !== "All Activity") {
        matchesType = (activity.type || '').includes(typeFilter);
      }

      return matchesSearch && matchesTime && matchesType;
    });
  }, [activities, searchTerm, timeFilter, typeFilter]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, timeFilter, typeFilter]);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

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
    <>
      {/* Full-width Search and Filter Bar */}
      <div className="mt-6 mb-6 flex flex-col md:flex-row gap-4 w-full">
        {/* Search Bar */}
        <div className="w-full md:flex-1">
          <Input 
            leftElement={<MdSearch className="text-[#2C3829]/50 text-xl" />}
            placeholder="Search activity description..." 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Time Filter */}
        <div className="w-full md:w-48 z-20">
          <Select 
            label=""
            placeholder="Filter by time"
            value={timeFilter}
            onChange={setTimeFilter}
            options={[
              { value: 'None', label: 'None' },
              { value: 'Last 30 Days', label: 'Last 30 Days' },
              { value: 'Last 3 Months', label: 'Last 3 Months' },
              { value: 'Last 6 Months', label: 'Last 6 Months' },
              { value: 'All Time', label: 'All Time' },
            ]}
          />
        </div>

        {/* Type Filter */}
        <div className="w-full md:w-48 z-10">
          <Select 
            label=""
            placeholder="Filter by type"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'All Activity', label: 'All Activity' },
              { value: 'Customer', label: 'Customer Actions' },
              { value: 'Category', label: 'Category Actions' },
              { value: 'Product', label: 'Product Actions' },
            ]}
          />
        </div>
      </div>

      {/* Activity List Section */}
      <section className="mt-6 mb-10">
        <Card className="!rounded-xl !p-0 border border-[#d6c3b3]/30 overflow-hidden">
          
          {/* Mobile View: Cards */}
          <div className="md:hidden divide-y divide-[#d6c3b3]/30">
            {isLoading ? (
              <div className="p-12 text-center text-[#2C3829]/60 font-body-md">
                Loading activities...
              </div>
            ) : paginatedActivities.length > 0 ? (
              paginatedActivities.map((activity) => (
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
                  No activity logs found matching your filters.
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
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-16 text-[#2C3829]/60 font-body-md">
                      Loading activities...
                    </TableCell>
                  </TableRow>
                ) : paginatedActivities.length > 0 ? (
                  paginatedActivities.map((activity) => {
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
                          No activity logs found matching your filters.
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          <div className="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#d6c3b3]/30 bg-[#2C3829]/5">
            <span className="font-label-sm text-[#2C3829]/60 text-center sm:text-left">
              Showing {filteredActivities.length === 0 ? 0 : startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredActivities.length)} of {filteredActivities.length} activities
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
