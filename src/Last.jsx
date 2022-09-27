import React, { useState } from "react";
import ProductList from "./ProductList";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import ProductDisplay from "./ProductDisplay";
import PageNotFound from "./PageNotFound";
import { useEffect } from "react";

function Last() {
  const savedData = localStorage.getItem("Cart") || "{}";
  const savedCart = JSON.parse(savedData);
  let [total, setTotal] = useState(0);
  const [cart, setCart] = useState(savedCart);
  const [loading, setLoading] = useState(0);

  function onAddToCart(productId, count) {
    const newCart = { ...cart, [productId]: (cart[productId] || 0) + count };
    const cartData = JSON.stringify(newCart);
    localStorage.setItem("Cart", cartData);
    setCart(newCart);
    setLoading(productId);
  }

  useEffect(
    function () {
      let count = Object.keys(cart).reduce(function (output, current) {
        return output + cart[current];
      }, 0);

      setTotal(count);
    },
    [loading]
  );

  return (
    <>
      <div className="flex flex-col h-screen overflow-y-scroll bg-gray-300">
        <NavBar data={total} />
        <div className="px-8 py-16 p-2">
          <div className="px-8 py-[14px] bg-white">
            <Routes>
              <Route index element={<ProductList />}></Route>
              <Route
                path="/product/:id"
                element={<ProductDisplay onAddToCart={onAddToCart} />}
              ></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Last;
