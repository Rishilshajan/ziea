import { redirect } from 'next/navigation';
import { getAdminClaims } from '@/utils/admin/session';

// Reads the role from the authoritative server-side session (cookie is set by
// the time the client navigates here), so the post-login redirect can never
// race the client's RLS-gated role query.
export const dynamic = 'force-dynamic';

export default async function PostLoginPage() {
  // Only the role gates the redirect. With the JWT role claim this is a local
  // read (no DB round-trip), so the redirect is immediate.
  //
  // Login bookkeeping (activity log + last_login) is written client-side in
  // AuthForm the moment sign-in succeeds, so it's reliably captured regardless
  // of this redirect. This page is purely the role-based landing router.
  const claims = await getAdminClaims();

  // No valid session (e.g. navigated here directly) -> back to login.
  if (!claims) {
    redirect('/login');
  }

  redirect(claims.role === 'Admin' ? '/admin' : '/');
}
