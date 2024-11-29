import { useMutation } from "@tanstack/react-query";
import { createApiInstance } from "@/config/axiosInstance";

interface PostOptions {
  baseURL?: string;
  withAuth?: boolean;
  contentType?: string;
  callback?: (data: any) => void;
  errorCallBack?: (data: any) => void;
}
export const usePOST = (
  endPoint: string,
  {
    baseURL,
    contentType = "application/json",
    callback,
    errorCallBack,
  }: PostOptions = {}
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
    },
    onError: (error: { response: { data: any } }) => {
      errorCallBack && errorCallBack(error);
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
