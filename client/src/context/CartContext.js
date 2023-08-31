import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [customVariable, setCustomVariable] = useState(""); // Define a custom variable

  const setCustomValue = (value) => {
    setCustomVariable(value);
  };
  console.log(customVariable)
  return (
    <CartContext.Provider
      value={{  customVariable, setCustomValue }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartContext;
