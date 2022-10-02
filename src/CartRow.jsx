import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CartRow({ thumbnail, price, title, quantity }) {
  const [input, setInput] = useState(quantity);
  function handleInputChange(event) {
    setInput(event.target.value);
  }

  return (
    <div>
      <div className="block sm:hidden">
        <div className="w-full text-gray-700 font-semibold">
          <div className="flex justify-end h-11 px-2 py-3 border border-gray-300">
            <AiOutlineCloseCircle className="text-gray-300 border border-gray-300 text-2xl " />
          </div>
          <div className="h-24 px-2 py-3 border border-gray-300 flex justify-center">
            <img className="p-1 w-20 aspect-square" src={thumbnail} />
          </div>
          <div className="flex justify-between h-11 px-2 py-3 border border-gray-300">
            <div>Product:</div>
            <div>{title}</div>
          </div>
          <div className="flex justify-between h-11 px-2 py-3 border border-gray-300">
            <div>Price</div>
            <div>Rs. {price}</div>
          </div>
          <div className="flex justify-between h-14 px-2 py-3 border border-gray-300">
            <div>Quantity</div>
            <input
              className="w-14 border border-gray-300 text-gray-400 focus:outline-none h-8 p-2"
              value={input}
              type="number"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-between h-11 px-2 py-3 border border-gray-300">
            <div>Subtotal</div>
            <div>Rs. {price * input}</div>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="flex border border-gray-300 items-center space-x-8 px-5 py-2 h-16">
          <AiOutlineCloseCircle className="text-gray-300" />
          <img className="p-1 w-14 aspect-square" src={thumbnail} />
          <p className="px-4 text-red-500 w-96 font-bold">{title}</p>
          <p className="w-20">Rs.{price}</p>
          <input
            onChange={handleInputChange}
            value={input}
            type="number"
            className="pl-5 py-0.5 w-12 h-6 text-xs font-semibold border border-gray-300 text-gray-500"
          />

          <p className="px-12">Rs.{quantity * price}</p>
        </div>
      </div>
    </div>
  );
}

export default CartRow;
