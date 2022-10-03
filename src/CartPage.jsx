import React, { useContext, useState } from "react";
import CartList from "./CartList";
import CartButton from "./CartButton";
import { Context } from "./Last";

function CartPage({ cart }) {
  // let [a, aa] = useState(1);

  // const data= useContext(Context);
  // console.log(data);

  // function hd() {
  //   aa(a + 1);
  //   // as(a + 1);
  // }

  return (
    <div className="my-14 mx-1 w-full">
      {/* <div className="p-5 bg-blue-500">
        <div className="p-5 bg-red-500">
          <div className="p-5">
            <p>Count is {a}</p>
            <CartButton data="Increment" onClick={hd} />
          </div>
        </div>
      </div> */}
      <CartList cart={cart} />
    </div>
  );
}

export default CartPage;
