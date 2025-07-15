import axios from "axios";

export const fetchAllProducts = async () => {
  return axios.get("http://localhost:8888/products").then((res) => res.data);
};

export const fetchProductById = async (id: number) => {
  return axios
    .get(`http://localhost:8888/product/${id}`)
    .then((res) => res.data);
};

export const fetchDiscountPercentage = async (couponCode: string) => {
  return axios
    .get(`http://localhost:8888/apply-coupon/${couponCode}`)
    .then((res) => res.data);
};
