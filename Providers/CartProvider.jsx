import React, { useEffect, useMemo, useState } from "react";
import { getCart, getProductById, saveCart } from "../src/Api";
import { CartContext } from "../src/Context";
import { withUser } from "../src/ContextHoc";
import Loading from "../src/Loading";

function CartProvider({ isLoggedIn, children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const toCart = (data, savedCart) => {
    let newCart = [];
    data.map((item) => {
      const obj = { product: item, quantity: savedCart[item.id] };
      newCart = [...newCart, obj];
    });
    setCart(newCart);
  };

  const toMap = (data) => {
    let newQuantityMap = {};
    data.map((item) => {
      newQuantityMap = { ...newQuantityMap, [item.product.id]: item.quantity };
    });
    return newQuantityMap;
  };

  useEffect(function () {
    if (isLoggedIn) {
      setLoading(true);
      getCart().then((data) => {
        setCart(data);

        setLoading(false);
      });
    } else {
      setLoading(true);
      const savedData = localStorage.getItem("Cart") || "{}";
      const savedCart = JSON.parse(savedData);
      const id = Object.keys(savedCart);
      getProductById(id).then((data) => {
        toCart(data, savedCart);
        setLoading(false);
      });
    }
  }, []);

  let onAddToCart = (productId, count) => {
    const cartObject = toMap(cart);
    const newCart = {
      ...cartObject,
      [productId]: (cartObject[productId] || 0) + count,
    };
    updateCart(newCart);
  };

  let updateCart = (newQuantityMap) => {
    if (isLoggedIn) {
      saveCart(newQuantityMap);
    } else {
      const quantityMapString = JSON.stringify(newQuantityMap);
      localStorage.setItem("Cart", quantityMapString);
    }
    const id = Object.keys(newQuantityMap);
    getProductById(id).then((data) => {
      toCart(data, newQuantityMap);
    });
  };

  const total = useMemo(() => {
    return cart
      .map((item) => {
        return item.product.price * item.quantity;
      })
      .reduce((total, current) => total + current, 0);
  }, [cart]);

  // const totalCountt = useMemo(() => {
  //   const array = cart.map((item) => item.quantity);
  //   return array.reduce((total, current) => total + current, 0);
  // }, [cart]);

  const totalCount = useMemo(() => {
    return cart
      .map((item) => item.quantity)
      .reduce((total, current) => total + current, 0);
  }, [cart]);

  if (loading) {
    return <Loading />;
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        onAddToCart,
        updateCart,
        totalCount,
        total,
        toMap,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default withUser(CartProvider);
