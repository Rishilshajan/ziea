import React from 'react';
import { createClient } from '@/utils/supabase/server';
import AddProductForm from '@/components/client/admin/AddProductForm';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EditProductPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const supabase = await createClient();
  
  // 1. Fetch Categories for the dropdown
  const { data: categories, error: catError } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  if (catError) {
    console.error('Error fetching categories:', catError);
  }

  // 2. Fetch the specific product by ID
  const { data: product, error: prodError } = await supabase
    .from('products')
    .select('*')
    .eq('id', params.id)
    .single();

  if (prodError || !product) {
    console.error('Error fetching product:', prodError);
    notFound(); // Redirects to 404
  }

  return (
    <main className="min-h-screen pt-[88px] lg:pt-6 pb-20 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-jost text-2xl lg:text-3xl text-[#2C3829] mb-2 font-bold">Edit Product</h1>
        <p className="font-body-md text-[#2C3829]/70 max-w-2xl">
          Update your product's gallery, pricing, and description.
        </p>
      </div>

      <AddProductForm categories={categories || []} initialData={product} />
    </main>
  );
}
