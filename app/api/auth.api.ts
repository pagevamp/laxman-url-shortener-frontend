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
    const res = await axios.post("/api/proxy", data, { withCredentials: true });
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
    const res = await axios.post("/api/authCheck", { withCredentials: true });
    return res.data;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function logout() {
  try {
    const res = await axios.post("/api/logout", { withCredentials: true });
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

// export async function deleteUser() {
//   try {
//     const res = await axiosInstance.delete("api/proxy/users/:id/me", {
//       params: data,
//     });
//     const parsed = ResendMailResponseSchema.safeParse(res.data);
//     if (!parsed.success) {
//       throw new Error("Invalid response format from server.");
//     }
//     return parsed.data;
//   } catch (error: unknown) {
//     throw new Error(getAxiosErrorMessage(error));
//   }
// }

// export const getRequest = async (path: string) => {
//   const accessToken = (await cookies()).get("access_token")?.value || "";
//   const res = await axiosInstance.get("users/:id/me", {
//     headers: {
//       Cookie: `accessToken=${accessToken}`,
//     },
//     withCredentials: true,
//   });
//   return res.data;
// };
