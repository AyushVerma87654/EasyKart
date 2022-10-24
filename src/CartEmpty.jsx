import React, { memo } from "react";
import { Link } from "react-router-dom";
import CartButton from "./CartButton";

function CartEmpty() {
  return (
    <div className="bg-yellow-300 text-green-600 h-full">
      <div className=" flex flex-col space-y-10 text-4xl p-10 items-center justify-center">
        <h2>Your cart is empty now!</h2>
        <h2 className="text-blue-500"> Add the products to see them here.</h2>
      </div>
      <div className="mb-8 ml-8 text-xl h-14 w-60">
        <Link to="/">
          <CartButton data="RETURN TO SHOP" />
        </Link>
      </div>
    </div>
  );
}

export default memo(CartEmpty);
