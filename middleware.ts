import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const path = url.pathname || "/";

  // Allow root and common paths
  if (
    path === "/" ||
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.startsWith("/images") ||
    path.startsWith("/static") ||
    path === "/favicon.ico" ||
    path === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  // Redirect estimator and other routes to official site
  if (path.startsWith("/estimator ")) {
    return NextResponse.redirect("https://paintpower.net");
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*",
};
