import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Products,
  ProductMapResponse,
  ProductResponse,
  ProductEntites,
  PaginationData,
  MetaData,
} from "../../models/product";
import { normalizeQuery } from "../../utility/utils";

export type ProductState = {
  products: Products;
  paginationData: PaginationData;
  metaData: MetaData;
  entities: ProductEntites;
  loading: boolean;
  message: string;
  selectedId: number;
  inputQuantity: number;
};

const initialState: ProductState = {
  products: [],
  paginationData: {
    page: 1,
    query: "",
    sortBy: "",
    sortType: "",
  },
  metaData: {
    currentPage: 1,
    firstPage: 1,
    firstPageUrl: null,
    lastPage: 1,
    lastPageUrl: null,
    nextPageUrl: null,
    perPage: 15,
    previousPageUrl: null,
    total: 0,
  },
  entities: {},
  loading: true,
  message: "",
  selectedId: 0,
  inputQuantity: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProductsInitiated,
    getAllProductsCompleted,
    messageWhileFetchingProducts,
    getProductByIdInitiated,
    getProductByIdCompleted,
    getProductByIdsInitiated,
    changeInputQuantity,
  },
});

const { actions, reducer: productReducer } = productSlice;

export const {
  getAllProductsInitiated: getAllProductsInitiatedAction,
  getAllProductsCompleted: getAllProductsCompletedAction,
  messageWhileFetchingProducts: messageWhileFetchingProductsAction,
  getProductByIdInitiated: getProductByIdInitiatedAction,
  getProductByIdCompleted: getProductByIdCompletedAction,
  getProductByIdsInitiated: getProductByIdsInitiatedAction,
  getAllProductsCompleted: getProductByIdsCompletedAction,
  changeInputQuantity: changeInputQuantityAction,
} = actions;

export default productReducer;

function getAllProductsInitiated(
  state: ProductState,
  action: PayloadAction<PaginationData>
) {
  state.loading = true;
  state.paginationData = {
    query: action.payload.query,
    sortBy: action.payload.sortBy,
    sortType: action.payload.sortType,
    page: action.payload.page,
  };
  state.metaData = { ...state.metaData, currentPage: action.payload.page };
}

function getAllProductsCompleted(
  state: ProductState,
  action: PayloadAction<ProductMapResponse>
) {
  state.loading = false;
  let data = {};
  let ids: number[] = [];
  const normalizedQuery = normalizeQuery(state.paginationData.query);
  action.payload.products.map((product) => {
    data = { ...data, [product.id]: product };
    ids = [...ids, product.id];
  });
  state.products = { ...state.products, ...data };
  (state.metaData = action.payload.metaData),
    (state.entities = {
      ...state.entities,
      [normalizedQuery]: {
        ...state.entities[normalizedQuery],
        [state.paginationData.page]: ids,
      },
    });
}

function messageWhileFetchingProducts(
  state: ProductState,
  action: PayloadAction<string>
) {
  state.loading = false;
  state.message = action.payload;
}

function getProductByIdInitiated(
  state: ProductState,
  action: PayloadAction<number>
) {
  state.loading = true;
  state.selectedId = action.payload;
  state.inputQuantity = 1;
}

function getProductByIdCompleted(
  state: ProductState,
  action: PayloadAction<ProductResponse>
) {
  state.loading = false;
  const product = action.payload.product;
  state.products = { ...state.products, [product.id]: product };
}

function getProductByIdsInitiated(
  state: ProductState,
  _action: PayloadAction<number[]>
) {
  state.loading = true;
}

function changeInputQuantity(
  state: ProductState,
  action: PayloadAction<number>
) {
  state.inputQuantity = action.payload;
}
