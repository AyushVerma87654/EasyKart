import React from "react";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";

function CartIcon() {
  return (
    <div>
      <Link to="/cart">
        <div className="flex flex-col pb-12 items-center">
          <CgShoppingCart className="text-6xl" />
          <p className="-m-11 pl-1.5">{data}</p>
        </div>
      </Link>
    </div>
  );
}

export default CartIcon;
