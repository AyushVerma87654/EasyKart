import axios from "axios";
import { PaginationData } from "../models/product";
import { EditCartItemPayload } from "../models/cart";

export const fetchAllProducts = async (data: PaginationData) => {
  return axios.post("/api/products", data).then((res) => res.data);
};

export const fetchProductById = async (id: number) => {
  return axios.get(`/api/product/${id}`).then((res) => res.data);
};

export const fetchDiscountPercentage = async (couponCode: string) => {
  return axios.get(`/api/apply-coupon/${couponCode}`).then((res) => res.data);
};

export const fetchCoupons = async () => {
  return axios.get("/api/coupon").then((res) => res.data);
};

export const updateCart = async (data: EditCartItemPayload) => {
  return axios
    .post("/api/cart/update", data, { withCredentials: true })
    .then((res) => res.data);
};
