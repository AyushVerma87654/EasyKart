import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import {
  accountDeletionCompletedAction,
  accountDeletionErrorAction,
  accountDeletionInitiatedAction,
  authCompletedAction,
  authErrorAction,
  codeVerificationCompletedAction,
  codeVerificationInitiatedAction,
  fetchMeInitiatedAction,
  forgetPasswordErrorAction,
  forgetPasswordInitiatedAction,
  loginInitiatedAction,
  logoutCompletedAction,
  logoutErrorAction,
  logoutInitiatedAction,
  resetPasswordCompletedAction,
  resetPasswordErrorAction,
  resetPasswordInitiatedAction,
  signupInitiatedAction,
  updateDataCompletedAction,
  updateDataErrorAction,
  updateDataInitiatedAction,
  verificationCodeSentAction,
} from "../slice/userSlice";
import {
  LoginPayload,
  SignUpPayload,
  AuthCompletedResponse,
  ForgetPasswordPayload,
  ResetPasswordPayload,
} from "../../models/user";
import {
  codeVerification,
  dataUpdate,
  deleteAccount,
  fetchMe,
  loginUser,
  logout,
  resetPassword,
  sendMail,
  signupUser,
} from "../../api/user";
import { ResponsePayload } from "../../models/response";
import { cartLoadingCompletedAction } from "../slice/cartSlice";

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
    yield put(
      cartLoadingCompletedAction({
        cart: response.responseDetails.user.cart.items,
      })
    );
  } catch (error: any) {
    yield put(authErrorAction({ error: error.message }));
  }
}

function* fetchme(): Generator {
  try {
    const response = (yield call(
      fetchMe
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(
      authCompletedAction({
        user: response.responseDetails.user,
        accessToken: response.responseDetails.accessToken,
      })
    );
    yield put(
      cartLoadingCompletedAction({
        cart: response.responseDetails.user.cart.items,
      })
    );
  } catch (error: any) {
    yield put(authErrorAction({ error: error.message }));
  }
}

function* logOut(): Generator {
  try {
    const response = (yield call(logout)) as ResponsePayload<{
      message: string;
    }>;
    yield put(
      logoutCompletedAction({
        message: response.responseDetails.message,
      })
    );
  } catch (error: any) {
    yield put(logoutErrorAction({ error: error.message }));
  }
}

function* accountDeletion(
  action: PayloadAction<ForgetPasswordPayload>
): Generator {
  try {
    const response = (yield call(
      deleteAccount,
      action.payload
    )) as ResponsePayload<{
      message: string;
    }>;
    yield put(
      accountDeletionCompletedAction({
        message: response.responseDetails.message,
      })
    );
  } catch (error: any) {
    yield put(accountDeletionErrorAction({ error: error.message }));
  }
}

function* forgetPassword(
  action: PayloadAction<ForgetPasswordPayload>
): Generator {
  console.log("action.payload", action.payload);
  try {
    const response = (yield call(sendMail, action.payload)) as ResponsePayload<{
      message: string;
    }>;
    yield put(verificationCodeSentAction());
  } catch (error: any) {
    yield put(forgetPasswordErrorAction({ error: error.message }));
  }
}

function* verifyCode(
  action: PayloadAction<{ verificationCode: string }>
): Generator {
  try {
    const response = (yield call(
      codeVerification,
      action.payload
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(codeVerificationCompletedAction());
  } catch (error: any) {
    yield put(forgetPasswordErrorAction({ error: error.message }));
  }
}

function* passwordReset(
  action: PayloadAction<ResetPasswordPayload>
): Generator {
  try {
    const response = (yield call(
      resetPassword,
      action.payload
    )) as ResponsePayload<AuthCompletedResponse>;
    yield put(resetPasswordCompletedAction());
    yield put(
      authCompletedAction({
        user: response.responseDetails.user,
        accessToken: response.responseDetails.accessToken,
      })
    );
  } catch (error: any) {
    yield put(resetPasswordErrorAction({ error: error.message }));
  }
}

function* updateData(): Generator {
  try {
    const response = (yield call(dataUpdate)) as ResponsePayload<{
      message: string;
    }>;
    yield put(updateDataCompletedAction(response.responseDetails));
  } catch (error: any) {
    yield put(updateDataErrorAction({ error: error.message }));
  }
}

function* userSaga() {
  yield takeEvery(signupInitiatedAction, signup);
  yield takeEvery(loginInitiatedAction, login);
  yield takeEvery(fetchMeInitiatedAction, fetchme);
  yield takeEvery(logoutInitiatedAction, logOut);
  yield takeEvery(accountDeletionInitiatedAction, accountDeletion);
  yield takeEvery(forgetPasswordInitiatedAction, forgetPassword);
  yield takeEvery(codeVerificationInitiatedAction, verifyCode);
  yield takeEvery(resetPasswordInitiatedAction, passwordReset);
  yield takeEvery(updateDataInitiatedAction, updateData);
}

export default userSaga;
