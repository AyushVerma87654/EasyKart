import React, { FC, ButtonHTMLAttributes, memo } from "react";

type CartButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const CartButton: FC<CartButtonProps> = ({
  children,
  type,
  disabled,
  onClick,
  className,
}) => {
  return (
    <button
      className={
        "bg-orange-500 text-white rounded-md flex items-center justify-center w-full h-full font-semibold p-1 disabled:bg-orange-300 " +
        className
      }
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default memo(CartButton);
