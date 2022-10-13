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
import NewUser from "./NewUser";
import OldUser from "./OldUser";
import CartButton from "./CartButton";
// import AlertDetail from "./AlertShow";
import AlertList from "./AlertList";
import AlertProvider from "../Providers/AlertProvider";
import UserProvider from "../Providers/UserProvider";
import { withAlert, withUser } from "./ContextHoc";
import { CartContext } from "./Context";

function Last({ user, alert, handleButtonRemoveUser }) {
  const [refresh, setRefresh] = useState(true);
  console.log(alert);

  useEffect(() => {
    setRefresh(!refresh);
  }, [user]);

  return (
    <div className="flex flex-col flex-wrap">
      <div className="h-auto bg-gray-300">
        {user && (
          <div className="bg-red-500 font-bold text-2xl w-full text-blue-700 p-4">
            <div className="flex items-center justify-center h-20">
              Hey {user.full_name}, Welcome Back!
            </div>
            <div className="w-40 h-12">
              <CartButton
                data="Logout"
                className="text-blue-700 text-2xl font-bold"
                onClick={handleButtonRemoveUser}
              />
            </div>
          </div>
        )}
        <NavBar />
        <div className="px-8 py-16 flex">
          <div className="px-6 py-[14px] grow h-auto bg-white">
            <Routes>
              <Route
                path="/signup"
                element={
                  <NewUser>
                    <SignUpPage />
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
                    <Login />
                  </NewUser>
                }
              ></Route>
              <Route
                index
                element={
                  <OldUser>
                    <ProductList />
                  </OldUser>
                }
              ></Route>
              <Route
                path="/product/:id"
                element={
                  <OldUser>
                    <ProductDisplay />
                  </OldUser>
                }
              ></Route>
              <Route
                path="/cart"
                element={
                  <OldUser>
                    <CartPage />
                  </OldUser>
                }
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

export default withUser(withAlert(Last));
