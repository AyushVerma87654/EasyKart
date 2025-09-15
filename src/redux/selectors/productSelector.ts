import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { normalizeQuery } from "../../utility/utils";

export const productStateSelector = (state: AppState) => state.product;

export const productsSelector = createSelector(
  [productStateSelector],
  (state) => state.products
);

export const productByIdSelector = createSelector(
  [productStateSelector],
  (state) => state.products[state.selectedId]
);

export const paginationDataSelector = createSelector(
  [productStateSelector],
  (state) => state.paginationData
);

export const metaDataSelector = createSelector(
  [productStateSelector],
  (state) => state.metaData
);

export const productEntitesSelector = createSelector(
  [productStateSelector],
  (state) => state.entities
);

export const productMapSelector = createSelector(
  [productsSelector, productEntitesSelector, paginationDataSelector],
  (products, entities, paginationData) =>
    (
      entities?.[normalizeQuery(paginationData.query)]?.[paginationData.page] ??
      []
    ).map((item) => products[item])
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
