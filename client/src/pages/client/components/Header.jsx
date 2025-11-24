import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/sneaker-logo.jfif"; 

const Header = ({ onHeightChange }) => {
  const navigate = useNavigate();
  const headerRef = useRef(null);

  useEffect(() => {
    if (headerRef.current) {
      onHeightChange(headerRef.current.offsetHeight);
    }
  }, [headerRef, onHeightChange]);

  return (
    <header ref={headerRef} className="w-full bg-white shadow-md">
      {/* Top info */}
      <div className="w-full border-b py-1 px-4 md:px-6 flex justify-between text-sm text-gray-700">
        <div className="text-xs md:text-sm">
          <span>Hotline: 0968456761</span>
          <span className="ml-4 md:ml-6">Email: sneakerstore@gmail.com</span>
        </div>
        <div className="flex gap-2 md:gap-4 text-xs md:text-sm">
          <button onClick={() => navigate("/register")} className="hover:underline">Đăng ký</button>
          <button onClick={() => navigate("/login")} className="hover:underline">Đăng nhập</button>
          <button onClick={() => navigate("/contact")} className="hover:underline">Liên hệ</button>
        </div>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-3 md:py-4 border-b">
        <img
          src={logo}
          alt="Logo"
          className="h-28 md:h-32 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
    </header>
  );
};

export default Header;
