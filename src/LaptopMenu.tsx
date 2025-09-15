import React, { FC } from "react";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  isLoggedInSelector,
  userSelector,
} from "./redux/selectors/userSelector";

interface LaptopMenuProps extends ReduxProps {
  data: number;
}

const LaptopMenu: FC<LaptopMenuProps> = ({ data, isLoggedIn, user }) => {
  return (
    <div>
      <div className="flex items-center space-x-8 sm:space-x-12 md:space-x-16 lg:space-x-20 xl:space-x-24 2xl:space-x-28 text-lg font-semibold">
        <Link to="/" className="pt-3">
          All Products
        </Link>

        {isLoggedIn ? (
          <Link
            to="/profile"
            className="mt-3 rounded-full bg-blue-500 text-rose-700 w-12 h-12 flex items-center justify-center text-3xl font-semibold"
          >
            {user.userName.charAt(0).toUpperCase()}
          </Link>
        ) : (
          <Link to="/login" className="pt-3">
            Account
          </Link>
        )}

        <Link to="/cart">
          <div className="flex flex-col pb-12 items-center">
            <CgShoppingCart className="text-6xl" />
            <p className="-m-11 pl-1.5">{data}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoggedIn: isLoggedInSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LaptopMenu);
