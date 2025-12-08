import { getAxiosErrorMessage } from "../lib/helpers/axios.error";
import {
  GetUrlsResponse,
  GetUrlsResponseSchema,
} from "./interfaces/interfaces";
import axiosInstance from "../lib/axios";

export async function getUrls(): Promise<GetUrlsResponse> {
  try {
    const res = await axiosInstance.get("/urls");

    const parsed = GetUrlsResponseSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error("Invalid response format from server.");
    }

    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}
