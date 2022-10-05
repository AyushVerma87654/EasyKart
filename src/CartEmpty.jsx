import React, { memo } from "react";

function CartEmpty() {
  return (
    <div className="bg-violet-500 text-white text-4xl p-10 flex items-center justify-center h-64 mt-3.5">
      You haven't added any product yet! Add the products to see them here.
    </div>
  );
}

export default memo(CartEmpty);
