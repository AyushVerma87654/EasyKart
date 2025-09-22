import { FC } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Link } from "react-router-dom";
import { AppState } from "./redux/store";
import { getProductByIdInitiatedAction } from "./redux/slice/productSlice";

type ProductProps = {
  thumbnail: string;
  category: string;
  title: string;
  price: number;
  id: number;
} & ReduxProps;

const Product: FC<ProductProps> = ({
  thumbnail,
  category,
  title,
  price,
  id,
  getProductById,
}) => {
  return (
    <div className="max-w-xs">
      <div className=" w-full aspect-square mt-1">
        <img className="w-full h-full object-cover" src={thumbnail} />
      </div>

      <div className="flex justify-around items-center">
        <div>
          <p className="text-gray-400 pt-2 text-xs">{category}</p>
          <h1 className="font-bold my-1 text-sm">{title}</h1>
          <h1 className="font-bold text-sm"> Rs. {price}</h1>
        </div>
        <div className="pt-4 shrink-0">
          <Link
            className="bg-blue-500 text-lg p-2"
            to={"/product/" + id}
            onClick={() => getProductById(id)}
          >
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {
  getProductById: getProductByIdInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(Product);
