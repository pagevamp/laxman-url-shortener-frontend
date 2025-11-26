import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,

//   (error) => {
//     if (error.response?.status === 401) {
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
