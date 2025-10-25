import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Cart,
  DeleteCartItemPayload,
  EditCartItemPayload,
} from "../../models/cart";
import { CouponMap } from "../../models/cart";
import { normalizeEntities } from "../../utility/utils";

export type CartState = {
  cart: Cart;
  couponCode: string;
  couponDiscountPercentage: number;
  coupon: CouponMap;
  loading: boolean;
  message: string;
};

const initialState: CartState = {
  cart: {},
  couponCode: "",
  couponDiscountPercentage: 0,
  coupon: [],
  loading: false,
  message: "",
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    editingCartInitiated,
    editingCartCompleted,
    editingCartError,
    onDeleteFromCart,
    changeCouponCode,
    getDiscountPercentageInitiated,
    getDiscountPercentageCompleted,
    getDiscountPercentageError,
    fetchCouponsInitiated,
    fetchCouponsCompleted,
    fetchCouponsError,
    deleteCart,
  },
});

const { actions, reducer: cartReducer } = cartSlice;

export const {
  editingCartInitiated: editingCartInitiatedAction,
  editingCartCompleted: editingCartCompletedAction,
  editingCartError: editingCartErrorAction,
  editingCartCompleted: cartLoadingCompletedAction,
  onDeleteFromCart: onDeleteFromCartAction,
  changeCouponCode: changeCouponCodeAction,
  getDiscountPercentageInitiated: getDiscountPercentageInitiatedAction,
  getDiscountPercentageCompleted: getDiscountPercentageCompletedAction,
  getDiscountPercentageError: getDiscountPercentageErrorAction,
  fetchCouponsInitiated: fetchCouponsInitiatedAction,
  fetchCouponsCompleted: fetchCouponsCompletedAction,
  fetchCouponsError: fetchCouponsErrorAction,
  deleteCart: deleteCartAction,
} = actions;

export default cartReducer;

function editingCartInitiated(
  state: CartState,
  action: PayloadAction<EditCartItemPayload>
) {
  state.cart = {
    ...state.cart,
    [action.payload.id]:
      state.cart[action.payload.id] ?? 0 + action.payload.quantity,
  };
  state.loading = true;
}

function editingCartCompleted(
  state: CartState,
  action: PayloadAction<{ cart: Cart }>
) {
  const cart = action.payload.cart;
  state.cart = { ...cart };
  state.loading = false;
}

function editingCartError(
  state: CartState,
  action: PayloadAction<{ cart: Cart; message: string }>
) {
  state.cart = { ...action.payload.cart };
  state.message = action.payload.message;
  state.loading = false;
}

function onDeleteFromCart(
  state: CartState,
  action: PayloadAction<DeleteCartItemPayload>
) {
  delete state.cart[action.payload.id];
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

function deleteCart(state: CartState) {
  return { ...initialState, coupon: state.coupon };
}
