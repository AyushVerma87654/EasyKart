import axios from "axios";
import React from "react";

export function getProductList() {
  return axios.get("https://dummyjson.com/products").then(function (response) {
    return response.data.products;
  });
}

export function getProduct(id) {
  return axios
    .get("https://dummyjson.com/products/" + id)
    .then(function (response) {
      return response.data;
    });
}
