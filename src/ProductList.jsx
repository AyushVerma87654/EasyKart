import React, { useEffect, useState } from "react";
import { getProductList } from "./Api";
import Loading from "./Loading";
import NoMatching from "./NoMatching";
import ProductDetail from "./ProductDetail";

function ProductList() {
  let [query, setQuery] = useState("");
  let [data, setData] = useState([]);
  const [sort, setSort] = useState("default");
  let [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(function () {
    let token = getProductList();
    token.then(function (data) {
      setAllData(data);
      setData(data);
      setLoading(false);
    });
  }, []);
  query = "";

  function handleQueryChange(event) {
    const newQuery = event.target.value;

    data = allData.filter(function (item) {
      const lowerCaseQuery = newQuery.toLowerCase();
      const lowerCaseTitle = item.title.toLowerCase();

      return lowerCaseTitle.indexOf(lowerCaseQuery) != -1;
    });
    setQuery(newQuery);
    setData(data);
  }

  function handleSortChange(event) {
    setSort(event.target.value);
  }

  if (sort == "title") {
    data = data.sort(function (x, y) {
      return x.title < y.title ? -1 : 1;
    });
  } else if (sort == "lowtohigh") {
    data = data.sort(function (x, y) {
      return x.price - y.price;
    });
  } else if (sort == "hightolow") {
    data = data.sort(function (x, y) {
      return y.price - x.price;
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mt-2">
        <input
          className="bg-gray-200 border border-gray-400 w-48 h-9 p-1"
          placeholder="Search"
          onChange={handleQueryChange}
        />
        <select
          className="bg-gray-200 border border-gray-400 w-48 h-9 ml-2 p-1"
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
      {data.length > 0 && <ProductDetail products={data} />}
      {data.length == 0 && <NoMatching />}
    </div>
  );
}

export default ProductList;
