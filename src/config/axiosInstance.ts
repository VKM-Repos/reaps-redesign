// import useAppStore from "@/lib/store/app.store";
import axios, { AxiosInstance } from "axios";

// Dynamic axios instance function
export const createApiInstance = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
  });

  // Set default headers
  apiInstance.defaults.headers.common["Content-Type"] = "application/json";

  // Request interceptor to add Authorization header if token exists
  apiInstance.interceptors.request.use(async (config) => {
    // const userToken = useAppStore.getState().user?.token;
    const userToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNzYyYzZmYy1mYzJmLTQ4ODEtOTA1Ni02OTZiZTlhNTZlZDciLCJ1c2VyX3R5cGUiOiJ1c2VyIiwiZXhwIjoxNzMyODY4NjM3fQ.5YsQIlPtUEHUPVmEZ5YSkdo-HdzbWod-g5Eu9YyrzHQ";

    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
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
