import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const authPages = ["/login", "/register"];

const protectedPages = ["/"];
const JWT_SECRET = process.env.JWT_SECRET || "";
export function proxy(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  let isValidToken = false;

  if (token) {
    try {
      jwt.verify(token, JWT_SECRET);
      isValidToken = true;
    } catch (err) {
      isValidToken = false;
    }
  }

  if (isValidToken && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isValidToken && protectedPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register"],
};
