import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    img: "https://bizweb.dktcdn.net/thumb/1024x1024/100/370/487/products/66fb70a7-91cf-425a-b0b4-e627278def92.jpg?v=1748081240900",
    name: "KÍNH ZARA BLACK/BL",
    price: 250000,
    oldPrice: 650000,
    discount: 62,
    slug: "kinh-zara-black-bl"
  },
  {
    id: 2,
    img: "https://i.imgur.com/fy5ZsCn.jpeg",
    name: "NÓN NIKE BLACK/W/R UNISSEX",
    price: 220000,
    oldPrice: 520000,
    discount: 58,
    slug: "non-nike-black-w-r-unisex"
  },
  {
    id: 3,
    img: "https://i.imgur.com/OkpF0fC.jpeg",
    name: "ÁO ADLV x BURIED ALIVE WHITE",
    price: 300000,
    oldPrice: 850000,
    discount: 65,
    slug: "ao-adlv-x-buried-alive-white"
  },
  {
    id: 4,
    img: "https://i.imgur.com/6IUbKfK.jpeg",
    name: "COMBO 3 Vớ Nike Drift White",
    price: 170000,
    oldPrice: 300000,
    discount: 43,
    slug: "combo-3-vo-nike-drift-white"
  },
  {
    id: 5,
    img: "https://i.imgur.com/6IUbKfK.jpeg",
    name: "COMBO 3 Vớ Nike Drift White",
    price: 170000,
    oldPrice: 300000,
    discount: 43,
    slug: "combo-3-vo-nike-drift-white"
  },
];

const ProductSlider = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="container mx-auto py-10 relative">
      {/* Tiêu đề slider */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold relative pb-4 inline-block">
          SINCE 2016 IN SAIGON
          <span className="absolute left-1/2 transform -translate-x-1/2 bottom-0 w-12 h-1 bg-blue-400 rounded"></span>
        </h2>
      </div>

      {/* Slider */}
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
        {products.map((item) => (
         <SwiperSlide key={item.id}>
    <div className="relative bg-white shadow-md rounded-md overflow-hidden group">
        {/* Discount badge */}
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-20">
        -{item.discount}%
        </div>

        {/* Image */}
        <div className="relative">
        <img
            src={item.img}
            alt={item.name}
            className="w-full h-64 object-cover transition duration-300 group-hover:brightness-75"
        />

        {/* Hover Buttons */}
        <div className="
            absolute inset-0 flex flex-col gap-2 items-center justify-center 
            opacity-0 group-hover:opacity-100 
            translate-y-4 group-hover:translate-y-0 
            transition-all duration-300 z-30
        ">
            <Link
                to={`/san-pham/${item.slug}`}
                className="w-32 py-2 bg-white border rounded-md text-gray-800 font-semibold shadow hover:bg-gray-100 text-center"
                >
                Tùy chọn
            </Link>


            <button className="w-32 py-2 bg-blue-500 text-white rounded-md font-semibold shadow hover:bg-blue-600">
            Mua nhanh
            </button>
        </div>
        </div>

        {/* Info */}
        <div className="p-4 text-center">
        <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
        <div className="mt-2">
            <span className="text-red-500 font-bold">{item.price.toLocaleString()}₫</span>
            <span className="text-gray-400 line-through ml-2">
            {item.oldPrice.toLocaleString()}₫
            </span>
        </div>
        </div>
    </div>
</SwiperSlide>

        ))}

        {/* Custom navigation buttons */}
        <div
          ref={prevRef}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-blue-400 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-blue-500 transition z-10"
        >
          &#10094;
        </div>
        <div
          ref={nextRef}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 bg-blue-400 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg hover:bg-blue-500 transition z-10"
        >
          &#10095;
        </div>
      </Swiper>
    </div>
  );
};

export default ProductSlider;
