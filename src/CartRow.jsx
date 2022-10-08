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
      <div className="block h-full w-full">
        <div className="w-full text-gray-700 font-semibold flex flex-col sm:flex-row sm:border border-gray-300 sm:items-center sm:space-x-5 sm:pl-7 sm:pr-10 sm:py-2 sm:h-auto">
          <div className="flex justify-end h-12 px-2 py-3 border border-gray-300 sm:border-white">
            <AiOutlineCloseCircle
              onClick={handleButtonChange}
              className="text-gray-300 border border-gray-300 sm:border-white text-2xl"
            />
          </div>
          <div className="h-40 w-40 sm:h-16 sm:w-16 px-2 py-3 border border-gray-300 sm:border-white flex justify-center mx-auto sm:p-1 sm:mr-4">
            <img className="w-full h-full object-cover" src={thumbnail} />
          </div>
          <div className="flex justify-between sm:h-auto sm:grow h-11 px-2 py-3 border sm:border-white border-gray-300">
            <div className="sm:hidden">Product:</div>
            <div className="sm:px-4 text-red-500 font-bold">{title}</div>
          </div>
          <div className="flex justify-between h-11 px-2 py-3 border sm:border-white border-gray-300">
            <div className="sm:hidden">Price</div>
            <div className="sm:w-14">Rs.{price}</div>
          </div>
          <div className="flex justify-between h-14 px-2 py-3 border sm:border-white border-gray-300">
            <div className="sm:hidden">Quantity</div>
            <div className="w-16">
              <input
                className="w-14 border border-gray-300 text-gray-400 focus:outline-none h-8 p-2"
                value={input}
                type="number"
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="flex justify-between h-11 px-2 py-3 sm:px-1 border sm:border-white border-gray-300">
            <div className="sm:hidden">Subtotal</div>
            <div className="sm:w-16">Rs.{price * input}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartRow;
