import React, { useState } from "react";
import Header from "./components//Header";    
import Navbar from "./components/Navbar";    
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "KÍNH ZARA BLACK/BL",
      price: 250000,
      quantity: 1,
      image:
        "https://cdn.comfy.ua/media/catalog/product/cache/1/image/600x600/040ec09b1e35df139433887a97daa66f/o/c/occhiali_zara.png",
    },
  ]);

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {/* HEADER + NAVBAR */}
      <Header onHeightChange={() => {}} />
      <Navbar onHeightChange={() => {}} />

      {/* CART PAGE CONTENT */}
      <div className="container mx-auto px-4 md:px-16 py-10">
        <h2 className="text-3xl font-bold mb-6">Giỏ hàng của bạn</h2>

        {/* TABLE */}
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 w-40 text-center">Ảnh sản phẩm</th>
                <th className="p-4">Tên sản phẩm</th>
                <th className="p-4 w-40 text-center">Đơn giá</th>
                <th className="p-4 w-32 text-center">Số lượng</th>
                <th className="p-4 w-40 text-center">Thành tiền</th>
                <th className="p-4 w-16 text-center">Xoá</th>
              </tr>
            </thead>

            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-4 text-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-28 mx-auto rounded"
                    />
                  </td>

                  <td className="p-4 font-semibold text-gray-700">
                    {item.name}
                  </td>

                  <td className="p-4 text-center text-red-500 font-semibold">
                    {item.price.toLocaleString()}đ
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-2 py-1 border"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-2 py-1 border"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-4 text-center text-red-500 font-semibold">
                    {(item.price * item.quantity).toLocaleString()}đ
                  </td>

                  <td className="p-4 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* BUTTON CONTINUE */}
        <div className="mt-6">
          <a
            href="/"
            className="px-6 py-3 border text-gray-800 hover:bg-gray-100"
          >
            TIẾP TỤC MUA HÀNG
          </a>
        </div>

        {/* SUMMARY */}
        <div className="flex justify-end mt-10">
          <div className="w-full md:w-1/3 border rounded-lg">
            <div className="flex justify-between p-4 border-b">
              <span>Tạm tính</span>
              <span className="font-semibold text-gray-800">
                {subtotal.toLocaleString()}đ
              </span>
            </div>

            <div className="flex justify-between p-4 border-b">
              <span>Tổng tiền thanh toán</span>
              <span className="font-semibold text-red-600">
                {subtotal.toLocaleString()}đ
              </span>
            </div>

            <button className="w-full bg-black text-white py-4 font-semibold hover:bg-gray-800">
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
