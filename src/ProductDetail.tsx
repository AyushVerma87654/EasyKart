import React, { FC } from "react";
import Product from "./Product";

type ProductDetailProps = { products: any };

const ProductDetail: FC<ProductDetailProps> = ({ products }) => {
  console.log("products", products);
  return (
    <div className="sm:grid grid-cols-3 gap-2 space-y-2 md:space-y-0">
      {products.map(function (item: any) {
        return <Product {...item} key={item.id} />;
      })}
    </div>
  );
};

export default ProductDetail;
