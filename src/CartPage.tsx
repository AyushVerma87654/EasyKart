import CartList from "./CartList";
import React, { FC, useEffect } from "react";
import CartTotal from "./CartTotal";
import { withCart } from "./ContextHoc";
import CartEmpty from "./CartEmpty";
import { cartType } from "./models";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { totalItemsSelector } from "./redux/selectors/cartSelector";
import { fetchCouponsInitiatedAction } from "./redux/slice/cartSlice";

interface CartPageProps extends ReduxProps {}

const CartPage: FC<CartPageProps> = ({ totalItems, fetchCoupons }) => {
  useEffect(() => {
    fetchCoupons();
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
});

const mapDispatchToProps = {
  fetchCoupons: fetchCouponsInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CartPage);
