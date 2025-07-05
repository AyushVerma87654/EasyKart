import React, { Component } from "react";
import { Link, useParams } from "react-router-dom";
import IndividualProduct, { IndividualProductProps } from "./IndividualProduct";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import Loading from "./Loading";
import PageNotFound from "./PageNotFound";
import { getProductById } from "./Api";

type ProductDisplayState = {
  loading: boolean;
  product: IndividualProductProps;
  id: number;
};

type ProductDisplayProps = {};

class ProductDisplay extends Component<
  ProductDisplayProps,
  ProductDisplayState
> {
  constructor(props: ProductDisplayState) {
    super(props);

    this.state = {
      loading: false,
      product: {
        brand: "YIOSI",
        category: "lighting",
        description: "Crystal chandelier maria theresa for 12 light",
        discountPercentage: 16,
        rating: "4.74",
        stock: 133,
        price: 47,
        id: 1,
        thumbnail: "https://dummyjson.com/image/i/products/100/thumbnail.jpg",
        title: "Crystal chandelier maria theresa for 12 light",
      },
      id: 0,
    };
  }

  public t = () => {
    const newId = +useParams() || { id: 0 }.id;
    if (newId !== this.state.id) {
      this.setState({ id: newId });
    }
  };

  render(): React.ReactNode {
    if (this.state.loading) {
      return <Loading />;
    }
    return this.state.product ? (
      <div>
        <Link to="/" className="flex items-center">
          <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
          Back
        </Link>
        <IndividualProduct {...this.state.product} />
        <div className="flex justify-between px-12">
          <div>
            {this.state.id > 1 && (
              <Link
                to={"/product/" + (this.state.id - 1)}
                className="flex items-center"
              >
                <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
                Previous
              </Link>
            )}
          </div>
          <div>
            {this.state.id < 100 && (
              <Link
                to={"/product/" + (this.state.id + 1)}
                className="flex items-center"
              >
                Next
                <HiArrowCircleRight className="text-5xl ml-5 px-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    ) : (
      <PageNotFound />
    );
  }
}

export default ProductDisplay;
