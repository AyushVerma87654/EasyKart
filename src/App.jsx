import React from "react";
import AlertProvider from "../Providers/AlertProvider";
import CartProvider from "../Providers/CartProvider";
import UserProvider from "../Providers/UserProvider";
import Last from "./Last";

function App() {
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
}

export default App;

//
