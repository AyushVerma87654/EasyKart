import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const orderStateSelector = (state: AppState) => state.order;

export const currentOrderSelector = createSelector(
  [orderStateSelector],
  (state) => state.currentOrder
);

export const userOrdersSelector = createSelector(
  [orderStateSelector],
  (state) => state.userOrders
);

export const userOrdersMapSelector = createSelector(
  [userOrdersSelector],
  (userOrders) => Object.values(userOrders)
);
