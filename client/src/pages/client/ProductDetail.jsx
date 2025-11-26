import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productAPI from "../../api/product.api";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Breadcrumb from "@/components/Breadcrumb";
import Footer from "./components/Footer";
import { useCart } from "../../context/CartProvider";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const sizes = [
    36.5, 37, 37.5, 38, 38.5, 39,
    40, 40.5, 41, 41.5, 42, 42.5,
    43, 43.5, 44, 44.5, 45, 45.5, 46, 46.5
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await productAPI.getBySlug(slug);
        setProduct(res.data.data);
      } catch (err) {
        console.error("Lỗi load sản phẩm", err);
      }
    };
    fetchData();
  }, [slug]);

  if (!product) return <p className="py-10 text-center text-gray-500">Đang tải...</p>;

  return (
    <>
      <Header onHeightChange={() => {}} />
      <Navbar onHeightChange={() => {}} />

      <Breadcrumb
        className="mx-6 my-4"
        items={[
          { label: "Trang chủ", href: "/" },
          { label: product.categories[0]?.name || "Danh mục", href: `/danh-muc/${product.categories[0]?.slug}` },
          { label: product.name }
        ]}
      />

      <div className="grid max-w-6xl grid-cols-1 gap-8 p-4 mx-auto md:grid-cols-2">
        {/* LEFT: IMAGES */}
      <div className="flex flex-col items-start">
        {/* Ảnh chính */}
        <div
          className="relative overflow-hidden rounded-lg shadow-lg w-[400px] h-[400px]"
          onMouseMove={(e) => {
            const zoomImg = document.getElementById("zoom-image");
            const rect = e.currentTarget.getBoundingClientRect();
            const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
            const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
            zoomImg.style.transformOrigin = `${xPercent}% ${yPercent}%`;
          }}
          onMouseEnter={() => {
            const zoomDiv = document.getElementById("zoom-div");
            zoomDiv.style.display = "block";
            document.getElementById("zoom-image").style.transform = "scale(2)";
          }}
          onMouseLeave={() => {
            const zoomDiv = document.getElementById("zoom-div");
            zoomDiv.style.display = "none";
            document.getElementById("zoom-image").style.transform = "scale(1)";
          }}
        >
          <img
            src={product.images?.[activeImage]?.url}
            alt={product.name}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Ô zoom */}
        <div
          id="zoom-div"
          className="absolute w-80 h-80 border rounded-lg overflow-hidden left-[450px] top-[250px] hidden z-50 pointer-events-none"
        >
          <img
            id="zoom-image"
            src={product.images?.[activeImage]?.url}
            alt={product.name}
            className="absolute object-contain w-full h-full transition-transform duration-300"
          />
        </div>

        {/* Thumbnails */}
        <div className="flex flex-wrap justify-start w-full gap-3 mt-4">
          {product.images?.map((img, index) => (
            <img
              key={img.id}
              src={img.url}
              alt={product.name}
              className={`w-20 h-20 object-cover rounded-lg border cursor-pointer flex-shrink-0 transition-transform duration-200 ${
                activeImage === index
                  ? "border-red-500 scale-105"
                  : "border-gray-300 hover:scale-105"
              }`}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
      </div>
        {/* RIGHT: INFO */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="mb-3 text-3xl font-bold">{product.name}</h1>
            <p className="mb-2 text-gray-600">
              Thương hiệu: <span className="font-semibold">{product.brand?.name}</span>
            </p>

          {/* Giá: discountPrice đỏ, price gạch ngang */}
          <div className="flex items-center gap-4 mb-4">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-bold text-red-600">
                  {Number(product.discountPrice).toLocaleString()}₫
                </span>
                <span className="text-gray-400 line-through">
                  {Number(product.price).toLocaleString()}₫
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-black">
                    {Number(product.price).toLocaleString()}₫
                      </span>
                    )}  
                  </div>

            <p className="mb-4 font-semibold text-green-600">Còn hàng</p>

            {/* SIZES */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Chọn size:</label>
              <div className="grid grid-cols-6 gap-2">
                {sizes.map((size) => (
                  <div
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`cursor-pointer border rounded text-center py-2 transition ${
                      selectedSize === size ? "bg-red-500 text-white font-semibold" : "hover:border-red-500"
                    }`}
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block mb-2 font-semibold">Số lượng:</label>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="w-24 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
                className="flex-1 px-6 py-3 font-semibold text-white uppercase transition bg-black rounded-lg hover:bg-gray-800"
                onClick={() => {
                  if (!selectedSize) {
                    alert("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
                    return;
                  }
                  addToCart(
                    {
                      id: product.id,
                      name: product.name,
                      price: product.discountPrice || product.price,
                      images: product.images,
                      size: selectedSize,
                    },
                    quantity
                  );
                }}
              >
                Thêm vào giỏ hàng
              </button>

            <button className="flex-1 px-6 py-3 font-semibold text-white uppercase transition bg-red-600 rounded-lg hover:bg-red-700">
              Mua ngay
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
