import React, { useState } from "react";
import { useCart } from "../../../context/CartProvider";
import imageDefault from "../../../assets/default.jpg";

const sizes = [36.5,37,37.5,38,38.5,39,40,40.5,41,41.5,42,42.5,43,43.5,44,44.5,45,45.5,46,46.5];

const QuickViewPopup = ({ product, onClose }) => {
const { addToCart } = useCart();
const [selectedSize, setSelectedSize] = useState(null);
const [quantity, setQuantity] = useState(1);

if (!product) return null;

return (
<div
className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
onClick={(e) => e.target === e.currentTarget && onClose()}
>
<div
className="relative flex flex-col w-full max-w-4xl gap-6 p-6 bg-white shadow-xl rounded-xl md:flex-row"
onClick={(e) => e.stopPropagation()}
> <button  
       onClick={onClose}  
       className="absolute text-2xl top-4 right-4"  
     >
× </button>
    {/* Ảnh sản phẩm */}  
    <div className="flex items-center justify-center md:w-1/2">  
      <img  
        src={product.images?.[0]?.url || imageDefault}  
        alt={product.name}  
        className="object-cover w-full rounded-md max-h-96"  
      />  
    </div>  

    {/* Thông tin sản phẩm */}  
    <div className="flex flex-col justify-between md:w-1/2">  
      <div>  
        <h3 className="mb-2 text-2xl font-bold transition-colors duration-200 cursor-pointer hover:text-blue-600">  
          {product.name}  
        </h3>  

        <div className="flex flex-wrap items-center gap-4 mb-2 text-sm text-gray-600">  
          {product.brand && (  
            <span className="font-semibold">Thương hiệu: <span className="font-normal text-red-600 ">{product.brand.name}</span></span>  
          )}  
          <span className="font-semibold">Tình trạng: <span className="font-normal text-red-600">{product.status === "Active" ? "Còn hàng" : "Hết hàng"}</span></span>  
        </div>  

      {/* Mô tả */}
            {product.description && (
            <div
                className="mb-4 text-gray-700"
                dangerouslySetInnerHTML={{
                __html: product.description.replace(/<\/?p>/g, ''),
                }}
            />
            )}

        {/* Giá */}  
        <div className="mb-4">  
          <span className="text-xl font-bold text-red-600">  
            {product.discountPrice.toLocaleString()}₫  
          </span>  
          {product.discount > 0 && (  
            <span className="ml-2 text-gray-400 line-through">  
              {product.price.toLocaleString()}₫  
            </span>  
          )}  
        </div>  

        {/* Chọn size */}  
        <p className="mb-2 font-semibold">Size:</p>  
        <div className="grid grid-cols-6 gap-2 mb-4">  
          {sizes.map(size => (  
            <div  
              key={size}  
              className={`cursor-pointer border py-1 text-center rounded ${  
                selectedSize === size ? "bg-red-500 text-white font-semibold" : "hover:border-red-500"  
              }`}  
              onClick={() => setSelectedSize(size)}  
            >  
              {size}  
            </div>  
          ))}  
        </div>  

        {/* Chọn số lượng */}  
        <div className="flex items-center gap-2 mb-4">  
          <button  
            onClick={() => setQuantity(q => Math.max(1, q - 1))}  
            className="w-8 h-8 border rounded hover:bg-gray-100"  
          >  
            -  
          </button>  
          <input  
            type="number"  
            className="w-12 text-center border-t border-b"  
            value={quantity}  
            onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}  
          />  
          <button  
            onClick={() => setQuantity(q => q + 1)}  
            className="w-8 h-8 border rounded hover:bg-gray-100"  
          >  
            +  
          </button>  
        </div>  
      </div>  

      {/* Nút thêm vào giỏ */}  
      <div className="flex justify-end">  
        <button  
          className="px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800"  
          onClick={() => {  
            if (!selectedSize) return alert("Vui lòng chọn size");  
            addToCart(product, quantity, selectedSize);  
            onClose();  
          }}  
        >  
          Thêm vào giỏ hàng  
        </button>  
      </div>  
    </div>  
  </div>  
</div>  
);
};

export default QuickViewPopup;
