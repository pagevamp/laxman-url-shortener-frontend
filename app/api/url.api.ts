import { getAxiosErrorMessage } from "../lib/helpers/axios.error";
import {
  CreateUrlRequestData,
  CreateUrlResponse,
  CreateUrlResponseSchema,
  GetUrlsResponse,
  GetUrlsResponseSchema,
} from "./interfaces/interfaces";
import axiosInstance from "../lib/axios";

export async function getUrls(token: string): Promise<GetUrlsResponse> {
  try {
    const res = await axiosInstance.get("/urls", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsed = GetUrlsResponseSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error("Invalid response format from server.");
    }

    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function createShortUrl(
  data: CreateUrlRequestData,
  token: string
): Promise<CreateUrlResponse> {
  const res = await axiosInstance.post("/urls", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const parsed = CreateUrlResponseSchema.safeParse(res.data);
  if (!parsed.success) throw new Error("Invalid response format");

  return parsed.data;
}
