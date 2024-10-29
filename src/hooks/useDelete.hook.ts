import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createApiInstance } from "@/config/axiosInstance";

interface DeleteOptions {
  withAuth?: boolean;
  callback?: (data: any) => void;
  baseURL?: string;
}
export const useDELETE = (
  url: string,
  {
    callback,
    // withAuth = true,
    baseURL = import.meta.env.VITE_APP_BASE_URL,
  }: DeleteOptions = {}
) => {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = createApiInstance(
        baseURL || import.meta.env.VITE_APP_BASE_URL
      );
      const response = await axiosInstance.delete(url, { data: values });
      return response;
    },
    onSuccess: (returnedData) => {
      toast.success(returnedData?.data?.message || "Deleted successfully");
      callback && callback(returnedData);
    },
    onError: (err) => {
      // toast.error(err?.data?.message);
      console.log(err);
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
