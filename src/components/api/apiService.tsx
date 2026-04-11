// services/apiService.ts
import apiClient from "./apiClient";
import { getCachedResponse } from "./cacheService";
import type { AxiosRequestConfig } from "axios";

type ApiResponse<T = any> = T;

const apiService = {
  get: async <T = any,>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {},
  ): Promise<ApiResponse<T>> => {
    // 🔑 Create a cache key that INCLUDES query params
    // This ensures /zone/region?region=1 and ?region=2 are cached separately
    const paramsString = Object.keys(params).length
      ? new URLSearchParams(
          Object.entries(params).map(([k, v]) => [k, String(v)]),
        ).toString()
      : "";

    const cacheKey = paramsString ? `${url}?${paramsString}` : url;

    const fetchFn = async (): Promise<ApiResponse<T>> => {
      const response = await apiClient.get<T>(url, { params, ...config });
      return response.data;
    };

    // Pass the cacheKey (with params) to the cache service
    return getCachedResponse<T>(cacheKey, fetchFn);
  },

  // 👇 post, put, patch, delete remain unchanged
  post: async <T = any,>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {},
  ) => {
    const response = await apiClient.post<T>(url, data, config);
    return response.data;
  },
  put: async <T = any,>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {},
  ) => {
    const response = await apiClient.put<T>(url, data, config);
    return response.data;
  },
  patch: async <T = any,>(
    url: string,
    data: any,
    config: AxiosRequestConfig = {},
  ) => {
    const response = await apiClient.patch<T>(url, data, config);
    return response.data;
  },
  delete: async <T = any,>(url: string, config: AxiosRequestConfig = {}) => {
    const response = await apiClient.delete<T>(url, config);
    return response.data;
  },
};

export default apiService;
