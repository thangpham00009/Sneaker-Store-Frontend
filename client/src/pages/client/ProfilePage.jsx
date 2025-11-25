import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/userAuthSlice";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { MapPin, Smartphone, Map, Building, Globe, Home, User } from "lucide-react"
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userAuth);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const orders = user?.orders || [];
  const addresses = user?.addresses || [];

  const breadcrumbItems = [
    { label: "Trang chủ", href: "/", icon: <Home size={14} /> },
    { label: "Trang khách hàng", icon: <User size={14} /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header onHeightChange={setHeaderHeight} />
      <Navbar onHeightChange={setNavbarHeight} />

      <div className="container px-4 py-10 mx-auto md:px-16">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <h1 className="mb-4 text-3xl font-bold">Trang khách hàng</h1>
        <p className="mb-6">
          Xin chào, <strong>{user?.name || user?.username}!</strong>
        </p>

        <div className="flex flex-col gap-8 md:flex-row">
          {/* LEFT: Orders */}
          <div className="flex-1">
            <h2 className="mb-4 text-xl font-semibold">Đơn hàng của bạn</h2>
            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="p-3">Đơn hàng</th>
                    <th className="p-3">Ngày</th>
                    <th className="p-3">Chuyển đến</th>
                    <th className="p-3">Địa chỉ</th>
                    <th className="p-3">Giá trị đơn hàng</th>
                    <th className="p-3">Tình trạng thanh toán</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="p-4 text-center text-gray-500">
                        Không có đơn hàng nào.
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="p-3">{order.id}</td>
                        <td className="p-3">{order.date}</td>
                        <td className="p-3">{order.recipient}</td>
                        <td className="p-3">{order.address}</td>
                        <td className="p-3">{order.total.toLocaleString()}đ</td>
                        <td className="p-3">{order.paid ? "Đã thanh toán" : "Chưa thanh toán"}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT: Account info */}
        <div className="w-full p-4 border rounded-lg md:w-1/3">
  <h2 className="mb-4 text-lg font-semibold">TÀI KHOẢN CỦA TÔI</h2>
  <p>
    <strong>Tên tài khoản:</strong> {user?.name || user?.username}!
  </p>
  <p className="flex items-center gap-2">
    <MapPin size={16} /> Địa chỉ: {user?.mainAddress || ""}
  </p>
  <p className="flex items-center gap-2">
    <Smartphone size={16} /> Điện thoại: {user?.phone || ""}
  </p>
  <p className="flex items-center gap-2">
    <Map size={16} /> Địa chỉ 1: {user?.address1 || ""}
  </p>
  <p className="flex items-center gap-2">
    <Building size={16} /> Công ty: {user?.company || ""}
  </p>
  <p className="flex items-center gap-2">
    <Globe size={16} /> Quốc gia: {user?.country || ""}
  </p>
  <p className="flex items-center gap-2">
    <span>{`</>`}</span> Zip code: {user?.zip || ""}
  </p>

  <button
    onClick={() => dispatch(logoutUser())}
    className="w-full py-2 mt-4 font-semibold text-white bg-black rounded"
  >
    Đăng xuất
  </button>
  <button className="w-full py-2 mt-2 font-semibold text-white bg-gray-800 rounded">
    Sổ địa chỉ {addresses.length}
  </button>
        </div>
        </div>
      </div>
    </div>
  );
}