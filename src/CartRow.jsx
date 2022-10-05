import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";

function CartRow({
  thumbnail,
  price,
  id,
  title,
  quantity,
  onAddFromCart,
  onDeleteFromCart,
}) {
  const [input, setInput] = useState(quantity);

  function handleInputChange(event) {
    let counts = +event.target.value;
    onAddFromCart(id, counts);
    setInput(counts);
  }

  function handleButtonChange() {
    onDeleteFromCart(id);
  }

  return (
    <div>
      <div className="block sm:hidden h-full w-full">
        <div className="w-full text-gray-700 font-semibold">
          <div className="flex justify-end h-11 px-2 py-3 border border-gray-300">
            <AiOutlineCloseCircle
              onClick={handleButtonChange}
              className="text-gray-300 border border-gray-300 text-2xl "
            />
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
      <div className="hidden sm:block h-full w-full">
        <div className="flex border border-gray-300 items-center space-x-8 pl-10 pr-12 py-2 h-16">
          <div className="w-6 h-6">
            <AiOutlineCloseCircle
              onClick={handleButtonChange}
              className="text-gray-300 w-full h-full"
            />
          </div>
          <div className="p-1 w-14 mr-4">
            <img className="aspect-square" src={thumbnail} />
          </div>
          <p className="px-4 text-red-500 grow font-bold">{title}</p>
          <p className="w-16">Rs.{price}</p>
          <span className="w-16">
            <input
              onChange={handleInputChange}
              value={input}
              type="number"
              className="pl-1 py-0.5 w-10 h-6 text-xs font-semibold border border-gray-300 text-gray-500"
            />
          </span>

          <p className="w-16">Rs.{input * price}</p>
        </div>
      </div>
    </div>
  );
}

export default CartRow;
