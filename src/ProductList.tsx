import { range } from "lodash";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { Link, useSearchParams } from "react-router-dom";
import Loading from "./Loading";
import NoMatching from "./NoMatching";
import PageButton from "./PageButton";
import ProductDetail from "./ProductDetail";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { getAllProductsInitiatedAction } from "./redux/slice/productSlice";
import {
  metaDataSelector,
  paginationDataSelector,
  productLoadingSelector,
  productMapSelector,
} from "./redux/selectors/productSelector";
import { fetchMeInitiatedAction } from "./redux/slice/userSlice";
import { isLoggedInSelector } from "./redux/selectors/userSelector";
import { cartLoadingCompletedAction } from "./redux/slice/cartSlice";
import { Cart } from "./models/cart";

interface ProductListProps extends ReduxProps {}

const ProductList: FC<ProductListProps> = ({
  getAllProducts,
  productLoading,
  products,
  fetchProfile,
  isLoggedIn,
  paginationData,
  metaData,
  cartLoadingCompleted,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = Object.fromEntries([...searchParams]);

  let { page, query, sort } = params;

  query = query || "";
  sort = sort || "default";
  let timer: NodeJS.Timeout;

  useEffect(() => {
    !isLoggedIn && fetchProfile();
    if (!isLoggedIn) {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}") as Cart;
      cartLoadingCompleted({ cart });
    }
  }, []);

  useEffect(() => {
    let sortBy = "id",
      sortType = "asc";
    if (sort == "title") {
      sortBy = "title";
    } else if (sort == "lowtohigh") {
      sortBy = "price";
    } else if (sort == "hightolow") {
      sortBy = "price";
      sortType = "desc";
    }
    if (query === paginationData.query) {
      getAllProducts({
        page: +page || 1,
        query: query || "",
        sortBy,
        sortType,
      });
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        getAllProducts({
          page: +page || 1,
          query: query || "",
          sortBy,
          sortType,
        });
      }, 1000);
    }
  }, [sort, query, page]);

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

  if (productLoading && products.length === 0) return <Loading />;
  return (
    <div className="flex flex-col w-full">
      {products && (
        <div>
          <div className="flex justify-end mt-2">
            <input
              value={query ?? ""}
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
          {<ProductDetail products={products} />}
          {products.length == 0 ? (
            <NoMatching />
          ) : (
            <div className="flex m-2 items-center">
              <div className="w-32">
                {metaData.previousPageUrl && (
                  <Link
                    to={
                      "?" +
                      new URLSearchParams({
                        ...params,
                        page: JSON.stringify(paginationData.page - 1),
                      })
                    }
                    className="flex items-center"
                  >
                    <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
                    Previous
                  </Link>
                )}
              </div>

              <div className="flex mt-3 mx-auto">
                {range(1, metaData.lastPage + 1).map((item) => {
                  return (
                    <PageButton
                      key={item}
                      to={
                        "?" +
                        new URLSearchParams({
                          ...params,
                          page: JSON.stringify(item),
                        })
                      }
                      className={
                        metaData.currentPage === item
                          ? "bg-red-500"
                          : "bg-indigo-500"
                      }
                    >
                      {item}
                    </PageButton>
                  );
                })}
              </div>
              <div className="w-32">
                {metaData.nextPageUrl && (
                  <Link
                    to={
                      "?" +
                      new URLSearchParams({
                        ...params,
                        page: JSON.stringify(paginationData.page + 1),
                      })
                    }
                    className="flex items-center"
                  >
                    Next
                    <HiArrowCircleRight className="text-5xl ml-5 px-1" />
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  productLoading: productLoadingSelector(state),
  products: productMapSelector(state),
  isLoggedIn: isLoggedInSelector(state),
  paginationData: paginationDataSelector(state),
  metaData: metaDataSelector(state),
});

const mapDispatchToProps = {
  getAllProducts: getAllProductsInitiatedAction,
  fetchProfile: fetchMeInitiatedAction,
  cartLoadingCompleted: cartLoadingCompletedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ProductList);
