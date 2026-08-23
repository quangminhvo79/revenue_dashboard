const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000/api";

import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import type { ApiRequestConfig } from "./types";
import { tokenService } from "@/features/auth/services/token.service";
import { authSessionService } from "@/features/auth/services/auth-session.service";

export const AUTH_COOKIE = "auth_token";
export const AUTH_USER_EMAIL_COOKIE = "auth_user_email";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = tokenService.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
})

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ApiRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest._skipAuthRefresh
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await authSessionService.refresh();

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${accessToken}`,
      };

      return apiClient(originalRequest);
    } catch (refreshError) {
      authSessionService.clear();

      return Promise.reject(refreshError);
    }
  }
);

export { apiClient };
