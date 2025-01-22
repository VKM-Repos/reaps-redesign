import { useQuery } from "@tanstack/react-query";
import { createApiInstance } from "@/config/axiosInstance";
import { useNavigate, useLocation } from "react-router-dom";

export const useGET = ({
  baseURL,
  url,
  queryKey,
  enabled = true,
  withAuth = true,
}: {
  baseURL?: string;
  url: string;
  queryKey: any[];
  withAuth?: boolean;
  enabled?: boolean;
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const fetch = async () => {
    try {
      const axiosInstance = createApiInstance(
        baseURL || import.meta.env.VITE_APP_BASE_URL
      );
      const response = await axiosInstance.get(url);
      return response?.data;
    } catch (error: any) {
      if (withAuth && error.response?.status === 401) {
        const redirectPath = encodeURIComponent(
          location.pathname + location.search
        );
        navigate(`/login?redirect=${redirectPath}`, { replace: true });
      }
      throw error;
    }
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
