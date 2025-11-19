import axiosInstance from "../lib/axios";

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
}

export async function loginUser(data: LoginData): Promise<LoginResponse> {
  try {
    const res = await axiosInstance.post("/auth/login", data);
    if (res.status !== 200) {
      throw new Error("Login failed");
    }
    return res.data;
  } catch (err) {
    throw new Error(err.response?.data?.message || "Login failed. Try again.");
  }
}

export async function RegisterUser(
  data: RegisterData
): Promise<RegisterResponse> {
  try {
    const res = await axiosInstance.post("/auth/sign-up", data);
    if (res.status !== 200) {
      throw new Error("Registration failed");
    }
    return res.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Registration failed. Try again."
    );
  }
}
