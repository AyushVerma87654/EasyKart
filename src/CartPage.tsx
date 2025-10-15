import CartList from "./CartList";
import { FC, useEffect } from "react";
import CartTotal from "./CartTotal";
import CartEmpty from "./CartEmpty";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { totalItemsSelector } from "./redux/selectors/cartSelector";
import {
  cartLoadingCompletedAction,
  fetchCouponsInitiatedAction,
} from "./redux/slice/cartSlice";
import { isLoggedInSelector } from "./redux/selectors/userSelector";
import { Cart } from "./models/cart";
import { fetchMeInitiatedAction } from "./redux/slice/userSlice";
import CouponCarousel from "./CouponCarousel";

interface CartPageProps extends ReduxProps {}

const CartPage: FC<CartPageProps> = ({
  totalItems,
  fetchCoupons,
  cartLoadingCompleted,
  isLoggedIn,
  fetchProfile,
}) => {
  useEffect(() => {
    fetchCoupons();
    !isLoggedIn && fetchProfile();
    if (!isLoggedIn) {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}") as Cart;
      cartLoadingCompleted({ cart });
    }
  }, []);

  return (
    <div className="mx-auto max-w-5xl">
      <CouponCarousel />
      {totalItems === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <CartList />
          <CartTotal />
        </>
      )}
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
  fetchProfile: fetchMeInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CartPage);
