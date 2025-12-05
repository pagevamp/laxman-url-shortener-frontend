import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken");

  if (!token) {
    return NextResponse.json(
      { loggedIn: false, message: "No token found" },
      { status: 401 }
    );
  }
  return NextResponse.json({ loggedIn: true, token }, { status: 200 });
}
