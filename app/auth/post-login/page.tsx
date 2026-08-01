import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { getAdminProfile } from '@/utils/admin/session';

// Reads the role from the authoritative server-side session (cookie is set by
// the time the client navigates here), so the post-login redirect can never
// race the client's RLS-gated role query.
export const dynamic = 'force-dynamic';

export default async function PostLoginPage() {
  const profile = await getAdminProfile();

  // No valid session (e.g. navigated here directly) -> back to login.
  if (!profile) {
    redirect('/login');
  }

  const roleLabel = profile.role === 'Admin' ? 'Admin' : 'Customer';

  // Login bookkeeping, server-side and reliable (was a racy client write before).
  const supabase = await createClient();
  await supabase
    .from('users')
    .update({ last_login_at: new Date().toISOString() })
    .eq('id', profile.userId);
  await supabase.from('activity_logs').insert({
    user_id: profile.userId,
    type: `${roleLabel} Login`,
    description:
      `${roleLabel} ${profile.firstName || ''} ${profile.lastName || ''}`.trim() +
      ' logged in',
  });

  redirect(profile.role === 'Admin' ? '/admin' : '/');
}
