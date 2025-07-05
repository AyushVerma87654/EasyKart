import React, { FC, useEffect, useState } from "react";
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
import { withUser } from "./ContextHoc";
import Alert from "./Alert";

type LastProps = { user: any; handleButtonRemoveUser: () => void };

const Last: FC<LastProps> = ({ user, handleButtonRemoveUser }) => {
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    setRefresh(!refresh);
  }, [user]);

  return (
    <div className="flex flex-col flex-wrap">
      <div className="h-auto bg-gray-300">
        <Alert />
        {user && (
          <div className="bg-red-500 font-bold text-2xl w-full text-blue-700 p-4">
            <div className="flex items-center justify-center h-20">
              Hey {user.full_name}, Welcome Back!
            </div>
            <div className="w-40 h-12">
              <CartButton
                className="text-blue-700 text-2xl font-bold"
                onClick={handleButtonRemoveUser}
              >
                Logout
              </CartButton>
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
                  <OldUser>
                    <SignUpPage />
                  </OldUser>
                }
              ></Route>
              <Route path="/forget" element={<ForgetPassword />}></Route>
              <Route
                path="/login"
                element={
                  <OldUser>
                    <Login />
                  </OldUser>
                }
              ></Route>
              <Route index element={<ProductList />}></Route>
              <Route path="/product/:id" element={<ProductDisplay />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default withUser(Last);
