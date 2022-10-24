import CartList from "./CartList";
import React from "react";
import CartTotal from "./CartTotal";
import { withCart } from "./ContextHoc";
import CartEmpty from "./CartEmpty";

function CartPage({ cart }) {
  if (cart.length == 0) {
    return <CartEmpty />;
  }
  return (
    <div className="my-14 mx-auto max-w-5xl">
      <CartList />
      <CartTotal />
    </div>
  );
}

export default withCart(CartPage);
