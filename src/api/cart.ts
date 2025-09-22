import { DeleteCartItemPayload, EditCartItemPayload } from "../models/cart";
import instance from "./axios";

export const editCart = async (data: EditCartItemPayload) => {
  return instance.post("/cart/edit-cart", data).then((res) => res.data);
};

export const deleteCartItem = async (data: DeleteCartItemPayload) => {
  return instance.post("/cart/delete-cart-item", data).then((res) => res.data);
};
