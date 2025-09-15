import React, { FC } from "react";
import { Link } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  isLoggedInSelector,
  userSelector,
} from "./redux/selectors/userSelector";

interface MobileMenuProps extends ReduxProps {}

const MobileMenu: FC<MobileMenuProps> = ({ user, isLoggedIn }) => {
  return (
    <div className="flex flex-col items-center justify-center text-lg font-semibold">
      <Link to="/" className="p-3">
        All Products
      </Link>

      {isLoggedIn ? (
        <div className="rounded-full bg-blue-500 text-rose-700 w-12 h-12 flex items-center justify-center text-3xl font-semibold">
          {user.userName.charAt(0).toUpperCase()}
        </div>
      ) : (
        <Link to="/login" className="pt-3">
          Account
        </Link>
      )}
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

export default connector(MobileMenu);
