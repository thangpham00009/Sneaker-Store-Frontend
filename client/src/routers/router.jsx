import { Navigate } from "react-router-dom";
import Home from "../components/Home.jsx";
import AdminLogin from "../pages/AdminLogin.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AdminLayout from "../components/admin/AdminLayout.jsx";
import ProductsPage from "../pages/admin/products/ProductsPage.jsx";
import AddProductPage from "../pages/admin/products/AddProductPage.jsx";
import CategoriesPage from "../pages/admin/categories/CategoriesPage.jsx";
import AddCategoryPage from "../pages/admin/categories/AddCategoryPage.jsx";
import BrandsPage from "../pages/admin/brands/BrandsPage.jsx";
import AddBrandPage from "../pages/admin/brands/AddBrandPage.jsx";
import OrdersPage from "../pages/admin/orders/OrdersPage.jsx";
import CustomersPage from "../pages/admin/customers/CustomersPage.jsx";
import InventoryPage from "../pages/admin/warehouse/InventoryPage.jsx";
import WarehouseHistoryPage from "../pages/admin/warehouse/WarehouseHistoryPage.jsx";
import InvoicesPage from "../pages/admin/invoices/InvoicesPage.jsx";
import PaymentMethodsPage from "../pages/admin/payment/PaymentMethodsPage.jsx";
import PromotionsPage from "../pages/admin/promotions/PromotionsPage.jsx";
import EditCategoryPage from "../pages/admin/categories/EditCategoryPage.jsx";
import CategoryDetailPage from "../pages/admin/categories/CategoryDetailPage.jsx";

export const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  // Admin Dashboard Routes
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },

  // ============ QUẢN LÝ SẢN PHẨM ============

  // Products Routes
  {
    path: "/admin/products",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <ProductsPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/products/add",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <AddProductPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  // Warehouse Routes
  {
    path: "/admin/warehouse/inventory",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <InventoryPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/warehouse/history",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <WarehouseHistoryPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  // Promotions Routes
  {
    path: "/admin/promotions",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <PromotionsPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  // ============ QUẢN LÝ BÁN HÀNG ============

  // Orders Routes
  {
    path: "/admin/orders",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <OrdersPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  // Invoices Routes
  {
    path: "/admin/invoices",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <InvoicesPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  // Payment Methods Routes
  {
    path: "/admin/payment-methods",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <PaymentMethodsPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  // Customers Routes
  {
    path: "/admin/customers",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <CustomersPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  // ============ THUỘC TÍNH SẢN PHẨM ============

  // Categories Routes
  {
    path: "/admin/categories",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <CategoriesPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/categories/add",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <AddCategoryPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
    {
    path: "/admin/categories/:categoryId",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <CategoryDetailPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/categories/:categoryId/edit",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <EditCategoryPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },

  // Brands Routes
  {
    path: "/admin/brands",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <BrandsPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/brands/add",
    element: (
      <ProtectedRoute>
        <AdminLayout>
          <AddBrandPage />
        </AdminLayout>
      </ProtectedRoute>
    ),
  },
  // {
  //   path: "/admin/brands/:brandId/edit",
  //   element: (
  //     <ProtectedRoute>
  //       <AdminLayout>
  //         <EditBrandPage />
  //       </AdminLayout>
  //     </ProtectedRoute>
  //   ),
  // },

  // Catch all - redirect to home
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];
