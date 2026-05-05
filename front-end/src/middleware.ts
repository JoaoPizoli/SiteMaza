import { NextResponse, type NextRequest } from "next/server";

const ADMIN_TOKEN_COOKIE = "maza_admin_token";

function withAdminHeader(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-layout-variant", "admin");
  return NextResponse.next({ request: { headers } });
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(ADMIN_TOKEN_COOKIE)?.value;

  if (pathname === "/admin" || pathname === "/admin/") {
    return NextResponse.redirect(
      new URL(token ? "/admin/representantes" : "/admin/login", request.url),
    );
  }

  if (pathname === "/admin/login") {
    if (token) {
      return NextResponse.redirect(
        new URL("/admin/representantes", request.url),
      );
    }
    return withAdminHeader(request);
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return withAdminHeader(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
