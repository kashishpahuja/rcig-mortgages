// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const path = req.nextUrl.pathname;

  // 1. Always allow access to the login page and the login API route
  if (path === '/admin/login' || path === '/api/auth/login') {
    return NextResponse.next();
  }

  // 2. Identify protected routes
  const isAdminRoute = path.startsWith('/admin');
  const isMutatingApi = path.startsWith('/api') && req.method !== 'GET';

  // 3. Check for the authentication cookie
  if (isAdminRoute || isMutatingApi) {
    const session = req.cookies.get('admin_session');

    // If not authenticated...
    if (!session || session.value !== 'authenticated') {
      
      // ...and they are trying to modify data via API, block it with JSON
      if (isMutatingApi) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
      
      // ...and they are trying to view an admin page, redirect to custom login page
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};