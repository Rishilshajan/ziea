import React from 'react';
import Link from 'next/link';
import { MdArrowBack } from 'react-icons/md';
import { createClient } from '@/utils/supabase/server';
import AddProductForm from '@/components/client/admin/AddProductForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();

  // Categories (dropdown) and the product being edited are independent — fetch
  // them concurrently instead of waterfalling one after the other.
  const [
    { data: categories, error: catError },
    { data: product, error: prodError },
  ] = await Promise.all([
    supabase.from('categories').select('*').order('name'),
    supabase.from('products').select('*').eq('id', params.id).single(),
  ]);

  if (catError) {
    console.error('Error fetching categories:', catError);
  }

  if (prodError || !product) {
    console.error('Error fetching product:', prodError);
    notFound(); // Redirects to 404
  }

  return (
    <main className="min-h-screen pt-[88px] lg:pt-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-4">
        <Link
          href="/admin/products"
          aria-label="Back to products"
          className="w-10 h-10 shrink-0 flex items-center justify-center bg-white shadow-sm border border-[#d6c3b3]/30 hover:bg-[#FAF7F2] rounded-full transition-all active:scale-95"
        >
          <MdArrowBack className="text-xl text-[#2C3829]" />
        </Link>
        <div>
          <h1 className="font-jost text-2xl lg:text-3xl text-[#2C3829] mb-1 font-bold">Edit Product</h1>
          <p className="font-body-md text-[#2C3829]/70 max-w-2xl">
            Update your product's gallery, pricing, and description.
          </p>
        </div>
      </div>

      <AddProductForm categories={categories || []} initialData={product} />
    </main>
  );
}
