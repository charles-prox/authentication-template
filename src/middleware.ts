import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const authenticated: any = await isAuthenticated();

  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// middleware only runs in the routes declared in matcher
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
