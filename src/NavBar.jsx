import React from "react";
import { CgShoppingCart } from "react-icons/cg";

function NavBar({ data }) {
  return (
    <div className="bg-white">
      <div className="flex items-center justify-between px-10 h-20">
        <img
          className="w-[120px] h-9"
          src="https://easykartindia.com/img/logo1.png"
        />
        <div className="flex flex-col items-center -mb-4">
          <CgShoppingCart className="text-4xl" />
          <p>{data}</p>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
