import { apiClient } from "../services/apiClient";

export const cartAPI = {
  // Lấy giỏ hàng của user
  getCart: () => apiClient.get("/cart"),

  // Thêm sản phẩm vào giỏ
  addToCart: (data) => apiClient.post("/cart", data),

  // Cập nhật số lượng sản phẩm trong giỏ
  updateCartItem: (data) => apiClient.put("/cart", data),

  // Xóa 1 item khỏi giỏ theo productId
    removeCartItem: (productId, size) =>
      apiClient.delete(`/cart/${productId}`, {
        params: { size },
      }),

  // Xóa toàn bộ giỏ hàng
  clearCart: () => apiClient.delete("/cart"),
};

export default cartAPI;
