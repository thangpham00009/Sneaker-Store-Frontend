import { apiClient } from "./apiClient";
import { adminAPI } from "../api/admin.api";
import { hasRefreshToken } from "./cookieUtils";

export const setupAxiosInterceptors = () => {
  apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !originalRequest.url?.includes("/refresh-token")
      ) {
        originalRequest._retry = true;

        if (hasRefreshToken()) {
          try {
            await adminAPI.refreshToken();
            return apiClient(originalRequest);
          } catch (refreshError) {
            console.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!");
          }
        }
      }
      return Promise.reject(error);
    }
  );
};
