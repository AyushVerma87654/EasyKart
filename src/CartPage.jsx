import React from "react";
import { Link } from "react-router-dom";
import CartList from "./CartList";
import Login from "./Login";

function CartPage({ cart }) {
  return (
    <div className="my-14 mx-12">
      <CartList cart={cart} />
      <Link to="/login">Login Here</Link>
    </div>
  );
}

export default CartPage;
