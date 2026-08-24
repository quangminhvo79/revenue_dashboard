import camelcaseKeys from 'camelcase-keys';
import { apiClient } from "@/lib/api/client";
import type { ApiRequestConfig } from "@/lib/api/types";

import type {
  AuthUser,
  LoginPayload,
  LoginResponse,
  RefreshResponse,
} from "../types/auth.type";

const skipAuthRefresh: ApiRequestConfig = { _skipAuthRefresh: true };

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await apiClient.post("/login", payload, skipAuthRefresh);

    return camelcaseKeys(response.data, { deep: true });
  },

  async refresh(): Promise<RefreshResponse> {
    const response = await apiClient.post("/refresh", undefined, skipAuthRefresh);

    return camelcaseKeys(response.data, { deep: true });
  },

  async logout(): Promise<void> {
    await apiClient.delete("/logout", skipAuthRefresh);
  },

  async me(): Promise<AuthUser> {
    const response = await apiClient.get("/me");
    return camelcaseKeys(response.data.user, { deep: true });
  },
};
