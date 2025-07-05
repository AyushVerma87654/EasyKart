import React, { FC } from "react";
import AlertProvider from "../Providers/AlertProvider";
import CartProvider from "../Providers/CartProvider";
import UserProvider from "../Providers/UserProvider";
import Last from "./Last";

const App: FC = () => {
  return (
    <>
      <UserProvider>
        <CartProvider>
          <AlertProvider>
            <Last />
          </AlertProvider>
        </CartProvider>
      </UserProvider>
    </>
  );
};

export default App;
