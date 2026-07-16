import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Use getSession instead of getUser in middleware to prevent network timeouts.
  // getSession decodes the JWT locally, making it infinitely faster and avoiding 
  // the 'fetch failed' Edge Runtime crash you are experiencing.
  const { data: { session } } = await supabase.auth.getSession();

  const isProtectedAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isProtectedAdminRoute) {
    if (!session) {
      // Not logged in -> redirect to login
      return NextResponse.redirect(new URL('/login?next=/admin', request.url));
    }
    // Note: Role check is deferred to layout.tsx to reduce middleware latency.
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
