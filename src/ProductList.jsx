import React, { useEffect, useState } from "react";
import { getProductList } from "./Api";
import Loading from "./Loading";
import NoMatching from "./NoMatching";
import ProductDetail from "./ProductDetail";

function ProductList() {
  let [query, setQuery] = useState("");
  let [data, setData] = useState([]);
  const [sort, setSort] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let token = getProductList();
    token.then((products) => {
      setLoading(false);
      setData(products);
    });
  }, []);

  let handleQueryChange = (event) => {
    const newQuery = event.target.value;
    data = allData.filter((item) => {
      const lowerCaseQuery = newQuery.toLowerCase();
      const lowerCaseTitle = item.title.toLowerCase();
      return lowerCaseTitle.indexOf(lowerCaseQuery) != -1;
    });
    setQuery(newQuery);
    setData(data);
  };

  function handleSortChange(event) {
    const checkSort = event.target.value;

    if (checkSort == "title") {
      data = data.sort((x, y) => {
        return x.title < y.title ? -1 : 1;
      });
    } else if (checkSort == "lowtohigh") {
      data = data.sort((x, y) => {
        return x.price - y.price;
      });
    } else if (checkSort == "hightolow") {
      data = data.sort((x, y) => {
        return y.price - x.price;
      });
    } else if (checkSort == "default") {
      data = data.sort((x, y) => {
        return x.id - y.id;
      });
    }
    setData(data);
    setSort(checkSort);
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
