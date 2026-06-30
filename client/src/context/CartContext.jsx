/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

const addToCart = (product) => {
  setCartItems((prev) => {
    const existingItem = prev.find(
      (item) => item._id === product._id
    );

    if (existingItem) {
      return prev.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...prev, { ...product, quantity: 1 }];
  });
};

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };
const increaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item._id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};  

  // ✅ Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};