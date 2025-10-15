import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, Orders, PlaceOrderPayload } from "../../models/order";

export type OrderState = {
  currentOrder: Order | null;
  userOrders: Orders;
  loading: boolean;
  message: string;
};

const initialState: OrderState = {
  currentOrder: null,
  userOrders: [],
  loading: false,
  message: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    placeOrderInitiated,
    placeOrderSuccess,
    placeOrderFailure,
    fetchOrderInitiated,
    fetchOrderSuccess,
    fetchOrderFailure,
  },
});

const { actions, reducer: orderReducer } = orderSlice;

export const {
  placeOrderInitiated: placeOrderInitiatedAction,
  placeOrderSuccess: placeOrderSuccessAction,
  placeOrderFailure: placeOrderFailureAction,
  fetchOrderInitiated: fetchOrderInitiatedAction,
  fetchOrderSuccess: fetchOrderSuccessAction,
  fetchOrderFailure: fetchOrderFailureAction,
} = actions;

export default orderReducer;

function placeOrderInitiated(
  state: OrderState,
  _action: PayloadAction<PlaceOrderPayload>
) {
  state.loading = true;
}

function placeOrderSuccess(state: OrderState, action: PayloadAction<Order>) {
  state.loading = false;
  state.currentOrder = action.payload;
}

function placeOrderFailure(state: OrderState, action: PayloadAction<string>) {
  state.loading = false;
  state.message = action.payload;
}

function fetchOrderInitiated(state: OrderState) {
  state.loading = true;
}

function fetchOrderSuccess(state: OrderState, action: PayloadAction<Order[]>) {
  state.loading = false;
  action.payload.forEach(
    (item) => (state.userOrders = { ...state.userOrders, [item.id]: item })
  );
}

function fetchOrderFailure(state: OrderState, action: PayloadAction<string>) {
  state.loading = false;
  state.message = action.payload;
}
