import useUserStore from '@/store/user-store';
import axios, { AxiosInstance, AxiosError } from 'axios';

export const createApiInstance = (baseURL: string): AxiosInstance => {
  const apiInstance = axios.create({
    baseURL,
  });

  apiInstance.defaults.headers.common['Content-Type'] = 'application/json';

  apiInstance.interceptors.request.use(async config => {
    const accessToken = useUserStore.getState().accessToken;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  });

  apiInstance.interceptors.response.use(
    response => response,
    async (error: AxiosError) => {
      if (error.response) {
        const { status, config } = error.response;

        if (status === 401 && config) {
          try {
            const refreshToken = useUserStore.getState().refreshToken;

            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            const refreshResponse = await apiInstance.post<{
              access_token: string;
              refresh_token: string;
            }>('/auth/refresh', null, {
              params: { refresh_token: refreshToken },
              headers: {
                'institution-context': 'default_context',
              },
            });

            const newAccessToken = refreshResponse.data.access_token;
            const newRefreshToken = refreshResponse.data.refresh_token;

            useUserStore.setState(state => ({
              ...state,
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            }));

            config.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return apiInstance(config);
          } catch (refreshError) {
            console.error('Failed to refresh token', refreshError);
            return Promise.reject(refreshError);
          }
        }

        console.error(
          'Request failed with status:',
          status,
          error.response.data
        );
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }

      return Promise.reject(error);
    }
  );

  return apiInstance;
};
