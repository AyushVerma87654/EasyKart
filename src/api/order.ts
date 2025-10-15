import { PlaceOrderPayload } from "../models/order";
import instance from "./axios";

export const placeOrder = async (data: PlaceOrderPayload) => {
  return instance.post("/place-order", data).then((res) => res.data);
};

export const fetchOrders = async () => {
  return instance.get("/fetch-order").then((res) => res.data);
};
