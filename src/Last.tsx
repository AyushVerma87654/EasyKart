import React, { FC, useEffect, useState } from "react";
import ProductList from "./ProductList";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { Route, Routes } from "react-router-dom";
import ProductDisplay from "./ProductDisplay";
import PageNotFound from "./PageNotFound";
import CartPage from "./CartPage";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";
import ForgetPasswordPage from "./ForgetPasswordPage";
import NewUser from "./NewUser";
import OldUser from "./OldUser";
import CartButton from "./CartButton";
import { withUser } from "./ContextHoc";
import Alert from "./Alert";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  isLoggedInSelector,
  userSelector,
} from "./redux/selectors/userSelector";
import { logoutInitiatedAction } from "./redux/slice/userSlice";
import ProfilePage from "./ProfilePage";
import CodeVerificationPage from "./CodeVerificationPage";
import ResetPasswordPage from "./ResetPasswordPage";

interface LastProps extends ReduxProps {}

const Last: FC<LastProps> = ({ user, logout, isLoggedIn }) => {
  const [refresh, setRefresh] = useState(true);

  // useEffect(() => {
  //   setRefresh(!refresh);
  // }, [user]);

  return (
    <div className="flex flex-col flex-wrap">
      <div className="h-auto bg-gray-300">
        <Alert />
        {/* {isLoggedIn && (
          <div className="bg-red-500 font-bold text-2xl w-full text-blue-700 p-4">
            <div className="flex items-center justify-center h-20">
              Hey {user.userName}, Welcome Back!
            </div>
            <div className="w-40 h-12">
              <CartButton
                className="text-blue-700 text-2xl font-bold"
                onClick={() => logout()}
              >
                Logout
              </CartButton>
            </div>
          </div>
        )} */}
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
              <Route path="/forget" element={<ForgetPasswordPage />}></Route>
              <Route
                path="/login"
                element={
                  <OldUser>
                    <LoginPage />
                  </OldUser>
                }
              ></Route>
              <Route index element={<ProductList />}></Route>
              <Route path="/product/:id" element={<ProductDisplay />}></Route>
              <Route path="/cart" element={<CartPage />}></Route>
              <Route
                path="/code-verification"
                element={<CodeVerificationPage />}
              ></Route>
              <Route
                path="/reset-password"
                element={<ResetPasswordPage />}
              ></Route>
              <Route
                path="/profile"
                element={
                  <NewUser>
                    <ProfilePage />
                  </NewUser>
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
};

const mapStateToProps = (state: AppState) => ({
  user: userSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  logout: logoutInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Last);
