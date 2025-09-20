import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart, EditCartItemPayload } from "../../models/cart";
import { CouponMap } from "../../models/cart";
import { editCart, totalAmount, totalItems } from "../../utility/cart";
import { normalizeEntities } from "../../utility/utils";

export type CartState = {
  cart: Cart;
  totalItems: number;
  totalAmount: number;
  couponCode: string;
  couponDiscountPercentage: number;
  coupon: CouponMap;
  loading: boolean;
  message: string;
};

const initialState: CartState = {
  cart: {},
  totalAmount: 0,
  totalItems: 0,
  couponCode: "",
  couponDiscountPercentage: 0,
  coupon: [],
  loading: true,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    onAddToCartInitiated,
    onAddToCartCompleted,
    onAddToCartError,
    onQuantityChangeFromCart,
    onDeleteFromCart,
    changeCouponCode,
    getDiscountPercentageInitiated,
    getDiscountPercentageCompleted,
    getDiscountPercentageError,
    fetchCouponsInitiated,
    fetchCouponsCompleted,
    fetchCouponsError,
  },
});

const { actions, reducer: cartReducer } = cartSlice;

export const {
  onAddToCartInitiated: onAddToCartInitiatedAction,
  onAddToCartCompleted: onAddToCartCompletedAction,
  onAddToCartError: onAddToCartErrorAction,
  onAddToCartCompleted: cartLoadingCompletedAction,
  onQuantityChangeFromCart: onQuantityChangeFromCartAction,
  onDeleteFromCart: onDeleteFromCartAction,
  changeCouponCode: changeCouponCodeAction,
  getDiscountPercentageInitiated: getDiscountPercentageInitiatedAction,
  getDiscountPercentageCompleted: getDiscountPercentageCompletedAction,
  getDiscountPercentageError: getDiscountPercentageErrorAction,
  fetchCouponsInitiated: fetchCouponsInitiatedAction,
  fetchCouponsCompleted: fetchCouponsCompletedAction,
  fetchCouponsError: fetchCouponsErrorAction,
} = actions;

export default cartReducer;

function onAddToCartInitiated(
  state: CartState,
  action: PayloadAction<EditCartItemPayload>
) {
  const newCartItem = editCart(action.payload);
  state.cart = {
    ...state.cart,
    [action.payload.id]: {
      ...newCartItem[action.payload.id],
      quantity:
        state.cart[action.payload.id]?.quantity + action.payload.quantity,
    },
  };
  state.totalAmount = totalAmount(state.cart);
  state.totalItems = totalItems(state.cart);
  state.loading = true;
}

function onAddToCartCompleted(
  state: CartState,
  action: PayloadAction<{ cart: Cart }>
) {
  const cart = action.payload.cart;
  state.cart = { ...cart };
  state.totalAmount = totalAmount(cart);
  state.totalItems = totalItems(cart);
  state.loading = false;
}

function onAddToCartError(
  state: CartState,
  action: PayloadAction<{ cart: Cart; message: string }>
) {
  state.cart = { ...action.payload.cart };
  state.totalAmount = totalAmount(state.cart);
  state.totalItems = totalItems(state.cart);
  state.message = action.payload.message;
  state.loading = false;
}

function onQuantityChangeFromCart(
  state: CartState,
  action: PayloadAction<EditCartItemPayload>
) {
  const newCartItem = editCart(action.payload);
  state.cart = { ...state.cart, ...newCartItem };
  state.totalAmount = totalAmount(state.cart);
  state.totalItems = totalItems(state.cart);
}

function onDeleteFromCart(
  state: CartState,
  action: PayloadAction<{ id: number }>
) {
  delete state.cart[action.payload.id];
  state.totalAmount = totalAmount(state.cart);
  state.totalItems = totalItems(state.cart);
}

function changeCouponCode(state: CartState, action: PayloadAction<string>) {
  state.couponCode = action.payload;
}

function getDiscountPercentageInitiated(
  state: CartState,
  action: PayloadAction<string>
) {
  state.loading = true;
  state.couponCode = action.payload;
}

function getDiscountPercentageCompleted(
  state: CartState,
  action: PayloadAction<{ discountPercentage: number }>
) {
  state.loading = false;
  state.couponDiscountPercentage = action.payload.discountPercentage;
}

function getDiscountPercentageError(
  state: CartState,
  action: PayloadAction<{ message: string }>
) {
  state.loading = false;
  state.message = action.payload.message;
}

function fetchCouponsInitiated() {}

function fetchCouponsCompleted(
  state: CartState,
  action: PayloadAction<{ coupons: CouponMap }>
) {
  const data = normalizeEntities(action.payload.coupons, "couponCode");
  state.coupon = { ...state.coupon, ...data };
}

function fetchCouponsError(
  state: CartState,
  action: PayloadAction<{ message: string }>
) {
  state.message = action.payload.message;
}
