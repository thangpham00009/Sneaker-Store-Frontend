import { apiClient } from "../services/apiClient";

/**
 * Product API calls
 */

export const productAPI = {
  // Get all products (supports query params)
  getAll: (params) => apiClient.get("/products", { params }),

  // Get product by slug (public)
  getBySlug: (slug) => apiClient.get(`/products/${slug}`),

  // Get product by id (backend uses /products/id/:id)
  getById: (id) => apiClient.get(`/products/id/${id}`),

  // Create product (support FormData for images)
  create: (productData) => {
    // if productData is FormData, axios will set proper headers
    return apiClient.post("/products", productData);
  },

  // Update product (support FormData for images)
  update: (id, productData) => apiClient.put(`/products/${id}`, productData),

  // Delete product
  delete: (id) => apiClient.delete(`/products/${id}`),
};

export default productAPI;
