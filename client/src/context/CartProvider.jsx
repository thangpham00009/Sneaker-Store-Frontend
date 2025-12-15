import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cartAPI from "../api/cart.api";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const user = useSelector((state) => state.userAuth.user);
  const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);

  // load local cart
  useEffect(() => {
    if (!isAuthenticated) {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
      setInitialized(true);
    }
  }, [isAuthenticated]);

  // sync cart khi login
  useEffect(() => {
    const syncCartWhenLogin = async () => {
      if (!isAuthenticated) return;

      let localCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const res = await cartAPI.getCart();
      let serverCart = res.data?.items || [];

      if (localCart.length > 0) {
        for (let item of localCart) {
        await cartAPI.addToCart({
          productId: Number(item.id),
          quantity: Number(item.quantity),
          size: String(item.size),
        });
        }
        localStorage.removeItem("cart");
      }

      const finalCartRes = await cartAPI.getCart();
      setCart(finalCartRes.data?.items || []);
    };
    syncCartWhenLogin();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, initialized]);

  const addToCart = async (product, quantity = 1, size) => {
    if (!size) return alert("Vui lòng chọn size");

    if (!isAuthenticated) {
      const exist = cart.find((item) => item.id === product.id && item.size === size);
      if (exist) {
        setCart(cart.map((item) => 
          item.id === product.id && item.size === size ? {...item, quantity: item.quantity + quantity} : item
        ));
      } else {  
        setCart([...cart, { ...product, quantity, size }]);
      }
    } else {
        await cartAPI.addToCart({
          productId: Number(product.id),
          quantity: Number(quantity),
          size: String(size),
        });

        const res = await cartAPI.getCart();
        setCart(res.data?.items || []);
      }


    setShowCartPopup(true);
  };

  const removeFromCart = async (id, size) => {
    if (!isAuthenticated) {
      setCart(cart.filter((item) => !(item.id === id && item.size === size)));
    } else {
      await cartAPI.removeCartItem(id, size);
      const res = await cartAPI.getCart();
      setCart(res.data?.items || []);
    }
  };

  const updateQuantity = async (id, quantity, size) => {
    const qty = parseInt(quantity);
    if (qty < 1) return;

    if (!isAuthenticated) {
      setCart(cart.map((item) => 
        item.id === id && item.size === size ? { ...item, quantity: qty } : item
      ));
    } else {
      await cartAPI.updateCartItem({ productId: id, quantity: qty, size });
      const res = await cartAPI.getCart();
      setCart(res.data?.items || []);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, showCartPopup, setShowCartPopup }}>
      {children}
    </CartContext.Provider>
  );
};
