import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createApiInstance } from "@/config/axiosInstance";

interface PostOptions {
  baseURL?: string;
  withAuth?: boolean;
  contentType?: string;
  callback?: (data: any) => void;
}
export const usePOST = (
  endPoint: string,
  { baseURL, contentType = "application/json", callback }: PostOptions = {}
) => {
  const { mutate, isError, isPending, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = createApiInstance(
        baseURL || import.meta.env.VITE_APP_BASE_URL
      );

      const response = await axiosInstance.post(endPoint, values, {
        headers: {
          "Content-Type": contentType,
        },
      });

      return response?.data;
    },
    onSuccess: (returnedData) => {
      callback && callback(returnedData);
      // toast.success("Success");
    },
    onError: (error: { response: { data: any } }) => {
      return toast.error(error.response.data.detail || "Something went wrong");
    },
  });

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
    data,
    error,
  };
};
