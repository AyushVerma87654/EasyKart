import { createSelector } from "@reduxjs/toolkit";
import { AppState } from "../store";

export const userStateSelector = (state: AppState) => state.user;

export const userSelector = createSelector(
  [userStateSelector],
  (state) => state.user
);

export const accessTokenSelector = createSelector(
  [userStateSelector],
  (state) => state.accessToken
);

export const userLoadingSelector = createSelector(
  [userStateSelector],
  (state) => state.loading
);
