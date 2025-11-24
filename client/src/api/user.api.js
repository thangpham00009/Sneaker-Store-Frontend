import { apiClient } from "../services/apiClient";

export const userAPI = {
  register: (data) => apiClient.post("/user/register", data),
  login: (credentials) => apiClient.post("/user/login", credentials),
  logout: () => apiClient.post("/user/logout"),
  getProfile: () => apiClient.get("/user/profile"),
  refreshToken: () => apiClient.post("/user/refresh-token"),
};
export default userAPI;