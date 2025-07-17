import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("access_token")?.value;

  // Redirect authenticated users away from /login to /admin/blog
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin/blog", request.url));
  }

  // Redirect /admin to /admin/page
  if (pathname === "/admin") {
    return NextResponse.redirect(new URL("/admin/blog", request.url));
  }

  // Protect /admin routes if not authenticated
  if (pathname.startsWith("/admin") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/login"],
};
