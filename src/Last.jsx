import React, { useCallback, useMemo, useState, createContext } from "react";
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
import MobileMenu from "./MobileMenu";
import Loading from "./Loading";
import CartButton from "./CartButton";

export const Context = React.createContext();

function Last() {
  const savedData = localStorage.getItem("Cart") || "{}";
  const savedCart = JSON.parse(savedData);
  const [cart, setCart] = useState(savedCart);
  const [loading, setLoading] = useState(0);

  // console.log("Original Cart", cart);

  let onAddToCart = (productId, count) => {
    const newCart = { ...cart, [productId]: (cart[productId] || 0) + count };
    const cartData = JSON.stringify(newCart);
    localStorage.setItem("Cart", cartData);
    console.log(productId, count);
    setCart(newCart);
    setLoading(productId);
  };

  let onAddFromCart = (productId, count) => {
    const newCart = { ...cart, [productId]: count };
    // const cartData = JSON.stringify(newCart);
    // localStorage.setItem("Cart", cartData);
    console.log("Product added", productId, count);
    console.log("New Cart", newCart);
    setCart(newCart);
    setLoading(productId);
  };

  let total = useMemo(() => {
    return Object.keys(cart).reduce((output, current) => {
      return output + cart[current];
    }, 0);
  }, [cart]);

  // if (loading) {
  //   return <Loading />;
  // }

  return (
    <div className="flex flex-col flex-wrap">
      <div className="h-auto bg-gray-300">
        <NavBar data={total} />
        <div className="px-8 py-16 p-2 flex">
          <div className="px-6 py-[14px] grow h-auto bg-white">
            <Context.Provider value={onAddFromCart}>
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
            </Context.Provider>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Last;
