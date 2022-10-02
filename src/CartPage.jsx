import React from "react";
import CartList from "./CartList";

function CartPage({ cart }) {
  return (
    <div className="my-14 mx-1 w-full">
      <CartList cart={cart} />
    </div>
  );
}

export default CartPage;
