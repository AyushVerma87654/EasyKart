import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  authCompletedAction,
  authErrorAction,
  loginInitiatedAction,
  signupInitiatedAction,
} from "../slice/userSlice";
import {
  LoginPayload,
  SignUpPayload,
  AuthCompletedResponse,
} from "../../models/user";
import { loginUser, signupUser } from "../../api/user";
import { ResponsePayload } from "../../models/response";

function* signup(action: PayloadAction<SignUpPayload>): Generator {
  try {
    const response = (yield call(
      signupUser,
      action.payload
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(
      authCompletedAction({
        user: response.responseDetails.user,
        accessToken: response.responseDetails.accessToken,
      })
    );
  } catch (error: any) {
    yield put(authErrorAction({ error: error.message }));
  }
}

function* login(action: PayloadAction<LoginPayload>): Generator {
  try {
    const response = (yield call(
      loginUser,
      action.payload
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(
      authCompletedAction({
        user: response.responseDetails.user,
        accessToken: response.responseDetails.accessToken,
      })
    );
  } catch (error: any) {
    yield put(authErrorAction({ error: error.message }));
  }
}

function* userSaga() {
  yield takeEvery(signupInitiatedAction, signup);
  yield takeEvery(loginInitiatedAction, login);
}

export default userSaga;
