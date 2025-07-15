import { ResponsePayload } from "./../../models/response";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getAllProductsCompletedAction,
  getAllProductsInitiatedAction,
  getDiscountPercentageCompletedAction,
  getDiscountPercentageInitiatedAction,
  getProductByIdCompletedAction,
  getProductByIdInitiatedAction,
} from "../slice/productSlice";
import {
  fetchDiscountPercentage,
  fetchProductById,
  fetchAllProducts,
} from "../../api/product";
import { Product, ProductMap } from "../../models/product";

function* getAllProducts(): Generator {
  try {
    const response = (yield call(fetchAllProducts)) as ResponsePayload<{
      products: ProductMap;
    }>;
    yield put(getAllProductsCompletedAction(response.responseDetails));
  } catch (error) {
    console.log(error);
  }
}

function* getProductById(action: PayloadAction<number>): Generator {
  try {
    const response = (yield call(
      fetchProductById,
      action.payload
    )) as ResponsePayload<{ product: Product }>;
    yield put(getProductByIdCompletedAction(response.responseDetails));
  } catch (error) {
    console.log(error);
  }
}

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

function* productSaga() {
  yield takeEvery(getAllProductsInitiatedAction, getAllProducts);
  yield takeEvery(getProductByIdInitiatedAction, getProductById);
  yield takeEvery(getDiscountPercentageInitiatedAction, getDiscountPercentage);
}

export default productSaga;
