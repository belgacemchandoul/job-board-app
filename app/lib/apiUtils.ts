import axiosInstance from "@/app/lib/axiosInterceptor";

export const fetchData = async <T,>(url: string): Promise<T> => {
  const response = await axiosInstance.get(url);
  return response.data;
};
