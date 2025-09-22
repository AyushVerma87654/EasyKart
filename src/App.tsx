import { FC } from "react";
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
import Alert from "./Alert";
import ProfilePage from "./ProfilePage";
import CodeVerificationPage from "./CodeVerificationPage";
import ResetPasswordPage from "./ResetPasswordPage";

interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <div className="flex flex-col flex-wrap">
      <div className="h-auto bg-gray-300">
        <Alert />
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

export default App;
