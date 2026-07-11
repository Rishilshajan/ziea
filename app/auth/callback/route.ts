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
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Successfully authenticated, redirect to the intended page cleanly without the code in the URL
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // If there's an error (like an expired code), send them back to login
  return NextResponse.redirect(`${origin}/login?error=InvalidAuthCode`);
}
