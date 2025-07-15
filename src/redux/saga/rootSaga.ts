import { all, fork } from "redux-saga/effects";
import productSaga from "./productSaga";
import userSaga from "./userSaga";

function* rootSaga() {
  yield all([fork(productSaga), fork(userSaga)]);
}

export default rootSaga;
