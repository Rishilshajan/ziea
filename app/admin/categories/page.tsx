import React from 'react';
import { createClient } from '@/utils/supabase/server';
import CategoriesClient from '@/components/client/admin/CategoriesClient';

export default async function CategoriesPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });

  const initialCategories = categories || [];

  return (
    <main className="pt-24 lg:pt-10 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      <CategoriesClient initialCategories={initialCategories} />
    </main>
  );
}
