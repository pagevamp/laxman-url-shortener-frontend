import axios from "axios";
import { checkLoggedIn } from "../api/auth.api";

const publicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

export default publicAxiosInstance;
