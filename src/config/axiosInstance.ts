import axios, { AxiosInstance } from "axios";

export const createApiInstance = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
  });

  apiInstance.defaults.headers.common["Content-Type"] = "application/json";

  apiInstance.interceptors.request.use(async (config) => {
    // const userToken = useAppStore.getState().user?.token;
    const userToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI4NGMzNGQ1MS0yNzU0LTRmYzEtOTUxNy0zNTc3Zjk3ZTAyY2MiLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiZXhwIjoxNzMwNDc0NDMyfQ.PFgc7kdG1QIlu72MgFes_uG1ZfVDtcVWUUYBex1ZLY4";

    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
      config.headers["institution-context"] = "default_context";
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
