import { Input } from "postcss";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function IndividualProduct({
  thumbnail,
  id,
  category,
  title,
  price,
  description,
  discountPercentage,
  rating,
  brand,
  stock,
  onAddToCart,
}) {
  const [input, setInput] = useState(1);

  useEffect(
    function () {
      setInput(1);
    },
    [id]
  );

  function handleInputChange(event) {
    setInput(+event.target.value);
  }

  function handleButtonClick() {
    onAddToCart(id, input);
    setInput(1);
  }

  return (
    <div className="flex m-4 p-2">
      <div>
        <img className="w-[440px] aspect-square" src={thumbnail} />
      </div>
      <div className="px-4 space-y-2 text-gray-700">
        <h1 className="text-3xl font-semibold">{title}</h1>
        <h1 className="text-2xl font-bold">Rs. {price}</h1>
        <h1 className="">
          Brand : <span className="text-red-400">{brand}</span>
        </h1>
        <h1 className="">
          Category : <span className="text-red-400">{category}</span>
        </h1>
        <h1 className="">
          Stock Left : <span className="text-red-400">{stock}</span>
        </h1>
        <h1 className="">
          Ratings : <span className="text-red-400">{rating}</span>
        </h1>
        <h1 className="">
          Discount Percentage :
          <span className="text-red-400">{discountPercentage}%</span>
        </h1>
        <h1>
          <span>{description}</span>
        </h1>
        <div className="flex items-center pt-2">
          <input
            className="border w-14 h-9 border-gray-300 p-1 mr-1"
            type="number"
            value={input}
            onChange={handleInputChange}
          />
          <button
            className="bg-red-500 text-white rounded-md w-48 h-9 px-10 font-bold"
            onClick={handleButtonClick}
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
}

export default IndividualProduct;
