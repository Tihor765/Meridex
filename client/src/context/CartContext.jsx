/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

const addToCart = (product) => {
  

  setCartItems((prev) => [...prev, product]);
};

const removeFromCart = (id) => {
  setCartItems((prev) =>
    prev.filter((item) => item._id !== id)
  );
};

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};