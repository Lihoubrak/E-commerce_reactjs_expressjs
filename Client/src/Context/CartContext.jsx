import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [item , setItem]= useState(0)
  return (
    <CartContext.Provider value={{ item, setItem }}>{children}</CartContext.Provider>
  );
}

export default CartContext;
