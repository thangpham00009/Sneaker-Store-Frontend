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
      if (stored) setCart(JSON.parse(stored).map(normalizeCartItem));
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
      setCart((finalCartRes.data?.items || []).map(normalizeCartItem));
    };
    syncCartWhenLogin();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && initialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isAuthenticated, initialized]);

    const normalizeCartItem = (item) => {
      const product = item.product ?? item;

      const productId =
        item.product_id ??
        item.productId ??
        product.id;

      const size = item.size;

      return {
        key: `${productId}-${size}`,
        productId,
        size,
        quantity: item.quantity ?? 1,
        product,
      };
    };

 const addToCart = async (product, quantity = 1, size) => {
  if (!size) return alert("Vui lòng chọn size");

  const key = `${product.id}-${size}`;

  if (!isAuthenticated) {
    setCart((prev) => {
      const exist = prev.find((i) => i.key === key);

      const newCart = exist
        ? prev.map((i) =>
            i.key === key
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        : [...prev, normalizeCartItem({ product, quantity, size })];

      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  } else {
    await cartAPI.addToCart({
      productId: product.id,
      quantity,
      size,
    });

    const res = await cartAPI.getCart();
    setCart(res.data.items.map(normalizeCartItem));
  }

  setShowCartPopup(true);
};

const removeFromCart = async (key) => {
  if (!isAuthenticated) {
    setCart((prev) => {
      const newCart = prev.filter((i) => i.key !== key);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  } else {
    const [productId, size] = key.split("-");
    await cartAPI.removeCartItem(productId, size);
    const res = await cartAPI.getCart();
    setCart(res.data.items.map(normalizeCartItem));
  }
};

 const updateQuantity = async (key, quantity) => {
  if (quantity < 1) return;

  if (!isAuthenticated) {
    setCart((prev) => {
      const newCart = prev.map((i) =>
        i.key === key ? { ...i, quantity } : i
      );
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  } else {
    const [productId, size] = key.split("-");
    await cartAPI.updateCartItem({
      productId,
      size,
      quantity,
    });
    const res = await cartAPI.getCart();
    setCart(res.data.items.map(normalizeCartItem));
  }
};

  return (
    <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, updateQuantity, showCartPopup, setShowCartPopup }}>
      {children}
    </CartContext.Provider>
  );
};
