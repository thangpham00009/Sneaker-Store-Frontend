import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import cartAPI from "../api/cart.api";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const [showCartPopup, setShowCartPopup] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  const user = useSelector((state) => state.userAuth.user);
  const isAuthenticated = useSelector((state) => state.userAuth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      const stored = localStorage.getItem("cart");
      if (stored) setCart(JSON.parse(stored));
      setInitialized(true);
    }
  }, [isAuthenticated]);


useEffect(() => {
  const syncCartWhenLogin = async () => {
  if (!isAuthenticated) return;

  let localCart = JSON.parse(localStorage.getItem("cart") || "[]");
  const res = await cartAPI.getCart();
  let serverCart = res.data?.items || [];
  if (localCart.length > 0) {
    for (let item of localCart) {
      await cartAPI.addToCart({
        productId: item.id,
        quantity: item.quantity,
      });
    }
    localStorage.removeItem("cart");
  }

  const finalCartRes = await cartAPI.getCart();
  const finalCartItems = finalCartRes.data?.items || [];
  setCart(finalCartItems);
};
  syncCartWhenLogin();
}, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, initialized]);

const addToCart = async (product, quantity = 1) => {
  if (!isAuthenticated) {
    const exist = cart.find((item) => item.id === product.id);
    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    setLastAdded({ ...product, quantity });
  } else {
    await cartAPI.addToCart({
      productId: product.id,
      quantity,
    });
    const res = await cartAPI.getCart();
    setCart(res.data?.items || []);
    setLastAdded({ ...product, quantity }); 
  }

  setShowCartPopup(true);
};

const removeFromCart = async (id) => {
  if (!isAuthenticated) {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);

    if (lastAdded?.id === id) {
      setLastAdded(newCart[0] || null);
    }
  } else {
    await cartAPI.removeCartItem(id);
    const res = await cartAPI.getCart();
    const newCart = res.data?.items || [];
    setCart(newCart);

    // ⭐ FIX: tìm theo product.id
    if (lastAdded?.id === id) {
      const firstItem = newCart[0];
      setLastAdded(
        firstItem
          ? { ...firstItem.product, quantity: firstItem.quantity }
          : null
      );
    }
  }
};

const updateQuantity = async (id, quantity) => {
  const qty = parseInt(quantity);
  if (qty < 1) return;

  if (!isAuthenticated) {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCart(newCart);

    if (lastAdded?.id === id) {
      const updatedItem = newCart.find((item) => item.id === id);
      setLastAdded(updatedItem);
    }
  } else {
    await cartAPI.updateCartItem({ productId: id, quantity: qty });

    const res = await cartAPI.getCart();
    const newCart = res.data?.items || [];
    setCart(newCart);

    // ⭐ FIX CHÍNH
    const updatedItem = newCart.find((item) => item.product?.id === id);

    if (updatedItem) {
      setLastAdded({
        ...updatedItem.product,
        quantity: updatedItem.quantity,
      });
    }
  }
};

  const value = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    showCartPopup,
    setShowCartPopup,
    lastAdded,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
