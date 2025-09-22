import { Cart, EditCartItemPayload } from "../models/cart";

export const totalAmount = (cart: Cart) =>
  Object.values(cart).reduce((total, current) => total + current.amount, 0);

export const totalItems = (cart: Cart) =>
  Object.values(cart).reduce((total, current) => total + current.quantity, 0);

export const createCartItem = (data: EditCartItemPayload) => ({
  [data.id]: {
    productId: data.id,
    quantity: data.quantity,
    price: data.price,
    amount: data.quantity * data.price,
  },
});
