import React from 'react';
import { MdSearch, MdMoreHoriz, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Card } from '@/components/ui/Card';

export default function CustomersPage() {
  return (
    <main className="pt-24 pb-32 md:pl-8 lg:pl-12 pr-4 md:pr-12 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <h1 className="font-cormorant text-4xl md:text-5xl text-primary font-bold italic">Customers</h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96 group">
          <MdSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-outline text-xl" />
          <input 
            className="w-full h-12 pl-12 pr-4 bg-white border border-[#e1e6db] rounded-xl focus:border-primary focus:ring-1 focus:ring-primary transition-colors placeholder:text-[#8c8e89] font-body-md shadow-sm" 
            placeholder="Search customers..." 
            type="text" 
          />
        </div>
      </section>

      {/* Stats Overview (Bento Style) */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <Card className="p-6 !bg-white border border-[#e1e6db]/30 shadow-[0px_2px_16px_rgba(44,56,41,0.08)]">
          <p className="text-label-sm text-[#8c8e89] uppercase tracking-widest mb-2 font-medium">Total</p>
          <h3 className="text-3xl font-headline-md text-primary">1,284</h3>
        </Card>
        <Card className="p-6 !bg-white border border-[#e1e6db]/30 shadow-[0px_2px_16px_rgba(44,56,41,0.08)]">
          <p className="text-label-sm text-[#8c8e89] uppercase tracking-widest mb-2 font-medium">Active</p>
          <h3 className="text-3xl font-headline-md text-primary">892</h3>
        </Card>
        <Card className="p-6 !bg-white border border-[#e1e6db]/30 shadow-[0px_2px_16px_rgba(44,56,41,0.08)]">
          <p className="text-label-sm text-[#8c8e89] uppercase tracking-widest mb-2 font-medium">New (30d)</p>
          <h3 className="text-3xl font-headline-md text-secondary">42</h3>
        </Card>
        <Card className="p-6 !bg-white border border-[#e1e6db]/30 shadow-[0px_2px_16px_rgba(44,56,41,0.08)]">
          <p className="text-label-sm text-[#8c8e89] uppercase tracking-widest mb-2 font-medium">Retention</p>
          <h3 className="text-3xl font-headline-md text-primary">78%</h3>
        </Card>
      </section>

      {/* Customer List Section */}
      <section className="bg-white rounded-3xl shadow-[0px_2px_16px_rgba(44,56,41,0.08)] overflow-hidden border border-[#e1e6db]/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#f3e6dc]/30 border-b border-[#e1e6db]">
              <tr>
                <th className="px-6 py-4 font-label-md text-primary opacity-70">Customer</th>
                <th className="px-6 py-4 font-label-md text-primary opacity-70">Email</th>
                <th className="px-6 py-4 font-label-md text-primary opacity-70">Status</th>
                <th className="px-6 py-4 font-label-md text-primary opacity-70">Orders</th>
                <th className="px-6 py-4 font-label-md text-primary opacity-70 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e1e6db]/50">
              {/* Row 1 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#e1e6db] flex items-center justify-center text-primary font-medium text-lg transition-transform group-hover:scale-105">
                      AN
                    </div>
                    <span className="font-medium text-on-surface text-lg">Amara Nair</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#8c8e89] font-body-md">amara.nair@example.com</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider">Active</span>
                </td>
                <td className="px-6 py-5 text-on-surface">12</td>
                <td className="px-6 py-5 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                    <MdMoreHoriz className="text-xl" />
                  </button>
                </td>
              </tr>
              {/* Row 2 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#e1e6db] flex items-center justify-center text-primary font-medium text-lg transition-transform group-hover:scale-105">
                      RM
                    </div>
                    <span className="font-medium text-on-surface text-lg">Rohan Menon</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#8c8e89] font-body-md">rohan.m@keralamail.com</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider">New</span>
                </td>
                <td className="px-6 py-5 text-on-surface">1</td>
                <td className="px-6 py-5 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                    <MdMoreHoriz className="text-xl" />
                  </button>
                </td>
              </tr>
              {/* Row 3 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#e1e6db] flex items-center justify-center text-primary font-medium text-lg transition-transform group-hover:scale-105">
                      LD
                    </div>
                    <span className="font-medium text-on-surface text-lg">Lakshmi Devi</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#8c8e89] font-body-md">lakshmi.devi@fiber.in</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider">Active</span>
                </td>
                <td className="px-6 py-5 text-on-surface">8</td>
                <td className="px-6 py-5 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                    <MdMoreHoriz className="text-xl" />
                  </button>
                </td>
              </tr>
              {/* Row 4 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#e1e6db] flex items-center justify-center text-primary font-medium text-lg transition-transform group-hover:scale-105">
                      KP
                    </div>
                    <span className="font-medium text-on-surface text-lg">Kiran Pillai</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#8c8e89] font-body-md">kp@naturalcomfort.com</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wider">Active</span>
                </td>
                <td className="px-6 py-5 text-on-surface">24</td>
                <td className="px-6 py-5 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                    <MdMoreHoriz className="text-xl" />
                  </button>
                </td>
              </tr>
              {/* Row 5 */}
              <tr className="hover:bg-surface-container-low transition-colors group cursor-pointer">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#e1e6db] flex items-center justify-center text-primary font-medium text-lg transition-transform group-hover:scale-105">
                      JS
                    </div>
                    <span className="font-medium text-on-surface text-lg">Janaki S.</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-[#8c8e89] font-body-md">janaki.s@lifestyle.com</td>
                <td className="px-6 py-5">
                  <span className="px-3 py-1 rounded-full bg-secondary/15 text-secondary text-xs font-bold uppercase tracking-wider">New</span>
                </td>
                <td className="px-6 py-5 text-on-surface">0</td>
                <td className="px-6 py-5 text-right">
                  <button className="text-outline hover:text-primary transition-colors p-2 rounded-full hover:bg-primary/5">
                    <MdMoreHoriz className="text-xl" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-6 py-4 flex items-center justify-between border-t border-[#e1e6db] bg-[#f3e6dc]/10">
          <span className="text-label-sm text-[#8c8e89]">Showing 5 of 1,284 customers</span>
          <div className="flex gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e1e6db] text-primary hover:bg-[#e1e6db] transition-all">
              <MdChevronLeft className="text-xl" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#e1e6db] text-primary hover:bg-[#e1e6db] transition-all">
              <MdChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
