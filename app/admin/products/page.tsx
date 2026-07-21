import React from 'react';
import Link from 'next/link';
import { MdInventory, MdAdd, MdOutlineShoppingBag, MdErrorOutline, MdOutlineStarBorder, MdOutlineWhatshot } from 'react-icons/md';
import { createClient } from '@/utils/supabase/server';
import { ProductsTableWithFilters } from '@/components/client/admin/ProductsTableWithFilters';
import { MetricCard } from '@/components/ui/MetricCard';

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

  // --- Calculate Metrics ---
  const totalProducts = products ? products.length : 0;
  const publishedProducts = products ? products.filter(p => p.status === 'published').length : 0;
  const draftProducts = totalProducts - publishedProducts;

  // 2. Low/Out of Stock (summing quantities from the JSONB sizes array)
  let lowStockCount = 0;
  if (products) {
    products.forEach(p => {
      let totalStock = 0;
      if (Array.isArray(p.sizes)) {
        totalStock = p.sizes.reduce((sum: number, sizeObj: any) => sum + (Number(sizeObj.quantity) || 0), 0);
      }
      // If total stock is less than 5, consider it low/out of stock
      if (totalStock < 5) {
        lowStockCount++;
      }
    });
  }

  // 5. New Additions (30d)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const newProducts = products ? products.filter(p => new Date(p.created_at) > thirtyDaysAgo).length : 0;

  // 6. Top Sellers (Mocked)
  const topSellersCount = "124"; // Mock metric

  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      {/* Page Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-0 mb-6 border-b border-[#d6c3b3]/30 pb-6">
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

      {/* Stats Overview (Bento Style) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <MetricCard
          title="Total Products"
          value={totalProducts.toLocaleString()}
          subtitle={`${publishedProducts} Published • ${draftProducts} Draft`}
          icon={MdOutlineShoppingBag}
        />
        <MetricCard
          title="Low Stock Alerts"
          value={lowStockCount.toLocaleString()}
          subtitle="Items with < 5 stock"
          icon={MdErrorOutline}
        />
        <MetricCard
          title="New Additions"
          value={newProducts.toLocaleString()}
          subtitle="Added in past 30 days"
          icon={MdOutlineStarBorder}
        />
        <MetricCard
          title="Top Sellers"
          value={topSellersCount}
          subtitle="Items sold this week"
          icon={MdOutlineWhatshot}
        />
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
