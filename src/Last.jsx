import React, { useCallback, useMemo, useState } from "react";
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
  // let [total, setTotal] = useState(0);let total
  const [cart, setCart] = useState(savedCart);
  const [loading, setLoading] = useState(0);

  let onAddToCart = (productId, count) => {
    const newCart = { ...cart, [productId]: (cart[productId] || 0) + count };
    const cartData = JSON.stringify(newCart);
    localStorage.setItem("Cart", cartData);
    setCart(newCart);
    setLoading(productId);
  };

  let total = useMemo(() => {
    return Object.keys(cart).reduce((output, current) => {
      return output + cart[current];
    }, 0);
  }, [cart]);

  console.log(total);

  return (
    <>
      <div className="overflow-y-scroll h-screen bg-gray-300">
        <NavBar data={total} />
        <div className="px-8 py-16 p-2 flex">
          <div className="px-8 py-[14px] grow h-auto bg-white">
            <Routes>
              <Route path="/signup" element={<SignUpPage />}></Route>
              <Route path="/forget" element={<ForgetPassword />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route index element={<ProductList />}></Route>
              <Route
                path="/product/:id"
                element={<ProductDisplay onAddToCart={onAddToCart} />}
              ></Route>
              <Route path="/cart" element={<CartPage cart={cart} />}></Route>
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
