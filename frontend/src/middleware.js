// src/middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  // Only protect the /admin and data-modifying API routes
  if (req.nextUrl.pathname.startsWith('/admin') || 
     (req.nextUrl.pathname.startsWith('/api') && req.method !== 'GET')) {
    
    const basicAuth = req.headers.get('authorization');
    const url = req.nextUrl;

    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Replace these with environment variables in production!
      // e.g., process.env.ADMIN_USER and process.env.ADMIN_PASSWORD
      if (user === 'admin' && pwd === 'caledon2026') {
        return NextResponse.next();
      }
    }
    
    url.pathname = '/api/auth';
    return new NextResponse('Auth required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Secure Area"' },
    });
  }
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*'],
};