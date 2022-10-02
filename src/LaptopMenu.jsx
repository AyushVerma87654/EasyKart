import React from "react";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";

function LaptopMenu({ data }) {
  return (
    <div>
      <div className="flex items-center space-x-8 sm:space-x-12 md:space-x-16 lg:space-x-20 xl:space-x-24 2xl:space-x-28 text-lg font-semibold">
        <Link to="/" className="pt-3">
          All Products
        </Link>

        <Link to="/login" className="pt-3">
          Account
        </Link>

        <Link to="/cart">
          <div className="flex flex-col pb-12 items-center">
            <CgShoppingCart className="text-6xl" />
            <p className="-m-11 pl-1.5">{data}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default LaptopMenu;
