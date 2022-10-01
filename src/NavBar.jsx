import React, { memo } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { Link } from "react-router-dom";

function NavBar({ data }) {
  return (
    <div className="bg-white">
      <div className="flex items-center w-auto text-orange-500 justify-between px-16 h-28">
        <img
          className="w-[120px] h-9"
          src="https://easykartindia.com/img/logo1.png"
        />
        <div>
          <Link to="/cart">
            <div className="flex flex-col pb-12 items-center">
              <CgShoppingCart className="text-6xl" />
              <p className="-m-11 pl-1.5">{data}</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default memo(NavBar);
