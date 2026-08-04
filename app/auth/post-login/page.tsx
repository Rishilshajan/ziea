import { redirect } from 'next/navigation';
import { after } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { getAdminClaims, getAdminProfile } from '@/utils/admin/session';

// Reads the role from the authoritative server-side session (cookie is set by
// the time the client navigates here), so the post-login redirect can never
// race the client's RLS-gated role query.
export const dynamic = 'force-dynamic';

export default async function PostLoginPage() {
  // Only the role gates the redirect. With the JWT role claim this is a local
  // read (no DB round-trip), so the redirect is immediate.
  const claims = await getAdminClaims();

  // No valid session (e.g. navigated here directly) -> back to login.
  if (!claims) {
    redirect('/login');
  }

  // Login bookkeeping (last_login + activity log) runs AFTER the response is
  // sent, so it never delays the redirect. `after` uses waitUntil on serverless
  // so the writes still complete reliably.
  after(async () => {
    const profile = await getAdminProfile();
    if (!profile) return;
    const roleLabel = profile.role === 'Admin' ? 'Admin' : 'Customer';
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
  });

  redirect(claims.role === 'Admin' ? '/admin' : '/');
}
