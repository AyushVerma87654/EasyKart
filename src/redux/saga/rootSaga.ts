import { all, fork } from "redux-saga/effects";
import productSaga from "./productSaga";
import userSaga from "./userSaga";
import cartSaga from "./cartSaga";
import orderSaga from "./orderSaga";

function* rootSaga() {
  yield all([
    fork(productSaga),
    fork(userSaga),
    fork(cartSaga),
    fork(orderSaga),
  ]);
}

export default rootSaga;
