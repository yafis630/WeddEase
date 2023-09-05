import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCartCount = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    // Initialize cart count from local storage on component mount
    const storedCartCount = localStorage.getItem("cartCount");
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount, 10));
    }
  }, []);

  // Function to update cart count and store it in local storage
  const updateCartCount = (count) => {
    setCartCount(count);
    localStorage.setItem("cartCount", count.toString());
  };

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
export default CartContext