// import { cookies } from "next/headers";
import axios from "axios";
import axiosInstance from "../lib/axios";
import { getAxiosErrorMessage } from "../lib/helpers/axios.error";
import {
  LoginRequestData,
  LoginResponse,
  LoginResponseSchema,
  RegisterRequestData,
  RegisterResponse,
  RegisterResponseSchema,
  ResendMailRequestData,
  ResendMailResponse,
  ResendMailResponseSchema,
  VerifyUserRequestData,
} from "./interfaces/interfaces";

export async function loginUser(
  data: LoginRequestData
): Promise<LoginResponse> {
  try {
    const res = await axios.post("/api/login", data, { withCredentials: true });

    if (res.data.error || res.data.message) {
      throw new Error(res.data.error || res.data.message);
    }

    const parsed = LoginResponseSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error("Invalid response format from server.");
    }

    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function checkLoggedIn() {
  try {
    const res = await axios.get("/api/authCheck", { withCredentials: true });

    if (res.data.error || res.data.message) {
      throw new Error(res.data.error || res.data.message);
    }

    return res.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function RegisterUser(
  data: RegisterRequestData
): Promise<RegisterResponse> {
  try {
    const res = await axiosInstance.post("/users", data);

    const parsed = RegisterResponseSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error("Invalid response format from server.");
    }
    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function ResendMail(
  data: ResendMailRequestData
): Promise<ResendMailResponse> {
  try {
    const res = await axiosInstance.post("/auth/resend-email", data);

    const parsed = ResendMailResponseSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error("Invalid response format from server.");
    }

    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function VerifyUser(data: VerifyUserRequestData) {
  try {
    const res = await axiosInstance.get("/auth/verify-email", { params: data });
    const parsed = ResendMailResponseSchema.safeParse(res.data);
    if (!parsed.success) {
      throw new Error("Invalid response format from server.");
    }
    return parsed.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}
