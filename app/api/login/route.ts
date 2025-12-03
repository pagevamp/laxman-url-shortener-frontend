import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAxiosErrorMessage } from "@/app/lib/helpers/axios.error";

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
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });

    return NextResponse.json({ loggedIn: true });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        {
          message: error.response?.data?.message || "Axios request failed",
        },
        {
          status: error.response?.data?.statusCode || 500,
        }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
