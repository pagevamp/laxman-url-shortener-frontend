import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { checkLoggedIn } from "../api/auth.api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // const {token} = useAuth()
    const res = await checkLoggedIn();
    const token = res.token.value;
    if (token && config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
