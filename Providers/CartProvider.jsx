import { useState } from "react";
import { CartContext } from "../src/Context";

function CartProvider({ children }) {
  const savedData = localStorage.getItem("Cart") || "{}";
  const savedCart = JSON.parse(savedData);
  const [cart, setCart] = useState(savedCart);

  let onAddToCart = (productId, count) => {
    const newCart = { ...cart, [productId]: (cart[productId] || 0) + count };
    updateCart(newCart);
  };

  let updateCart = (newCart) => {
    setCart(newCart);
    const cartData = JSON.stringify(newCart);
    localStorage.setItem("Cart", cartData);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, onAddToCart, updateCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
