import { getAxiosErrorMessage } from "../lib/helpers/axios.error";
import {
  CreateUrlRequestData,
  CreateUrlResponse,
  CreateUrlResponseSchema,
  EditUrlRequestData,
  EditUrlResponse,
  EditUrlResponseSchema,
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

export async function createShortUrl(
  data: CreateUrlRequestData
): Promise<CreateUrlResponse> {
  try {
    const res = await axiosInstance.post("/urls", data);

    const parsed = CreateUrlResponseSchema.safeParse(res.data);
    if (!parsed.success) throw new Error("Invalid response format");

    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function editShortUrl(
  id: string,
  data: EditUrlRequestData
): Promise<EditUrlResponse> {
  try {
    const res = await axiosInstance.patch(`/urls/${id}`, data);

    const parsed = EditUrlResponseSchema.safeParse(res.data);
    if (!parsed.success) throw new Error("Invalid response format");

    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function deleteShortUrl(id: string) {
  try {
    const res = await axiosInstance.delete(`/urls/${id}`);
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}
