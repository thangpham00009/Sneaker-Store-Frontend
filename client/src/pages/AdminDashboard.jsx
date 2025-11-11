import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutAdmin } from "../redux/slices/authSlice";
import AdminLayout from "../components/admin/AdminLayout";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutAdmin()).then(() => {
      navigate("/admin/login", { replace: true });
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            {user && (
              <p className="mt-1 text-sm text-gray-600">
                Xin chào, <span className="font-semibold">{user.username}</span>
                !
              </p>
            )}
          </div>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="px-4 py-2 text-white transition bg-red-500 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">Tổng Sản Phẩm</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">Đơn Hàng</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">Khách Hàng</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-sm text-gray-500">Doanh Thu</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">0 VND</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Chào mừng đến Sneaker Store Admin
          </h2>
          <p className="text-gray-600">
            Sử dụng menu bên trái để điều hướng đến các tính năng quản lý khác
            nhau.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
