import React from "react";
import AlertProvider from "../Providers/AlertProvider";
import CartProvider from "../Providers/CartProvider";
import UserProvider from "../Providers/UserProvider";
import Alert from "./Alert";
import Last from "./Last";

function App() {
  return (
    <>
      <AlertProvider>
        <UserProvider>
          <CartProvider>
            <Alert />
            <Last />
          </CartProvider>
        </UserProvider>
      </AlertProvider>
    </>
  );
}

export default App;

//
