import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';

// Get JWT_SECRET from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  // Check if the request is for the Admin route
  if (request.nextUrl.pathname.startsWith('/Admin')) {
    try {
      // Get the token from cookies
      const token = request.cookies.get('admin_token')?.value;

      // If there's no token and we're not on the login page, redirect to login
      if (!token && request.nextUrl.pathname !== '/Admin') {
        console.log('No token found, redirecting to login');
        return NextResponse.redirect(new URL('/Admin', request.url));
      }

      // If we have a token, verify it
      if (token) {
        try {
          verify(token, JWT_SECRET);
          // If we're on the login page and have a valid token, redirect to admin panel
          if (request.nextUrl.pathname === '/Admin') {
            return NextResponse.redirect(new URL('/Admin/dashboard', request.url));
          }
          // Token is valid, proceed with the request
          return NextResponse.next();
        } catch (error) {
          console.log('Token verification failed:', error.message);
          // Token is invalid or expired, clear it and redirect to login
          const response = NextResponse.redirect(new URL('/Admin', request.url));
          response.cookies.delete('admin_token');
          return response;
        }
      }

      // If we're on the login page and have no token, allow access
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/Admin', request.url));
    }
  }

  // For non-Admin routes, proceed normally
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/Admin',
    '/Admin/:path*'
  ]
}; 