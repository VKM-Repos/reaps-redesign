import useUserStore from "@/store/user-store";
import axios, { AxiosInstance } from "axios";

export const createApiInstance = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
  });

  apiInstance.defaults.headers.common["Content-Type"] = "application/json";

  apiInstance.interceptors.request.use(async (config) => {
    const userToken = useUserStore.getState().accessToken;
    const userInstitutionContext =
      useUserStore.getState().user?.institution_context;
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
      config.headers["institution-context"] = userInstitutionContext;
    }

    return config;
  });

  // Response interceptor for handling errors
  apiInstance.interceptors.response.use(
    (response) => response,
    (error) => handleApiError(error)
  );

  return apiInstance;
};

// Shared error handler
export const handleApiError = (error: any) => {
  if (error.response) {
    console.error("Request failed with status code:", error.response.status);
    console.error("Response data:", error.response.data);
  } else if (error.request) {
    console.error("No response received. Request:", error.request);
  } else {
    console.error("Request setup error:", error.message);
  }
  return Promise.reject(error);
};
