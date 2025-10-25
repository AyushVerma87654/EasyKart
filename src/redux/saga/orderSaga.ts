import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  fetchOrderFailureAction,
  fetchOrderInitiatedAction,
  fetchOrderSuccessAction,
  placeOrderFailureAction,
  placeOrderInitiatedAction,
  placeOrderSuccessAction,
} from "../slice/orderSlice";
import { fetchOrders, placeOrder } from "../../api/order";
import { Order, PlaceOrderPayload } from "../../models/order";
import { ResponsePayload } from "../../models/response";
import { deleteCartAction } from "../slice/cartSlice";

function* initiatePlaceOrder(
  action: PayloadAction<PlaceOrderPayload>
): Generator {
  try {
    const res = (yield call(
      placeOrder,
      action.payload
    )) as any as ResponsePayload<Order>;
    yield put(placeOrderSuccessAction(res.responseDetails));
    yield put(deleteCartAction());
  } catch (error: any) {
    yield put(placeOrderFailureAction(error));
  }
}

function* initiateFetchOrder(): Generator {
  try {
    const res = (yield call(fetchOrders)) as any as ResponsePayload<{
      orders: Order[];
    }>;
    yield put(fetchOrderSuccessAction(res.responseDetails.orders));
  } catch (error: any) {
    yield put(fetchOrderFailureAction(error));
  }
}

function* orderSaga() {
  yield takeEvery(placeOrderInitiatedAction, initiatePlaceOrder);
  yield takeEvery(fetchOrderInitiatedAction, initiateFetchOrder);
}

export default orderSaga;
