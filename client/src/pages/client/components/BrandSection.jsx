import React from "react";
import { Link } from "react-router-dom";
const BrandSection = ({ title, banner, products }) => {
  return (  
    <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-10">

      {/* Tiêu đề */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold inline-block pb-4 relative">
          {title}
          <span className="absolute left-1/2 -translate-x-1/2 bottom-0 w-16 h-1 bg-blue-400 rounded"></span>
        </h2>
      </div>

      {/* Banner */}
      <div className="w-full mb-10">
        <img
          src={banner}
          alt={title}
          className="w-full rounded-md shadow-md"
        />
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {products.map((item, i) => (
         
<div key={i} className="text-center group">

  {/* Product card */}
  <div className="relative mb-3 overflow-hidden rounded-md">

    {/* Badge giảm giá */}
    {item.discount && (
      <span className="absolute left-2 top-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-20">
        -{item.discount}%
      </span>
    )}

    {/* Image */}
    <img
      src={item.image}
      alt={item.name}
      className="w-full h-auto object-cover transition duration-300 group-hover:brightness-75"
    />

    {/* Hover buttons */}
    <div
      className="
        absolute inset-0 flex flex-col gap-2 items-center justify-center
        opacity-0 group-hover:opacity-100
        translate-y-4 group-hover:translate-y-0
        transition-all duration-300 z-30
      "
    >
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

  {/* Product name */}
  <p className="text-sm font-semibold h-12">{item.name}</p>

  {/* Price */}
  <div className="text-red-600 font-bold">{item.price.toLocaleString()}₫</div>

  {item.oldPrice && (
    <div className="text-gray-500 line-through text-xs">
      {item.oldPrice.toLocaleString()}₫
    </div>
  )}
</div>
        ))}
      </div>
    </div>
  );
};

export default BrandSection;
