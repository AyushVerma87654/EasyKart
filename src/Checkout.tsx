import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  cartMapSelector,
  totalItemsSelector,
  couponCodeSelector,
  totalAmountSelector,
  couponDiscountPercentageSelector,
  couponDiscountSelector,
  finalAmountSelector,
} from "./redux/selectors/cartSelector";
import {
  isLoggedInSelector,
  userSelector,
} from "./redux/selectors/userSelector";
import CartButton from "./CartButton"; // reuse your styled button
import Input from "./Input";
import { placeOrderInitiatedAction } from "./redux/slice/orderSlice";
import { PlaceOrderPayload } from "./models/order";
import { generateUniqueKey } from "./utility/utils";

interface CheckoutProps extends ReduxProps {}

const Checkout: FC<CheckoutProps> = ({
  cartMap,
  totalItems,
  couponCode,
  totalAmount,
  couponDiscount,
  couponDiscountPercentage,
  finalAmount,
  placeOrder,
  user,
  isLoggedIn,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Checkout</h1>
      <div className="border rounded-md p-4 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Product Summary</h2>
        {cartMap.map((item) => (
          <div key={item.id} className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-12 h-12 object-cover"
              />
              <span>{item.title}</span>
            </div>
            <div>
              {item.quantity} × Rs.{item.price} = Rs.
              {(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
        <div className="text-right font-semibold">
          Subtotal: Rs.{totalAmount.toFixed(2)}
        </div>
      </div>
      {couponCode && couponDiscountPercentage > 0 && (
        <div className="border rounded-md p-4 mb-6 shadow-sm bg-green-50">
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Coupon Applied
          </h2>
          <p>
            Code: <strong>{couponCode}</strong> — {couponDiscountPercentage}%
            OFF
          </p>
          <p>
            Discount: Rs. <strong>{couponDiscount.toFixed(2)}</strong>
          </p>
        </div>
      )}
      <div className="border rounded-md p-4 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
        <label className="flex items-center gap-2">
          <Input type="radio" checked={true} />
          <span>Cash on Delivery (COD)</span>
        </label>
      </div>
      <div className="border rounded-md p-4 mb-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-2">Order Total</h2>
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>Rs.{totalAmount}</span>
        </div>
        {couponDiscountPercentage > 0 && (
          <div className="flex justify-between">
            <span>Discount:</span>
            <span>-Rs.{couponDiscount}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Total Payable:</span>
          <span>Rs.{finalAmount}</span>
        </div>
      </div>

      <div className="text-center h-12">
        <CartButton
          onClick={() => {
            const items = cartMap.map((item) => ({
              productId: item.id,
              title: item.title,
              price: item.price,
              quantity: item.quantity,
              thumbnail: item.thumbnail,
              amount: item.price * item.quantity,
            }));

            const order: PlaceOrderPayload = {
              orderReference: generateUniqueKey(),
              items,
              totalAmount,
              couponCode,
              paymentMethod: "cod" as const,
            };

            placeOrder(order);
          }}
        >
          Place Order
        </CartButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  cartMap: cartMapSelector(state),
  totalItems: totalItemsSelector(state),
  couponCode: couponCodeSelector(state),
  totalAmount: totalAmountSelector(state),
  couponDiscountPercentage: couponDiscountPercentageSelector(state),
  couponDiscount: couponDiscountSelector(state),
  finalAmount: finalAmountSelector(state),
  user: userSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  placeOrder: placeOrderInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Checkout);
