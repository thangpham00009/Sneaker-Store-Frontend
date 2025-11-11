import { apiClient } from "../services/apiClient";
const toFormData = (data) => {
  if (data instanceof FormData) return data;
  const fd = new FormData();
  Object.keys(data || {}).forEach((key) => {
    const value = data[key];
    if (value instanceof File || value instanceof Blob) {
      fd.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((v) => fd.append(key, v));
    } else if (value != null && typeof value === "object") {
      fd.append(key, JSON.stringify(value));
    } else if (value !== undefined) {
      fd.append(key, value);
    }
  });
  return fd;
};

export const categoryAPI = {
  getAll: (params) => apiClient.get("/categories", { params }),
  getBySlug: (slug) => apiClient.get(`/categories/${slug}`),

  create: (categoryData) => {
    const body = toFormData(categoryData);
    return apiClient.post(`/categories`, body);
  },

  update: (id, categoryData) => {
    const body = toFormData(categoryData);
    return apiClient.put(`/categories/${id}`, body);
  },

  delete: (id) => apiClient.delete(`/categories/${id}`),
};

export default categoryAPI;
