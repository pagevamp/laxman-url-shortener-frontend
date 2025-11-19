import axiosInstance from "../lib/axios";
import axios from "axios";
import { getAxiosErrorMessage } from "../lib/helpers/axios.error";

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
}

export interface RegisterResponse {
  message: string;
  data: {
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      verified_at: string | null;
      updated_at: string | null;
      created_at: string;
    };
  };
}

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data as LoginResponse;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}

export async function RegisterUser(
  data: RegisterData
): Promise<RegisterResponse> {
  try {
    const res = await axiosInstance.post("/users", data);
    return res.data as RegisterResponse;
  } catch (error: unknown) {
    throw new Error(getAxiosErrorMessage(error));
  }
}
