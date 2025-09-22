import instance from "./axios";
import { PaginationData } from "../models/product";
import { EditCartItemPayload } from "../models/cart";

export const fetchAllProducts = async (data: PaginationData) => {
  return instance.post("/products", data).then((res) => res.data);
};

export const fetchProductById = async (id: number) => {
  return instance.get(`/product/${id}`).then((res) => res.data);
};

export const fetchProductByIds = async (ids: number[]) => {
  return instance.post("/products/bulk-fetch", { ids }).then((res) => res.data);
};

export const fetchDiscountPercentage = async (couponCode: string) => {
  return instance.get(`/apply-coupon/${couponCode}`).then((res) => res.data);
};

export const fetchCoupons = async () => {
  return instance.get("/coupon").then((res) => res.data);
};
