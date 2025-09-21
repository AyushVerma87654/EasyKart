import { MetaData, PaginationData } from "./../../models/product";
import { ResponsePayload } from "./../../models/response";
import { PayloadAction } from "@reduxjs/toolkit";
import { call, debounce, put, takeEvery } from "redux-saga/effects";
import {
  getAllProductsCompletedAction,
  getAllProductsInitiatedAction,
  getProductByIdCompletedAction,
  getProductByIdInitiatedAction,
  getProductByIdsCompletedAction,
  getProductByIdsInitiatedAction,
} from "../slice/productSlice";
import {
  fetchProductById,
  fetchAllProducts,
  fetchProductByIds,
} from "../../api/product";
import { Product, ProductMap } from "../../models/product";

function* getAllProducts(action: PayloadAction<PaginationData>): Generator {
  try {
    const response = (yield call(
      fetchAllProducts,
      action.payload
    )) as ResponsePayload<{
      products: ProductMap;
      metaData: MetaData;
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

function* getProductByIds(action: PayloadAction<number[]>): Generator {
  try {
    const response = (yield call(
      fetchProductByIds,
      action.payload
    )) as ResponsePayload<{
      products: ProductMap;
      metaData: MetaData;
    }>;
    yield put(getProductByIdsCompletedAction(response.responseDetails));
  } catch (error) {
    console.log(error);
  }
}

function* productSaga() {
  yield debounce(1000, getAllProductsInitiatedAction, getAllProducts);
  yield takeEvery(getProductByIdInitiatedAction, getProductById);
  yield takeEvery(getProductByIdsInitiatedAction, getProductByIds);
}

export default productSaga;
