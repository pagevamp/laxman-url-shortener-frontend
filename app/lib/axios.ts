import axios from "axios";
import { checkLoggedIn } from "../api/auth.api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});
axiosInstance.interceptors.request.use(
  async (config) => {
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
