import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Handle auth routes
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin/blog", request.url));
  }

  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/blog", request.url));
  }

  if (pathname.startsWith("/admin") && !token) {
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
