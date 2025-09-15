import { FC } from "react";
import CartButton from "./CartButton";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  cartMapSelector,
  cartSelector,
  couponCodeSelector,
} from "./redux/selectors/cartSelector";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  changeCouponCodeAction,
  getDiscountPercentageInitiatedAction,
  onDeleteFromCartAction,
  onQuantityChangeFromCartAction,
} from "./redux/slice/cartSlice";
import { userSelector } from "./redux/selectors/userSelector";

interface CartListProps extends ReduxProps {}

const CartList: FC<CartListProps> = ({
  cartMap,
  onQuantityChangeFromCart,
  onDeleteFromCart,
  getDiscountPercentage,
  couponCode,
  changeCouponCode,
  user,
}) => {
  return (
    <div className="sm:p-10 w-full">
      <div className="hidden sm:block">
        <div
          className="flex border border-gray-300 bg-gray-100 items-center 
        pl-14 pr-12 h-12 space-x-8"
        >
          <p className="ml-9 px-0.5 mr-4">Images</p>
          <p className="grow px-1.5">Product</p>
          <p className="w-16 p-0.5">Price</p>
          <p className="w-16">Quantity</p>
          <p className="w-16 p-0.5">Subtotal</p>
        </div>
      </div>
      {cartMap.map((item) => (
        <div key={item.id}>
          <div className="h-full w-full">
            <div className="w-full text-gray-700 font-semibold flex flex-col sm:flex-row sm:border border-gray-300 sm:items-center sm:space-x-5 sm:pl-7 sm:pr-10 sm:py-2 sm:h-auto">
              <div className="flex justify-end h-12 px-2 py-3 border border-gray-300 sm:border-white">
                <AiOutlineCloseCircle
                  onClick={() => onDeleteFromCart({ id: item.id })}
                  className="text-gray-300 border border-gray-300 sm:border-white text-2xl"
                />
              </div>
              <div className="h-40 w-40 sm:h-16 sm:w-16 px-2 py-3 border border-gray-300 sm:border-white flex justify-center mx-auto sm:p-1 sm:mr-4">
                <img
                  className="w-full h-full object-cover"
                  src={item.thumbnail}
                />
              </div>
              <div className="flex justify-between sm:h-auto sm:grow h-11 px-2 py-3 border sm:border-white border-gray-300">
                <div className="sm:hidden">Product:</div>
                <div className="sm:px-4 text-red-500 font-bold">
                  {item.title}
                </div>
              </div>
              <div className="flex justify-between h-11 px-2 py-3 border sm:border-white border-gray-300">
                <div className="sm:hidden">Price</div>
                <div className="sm:w-14">Rs.{item.price}</div>
              </div>
              <div className="flex justify-between h-14 px-2 py-3 border sm:border-white border-gray-300">
                <div className="sm:hidden">Quantity</div>
                <div className="w-16">
                  <input
                    className="w-14 border border-gray-300 text-gray-400 focus:outline-none h-8 p-2"
                    value={item.quantity}
                    type="number"
                    onChange={(event) =>
                      onQuantityChangeFromCart({
                        id: item.id,
                        quantity: +event.target.value,
                        price: item.price,
                        email: user.email,
                      })
                    }
                  />
                </div>
              </div>
              <div className="flex justify-between h-11 px-2 py-3 sm:px-1 border sm:border-white border-gray-300">
                <div className="sm:hidden">Subtotal</div>
                <div className="sm:w-16">Rs.{item.price * item.quantity}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="border w-full border-gray-300 sm:h-16 py-2 px-3 flex flex-col sm:flex-row justify-around sm:items-center space-y-2 sm:space-y-0">
        <div className="flex">
          <input
            className="p-1 grow sm:grow-0 w-20 sm:w-44 h-9 border-2 border-gray-300"
            placeholder="COUPON CODE"
            value={couponCode}
            onChange={(event) => changeCouponCode(event.target.value)}
          />
          <div className="grow w-20 sm:grow-0 sm:w-44 h-9 ml-2">
            <CartButton onClick={() => getDiscountPercentage(couponCode)}>
              APPLY COUPON
            </CartButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  cartMap: cartMapSelector(state),
  couponCode: couponCodeSelector(state),
  user: userSelector(state),
});

const mapDispatchToProps = {
  onQuantityChangeFromCart: onQuantityChangeFromCartAction,
  onDeleteFromCart: onDeleteFromCartAction,
  getDiscountPercentage: getDiscountPercentageInitiatedAction,
  changeCouponCode: changeCouponCodeAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CartList);
