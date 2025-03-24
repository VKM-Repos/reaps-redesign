import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from "axios";
import useUserStore from "@/store/user-store";
import { z } from "zod";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const refreshTokenSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: z.object({
    id: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    email: z.string(),
    institution_context: z.string(),
    gender: z.string(),
    date_of_birth: z.string(),
    education_level: z.string(),
    user_type: z.string(),
    phone_number: z.string().optional().default(""),
    country_code: z.string().optional().default(""),
    orcid_number: z.string().optional().default(""),
  }),
});

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
let isRefreshing = false;
let refreshQueue: ((token: string) => void)[] = [];

export const createApiInstance = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
  });

  apiInstance.interceptors.request.use((config) => {
    const { accessToken, user } = useUserStore.getState();

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    if (user?.user_type !== "super admin" && user?.institution_context) {
      config.headers["institution-context"] = user.institution_context;
    }

    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!isRefreshing) {
          isRefreshing = true;

          try {
            const newTokens = await getRefreshToken();

            // Store tokens in Zustand before retrying requests
            useUserStore.setState(() => ({
              accessToken: newTokens.access_token,
              refreshToken: newTokens.refresh_token,
            }));

            // Resolve all queued requests with new token
            refreshQueue.forEach((callback) =>
              callback(newTokens.access_token)
            );
            refreshQueue = [];

            isRefreshing = false;

            // Retry original request with new token
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newTokens.access_token}`;
            return apiInstance(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            refreshQueue = [];

            if (
              axios.isAxiosError(refreshError) &&
              [401, 403].includes(refreshError.response?.status ?? 0)
            ) {
              forceLogout();
            }

            return Promise.reject(refreshError);
          }
        }

        // Queue request and wait for token refresh
        return new Promise((resolve) => {
          refreshQueue.push((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(apiInstance(originalRequest));
          });
        });
      }

      return Promise.reject(error);
    }
  );

  return apiInstance;
};

const getRefreshToken = async () => {
  const { refreshToken, user } = useUserStore.getState();

  if (!refreshToken || !user?.institution_context) {
    forceLogout();
    throw new Error("No refresh token or institution context available.");
  }

  const url = new URL(`${baseUrl}auth/refresh`);
  url.searchParams.append("refresh_token", refreshToken);

  console.log("Old refresh_token", refreshToken);

  const response = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "institution-context": user.institution_context,
    },
  });

  if (!response.ok) {
    forceLogout();
    const errorData = await response.json();
    throw new Error(
      `Failed to refresh token: ${errorData.detail || response.statusText}`
    );
  }

  const data = await response.json();
  return refreshTokenSchema.parse(data);
};

const forceLogout = () => {
  useUserStore.getState().reset();
  window.location.href = "/login";
};

export const handleApiError = (error: unknown): Promise<never> => {
  if (error instanceof AxiosError) {
    console.error(
      error.response
        ? `Request failed with status ${
            error.response.status
          }: ${JSON.stringify(error.response.data)}`
        : error.request
        ? "No response received from server."
        : `Error setting up request: ${error.message}`
    );
  } else {
    console.error("An unexpected error occurred:", error);
  }

  return Promise.reject(error);
};
