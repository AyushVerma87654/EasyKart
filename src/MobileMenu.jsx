import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function MobileMenu() {
  return (
    // <div>
    <div className="flex flex-col items-center justify-center text-lg font-semibold">
      <Link to="/" className="p-3">
        All Products
      </Link>

      <Link to="/login" className="p-3">
        Account
      </Link>
    </div>
    // </div>
  );
}

export default MobileMenu;
