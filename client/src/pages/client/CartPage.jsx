import React from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { FaTrashAlt } from "react-icons/fa";
import { useCart } from "@/context/CartProvider";
import defaultImage from "../../assets/default.jpg";
const CartPage = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((sum, item) => {
    const product = item.product || {};
    const unitPrice = product.discountPrice ?? product.price ?? 0;
    return sum + unitPrice * item.quantity;
  }, 0);

  const totalSavings = cart.reduce((sum, item) => {
    const product = item.product || {};
    const discount = (product.price ?? 0) - (product.discountPrice ?? product.price ?? 0);
    return sum + discount * item.quantity;
  }, 0);

  return (
    <>
      <Header onHeightChange={() => {}} />
      <Navbar onHeightChange={() => {}} />

      <div className="container px-4 py-10 mx-auto md:px-16">
        <h2 className="mb-6 text-3xl font-bold">Giỏ hàng của bạn</h2>

        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="w-40 p-4 text-center">Ảnh sản phẩm</th>
                <th className="p-4">Tên sản phẩm</th>
                <th className="w-40 p-4 text-center">Giá gốc</th>
                <th className="w-40 p-4 text-center">Giá giảm</th>
                <th className="w-32 p-4 text-center">Số lượng</th>
                <th className="w-40 p-4 text-center">Thành tiền</th>
                <th className="w-16 p-4 text-center">Xoá</th>
              </tr>
            </thead>

          <tbody>
  {cart.length === 0 ? (
    <tr>
      <td colSpan="7" className="p-6 text-center text-gray-500">
        Giỏ hàng trống.
      </td>
    </tr>
  ) : (
    cart.map((item) => {
      // Nếu chưa login, item là chính product
      const product = item.product || item;
      const originalPrice = product.price ?? 0;
      const discountPrice = product.discountPrice ?? originalPrice;

      return (
        <tr key={product.id} className="border-b">
          {/* IMAGE */}
          <td className="p-4 text-center">
            <img
              src={
                product.images?.find((i) => i.isDefault)?.url ||
                product.images?.[0]?.url ||
                defaultImage
              }
              alt={product.name}
              className="object-cover w-20 h-20 border rounded-md"
            />
          </td>

          {/* NAME */}
          <td className="p-4 font-semibold text-gray-700">{product.name}</td>

          {/* ORIGINAL PRICE */}
          <td className="p-4 font-semibold text-center text-gray-400 line-through">
            {originalPrice.toLocaleString()}đ
          </td>

          {/* DISCOUNT PRICE */}
          <td className="p-4 font-semibold text-center text-red-500">
            {discountPrice.toLocaleString()}đ
          </td>

          {/* QUANTITY */}
          <td className="p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <button
                className="px-2 py-1 border"
                onClick={() => updateQuantity(product.id, item.quantity - 1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 border"
                onClick={() => updateQuantity(product.id, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </td>

          {/* TOTAL PRICE */}
          <td className="p-4 font-semibold text-center text-red-500">
            {(discountPrice * item.quantity).toLocaleString()}đ
          </td>

          {/* REMOVE */}
          <td className="p-4 text-center">
            <button
              className="text-gray-500 hover:text-red-500"
              onClick={() => removeFromCart(product.id)}
            >
              <FaTrashAlt />
            </button>
          </td>
        </tr>
      );
    })
  )}
          </tbody>

          </table>
        </div>

        {/* TOTAL */}
        <div className="flex justify-end mt-10">
          <div className="w-full border rounded-lg md:w-1/3">
            <div className="flex justify-between p-4 border-b">
              <span>Tạm tính</span>
              <span className="font-semibold text-gray-800">{subtotal.toLocaleString()}đ</span>
            </div>

            {totalSavings > 0 && (
              <div className="flex justify-between p-4 border-b">
                <span>Bạn đã tiết kiệm</span>
                <span className="font-semibold text-green-600">{totalSavings.toLocaleString()}đ</span>
              </div>
            )}

            <div className="flex justify-between p-4 border-b">
              <span>Tổng tiền thanh toán</span>
              <span className="font-semibold text-red-600">{subtotal.toLocaleString()}đ</span>
            </div>

            <button className="w-full py-4 font-semibold text-white bg-black hover:bg-gray-800">
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
