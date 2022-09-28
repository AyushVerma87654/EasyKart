import React from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CartRow({ thumbnail, price, title, quantity }) {
  console.log(thumbnail, price, title);
  return (
    <>
      <div className="flex border border-gray-300 items-center space-x-8 px-5 py-2 h-16">
        <AiOutlineCloseCircle className="text-gray-300" />
        <img className="p-1 w-14 aspect-square" src={thumbnail} />
        <p className="px-4 text-red-500 w-52 font-bold">{title}</p>
        <p className="w-20">${price}</p>
        <p className="pl-3 py-0.5 w-12 h-6 text-xs font-semibold border border-gray-300 text-gray-500">
          {quantity}
        </p>
        <p className="px-12">${quantity * price}</p>
      </div>
    </>
  );
}

export default CartRow;
