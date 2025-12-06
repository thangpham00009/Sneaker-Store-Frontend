import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import productAPI from "@/api/product.api";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Home, Search } from "lucide-react";
import Breadcrumb from "@/components/Breadcrumb";
import QuickViewPopup from "./components/QuickViewPopup"; 
import defaultImage from "@/assets/default.jpg";
import { getImageUrl, getSrcSet } from "@/helpers/imageSrcSet";

export default function SearchPage() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [products, setProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const breadcrumbItems = [
    { label: "Trang chủ", href: "/", icon: <Home size={14} /> },
    { label: "Tìm kiếm", icon: <Search size={14} /> },
  ];

  useEffect(() => {
    if (query.trim()) fetchData();
  }, [query]);

  async function fetchData() {
    try {
      const res = await productAPI.getAll({
        page: 1,
        limit: 200,
        search: query,
      });

      const items = res.data?.data?.items || [];
      const mapped = items.map((p) => ({
        ...p,
        img:
          p.images?.find((i) => i.isDefault)?.url ||
          p.images?.[0]?.url ||
          defaultImage,
        price: p.price || 0,
        discountPrice: p.discountPrice || p.price || 0,
        discount:
          p.discountPrice && p.discountPrice < p.price
            ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
            : 0,
      }));

      setProducts(mapped);
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <>
     <Header onHeightChange={setHeaderHeight} /> 
     <Navbar onHeightChange={setHeaderHeight} />

      <div className="container px-5 sm:px-6 lg:px-8 mx-auto py-6 min-h-[50vh]">
        <Breadcrumb items={breadcrumbItems} className="mb-6" />

        <h1 className="mb-4 text-2xl font-bold">
          Kết quả tìm kiếm cho:{" "}
          <span className="text-blue-600">{query}</span>
        </h1>

        {products.length === 0 ? (
          <p className="text-gray-500">Không tìm thấy sản phẩm nào.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 sm:gap-5">
            {products.map((p) => (
              <div
                key={p.id}
                className="relative p-3 transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md group"
              >
                {/* Badge giảm giá */}
                {p.discount > 0 && (
                  <div className="absolute z-20 px-2 py-1 text-xs font-bold text-white bg-red-600 rounded-full shadow top-3 right-3">
                    -{p.discount}%
                  </div>
                )}

                {/* Hình ảnh */}
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={getImageUrl(p.img)}
                    srcSet={getSrcSet(p.img)}
                    sizes="(max-width: 640px) 50vw,
                            (max-width: 1024px) 33vw,
                            300px"
                    className="object-cover w-full transition-all duration-300 rounded-lg aspect-square group-hover:scale-105 group-hover:brightness-90"
                    alt={p.name}
                  />

                  {/* Hover Buttons */}
                  <div className="absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 translate-y-3 opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
                    <a
                      href={`/san-pham/${p.slug}`}
                      className="px-4 py-2 text-sm font-semibold text-gray-800 bg-white rounded-lg shadow hover:bg-gray-100"
                    >
                      Tùy chọn
                    </a>

                    <button
                      onClick={() => setQuickViewProduct(p)}
                      className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700"
                    >
                      Xem nhanh
                    </button>
                  </div>
                </div>

                {/* Tên sản phẩm */}
                <h2 className="mt-3 text-sm font-semibold sm:text-base line-clamp-2">
                  {p.name}
                </h2>

                {/* Giá */}
                <div className="mt-1">
                  <span className="text-base font-bold text-red-600">
                    {p.discountPrice.toLocaleString()}₫
                  </span>
                  {p.discount > 0 && (
                    <span className="ml-2 text-sm text-gray-400 line-through">
                      {p.price.toLocaleString()}₫
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />

      {quickViewProduct && (
        <QuickViewPopup
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </>
  );
}
