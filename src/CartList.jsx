import React, { useEffect, useMemo, useState } from "react";
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
  const [changes, setChanges] = useState(false);

  function handleUpdateChange() {
    setChanges(true);
  }

  let i = 0;
  let j = 0;

  useEffect(() => {
    const token = Object.keys(cart).map((item) => getProduct(item));
    const lastPromise = Promise.all(token);
    lastPromise.then((products) => {
      setProduct(products);
      setLoading(false);
    });
    setQuantity(Object.keys(cart).map((item) => cart[item]));
  }, []);

  useEffect(() => {
    setTotal(
      product.reduce(function (output, current) {
        return output + current.price * quantity[j++];
      }, 0)
    );
  }, [product]);
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="block sm:hidden">
        {product.map(function (item) {
          return (
            <CartRow
              key={item.title}
              {...item}
              quantity={quantity[i++]}
              changes={changes}
              setChanges={setChanges}
            />
          );
        })}
        <div className="border text-sm w-full border-gray-300 h-auto py-2 px-3 flex flex-col">
          <div className="flex">
            <input
              className="p-1 grow h-9 border-2 border-gray-300"
              placeholder="COUPON CODE"
            />
            <div className="grow h-9 ml-2">
              <CartButton data="APPLY COUPON" />
            </div>
          </div>
          <div className="mt-3 h-10 grow">
            <CartButton
              data="UPDATE CART"
              onClick={handleUpdateChange}
              type="button"
            />
          </div>
        </div>
        <CartTotal total={total} />
      </div>

      {/* <div className="hidden sm:block">
        <div className="w-full">
          <div className="flex border border-gray-300 bg-gray-100 items-center justify-end pl-40 space-x-4 h-12">
            <p className="w-96 p-2">Product</p>
            <p className="w-24 p-2">Price</p>
            <p className="w-28 p-2">Quantity</p>
            <p className="w-32 p-2 ml-2">Subtotal</p>
          </div>
          {product.map(function (item) {
            return (
              <CartRow key={item.title} {...item} quantity={quantity[i++]} />
            );
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
              <CartButton onClick={handleUpdateChange} data="UPDATE CART" />
            </div>
          </div>
          <CartTotal total={total} />
        </div>
      </div> */}
    </div>
  );
}

export default CartList;
