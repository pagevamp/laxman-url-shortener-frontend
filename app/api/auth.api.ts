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

    return res.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function registerUser(
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

export async function resendMail(
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

export async function verifyUser(data: VerifyUserRequestData) {
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
