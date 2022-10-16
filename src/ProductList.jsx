import { range } from "lodash";
import React, { useEffect, useState } from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";
import { getProductList } from "./Api";
import Loading from "./Loading";
import NoMatching from "./NoMatching";
import PageButton from "./PageButton";
import ProductDetail from "./ProductDetail";

function ProductList() {
  let [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  let { page, query, sort } = params;

  page = +page || 1;
  query = query || "";
  sort = sort || "default";

  useEffect(() => {
    let sortBy, sortType;
    if (sort == "title") {
      sortBy = "title";
    } else if (sort == "lowtohigh") {
      sortBy = "price";
    } else if (sort == "hightolow") {
      sortBy = "price";
      sortType = "desc";
    }
    getProductList(sortBy, sortType, query, page).then((products) => {
      setLoading(false);
      setProduct(products);
    });
  }, [sort, query, page]);

  let handleQueryChange = (event) => {
    setSearchParams(
      { ...params, query: event.target.value, page: 1 },
      { replace: false }
    );
  };

  function handleSortChange(event) {
    setSearchParams(
      { ...params, sort: event.target.value },
      { replace: false }
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-end mt-2">
        <input
          className="bg-gray-200 border border-gray-400 w-40 sm:48 h-9 p-1"
          placeholder="Search"
          onChange={handleQueryChange}
        />
        <select
          className="bg-gray-200 border border-gray-400 w-40 sm:w-48 h-9 ml-2 p-1"
          name="Mugs"
          value={sort}
          onChange={handleSortChange}
        >
          <option value="default">Default Sort</option>
          <option value="title">Sort by Title</option>
          <option value="lowtohigh">Sort by price low to high</option>
          <option value="hightolow">Sort by price high to low</option>
        </select>
      </div>
      {product.data.length > 0 && <ProductDetail products={product.data} />}
      {product.data.length == 0 && <NoMatching />}
      <div className="flex m-2 items-center">
        {product.meta.first_page == page || (
          <Link to={"?page=" + (page - 1)} className="flex items-center">
            <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
            Previous
          </Link>
        )}
        <div className="flex mt-3 mx-auto">
          {range(1, product.meta.last_page + 1).map((item) => (
            <PageButton
              key={item}
              to={
                "?" +
                new URLSearchParams(
                  { ...params, page: item },
                  { replace: false }
                )
              }
              className={page === item ? "bg-red-500" : "bg-indigo-500"}
              // className="bg-red-500"
            >
              {item}
            </PageButton>
          ))}
        </div>
        {product.meta.last_page == page || (
          <Link to={"?page=" + (page + 1)} className="flex items-center">
            Next
            <HiArrowCircleRight className="text-5xl ml-5 px-1" />
          </Link>
        )}
      </div>
    </div>
  );
}

export default ProductList;
