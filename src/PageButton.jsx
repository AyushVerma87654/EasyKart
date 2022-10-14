import React from "react";
import { Link } from "react-router-dom";

function PageButton({ to, onClick, className, children }) {
  return (
    <div className="w-12 mx-1 my-8 h-10">
      <Link
        to={to}
        onClick={onClick}
        className={"py-2 px-4 text-lg font-semibold w-full h-full " + className}
      >
        {children}
      </Link>
    </div>
  );
}

export default PageButton;
