import React from "react";
import Product from "./Product";
import { Navigate } from "react-router-dom";

function ProductDetail({ products, user }) {
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="md:grid grid-cols-3 gap-2 space-y-2 md:space-y-0">
      {products.map(function (item) {
        return <Product key={item.title} {...item} />;
      })}
    </div>
  );
}

export default ProductDetail;
