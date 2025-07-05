import axios from "axios";
import { cartType, productObjectType, productType, mapType } from "./models";

type Props1 = (
  sortBy: string,
  sortType: string,
  query: string,
  page: number
) => Promise<productObjectType>;

export const getProductList: Props1 = (sortBy, sortType, query, page) => {
  type paramsProps = {
    sortBy: string;
    sortType: string;
    search: string;
    page: number;
  };

  let params: paramsProps = { sortBy: "", sortType: "", search: "", page: 1 };
  if (sortBy) {
    params.sortBy = sortBy;
  }
  if (sortType) {
    params.sortType = sortType;
  }
  if (query) {
    params.search = query;
  }
  if (page) {
    params.page = page;
  }

  return axios
    .get("https://myeasykart.codeyogi.io/products", {
      params,
    })
    .then(function (response) {
      return response.data;
    });
};

type Props2 = (id: number) => Promise<productType>;

export const getProduct: Props2 = (id) => {
  return axios
    .get("https://myeasykart.codeyogi.io/product/" + id)
    .then(function (response) {
      return response.data;
    });
};

type Props3 = (id: string[]) => Promise<productType[]>;

export const getProductById: Props3 = (id) => {
  const ids = id.join();
  return axios
    .get("https://myeasykart.codeyogi.io/products/bulk", {
      params: {
        ids: ids,
      },
    })
    .then((response) => response.data);
};

type Props4 = () => Promise<cartType[]>;

export const getCart: Props4 = () => {
  return axios
    .get("https://myeasykart.codeyogi.io/carts", {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    })
    .then((response) => {
      return response.data;
    });
};

type Props5 = (cart: mapType) => Promise<productType>;

export const saveCart: Props5 = (cart) => {
  return axios.post(
    "https://myeasykart.codeyogi.io/carts",
    { data: cart },
    {
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    }
  );
};
export const all = async () => {
  console.log("axios called");
  return axios
    .get("http://localhost:8888/products")
    .then((res) => console.log(res));
};
