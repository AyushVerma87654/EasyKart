import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  fetchCouponsCompletedAction,
  fetchCouponsInitiatedAction,
  getDiscountPercentageCompletedAction,
  getDiscountPercentageInitiatedAction,
  onAddToCartCompletedAction,
  onAddToCartErrorAction,
  onAddToCartInitiatedAction,
} from "../slice/cartSlice";
import {
  fetchCoupons,
  fetchDiscountPercentage,
  updateCart,
} from "../../api/product";
import { ResponsePayload } from "../../models/response";
import { Cart, CouponMap, EditCartItemPayload } from "../../models/cart";
import { AppState } from "../store";

function* getDiscountPercentage(action: PayloadAction<string>): Generator {
  try {
    const response = (yield call(
      fetchDiscountPercentage,
      action.payload
    )) as ResponsePayload<{ discountPercentage: number }>;
    yield put(getDiscountPercentageCompletedAction(response.responseDetails));
  } catch (error) {
    console.log(error);
  }
}

function* fetchingCoupons(): Generator {
  try {
    const response = (yield call(fetchCoupons)) as ResponsePayload<{
      coupons: CouponMap;
    }>;
    yield put(fetchCouponsCompletedAction(response.responseDetails));
  } catch (error) {
    console.log(error);
  }
}

function* editCart(action: PayloadAction<EditCartItemPayload>): Generator {
  const prevState = (yield select(
    (state: AppState) => state.cart.cart
  )) as Cart;
  console.log("prevState", prevState);

  if (!action.payload.isLoggedIn) {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}") as Cart;
    const quantity =
      (cart?.[action.payload.id]?.quantity || 0) + action.payload.quantity;
    const newCart = {
      ...cart,
      [action.payload.id]: {
        productId: action.payload.id,
        quantity: quantity,
        price: action.payload.price,
        amount: action.payload.price * quantity,
      },
    };
    localStorage.setItem("cart", JSON.stringify(newCart));
    yield put(onAddToCartCompletedAction({ cart }));
  } else {
    try {
      const response = (yield call(
        updateCart,
        action.payload
      )) as ResponsePayload<{
        cart: Cart;
      }>;
      yield put(onAddToCartCompletedAction(response.responseDetails));
    } catch (error: any) {
      yield put(
        onAddToCartErrorAction({
          cart: prevState,
          message: error.message,
        })
      );
    }
  }
}

function* cartSaga() {
  yield takeEvery(getDiscountPercentageInitiatedAction, getDiscountPercentage);
  yield takeEvery(fetchCouponsInitiatedAction, fetchingCoupons);
  yield takeEvery(onAddToCartInitiatedAction, editCart);
}

export default cartSaga;
