import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  let token = request.cookies.get("apiToken");
  if (token && request.nextUrl.pathname === "/auth") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  if (!token && request.nextUrl.pathname === "/recent") {
    return NextResponse.redirect(new URL("/auth", request.url));
  }
}
