import axiosInstance from "../lib/axios";
import axios from "axios";

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
  response: {
    status: number;
    data: {
      message: string;
    };
  };
  accessToken: string;
}

export interface RegisterResponse {
  response: {
    status: number;
    data: {
      message: string;
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
  };
}

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error;
  }
}

export async function RegisterUser(data: RegisterData) {
  try {
    const res = await axiosInstance.post("/users", data);
    return res;
  } catch (error: any) {
    console.log(error.response.data.message);
    return error;
  }
}
