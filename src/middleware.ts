import { NextRequest, NextResponse } from "next/server";

function isValidJWT(token: string): boolean {
  try {
    // Simple JWT validation without external libraries
    // Split the token into parts
    const parts = token.split('.');
    if (parts.length !== 3) return false;

    // Decode the payload (second part)
    const payload = JSON.parse(atob(parts[1]));
    
    // Check if token is expired
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return false;
    }

    // Check if token has required fields
    if (!payload.userId || !payload.email) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Validate token for admin routes
  const isValidToken = token ? isValidJWT(token) : false;

  // Handle auth routes
  if (pathname === "/login" && isValidToken) {
    return NextResponse.redirect(new URL("/admin/blog", request.url));
  }

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/blog", request.url));
  }

  if (pathname.startsWith("/admin") && !isValidToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Set locale cookie if not present
  const response = NextResponse.next();
  const existingLocale = request.cookies.get("MYNEXTAPP_LOCALE");
  
  if (!existingLocale) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLocale = acceptLanguage.split(',')[0]?.split('-')[0] || 'am';
    const supportedLocales = ['en', 'am', 'ru'];
    const locale = supportedLocales.includes(preferredLocale) ? preferredLocale : 'am';
    
    response.cookies.set('MYNEXTAPP_LOCALE', locale, {
      path: '/',
      maxAge: 31536000,
      sameSite: 'lax'
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next|_vercel|.*\\..*).*)']
};
