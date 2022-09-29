import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CartRow({ thumbnail, price, title, quantity }) {
  const [input, setInput] = useState(quantity);
  function handleInputChange(event) {
    setInput(event.target.value);
  }
  return (
    <>
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
    </>
  );
}

export default CartRow;
