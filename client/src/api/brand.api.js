import { apiClient } from "../services/apiClient";

/**
 * Brand API calls
 */

export const brandAPI = {
  // Get all brands
  getAll: (params) => apiClient.get("/brands", { params }),

  // Get brand by slug
  getBySlug: (slug) => apiClient.get(`/brands/${slug}`),

  create: (brandData) => apiClient.post(`/brands`, brandData),

  // Update brand
  update: (id, brandData) => apiClient.put(`/brands/${id}`, brandData),

  // Delete brand
  delete: (id) => apiClient.delete(`/brands/${id}`),
};

export default brandAPI;
