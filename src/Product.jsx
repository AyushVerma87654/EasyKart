import React from "react";
import { Link } from "react-router-dom";

function Product({ thumbnail, category, title, price, id }) {
  return (
    <div className="max-w-xs">
      <div className=" w-full aspect-square mt-1">
        <img className="w-full h-full object-cover" src={thumbnail} />
      </div>

      <div className="flex justify-around items-center">
        <div>
          <p className="text-gray-400 pt-2 text-xs">{category}</p>
          <h1 className="font-bold my-1 text-sm">{title}</h1>
          <h1 className="font-bold text-sm"> Rs. {price}</h1>
        </div>
        <div className="pt-4 shrink-0">
          <Link className="bg-blue-500 text-lg p-2" to={"/product/" + id}>
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Product;
