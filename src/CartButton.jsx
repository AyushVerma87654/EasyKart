import React, { memo } from "react";

function CartButton({ data, type, disabled, onClick, className }) {
  return (
    <button
      className={
        "bg-orange-500 disabled:bg-orange-300 text-white rounded-md flex items-center justify-center w-full h-full font-semibold p-1"
      }
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {data}
    </button>
  );
}

export default memo(CartButton);
