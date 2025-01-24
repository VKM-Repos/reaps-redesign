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

// Schema for validating refresh token response
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

// Refresh lock mechanism
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];
let retryCount = 0;
const MAX_RETRIES = 1;

const onRTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

export const createApiInstance = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({ baseURL, timeout: 10000 });

  apiInstance.interceptors.request.use(async (config) => {
    const { accessToken, user } = useUserStore.getState();
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
    if (user?.institution_context)
      config.headers["institution-context"] = user.institution_context;
    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;
      if (
        originalRequest &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        if (isRefreshing) {
          return new Promise((resolve) => {
            addSubscriber((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              resolve(apiInstance(originalRequest));
            });
          });
        }

        if (retryCount >= MAX_RETRIES) {
          alert("Session expired. Please log in again.");
          useUserStore.setState({
            accessToken: null,
            refreshToken: null,
            user: null,
          });
          return Promise.reject(error);
        }

        retryCount++;
        isRefreshing = true;
        try {
          const newTokens = await getRefreshToken();
          retryCount = 0;
          useUserStore.setState(newTokens);
          onRTokenRefreshed(newTokens.access_token);
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${newTokens.access_token}`;
          return apiInstance(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          useUserStore.setState({
            accessToken: null,
            refreshToken: null,
            user: null,
          });
          return Promise.reject(refreshError);
        }
      }
      return Promise.reject(error);
    }
  );
  return apiInstance;
};

// Function to call the refresh token endpoint
const getRefreshToken = async () => {
  const userStore = useUserStore.getState();
  const { refreshToken, user } = userStore;

  if (!refreshToken || !user?.institution_context) {
    throw new Error("No refresh token or institution context available.");
  }

  const response = await axios.post(`${baseUrl}auth/refresh`, null, {
    headers: {
      "institution-context": user.institution_context,
    },
    params: {
      refresh_token: refreshToken,
    },
  });

  // Validate the response using the schema
  const validatedData = refreshTokenSchema.parse(response.data);

  return validatedData;
};

// Error handler for logging
export const handleApiError = (error: unknown): Promise<never> => {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.error("Request failed with status code:", error.response.status);
      console.error("Response data:", error.response.data);
    } else if (error.request) {
      console.error("No response received. Request:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }
  } else {
    console.error("An unexpected error occurred:", error);
  }

  return Promise.reject(error);
};
