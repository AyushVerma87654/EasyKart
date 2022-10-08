import React, { useMemo, useEffect, useState } from "react";
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
import axios from "axios";
import Loading from "./Loading";
import NewUser from "./NewUser";
import OldUser from "./OldUser";

export const UserContext = React.createContext();

function Last() {
  const savedData = localStorage.getItem("Cart") || "{}";
  const savedCart = JSON.parse(savedData);
  const [cart, setCart] = useState(savedCart);
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const userData = { user, setUser };

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: { Authorization: token },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

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

  if (loading) {
    <Loading />;
  }

  return (
    <div className="flex flex-col flex-wrap">
      <div className="h-auto bg-gray-300">
        {user && (
          <div className="flex items-center justify-center font-bold text-2xl text-blue-700 bg-red-500 h-20 w-full">
            Hey {user.full_name}, Welcome Back!
          </div>
        )}
        <UserContext.Provider value={userData}>
          <NavBar data={total} />
          <div className="px-8 py-16 flex">
            <div className="px-6 py-[14px] grow h-auto bg-white">
              <Routes>
                <Route
                  path="/signup"
                  element={
                    <NewUser>
                      <SignUpPage setUser={setUser} />
                    </NewUser>
                  }
                ></Route>
                <Route
                  path="/forget"
                  element={
                    <OldUser>
                      <ForgetPassword />
                    </OldUser>
                  }
                ></Route>
                <Route
                  path="/login"
                  element={
                    <NewUser>
                      <Login setUser={setUser} user={user} />
                    </NewUser>
                  }
                ></Route>
                <Route
                  index
                  element={
                    <OldUser>
                      <ProductList user={user} />
                    </OldUser>
                  }
                ></Route>
                <Route
                  path="/product/:id"
                  element={
                    <OldUser>
                      <ProductDisplay user={user} onAddToCart={onAddToCart} />
                    </OldUser>
                  }
                ></Route>
                <Route
                  path="/cart"
                  element={
                    <OldUser>
                      <CartPage cart={cart} updateCart={updateCart} />
                    </OldUser>
                  }
                ></Route>
                <Route path="*" element={<PageNotFound />}></Route>
              </Routes>
            </div>
          </div>
          <Footer />
        </UserContext.Provider>
      </div>
    </div>
  );
}

export default Last;
