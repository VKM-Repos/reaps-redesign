/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { AxiosInstance } from 'axios';

const baseUrl = process.env.VITE_BASE_URL;

export const authApi: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';

authApi.interceptors.request.use(async config => {
  const userToken = '';

  if (userToken) {
    config.headers['Authorization'] = `Bearer ${userToken}`;
  }

  return config;
});

export const publicApi: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

publicApi.defaults.headers.common['Content-Type'] = 'application/json';

export const handleApiError = (error: any) => {
  if (error.response) {
    console.error('Request failed with status code:', error.response.status);
    console.error('Response data:', error.response.data);
  } else if (error.request) {
    console.error('No response received. Request:', error.request);
  } else {
    console.error('Request setup error:', error.message);
  }
  return Promise.reject(error);
};

authApi.interceptors.response.use(
  response => response,
  error => handleApiError(error)
);
publicApi.interceptors.response.use(
  response => response,
  error => handleApiError(error)
);
