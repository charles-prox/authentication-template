import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "./lib/auth";

export async function middleware(request: NextRequest) {
  const token: any = request.cookies.getAll();
  console.log("token: " + JSON.stringify(token));
  console.log("request.url: " + JSON.stringify(request.url));

  const authenticated: any = await isAuthenticated();
  // const authenticated: any = false;

  if (!authenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// middleware only runs in the routes declared in matcher
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
