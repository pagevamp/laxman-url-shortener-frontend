import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "cookie";
import { getAxiosErrorMessage } from "@/app/lib/helpers/axios.error";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  try {
    const backendRes = await axios.post(
      `${process.env.BASE_URL}/auth/login`,
      req.body
    );
    const { access_token } = backendRes.data;

    if (!access_token)
      return res.status(401).json({ message: "Invalid credentials" });

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("accessToken", access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      })
    );

    return res.status(200).json({ loggedIn: true });
  } catch (err: unknown) {
    const error = getAxiosErrorMessage(err);
    return res.status(500).json({ message: error });
  }
}
