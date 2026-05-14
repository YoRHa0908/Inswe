import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "inswe-fallback-secret-change-in-production"
);

// Routes that require authentication
const PROTECTED = ["/account", "/account/addresses"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only run on protected routes
  const isProtected = PROTECTED.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );
  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("inswe_session")?.value;

  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch {
    // Token invalid or expired — clear cookies and redirect
    const loginUrl = new URL("/auth/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    const res = NextResponse.redirect(loginUrl);
    res.cookies.set("inswe_session", "", { maxAge: 0, path: "/" });
    res.cookies.set("inswe_user", "", { maxAge: 0, path: "/" });
    return res;
  }
}

export const config = {
  matcher: ["/account", "/account/:path*"],
};
