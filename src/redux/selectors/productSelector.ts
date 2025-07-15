import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const productStateSelector = (state: AppState) => state.product;

export const productsSelector = createSelector(
  [productStateSelector],
  (state) => state.products
);

export const productMapSelector = createSelector([productsSelector], (state) =>
  Object.values(state)
);

export const productByIdSelector = createSelector(
  [productStateSelector],
  (state) => state.products[state.selectedId]
);

export const productLoadingSelector = createSelector(
  [productStateSelector],
  (state) => state.loading
);

export const selectedIdSelector = createSelector(
  [productStateSelector],
  (state) => state.selectedId
);

export const individualProductSelector = createSelector(
  [productStateSelector],
  (state) => state.products[state.selectedId]
);

export const inputQuantitySelector = createSelector(
  [productStateSelector],
  (state) => state.inputQuantity
);

export const cartSelector = createSelector([productStateSelector], (state) =>
  Object.keys(state.cart).map((id) => ({
    id: state.products[+id].id,
    title: state.products[+id].title,
    price: state.products[+id].price,
    thumbnail: state.products[+id].thumbnail,
    quantity: state.cart[+id],
  }))
);

export const totalAmountSelector = createSelector(
  [productStateSelector],
  (state) => state.totalAmount
);

export const finalAmountSelector = createSelector(
  [productStateSelector],
  (state) => (state.totalAmount * (100 - state.couponDiscountPercentage)) / 100
);

export const couponDiscountSelector = createSelector(
  [productStateSelector],
  (state) => (state.totalAmount * state.couponDiscountPercentage) / 100
);

export const totalItemsSelector = createSelector(
  [productStateSelector],
  (state) => state.totalItems
);

export const couponCodeSelector = createSelector(
  [productStateSelector],
  (state) => state.couponCode
);
