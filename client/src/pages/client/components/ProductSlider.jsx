import React, { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartProvider";
import productAPI from "@/api/product.api";
import defaultImage from "../../../assets/default.jpg";

const ProductSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const { addToCart } = useCart();

  const [apiProducts, setApiProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await productAPI.getAll();
        const data = res.data.data.data;

        const productsWithDiscount = data.map((p) => {
          const price = p.price || 0;
          const discountPrice = p.discountPrice || p.price || 0;

          const discount =
            p.discountPrice && p.discountPrice < p.price
              ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
              : 0;

          return {
            ...p,
            price,
            discountPrice,
            discount,
            img:
              p.images?.length > 0
                ? p.images.find((i) => i.isDefault)?.url || p.images[0].url
                : defaultImage,
          };
        });

        setApiProducts(productsWithDiscount);
      } catch (error) {
        console.error("Load sản phẩm lỗi:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container relative py-10 mx-auto">
      <div className="mb-8 text-center">
        <h2 className="relative inline-block pb-4 text-2xl font-bold md:text-3xl">
          SINCE 2016 IN SAIGON
          <span className="absolute bottom-0 w-12 h-1 transform -translate-x-1/2 bg-blue-400 rounded left-1/2"></span>
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        pagination={{ clickable: true }}
        spaceBetween={20}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {apiProducts.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="relative overflow-hidden bg-white rounded-md shadow-md group">
              {/* Discount badge */}
              {item.discount > 0 && (
                <div className="absolute z-20 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full top-2 right-2">
                  -{item.discount}%
                </div>
              )}

              {/* Image */}
              <div className="relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="object-cover w-full h-64 transition duration-300 group-hover:brightness-75"
                />

                {/* Hover Buttons */}
                <div
                  className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-2 transition-all duration-300 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
                >
                  <Link
                    to={`/san-pham/${item.slug}`}
                    className="w-32 py-2 font-semibold text-center text-gray-800 bg-white border rounded-md shadow hover:bg-gray-100"
                  >
                    Tùy chọn
                  </Link>

                  <button
                    className="w-32 py-2 font-semibold text-white bg-blue-500 rounded-md shadow hover:bg-blue-600"
                    onClick={() => addToCart(item, 1)}
                  >
                    Mua nhanh
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h3 className="text-sm font-semibold md:text-base">
                  {item.name}
                </h3>

                <div className="mt-2">
                  <span className="font-bold text-red-500">
                    {item.discountPrice.toLocaleString()}₫
                  </span>

                  {item.discount > 0 && (
                    <span className="ml-2 text-gray-400 line-through">
                      {item.price.toLocaleString()}₫
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom arrows */}
        <div
          ref={prevRef}
          className="absolute z-10 flex items-center justify-center w-8 h-8 text-white transition transform -translate-y-1/2 bg-blue-400 rounded-full shadow-lg cursor-pointer top-1/2 left-2 md:w-10 md:h-10 hover:bg-blue-500"
        >
          &#10094;
        </div>

        <div
          ref={nextRef}
          className="absolute z-10 flex items-center justify-center w-8 h-8 text-white transition transform -translate-y-1/2 bg-blue-400 rounded-full shadow-lg cursor-pointer top-1/2 right-2 md:w-10 md:h-10 hover:bg-blue-500"
        >
          &#10095;
        </div>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
