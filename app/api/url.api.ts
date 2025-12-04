import axios from "axios";
import { getAxiosErrorMessage } from "../lib/helpers/axios.error";
import {
  GetUrlsResponse,
  GetUrlsResponseSchema,
} from "./interfaces/interfaces";

export async function getUrls(token: string): Promise<GetUrlsResponse> {
  try {
    const res = await axios.get("http://localhost:3001/urls/", {
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
