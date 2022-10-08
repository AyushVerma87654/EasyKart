import CartList from "./CartList";
import React, { useEffect, useMemo, useState } from "react";
import { getProduct } from "./Api";
import CartTotal from "./CartTotal";
import Loading from "./Loading";
import CartEmpty from "./CartEmpty";

function CartPage({ cart, updateCart }) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const token = Object.keys(cart).map((item) => getProduct(item));
    const lastPromise = Promise.all(token);
    lastPromise.then((products) => {
      setProduct(products);
      setLoading(false);
    });
  }, [cart]);

  let total = useMemo(() => {
    let i = 0;
    let arr1 = product.map((item) => item.price);
    let q = Object.keys(cart).map((item) => cart[item]);
    return arr1.reduce((output, current) => {
      return output + current * q[i++];
    }, 0);
  }, [product]);

  if (loading) {
    return <Loading />;
  }

  if (!product.length) {
    return <CartEmpty />;
  }

  return (
    <div className="my-14 mx-auto max-w-5xl">
      <CartList cart={cart} updateCart={updateCart} product={product} />
      <CartTotal total={total} />
    </div>
  );
}

export default CartPage;
