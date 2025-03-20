import { useMutation } from "@tanstack/react-query";
import { createApiInstance } from "@/config/axiosInstance";
import { toast } from "@/components/ui/use-toast";

export interface PatchOptions {
  baseURL?: string;
  withAuth?: boolean;
  method?: string;
  contentType?: string;
  callback?: (data: any) => void;
  errorCallBack?: (data: any) => void;
}
export const usePATCH = (
  url: string,
  {
    baseURL,
    method = "PUT",
    contentType = "application/json",
    callback,
    errorCallBack,
  }: PatchOptions = {}
) => {
  const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
    mutationFn: async (values: any) => {
      const axiosInstance = createApiInstance(
        baseURL || import.meta.env.VITE_APP_BASE_URL
      );
      const response =
        method === "PUT"
          ? await axiosInstance.put(url, values, {
              headers: {
                "Content-Type": contentType,
                "Accept": "application/json",
                
              },
            })
          : await axiosInstance.patch(url, values, {
              headers: {
                "Content-Type": contentType,
              },
            });
      return response?.data;
    },
    onSuccess: (returnedData) => {
      console.log(returnedData);
      // toast.success("Success");

      callback?.(returnedData);
    },
    onError: (error: { response: { data: any } }) => {
      // (err?.data?.message instanceof Array) ? toast.error(err?.data?.message[0]) : toast.error(err?.data?.message)
      console.log(error);
      
      errorCallBack?.(error);
      toast({
      title: "Error",
      description: error?.response?.data?.detail,
      variant: "destructive",
    })
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
