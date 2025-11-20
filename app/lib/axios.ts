import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response?.status === 401) {
      // console.error("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
