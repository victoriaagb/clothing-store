import { createContext, useState } from "react";

export const CartContext = createContext({
  cartItems: [],
  setCartItems: () => null,
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const value = { isCartOpen, setIsCartOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
