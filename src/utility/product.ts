import { Cart, Products } from "../models/product";

export const totalAmount = (cart: Cart, products: Products) =>
  Object.keys(cart)
    .map((id) => {
      return products[+id].price * cart[+id];
    })
    .reduce((total, current) => total + current, 0);

export const totalItems = (cart: Cart) =>
  Object.values(cart).reduce((total, current) => total + current, 0);
