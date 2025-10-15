import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  fetchCouponsCompletedAction,
  fetchCouponsInitiatedAction,
  getDiscountPercentageCompletedAction,
  getDiscountPercentageInitiatedAction,
  editingCartCompletedAction,
  editingCartErrorAction,
  editingCartInitiatedAction,
  onDeleteFromCartAction,
  getDiscountPercentageErrorAction,
} from "../slice/cartSlice";
import { fetchCoupons, fetchDiscountPercentage } from "../../api/product";
import { ResponsePayload } from "../../models/response";
import {
  Cart,
  CouponMap,
  DeleteCartItemPayload,
  EditCartItemPayload,
} from "../../models/cart";
import { AppState } from "../store";
import { editCart, deleteCartItem } from "../../api/cart";

function* getDiscountPercentage(action: PayloadAction<string>): Generator {
  try {
    const response = (yield call(
      fetchDiscountPercentage,
      action.payload
    )) as ResponsePayload<{ discountPercentage: number }>;
    yield put(getDiscountPercentageCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(
      getDiscountPercentageErrorAction(
        error.response.data.responseDetails.message
      )
    );
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

function* editingCart(action: PayloadAction<EditCartItemPayload>): Generator {
  const prevState = (yield select(
    (state: AppState) => state.cart.cart
  )) as Cart;

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
    yield put(editingCartCompletedAction({ cart: newCart }));
  } else {
    try {
      const response = (yield call(
        editCart,
        action.payload
      )) as ResponsePayload<{
        cart: Cart;
      }>;
      yield put(editingCartCompletedAction(response.responseDetails));
    } catch (error: any) {
      yield put(
        editingCartErrorAction({
          cart: prevState,
          message: error.message,
        })
      );
    }
  }
}

function* deletingItem(
  action: PayloadAction<DeleteCartItemPayload>
): Generator {
  const prevState = (yield select(
    (state: AppState) => state.cart.cart
  )) as Cart;

  if (!action.payload.isLoggedIn) {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}") as Cart;
    delete cart[action.payload.id];
    localStorage.setItem("cart", JSON.stringify(cart));
    yield put(editingCartCompletedAction({ cart }));
  } else {
    try {
      const response = (yield call(
        deleteCartItem,
        action.payload
      )) as ResponsePayload<{
        cart: Cart;
      }>;
      yield put(editingCartCompletedAction(response.responseDetails));
    } catch (error: any) {
      yield put(
        editingCartErrorAction({
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
  yield takeEvery(editingCartInitiatedAction, editingCart);
  yield takeEvery(onDeleteFromCartAction, deletingItem);
}

export default cartSaga;
