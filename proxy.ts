import { NextRequest, NextResponse } from "next/server";

const authPages = ["/login", "/register"];

const protectedPages = ["/"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken");
  const { pathname } = req.nextUrl;

  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!token && protectedPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
