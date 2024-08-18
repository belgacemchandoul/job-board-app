import axios, { AxiosHeaders } from "axios";
import { cookies } from "next/headers";

// Create an instance of axios
const axiosInstance = axios.create();

// Add a request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    const cookie = cookies().toString();
    const headers = new AxiosHeaders();  // Create an instance of AxiosHeaders
    headers.set('Cookie', cookie);

    config.headers = headers;  // Assign headers to config.headers
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
