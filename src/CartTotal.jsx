import React from "react";
import CartButton from "./CartButton";

function CartTotal({ total }) {
  return (
    <div className="flex flex-col items-end font-bold">
      <div className="my-5">
        <div className="w-96">
          <div className="h-12 border flex items-center px-4 border-gray-300 bg-gray-50">
            Cart Totals
          </div>
          <div className="border border-gray-300">
            <div className="m-6 p-2">
              <div className="flex border border-white border-b-gray-300">
                <div className="w-40 p-2">Subtotal</div>
                <div className="w-40 p-2">Rs.{total}</div>
              </div>
              <div className="flex border border-white border-b-gray-300">
                <div className="w-40 p-2">Total</div>
                <div className="w-40 p-2">Rs.{total}</div>
              </div>
              <div className="w-full h-12 mt-6">
                <CartButton data="PROCEED TO CHECKOUT" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartTotal;
