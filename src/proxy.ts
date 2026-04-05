import type { NextRequest } from 'next/server';
import { updateSession } from './utils/supabase/middleware';

export async function proxy(request: NextRequest) {
  // Update Supabase session and handle role-based auth redirects.
  const response = await updateSession(request);

  // Preserve the custom region edge headers.
  response.headers.set('x-user-region', 'IN'); // Mocking region as 'IN' for India
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}

// Config specifies which paths the proxy runs on.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
