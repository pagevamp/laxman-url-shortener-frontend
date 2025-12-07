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
  try {
    const res = await axiosInstance.post("/urls", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsed = CreateUrlResponseSchema.safeParse(res.data);
    if (!parsed.success) throw new Error("Invalid response format");

    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function editShortUrl(
  id: string,
  data: EditUrlRequestData,
  token: string
): Promise<EditUrlResponse> {
  try {
    const res = await axiosInstance.patch(`/urls/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsed = EditUrlResponseSchema.safeParse(res.data);
    if (!parsed.success) throw new Error("Invalid response format");

    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function deleteShortUrl(id: string, token: string) {
  try {
    const res = await axiosInstance.delete(`/urls/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}
