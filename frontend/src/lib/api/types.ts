import type { AxiosRequestConfig } from "axios";

export interface ApiRequestConfig
  extends AxiosRequestConfig {
  _retry?: boolean;
  _skipAuthRefresh?: boolean;
}
