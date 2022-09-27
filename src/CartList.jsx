import React from "react";
import CartRow from "./CartRow";
import { data } from "./DummyData";

function CartList() {
  return (
    <div>
      <div className="flex border border-gray-300 bg-gray-100 items-center pl-40 space-x-4 h-12">
        <p className="w-52 p-3">Product</p>
        <p className="w-24 p-3">Price</p>
        <p className="w-28 p-3">Quantity</p>
        <p className="w-10 p-3">Subtotal</p>
      </div>
      {data.map(function (item) {
        return <CartRow {...item} />;
      })}
      {/* <p>Cart List</p> */}
    </div>
  );
}

export default CartList;
