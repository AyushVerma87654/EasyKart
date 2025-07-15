import React, { useState, FC } from "react";
import { Link } from "react-router-dom";
import { CgMenuGridO } from "react-icons/cg";
import MobileMenu from "./MobileMenu";
import LaptopMenu from "./LaptopMenu";
import { CgShoppingCart } from "react-icons/cg";
import { withCart } from "./ContextHoc";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { totalItemsSelector } from "./redux/selectors/productSelector";

interface NavBarProps extends ReduxProps {}

const NavBar: FC<NavBarProps> = ({ totalItems }) => {
  const [show, setShow] = useState(false);

  const handleOpener = () => setShow(!show);

  return (
    <div className="px-8 sm:px-12 md:px-16 lg:px-20 h-32 w-full text-orange-500 bg-white">
      <div className="sm:hidden flex items-center justify-between h-full">
        <Link to="/" className="cursor-pointer">
          <img
            className="w-[120px] h-9"
            src="https://easykartindia.com/img/logo1.png"
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/cart">
            <div className="flex flex-col pb-10 mr-3 items-center">
              <CgShoppingCart className="text-4xl" />
              <p className="-m-7 text-xs pl-1 font-bold">{totalItems}</p>
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
        <Link to="/" className="cursor-pointer">
          <img
            className="w-[120px] h-9"
            src="https://easykartindia.com/img/logo1.png"
          />
        </Link>

        <div className="p-1 mb-2">
          <LaptopMenu data={totalItems} />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  totalItems: totalItemsSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(NavBar);
