import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const supabase = await createClient();
    
    // Exchange the code for a session securely on the server
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data?.session?.user) {
      // Check user role
      const { data: userData } = await supabase
        .from('users')
        .select('first_name, last_name, role')
        .eq('id', data.session.user.id)
        .maybeSingle();

      let finalRedirect = next;

      if (userData) {
        // Update last login
        await supabase.from('users').update({ last_login_at: new Date().toISOString() }).eq('id', data.session.user.id);
        
        // Log activity
        await supabase.from('activity_logs').insert({
          user_id: data.session.user.id,
          type: 'Customer Login',
          description: `Customer ${userData.first_name || ''} ${userData.last_name || ''}`.trim() + ' logged in'
        });
        
        finalRedirect = (userData.role === 'Admin') ? '/admin' : next;
      } else {
        // User document doesn't exist (new Google auth user), so create it
        const fullName = data.session.user.user_metadata?.full_name || data.session.user.user_metadata?.name || '';
        const nameParts = fullName.trim().split(' ');
        const firstName = nameParts[0] || 'User';
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
        
        await supabase.from('users').insert({
          id: data.session.user.id,
          first_name: firstName,
          last_name: lastName,
          email: data.session.user.email,
          role: 'Customer',
        });
        
        finalRedirect = next;
      }

      // Successfully authenticated, redirect to the intended page cleanly without the code in the URL
      return NextResponse.redirect(`${origin}${finalRedirect}`);
    }
  }

  // If there's an error (like an expired code), send them back to login
  return NextResponse.redirect(`${origin}/login?error=InvalidAuthCode`);
}
