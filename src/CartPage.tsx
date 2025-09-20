import CartList from "./CartList";
import React, { FC, useEffect } from "react";
import CartTotal from "./CartTotal";
import { withCart } from "./ContextHoc";
import CartEmpty from "./CartEmpty";
import { cartType } from "./models";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { totalItemsSelector } from "./redux/selectors/cartSelector";
import {
  cartLoadingCompletedAction,
  fetchCouponsInitiatedAction,
} from "./redux/slice/cartSlice";
import { isLoggedInSelector } from "./redux/selectors/userSelector";
import { Cart } from "./models/cart";

interface CartPageProps extends ReduxProps {}

const CartPage: FC<CartPageProps> = ({
  totalItems,
  fetchCoupons,
  cartLoadingCompleted,
  isLoggedIn,
}) => {
  useEffect(() => {
    fetchCoupons();
    if (!isLoggedIn) {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}") as Cart;
      cartLoadingCompleted({ cart });
    }
  }, []);
  if (totalItems == 0) {
    return <CartEmpty />;
  }
  return (
    <div className="my-14 mx-auto max-w-5xl">
      <CartList />
      <CartTotal />
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  totalItems: totalItemsSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  fetchCoupons: fetchCouponsInitiatedAction,
  cartLoadingCompleted: cartLoadingCompletedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CartPage);
