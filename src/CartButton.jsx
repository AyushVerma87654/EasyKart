import React, { memo } from "react";

function CartButton({ data }) {
  return (
    <div className="bg-orange-600 text-white rounded-md flex items-center justify-center w-full h-full">
      {data}
    </div>
  );
}

export default memo(CartButton);
