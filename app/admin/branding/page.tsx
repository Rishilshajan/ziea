import React from 'react';
import { createClient } from '@/utils/supabase/server';
import BrandingClient from '@/components/client/admin/BrandingClient';

export default async function BrandingPage() {
  const supabase = await createClient();
  const { data: sections } = await supabase
    .from('branding_assets')
    .select('*')
    .order('created_at', { ascending: true });

  const initialSections = sections || [];

  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      <BrandingClient initialSections={initialSections} />
    </main>
  );
}
