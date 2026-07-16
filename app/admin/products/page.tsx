import React from 'react';
import Link from 'next/link';
import { MdInventory, MdAdd } from 'react-icons/md';
import { createClient } from '@/utils/supabase/server';
import { ProductsTableWithFilters } from '@/components/client/admin/ProductsTableWithFilters';

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const supabase = await createClient();
  
  // Fetch products with their associated category names
  const { data: products, error } = await supabase
    .from('products')
    .select(`
      *,
      category:category_id (name)
    `)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching products:', error);
  }

  const hasProducts = products && products.length > 0;

  return (
    <main className="pt-24 lg:pt-10 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      {/* Page Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-0 mb-6 border-b border-[#d6c3b3]/30 pb-6">
        <div>
          <h1 className="font-jost text-2xl lg:text-3xl text-[#2C3829] mb-2 font-bold">Products</h1>
          <p className="font-body-md lg:font-body-lg text-[#2C3829]/70">
            Manage your inventory, pricing, and product galleries.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full lg:w-auto">
          <Link href="/admin/products/add" className="w-full sm:w-auto block">
            <button className="w-full bg-[#2C3829] text-white px-6 py-3.5 rounded-full font-jost font-medium text-sm hover:opacity-90 active:scale-[0.97] transition-all flex items-center justify-center gap-2">
              Add Product
            </button>
          </Link>
        </div>
      </div>

      {hasProducts ? (
        <ProductsTableWithFilters initialProducts={products} />
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center pt-6 pb-10 md:py-10 text-center w-full">
          <div className="w-32 h-32 mb-6 flex items-center justify-center rounded-full bg-[#FAF7F2] border-2 border-dashed border-[#d6c3b3]">
            <MdInventory className="text-[#2C3829] text-6xl" />
          </div>
          <h3 className="font-jost text-3xl text-[#2C3829] mb-2 font-semibold">No products yet</h3>
          <p className="font-jost text-[#2C3829]/70 mb-8 max-w-sm">
            You haven't created any products. Add your first product to start building your storefront.
          </p>
        </div>
      )}
    </main>
  );
}
