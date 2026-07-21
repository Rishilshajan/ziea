import React from 'react';
import { createClient } from '@/utils/supabase/server';
import BrandingEditClient from '@/components/client/admin/BrandingEditClient';
import { notFound } from 'next/navigation';

export default async function BrandingEditPage({ params }: { params: Promise<{ id: string }> }) {
  const supabase = await createClient();
  const { id } = await params;
  
  const { data: section } = await supabase
    .from('branding_assets')
    .select('*')
    .eq('id', id)
    .single();

  if (!section) {
    notFound();
  }

  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      <BrandingEditClient section={section} />
    </main>
  );
}
