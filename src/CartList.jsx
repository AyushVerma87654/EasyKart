import React, { useEffect, useState } from "react";
import CartButton from "./CartButton";
import CartRow from "./CartRow";

function CartList({ cart, updateCart, product }) {
  const [localCart, setLocalCart] = useState(cart);

  useEffect(() => {
    setLocalCart(cart);
  }, [cart]);

  let onAddFromCart = (productId, count) => {
    const newCart = { ...localCart, [productId]: count };
    setLocalCart(newCart);
  };

  let onDeleteFromCart = (productId) => {
    const newCart = { ...localCart };
    delete newCart[productId];
    setLocalCart(newCart);
    updateCart(newCart);
  };

  function handleUpdateChange() {
    updateCart(localCart);
  }

  return (
    <div className="sm:p-10 w-full">
      <div className="hidden sm:block">
        <div
          className="flex border border-gray-300 bg-gray-100 items-center 
        pl-14 pr-12 h-12 space-x-8"
        >
          <p className="ml-9 px-0.5 mr-4">Images</p>
          <p className="grow px-1.5">Product</p>
          <p className="w-16 p-0.5">Price</p>
          <p className="w-16">Quantity</p>
          <p className="w-16 p-0.5">Subtotal</p>
        </div>
      </div>
      {product.map((item) => (
        <CartRow
          {...item}
          key={item.id}
          quantity={cart[item.id]}
          onAddFromCart={onAddFromCart}
          onDeleteFromCart={onDeleteFromCart}
        />
      ))}

      <div className="border w-full border-gray-300 sm:h-16 py-2 px-3 flex flex-col sm:flex-row justify-between sm:items-center space-y-2 sm:space-y-0">
        <div className="flex">
          <input
            className="p-1 grow sm:grow-0 w-20 sm:w-44 h-9 border-2 border-gray-300"
            placeholder="COUPON CODE"
          />
          <div className="grow w-20 sm:grow-0 sm:w-44 h-9 ml-2">
            <CartButton data="APPLY COUPON" />
          </div>
        </div>
        <div className="h-12 sm:m-1 grow sm:grow-0 sm:w-48">
          <CartButton
            data="UPDATE CART"
            onClick={handleUpdateChange}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default CartList;
