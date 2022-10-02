import React, { memo } from "react";
import CartButton from "./CartButton";

function CartTotal({ total }) {
  return (
    <div className="flex flex-col font-bold">
      <div className="my-5">
        <div className="w-full">
          <div className="h-12 border flex items-center px-4 border-gray-300 bg-gray-50">
            Cart Totals
          </div>
          <div className="border border-gray-300">
            <div className="m-4 p-2">
              <div className="flex p-3 justify-between border border-white border-b-gray-300">
                <div>Subtotal</div>
                <div>Rs.{total}</div>
              </div>
              <div className="flex p-3 justify-between border border-white border-b-gray-300">
                <div>Total</div>
                <div>Rs.{total}</div>
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

export default memo(CartTotal);
