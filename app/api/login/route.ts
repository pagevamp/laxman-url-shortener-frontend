import axios from "axios";
import { getAxiosErrorMessage } from "@/app/lib/helpers/axios.error";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const cookieStore = await cookies();
    const backendRes = await axios.post(
      `${process.env.BASE_URL}/auth/login`,
      data
    );

    const { access_token } = backendRes.data;

    if (!access_token)
      return NextResponse.json({ message: "Invalid Credentials" });

    cookieStore.set("accessToken", access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ loggedIn: true });
  } catch (err: unknown) {
    const error = getAxiosErrorMessage(err);
    return NextResponse.json({ error });
  }
}
