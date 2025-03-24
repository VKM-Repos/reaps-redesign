import { QueryClient, type QueryClientConfig } from "@tanstack/react-query";
import React from "react";

const queryClientSettings: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchInterval: 3.6e6, // 1 hour
      refetchIntervalInBackground: false,
      staleTime: Infinity,
    },
    mutations: {
      retry: 1,
    },
  },
};

export const useQueryClientAndSettings = () => {
  const queryClientSettings = {
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        cacheTime: 3.6e6,
        refetchInterval: 3.6e6, // 1 hour
        refetchIntervalInBackground: true,
        suspense: false,
        staleTime: Infinity,
      },
      mutations: {
        retry: 1,
      },
    },
  };

  const queryClient = React.useMemo(
    () => new QueryClient(queryClientSettings),
    []
  );

  return { queryClient };
};

export default queryClientSettings;
