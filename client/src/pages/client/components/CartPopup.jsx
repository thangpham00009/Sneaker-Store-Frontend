import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartProvider";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  }).format(amount);

const CartPopup = () => {
  const { lastAdded, showCartPopup, setShowCartPopup, updateQuantity, removeFromCart } = useCart();

  if (!showCartPopup || !lastAdded) return null;

  const totalAmount = lastAdded.price * lastAdded.quantity;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => setShowCartPopup(false)}
    >
      <div
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-6 animate-[fadeIn_0.25s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-lg font-semibold text-gray-800">
            Đã thêm "{lastAdded.name}" vào giỏ hàng!
          </p>
          <button
            onClick={() => setShowCartPopup(false)}
            className="text-2xl text-gray-600 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Product just added */}
        <div className="pr-2 overflow-y-auto max-h-80">
          <div className="flex items-center gap-4 py-3 border-b">
            <img
              src={lastAdded.images?.[0]?.url || lastAdded.image || "/placeholder.png"}
              alt={lastAdded.name}
              className="object-cover w-20 h-20 border rounded-md"
            />

            <div className="flex-1">
              <p className="font-semibold text-gray-800">{lastAdded.name}</p>

              {/* Quantity */}
              <div className="flex items-center mt-2">
                <button
                  className="border w-7 h-7 rounded-l-md hover:bg-gray-100"
                  onClick={() =>
                    updateQuantity(
                      lastAdded.id,
                      lastAdded.quantity > 1 ? lastAdded.quantity - 1 : 1
                    )
                  }
                >
                  -
                </button>

                <input
                  type="number"
                  value={lastAdded.quantity}
                  min="1"
                  onChange={(e) => updateQuantity(lastAdded.id, e.target.value)}
                  className="w-10 text-center border-t border-b"
                />

                <button
                  className="border w-7 h-7 rounded-r-md hover:bg-gray-100"
                  onClick={() =>
                    updateQuantity(lastAdded.id, lastAdded.quantity + 1)
                  }
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(lastAdded.id)}
                className="mt-1 text-xs text-red-500 hover:underline"
              >
                × Xóa sản phẩm
              </button>
            </div>

            <p className="font-bold text-red-500">
              {formatCurrency(totalAmount)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-5 border-t">
          <div className="flex justify-between mb-4">
            <span className="text-lg font-bold">Tổng tiền:</span>
            <span className="text-xl font-bold text-red-600">
              {formatCurrency(totalAmount)}
            </span>
          </div>

          <div className="flex justify-end gap-3">
            <Link
              to="/cart"
              onClick={() => setShowCartPopup(false)}
              className="px-6 py-3 font-semibold text-white bg-black rounded-md hover:bg-gray-800"
            >
              Xem giỏ hàng
            </Link>

            <button
              onClick={() => setShowCartPopup(false)}
              className="px-6 py-3 font-semibold bg-white border rounded-md hover:bg-gray-100"
            >
              Tiếp tục mua hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
