import React from 'react';
import { createClient } from '@/utils/supabase/server';
import BrandingClient from '@/components/client/admin/BrandingClient';
import { BRANDING_SCHEMA } from '@/utils/branding';

export default async function BrandingPage() {
  const supabase = await createClient();
  const { data: sections } = await supabase
    .from('branding_assets')
    .select('*')
    .order('created_at', { ascending: true });

  // Only surface sections that have an editor schema (excludes e.g. Contact Us).
  const initialSections = (sections || []).filter(
    (s: { section_name: string }) => BRANDING_SCHEMA[s.section_name],
  );

  return (
    <main className="pt-[88px] lg:pt-6 px-6 lg:px-10 max-w-7xl mx-auto pb-6 lg:pb-10 min-h-screen">
      <BrandingClient initialSections={initialSections} />
    </main>
  );
}
