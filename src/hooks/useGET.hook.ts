import { useQuery } from "@tanstack/react-query";
import { createApiInstance } from "@/config/axiosInstance";

export const useGET = ({
  baseURL,
  url,
  queryKey,
  enabled = true,
}: {
  baseURL?: string;
  url: string;
  queryKey: any[];
  withAuth?: boolean;
  enabled?: boolean;
}) => {
  const fetch = async () => {
    const axiosInstance = createApiInstance(
      baseURL || import.meta.env.VITE_APP_BASE_URL
    );
    const response = await axiosInstance.get(url);
    return response?.data;
  };

  const {
    data,
    isFetching,
    isLoading,
    isPending,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isLoadingError,
    isRefetchError,
  } = useQuery({ queryKey: queryKey, queryFn: fetch, enabled: enabled });
  return {
    data,
    isFetching,
    isLoading,
    isPending,
    isError,
    isSuccess,
    refetch,
    isRefetching,
    isLoadingError,
    isRefetchError,
  };
};
