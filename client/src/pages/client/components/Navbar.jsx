import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaSearch, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onHeightChange }) => {
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navRef = useRef(null);
  const navigate = useNavigate();

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
    <nav ref={navRef} className="w-full bg-white shadow-md relative">
      <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center text-gray-800 font-semibold">
        
        {/* Desktop menu - centered */}
        <ul className="hidden md:flex gap-6 justify-center flex-1">
          {menuItems.map((item, i) => (
            <li key={i} className="cursor-pointer hover:text-black flex items-center gap-1">
              <a href={item.href}>{item.name}</a>
              {item.name !== "BIG SALE" && <FaChevronDown className="text-xs" />}
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-4 text-xl relative">
          {/* Search input */}
          <div className="relative">
            <FaSearch
              className="cursor-pointer"
              onClick={() => setShowSearch(!showSearch)}
            />
            {showSearch && (
              <form 
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-full mt-2 w-64 flex items-center bg-white border rounded shadow-lg z-50"
              >
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder="Tìm kiếm..."
                  className="flex-1 px-3 py-2 outline-none text-sm"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                >
                  <FaSearch />
                </button>
              </form>
            )}
          </div>

          {/* Shopping cart */}
          <div 
            className="relative cursor-pointer"
            onClick={() => navigate("/cart")}
          >
            <FaShoppingCart />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
              0
            </span>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <ul className="md:hidden bg-white border-t flex flex-col gap-3 px-4 py-3">
          {menuItems.map((item, i) => (
            <li key={i} className="cursor-pointer hover:text-black flex items-center gap-1">
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
