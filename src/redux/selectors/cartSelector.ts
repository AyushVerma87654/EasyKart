import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const cartStateSelector = (state: AppState) => state.cart;
export const productSelector = (state: AppState) => state.product.products;

export const cartSelector = createSelector(
  [cartStateSelector],
  (state) => state.cart
);

export const cartMapSelector = createSelector(
  [cartSelector, productSelector],
  (cart, products) =>
    Object.keys(cart).map((id) => ({
      id: cart[+id]?.productId,
      title: products[+id]?.title,
      price: products[+id]?.price,
      thumbnail: products[+id]?.thumbnail,
      quantity: cart[+id]?.quantity,
    }))
);

export const totalAmountSelector = createSelector(
  [cartStateSelector],
  (state) => +state.totalAmount.toFixed(2)
);

export const couponDiscountPercentageSelector = createSelector(
  [cartStateSelector],
  (state) => state.couponDiscountPercentage
);

export const finalAmountSelector = createSelector(
  [cartStateSelector],
  (state) =>
    +(
      (state.totalAmount * (100 - state.couponDiscountPercentage)) /
      100
    ).toFixed(2)
);

export const couponDiscountSelector = createSelector(
  [cartStateSelector],
  (state) =>
    +((state.totalAmount * state.couponDiscountPercentage) / 100).toFixed(2)
);

export const totalItemsSelector = createSelector(
  [cartStateSelector],
  (state) => state.totalItems
);

export const couponCodeSelector = createSelector(
  [cartStateSelector],
  (state) => state.couponCode
);

export const couponsSelector = createSelector(
  [cartStateSelector],
  (state) => state.coupon
);

export const couponsMapSelector = createSelector([couponsSelector], (coupons) =>
  Object.values(coupons)
);
