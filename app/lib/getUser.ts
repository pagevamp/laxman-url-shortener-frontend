import { cookies } from "next/headers";

export async function getUser() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  if (!token) return null;

  return token;
}
