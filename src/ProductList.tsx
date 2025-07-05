import { range } from "lodash";
import React, { ChangeEvent, useEffect, useState } from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { getProductList } from "./Api";
import Loading from "./Loading";
import { productObjectType } from "./models";
import NoMatching from "./NoMatching";
import PageButton from "./PageButton";
import ProductDetail from "./ProductDetail";

function ProductList() {
  const [product, setProduct] = useState<productObjectType>();
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  let { page, query, sort } = params;

  const pageNumber = +page || 1;
  query = query || "";
  sort = sort || "default";

  useEffect(() => {
    let sortBy = "",
      sortType = "";
    if (sort == "title") {
      sortBy = "title";
    } else if (sort == "lowtohigh") {
      sortBy = "price";
    } else if (sort == "hightolow") {
      sortBy = "price";
      sortType = "desc";
    }
    getProductList(sortBy, sortType, query, pageNumber).then((products) => {
      setLoading(false);
      setProduct(products);
    });
  }, [sort, query, pageNumber]);

  let handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchParams(
      { ...params, query: event.target.value, page: "1" },
      { replace: false }
    );
  };

  function handleSortChange(event: ChangeEvent<HTMLSelectElement>) {
    setSearchParams(
      { ...params, sort: event.target.value },
      { replace: false }
    );
  }

  console.log("product", product);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col w-full">
      {product?.data && (
        <div>
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
          {product.data.length == 0 ? (
            <NoMatching />
          ) : (
            <div className="flex m-2 items-center">
              {product.meta.first_page == pageNumber || (
                <Link
                  to={"?page=" + (pageNumber - 1)}
                  className="flex items-center"
                >
                  <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
                  Previous
                </Link>
              )}
              <div className="flex mt-3 mx-auto">
                {range(1, product.meta.last_page + 1).map((item) => {
                  return (
                    <PageButton
                      key={item}
                      to={
                        "?" +
                        new URLSearchParams(
                          { ...params, page: JSON.stringify(item) }
                          // { replace: false }
                        )
                      }
                      className={
                        pageNumber === item ? "bg-red-500" : "bg-indigo-500"
                      }
                    >
                      {item}
                    </PageButton>
                  );
                })}
              </div>
              {product.meta.last_page == pageNumber || (
                <Link
                  to={"?page=" + (pageNumber + 1)}
                  className="flex items-center"
                >
                  Next
                  <HiArrowCircleRight className="text-5xl ml-5 px-1" />
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductList;
