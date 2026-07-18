import React from 'react';
import Link from 'next/link';
import { MdArrowBack, MdMoreVert } from 'react-icons/md';
import AddProductForm from '@/components/client/admin/AddProductForm';
import { createClient } from '@/utils/supabase/server';

export default async function AddProductPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true });

  const initialCategories = categories || [];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      {/* TopAppBar Navigation Shell (Admin Context) */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:pl-76 md:pr-8 h-16 bg-surface/80 backdrop-blur-md lg:hidden">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all active:scale-95"
          >
            <MdArrowBack className="text-xl text-on-surface-variant" />
          </Link>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-primary tracking-tight">Add Product</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center hover:bg-surface-container-high rounded-full transition-all">
            <MdMoreVert className="text-xl text-on-surface-variant" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">

        {/* Desktop Header Variant */}
        <div className="hidden lg:flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0 mb-6 border-b border-[#d6c3b3]/30 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/products"
              className="w-10 h-10 flex items-center justify-center bg-white shadow-sm border border-[#d6c3b3]/30 hover:bg-[#FAF7F2] rounded-full transition-all active:scale-95"
            >
              <MdArrowBack className="text-xl text-[#2C3829]" />
            </Link>
            <div>
              <h1 className="font-jost text-2xl lg:text-3xl text-[#2C3829] mb-1 font-bold">Add Product</h1>
              <p className="font-body-md lg:font-body-lg text-[#2C3829]/70">
                Create a new product listing in your catalog.
              </p>
            </div>
          </div>
        </div>

        <AddProductForm categories={initialCategories} />
      </main>
    </div>
  );
}
