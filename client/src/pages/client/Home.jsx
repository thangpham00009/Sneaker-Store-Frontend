import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Slide from "./components/Slide";
import Footer from "./components/Footer";
import ProductSlider from "./components/ProductSlider";
import BrandSection from "./components/BrandSection";

export default function Home() {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);

  const brandProducts = [
    {
      name: "ONITSUKA TIGER MEXICO 66 YELLOW",
      image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS1CzrF95KFrAYH7qqM7VuuyfDTjmkV010gD8MrTrMcuoo5-THgGcsl3B3_Z3BwQAOSzs13s9mWmtdaZVs_N6vNK9VbAED2j9oBwxGd4yBTM8V7BnCQvuQ9cAcxP0As60DW-gwIhQ&usqp=CAc",
      price: 2450000,
      oldPrice: 3200000,
      discount: 23
    },
    {
      name: "ONITSUKA TIGER TOKUTEN WHITE BLACK",
      image: "https://example.com/sp2.jpg",
      price: 2250000,
      oldPrice: 3200000,
      discount: 30
    },
    {
      name: "ONITSUKA TIGER MEXICO 66 SD CREAM BLUE",
      image: "https://example.com/sp3.jpg",
      price: 2650000,
      oldPrice: 3200000,
      discount: 17
    }
  ];

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800">
      <Header onHeightChange={setHeaderHeight} />
      <Navbar onHeightChange={setNavbarHeight} />

      <ProductSlider />
      <Slide />

      <div className="container mx-auto py-20">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Trending Sneakers
        </h1>
        <p className="text-center text-gray-600 mt-2 text-sm md:text-base">
          Những đôi giày hot nhất hiện nay
        </p>
      </div>

      {/* Brand Section */}
      <BrandSection
        title="ONITSUKA TIGER"
        banner="https://upcontent.vn/wp-content/uploads/2024/07/banner-giay.jpg"
        products={brandProducts}
      />
     {/* Brand Section */}
      <BrandSection
        title="BIG SALE"
        banner="https://i.ytimg.com/vi/CXSko9ySpyo/maxresdefault.jpg"
        products={brandProducts}
      />
      <Footer />
    </div>
  );
}
