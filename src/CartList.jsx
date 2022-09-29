import React, { useEffect, useState } from "react";
import { getProduct } from "./Api";
import CartButton from "./CartButton";
import CartRow from "./CartRow";
import CartTotal from "./CartTotal";
import Loading from "./Loading";

function CartList({ cart }) {
  const [quantity, setQuantity] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  let i = 0;
  let j = 0;

  useEffect(function () {
    const token = Object.keys(cart).map(function (item) {
      return getProduct(item);
    });

    const lastPromise = Promise.all(token);

    lastPromise.then(function (products) {
      setProduct(products);
      setLoading(false);
    });

    setQuantity(
      Object.keys(cart).map(function (item) {
        return cart[item];
      })
    );
  }, []);

  useEffect(
    function () {
      let arr = product.map(function (item) {
        return item.price * quantity[j++];
      });
      setTotal(
        arr.reduce(function (output, current) {
          return output + current;
        }, 0)
      );
    },
    [product]
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex border border-gray-300 bg-gray-100 items-center justify-end pl-40 space-x-4 h-12">
        <p className="w-96 p-2">Product</p>
        <p className="w-24 p-2">Price</p>
        <p className="w-28 p-2">Quantity</p>
        <p className="w-32 p-2 ml-2">Subtotal</p>
      </div>
      {product.map(function (item) {
        return <CartRow key={item.title} {...item} quantity={quantity[i++]} />;
      })}
      <div className="border border-gray-300 h-14 py-2 px-3 flex items-center justify-between">
        <div className="flex">
          <input
            className="pl-1 w-52 h-9 border-2 border-gray-300"
            placeholder="Coupon Code"
          />
          <div className="w-52 h-9 ml-2">
            <CartButton data="APPLY COUPON" />
          </div>
        </div>
        <div className="w-52 h-10">
          <CartButton data="UPDATE CART" />
        </div>
      </div>
      <CartTotal total={total} />
    </div>
  );
}

export default CartList;
