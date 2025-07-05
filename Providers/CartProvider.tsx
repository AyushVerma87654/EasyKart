import React, { FC, useEffect, useMemo, useState } from "react";
import { getCart, getProductById, saveCart } from "../src/Api";
import { CartContext } from "../src/Context";
import { withUser } from "../src/ContextHoc";
import Loading from "../src/Loading";
import { cartType, mapType, productType } from "../src/models";

type CartProviderProps = { isLoggedIn: boolean; children: JSX.Element };

const CartProvider: FC<CartProviderProps> = ({ isLoggedIn, children }) => {
  const [cart, setCart] = useState<cartType[]>([]);
  const [loading, setLoading] = useState(true);

  const toCart = (data: productType[], savedCart: mapType) => {
    let newCart: cartType[] = [];
    data.map((item) => {
      const obj = { product: item, quantity: savedCart[item.id] };
      newCart = [...newCart, obj];
    });
    setCart(newCart);
  };

  const toMap: (data: cartType[]) => mapType = (data) => {
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
      const savedCart: mapType = JSON.parse(savedData);
      const id = Object.keys(savedCart);
      getProductById(id).then((data) => {
        toCart(data, savedCart);
        setLoading(false);
      });
    }
  }, []);

  let onAddToCart = (productId: number, count: number) => {
    const cartObject = toMap(cart);
    const newCart = {
      ...cartObject,
      [productId]: (cartObject[productId] || 0) + count,
    };
    updateCart(newCart);
  };

  let updateCart = (newQuantityMap: mapType) => {
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
};

export default withUser(CartProvider);
