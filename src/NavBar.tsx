import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import MobileMenu from "./MobileMenu";
import LaptopMenu from "./LaptopMenu";
import { CgShoppingCart } from "react-icons/cg";
import { withCart } from "./ContextHoc";
import { all } from "./Api";

type NavBarProps = { totalCount: number };

const NavBar: FC<NavBarProps> = ({ totalCount }) => {
  const [show, setShow] = useState(false);

  const handleOpener = () => setShow(!show);
  const data = all();

  return (
    <div className="px-8 sm:px-12 md:px-16 lg:px-20 h-32 w-full text-orange-500 bg-white">
      <div className="sm:hidden flex items-center justify-between h-full">
        <div>
          <img
            className="w-[120px] h-9"
            src="https://easykartindia.com/img/logo1.png"
          />
        </div>

        <div className="flex items-center gap-6">
          <Link to="/cart">
            <div className="flex flex-col pb-10 mr-3 items-center">
              <CgShoppingCart className="text-4xl" />
              <p className="-m-7 text-xs pl-1 font-bold">{totalCount}</p>
            </div>
          </Link>
          <div className="flex">
            <CgMenuGridO
              className="sm:hidden relative self-center text-3xl "
              onClick={handleOpener}
            />
            {show && <MobileMenu />}
          </div>
        </div>
      </div>

      <div className="invisible sm:visible flex items-center h-28 justify-between">
        <div>
          <img
            className="w-[120px] h-9"
            src="https://easykartindia.com/img/logo1.png"
          />
        </div>

        <div className="p-1 mb-2">
          <LaptopMenu data={totalCount} />
        </div>
      </div>
    </div>
  );
};

export default withCart(NavBar);
