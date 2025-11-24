import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaBehance,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" pt-10 mt-20">

      {/* ===== LOGO THƯƠNG HIỆU ===== */}
      <div className="w-full flex justify-center gap-16 pb-10 flex-wrap">
        <img src="/brands/adidas.png" alt="adidas" className="h-12" />
        <img src="/brands/nike.png" alt="nike" className="h-12" />
        <img src="/brands/vans.png" alt="vans" className="h-12" />
        <img src="/brands/converse.png" alt="converse" className="h-12" />
        <img src="/brands/fila.png" alt="fila" className="h-12" />
        <img src="/brands/ny.png" alt="ny" className="h-12" />
      </div>

      {/* ===== NỘI DUNG FOOTER ===== */}
      <div className=" bg-black text-white container mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        {/* Về Sneaker */}
        <div>
          <h3 className="font-semibold mb-4">VỀ SNEAKER STORE</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Trang chủ</li>
            <li className="hover:text-white cursor-pointer">Giới thiệu</li>
            <li className="hover:text-white cursor-pointer">Sản phẩm</li>
          </ul>
        </div>

        {/* Chính sách */}
        <div>
          <h3 className="font-semibold mb-4">Chính sách</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Chính sách bảo mật</li>
            <li className="hover:text-white cursor-pointer">Chính sách vận chuyển</li>
            <li className="hover:text-white cursor-pointer">Chính sách đổi trả</li>
            <li className="hover:text-white cursor-pointer">Quy định sử dụng</li>
          </ul>
        </div>

        {/* Hỗ trợ khách hàng */}
        <div>
          <h3 className="font-semibold mb-4">Hỗ trợ khách hàng</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white cursor-pointer">Tìm kiếm</li>
            <li className="hover:text-white cursor-pointer">Đăng nhập</li>
            <li className="hover:text-white cursor-pointer">Đăng ký</li>
            <li className="hover:text-white cursor-pointer">Giỏ hàng</li>
          </ul>
        </div>

        {/* Đăng ký khuyến mãi */}
        <div>
          <h3 className="font-semibold mb-4">Đăng ký nhận khuyến mãi</h3>
          <div className="flex w-full">
            <input
              type="email"
              className="p-3 w-full rounded-l bg-white text-black outline-none"
              placeholder="Nhập email của bạn..."
            />
            <button className="px-5 bg-gray-800 text-white rounded-r hover:bg-gray-700">
              Đăng ký
            </button>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-3">Theo dõi chúng tôi</h3>
            <div className="flex gap-4 text-xl">
              <FaFacebookF className="cursor-pointer hover:text-blue-500" />
              <FaTwitter className="cursor-pointer hover:text-blue-300" />
              <FaBehance className="cursor-pointer hover:text-blue-400" />
              <FaInstagram className="cursor-pointer hover:text-pink-500" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== COPYRIGHT ===== */}
      <div className="text-center text-gray-500 py-4 border-t border-gray-800">
        © 2025 SneakerStore – All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
