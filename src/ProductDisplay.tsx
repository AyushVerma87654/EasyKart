import { ChangeEvent, FC, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import Loading from "./Loading";
import PageNotFound from "./PageNotFound";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import {
  individualProductSelector,
  inputQuantitySelector,
  productLoadingSelector,
  selectedIdSelector,
} from "./redux/selectors/productSelector";
import {
  changeInputQuantityAction,
  getProductByIdInitiatedAction,
} from "./redux/slice/productSlice";
import {
  cartLoadingCompletedAction,
  editingCartInitiatedAction,
} from "./redux/slice/cartSlice";
import {
  isLoggedInSelector,
  userSelector,
} from "./redux/selectors/userSelector";
import { Cart } from "./models/cart";
import { fetchMeInitiatedAction } from "./redux/slice/userSlice";

interface ProductDisplayProps extends ReduxProps {}

const ProductDisplay: FC<ProductDisplayProps> = ({
  individualProduct,
  productLoading,
  selectedId,
  getProductById,
  inputQuantity,
  changeInputQuantity,
  onAddToCart,
  user,
  isLoggedIn,
  cartLoadingCompleted,
  fetchProfile,
}) => {
  const params = useParams();
  const newId = params.id !== undefined ? +params.id : 0;
  useEffect(() => {
    if (newId !== selectedId && newId !== 0) {
      getProductById(newId);
    }
  }, [newId !== selectedId]);
  useEffect(() => {
    !isLoggedIn && fetchProfile();
    if (!isLoggedIn) {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}") as Cart;
      cartLoadingCompleted({ cart });
    }
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    changeInputQuantity(+event.target.value);
  }

  function handleButtonClick() {
    onAddToCart({
      id: selectedId,
      quantity: inputQuantity,
      price: +individualProduct.price,
      email: user.email,
      isLoggedIn,
    });
  }

  if (productLoading && !individualProduct) {
    return <Loading />;
  }
  return individualProduct ? (
    <div>
      <Link to="/" className="flex items-center">
        <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
        Back
      </Link>
      <div className="flex m-4 p-2">
        <div>
          <img
            className="w-[440px] aspect-square"
            src={individualProduct.thumbnail}
          />
        </div>
        <div className="px-4 space-y-2 text-gray-700">
          <h1 className="text-3xl font-semibold">{individualProduct.title}</h1>
          <h1 className="text-2xl font-bold">Rs. {individualProduct.price}</h1>
          <h1 className="">
            Brand :{" "}
            <span className="text-red-400">{individualProduct.brand}</span>
          </h1>
          <h1 className="">
            Category :{" "}
            <span className="text-red-400">{individualProduct.category}</span>
          </h1>
          <h1 className="">
            Stock Left :{" "}
            <span className="text-red-400">{individualProduct.stock}</span>
          </h1>
          <h1 className="">
            Ratings :{" "}
            <span className="text-red-400">{individualProduct.rating}</span>
          </h1>
          <h1 className="">
            Discount Percentage :
            <span className="text-red-400">
              {individualProduct.discountPercentage}%
            </span>
          </h1>
          <h1>
            <span>{individualProduct.description}</span>
          </h1>
          <div className="flex items-center pt-2">
            <input
              className="border w-14 h-9 border-gray-300 p-1 mr-1"
              type="number"
              value={inputQuantity}
              onChange={handleInputChange}
            />
            <button
              className="bg-red-500 text-white rounded-md w-48 h-9 px-10 font-bold"
              onClick={handleButtonClick}
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-between px-12">
        <div>
          {individualProduct.id > 1 && (
            <Link
              to={"/product/" + (individualProduct.id - 1)}
              className="flex items-center"
            >
              <HiArrowCircleLeft className="text-5xl ml-5 px-1" />
              Previous
            </Link>
          )}
        </div>
        <div>
          {individualProduct.id < 100 && (
            <Link
              to={"/product/" + (individualProduct.id + 1)}
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
};

const mapStateToProps = (state: AppState) => ({
  productLoading: productLoadingSelector(state),
  individualProduct: individualProductSelector(state),
  selectedId: selectedIdSelector(state),
  inputQuantity: inputQuantitySelector(state),
  user: userSelector(state),
  isLoggedIn: isLoggedInSelector(state),
});

const mapDispatchToProps = {
  getProductById: getProductByIdInitiatedAction,
  changeInputQuantity: changeInputQuantityAction,
  onAddToCart: editingCartInitiatedAction,
  cartLoadingCompleted: cartLoadingCompletedAction,
  fetchProfile: fetchMeInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ProductDisplay);
