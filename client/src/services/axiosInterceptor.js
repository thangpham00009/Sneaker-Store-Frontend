import { apiClient } from "./apiClient";
import { adminAPI } from "../api/admin.api";
import { userAPI } from "../api/user.api";
import { hasUserRefreshToken, hasAdminRefreshToken } from "./cookieUtils";

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

        // Admin
        if (originalRequest.url.includes("/admin") && hasAdminRefreshToken()) {
          try {
            await adminAPI.refreshToken();
            return apiClient(originalRequest);
          } catch (refreshError) {
            console.error("Admin session expired, please login again!");
          }
        }

        // User
        if (!originalRequest.url.includes("/user") && hasUserRefreshToken()) {
          try {
            await userAPI.refreshToken();
            return apiClient(originalRequest);
          } catch (refreshError) {
            console.error("User session expired, please login again!");
          }
        }
      }

      return Promise.reject(error);
    }
  );
};
