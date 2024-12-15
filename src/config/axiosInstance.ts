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

export const createApiInstance = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    // withCredentials: true,  // enabling this causes cors error on dev, dont know why
  });

  apiInstance.interceptors.request.use(async (config) => {
    const userStore = useUserStore.getState();
    const { accessToken, user } = userStore;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    if (user?.institution_context) {
      config.headers["institution-context"] = user.institution_context;
    }

    return config;
  });

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as CustomAxiosRequestConfig;

      // Retry the request only if we encounter a 401 and haven't retried yet
      if (
        originalRequest &&
        error.response?.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const newTokens = await getRefreshToken();
          useUserStore.setState({
            accessToken: newTokens.access_token,
            refreshToken: newTokens.refresh_token,
            user: newTokens.user,
          });

          // Update the request with the new access token and retry
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${newTokens.access_token}`;

          // Only retry the request once with the updated token
          return apiInstance(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure (e.g., log out the user)
          if (
            axios.isAxiosError(refreshError) &&
            refreshError.response?.status === 403
          ) {
            useUserStore.setState({
              accessToken: null,
              refreshToken: null,
              user: null,
            });
          }
          return Promise.reject(refreshError);
        }
      }

      // If we can't handle the error, reject it as usual
      return Promise.reject(error);
    }
  );

  return apiInstance;
};

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

  const validatedData = refreshTokenSchema.parse(response.data);

  return validatedData;
};

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
