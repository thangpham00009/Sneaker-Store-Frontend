import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartProvider";

const Navbar = ({ onHeightChange }) => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navRef = useRef(null);
  const navigate = useNavigate();
  const { cart } = useCart();

  // 🛡 Giỏ hàng an toàn, tránh crash
  const safeCart = Array.isArray(cart) ? cart : [];

  const menuItems = [
    { name: "BIG SALE", href: "/big-sale" },
    { name: "ONITSUKA TIGER", href: "/onitsuka-tiger" },
    { name: "NIKE", href: "/nike" },
    { name: "ADIDAS", href: "/adidas" },
    { name: "CONVERSE", href: "/converse" },
    { name: "VANS", href: "/vans" },
    { name: "CLOTHING SALE", href: "/clothing-sale" }
  ];

  useEffect(() => {
    if (navRef.current) {
      onHeightChange(navRef.current.offsetHeight);
    }
  }, [navRef, onHeightChange]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== "") {
      navigate(`/search?q=${encodeURIComponent(searchValue)}`);
      setSearchValue("");
      setShowSearch(false);
    }
  };

  return (
    <nav ref={navRef} className="relative w-full bg-white shadow-md">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto font-semibold text-gray-800 md:px-6">
        
        {/* Desktop menu */}
        <ul className="justify-center flex-1 hidden gap-6 md:flex">
          {menuItems.map((item, i) => (
            <li key={i} className="flex items-center gap-1 cursor-pointer hover:text-black">
              <a href={item.href}>{item.name}</a>
              {item.name !== "BIG SALE" && <FaChevronDown className="text-xs" />}
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <div className="text-2xl cursor-pointer md:hidden" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* Right icons */}
        <div className="relative flex items-center gap-4 text-xl">
          
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 z-50 flex items-center w-64 mt-2 bg-white border rounded shadow-lg top-full"
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="flex-1 px-3 py-2 text-sm outline-none"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-2 text-white bg-blue-500 rounded-r hover:bg-blue-600"
                >
                  <FaSearch />
                </button>
              </form>
            )}
          </div>

          {/* Cart */}
          <div 
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
            <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2">
              {safeCart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="flex flex-col gap-3 px-4 py-3 bg-white border-t md:hidden">
          {menuItems.map((item, i) => (
            <li key={i} className="flex items-center gap-1 cursor-pointer hover:text-black">
              <a href={item.href}>{item.name}</a>
              {item.name !== "BIG SALE" && <FaChevronDown className="text-xs" />}
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
