import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.MY_BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized");
    }
    console.error("API error:", error);

    return Promise.reject(error);
  }
);

export default axiosInstance;
