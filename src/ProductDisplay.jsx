import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import IndividualProduct from "./IndividualProduct";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { getProduct } from "./Api";
import Loading from "./Loading";
import PageNotFound from "./PageNotFound";

function ProductDisplay({ onAddToCart }) {
  const id = +useParams().id;
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState();

  useEffect(
    function () {
      getProduct(id)
        .then(function (data) {
          setProduct(data);
          setLoading(false);
        })
        .catch(function () {
          setLoading(false);
        });
    },
    [id]
  );

  if (loading) {
    return <Loading />;
  }

  return product ? (
    <>
      <Link to="/" className="flex items-center">
        <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
        Back
      </Link>

      <IndividualProduct {...product} onAddToCart={onAddToCart} />

      <div className="flex justify-between px-12">
        <div>
          {id > 1 && (
            <Link to={"/product/" + (id - 1)} className="flex items-center">
              <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
              Previous
            </Link>
          )}
        </div>
        <div>
          {id < 100 && (
            <Link to={"/product/" + (id + 1)} className="flex items-center">
              Next
              <HiArrowCircleRight className="text-5xl ml-5 px-1" />
            </Link>
          )}
        </div>
      </div>
    </>
  ) : (
    <PageNotFound />
  );
}

export default ProductDisplay;
