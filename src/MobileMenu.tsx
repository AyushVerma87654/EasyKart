import React from "react";
import { Link } from "react-router-dom";

function MobileMenu() {
  return (
    <div className="flex flex-col items-center justify-center text-lg font-semibold">
      <Link to="/" className="p-3">
        All Products
      </Link>

      <Link to="/login" className="p-3">
        Account
      </Link>
    </div>
  );
}

export default MobileMenu;
