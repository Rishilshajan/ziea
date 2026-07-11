import React from 'react';
import { MdOutlineShoppingBag, MdOutlineInventory2, MdOutlineGroup } from "react-icons/md";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#fff8f5] text-[#211a15] font-jost flex flex-col items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-2xl w-full text-center">
        <h1 className="font-cormorant text-4xl text-primary-dark italic mb-4">Admin Dashboard</h1>
        <p className="text-on-surface-variant mb-8 text-lg">Welcome back, Admin. Here you can manage your store, view orders, and manage users.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer">
            <MdOutlineShoppingBag className="text-3xl text-primary mb-2" />
            <h3 className="font-medium text-lg">Orders</h3>
            <p className="text-sm text-on-surface-variant">View all incoming orders</p>
          </div>
          <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer">
            <MdOutlineInventory2 className="text-3xl text-primary mb-2" />
            <h3 className="font-medium text-lg">Products</h3>
            <p className="text-sm text-on-surface-variant">Manage your inventory</p>
          </div>
          <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer">
            <MdOutlineGroup className="text-3xl text-primary mb-2" />
            <h3 className="font-medium text-lg">Customers</h3>
            <p className="text-sm text-on-surface-variant">Manage user accounts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
