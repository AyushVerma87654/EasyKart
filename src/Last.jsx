import React, { useMemo, useState } from "react";
import ProductList from "./ProductList";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import ProductDisplay from "./ProductDisplay";
import PageNotFound from "./PageNotFound";
import CartPage from "./CartPage";
import Login from "./Login";
import SignUpPage from "./SignUpPage";
import ForgetPassword from "./ForgetPassword";

function Last() {
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

  let total = useMemo(() => {
    return Object.keys(cart).reduce((output, current) => {
      return output + cart[current];
    }, 0);
  }, [cart]);

  return (
    <div className="flex flex-col flex-wrap">
      <div className="h-auto bg-gray-300">
        <NavBar data={total} />
        <div className="px-8 py-16 flex">
          <div className="px-6 py-[14px] grow h-auto bg-white">
            <Routes>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/forget" element={<ForgetPassword />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route index element={<ProductList />}></Route>
              <Route
                path="/product/:id"
                element={<ProductDisplay onAddToCart={onAddToCart} />}
              ></Route>
              <Route
                path="/cart"
                element={<CartPage cart={cart} updateCart={updateCart} />}
              ></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Last;
