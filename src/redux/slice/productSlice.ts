import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Product,
  Cart,
  Products,
  ProductMap,
  ProductMapResponse,
  ProductResponse,
} from "../../models/product";
import { totalAmount, totalItems } from "../../utility/product";

export type ProductState = {
  products: Products;
  loading: boolean;
  error: string;
  selectedId: number;
  inputQuantity: number;
  cart: Cart;
  totalItems: number;
  totalAmount: number;
  couponCode: string;
  couponDiscountPercentage: number;
};

const initialState: ProductState = {
  products: [],
  loading: false,
  error: "",
  selectedId: 0,
  inputQuantity: 1,
  cart: {},
  totalAmount: 0,
  totalItems: 0,
  couponCode: "",
  couponDiscountPercentage: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getAllProductsInitiated,
    getAllProductsCompleted,
    errorWhileFetchingProducts,
    getProductByIdInitiated,
    getProductByIdCompleted,
    changeInputQuantity,
    onAddToCart,
    onQuantityChangeFromCart,
    onDeleteFromCart,
    changeCouponCode,
    getDiscountPercentageInitiated,
    getDiscountPercentageCompleted,
    getDiscountPercentageError,
  },
});

const { actions, reducer: productReducer } = productSlice;

export const {
  getAllProductsInitiated: getAllProductsInitiatedAction,
  getAllProductsCompleted: getAllProductsCompletedAction,
  errorWhileFetchingProducts: errorWhileFetchingProductsAction,
  getProductByIdInitiated: getProductByIdInitiatedAction,
  getProductByIdCompleted: getProductByIdCompletedAction,
  changeInputQuantity: changeInputQuantityAction,
  onAddToCart: onAddToCartAction,
  onQuantityChangeFromCart: onQuantityChangeFromCartAction,
  onDeleteFromCart: onDeleteFromCartAction,
  changeCouponCode: changeCouponCodeAction,
  getDiscountPercentageInitiated: getDiscountPercentageInitiatedAction,
  getDiscountPercentageCompleted: getDiscountPercentageCompletedAction,
  getDiscountPercentageError: getDiscountPercentageErrorAction,
} = actions;

export default productReducer;

function getAllProductsInitiated(state: ProductState) {
  state.loading = true;
}

function getAllProductsCompleted(
  state: ProductState,
  action: PayloadAction<ProductMapResponse>
) {
  state.loading = false;
  let data = {};
  action.payload.products.map((product) => {
    data = { ...data, [product.id]: product };
  });
  state.products = data;
}

function errorWhileFetchingProducts(
  state: ProductState,
  action: PayloadAction<string>
) {
  state.loading = false;
  state.error = action.payload;
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

function changeInputQuantity(
  state: ProductState,
  action: PayloadAction<number>
) {
  state.inputQuantity = action.payload;
}

function onAddToCart(
  state: ProductState,
  action: PayloadAction<{ id: number; quantity: number }>
) {
  state.cart = {
    ...state.cart,
    [action.payload.id]: action.payload.quantity,
  };
  state.totalAmount = totalAmount(state.cart, state.products);
  state.totalItems = totalItems(state.cart);
}

function onQuantityChangeFromCart(
  state: ProductState,
  action: PayloadAction<{ id: number; quantity: number }>
) {
  state.cart = { ...state.cart, [action.payload.id]: action.payload.quantity };
  state.totalAmount = totalAmount(state.cart, state.products);
  state.totalItems = totalItems(state.cart);
}

function onDeleteFromCart(
  state: ProductState,
  action: PayloadAction<{ id: number }>
) {
  delete state.cart[action.payload.id];
  state.totalAmount = totalAmount(state.cart, state.products);
  state.totalItems = totalItems(state.cart);
}

function changeCouponCode(state: ProductState, action: PayloadAction<string>) {
  state.couponCode = action.payload;
}

function getDiscountPercentageInitiated(
  state: ProductState,
  action: PayloadAction<string>
) {
  state.loading = true;
  state.couponCode = action.payload;
}

function getDiscountPercentageCompleted(
  state: ProductState,
  action: PayloadAction<{ discountPercentage: number }>
) {
  state.loading = false;
  state.couponDiscountPercentage = action.payload.discountPercentage;
}

function getDiscountPercentageError(
  state: ProductState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.error = action.payload.error;
}
