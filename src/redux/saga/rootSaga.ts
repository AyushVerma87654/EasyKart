import { all, fork } from "redux-saga/effects";
import productSaga from "./productSaga";
import userSaga from "./userSaga";
import cartSaga from "./cartSaga";

function* rootSaga() {
  yield all([fork(productSaga), fork(userSaga), fork(cartSaga)]);
}

export default rootSaga;
