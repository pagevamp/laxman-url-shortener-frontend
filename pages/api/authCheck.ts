import type { NextApiRequest, NextApiResponse } from "next";
import cookie from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cookies = req.headers.cookie ? cookie.parse(req.headers.cookie) : {};
  const token = cookies.accessToken;

  if (!token) {
    return res.status(401).json({ loggedIn: false, message: "No token found" });
  }
  return res.status(200).json({ loggedIn: true, token });
}
