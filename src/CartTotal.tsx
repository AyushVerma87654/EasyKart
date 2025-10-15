import { FC } from "react";
import CartButton from "./CartButton";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  couponDiscountSelector,
  finalAmountSelector,
  totalAmountSelector,
} from "./redux/selectors/cartSelector";
import { Link } from "react-router-dom";

interface CartTotalProps extends ReduxProps {}

const CartTotal: FC<CartTotalProps> = ({
  couponDiscount,
  finalAmount,
  subTotalAmount,
}) => {
  return (
    <div className="flex flex-col font-bold">
      <div className="my-5">
        <div className="w-full">
          <div className="h-12 border flex items-center px-4 border-gray-300 bg-gray-50">
            Cart Totals
          </div>
          <div className="border border-gray-300">
            <div className="m-4 p-2">
              <div className="flex p-3 justify-between border border-white border-b-gray-300">
                <div>Subtotal</div>
                <div>Rs.{subTotalAmount.toFixed(2)}</div>
              </div>
              <div className="flex p-3 justify-between border border-white border-b-gray-300">
                <div>Coupon Discount</div>
                <div>Rs.{couponDiscount.toFixed(2)}</div>
              </div>
              <div className="flex p-3 justify-between border border-white border-b-gray-300">
                <div>Total</div>
                <div>Rs.{finalAmount.toFixed(2)}</div>
              </div>
              <div className="w-full h-12 mt-6">
                <Link to="/checkout">
                  <CartButton>PROCEED TO CHECKOUT</CartButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  subTotalAmount: totalAmountSelector(state),
  finalAmount: finalAmountSelector(state),
  couponDiscount: couponDiscountSelector(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CartTotal);
