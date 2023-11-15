import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./lib/api";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  const user = await api.GET("auth", "api/user", token);

  if (user.status !== 401) {
    return NextResponse.rewrite(new URL("/", request.nextUrl));
  } else {
    return request.url.includes("login") || request.url.includes("register")
      ? NextResponse.next()
      : NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/login", "/register"],
};
