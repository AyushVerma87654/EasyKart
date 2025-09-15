import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import productReducer from "./slice/productSlice";
import userReducer from "./slice/userSlice";
import cartReducer from "./slice/cartSlice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: { product: productReducer, user: userReducer, cart: cartReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof store.getState>;

export default store;
