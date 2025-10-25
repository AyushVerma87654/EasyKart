import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  LoginPayload,
  ResetPasswordPayload,
  SignUpPayload,
  User,
} from "../../models/user";
import { CodeVerification } from "../../utility/constant";

export type UserState = {
  user: User;
  accessToken: string;
  loading: boolean;
  message: string;
  isLoggedIn: boolean;
  isUpdatingProfile: boolean;
  verificationEmail: string;
  codeVerificationStatus: CodeVerification;
};

const initialState: UserState = {
  user: {
    id: 0,
    fullName: "",
    userName: "",
    email: "",
    isVerified: false,
  },
  accessToken: "",
  loading: false,
  message: "",
  isLoggedIn: false,
  isUpdatingProfile: false,
  verificationEmail: "",
  codeVerificationStatus: CodeVerification.NULL,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupInitiated,
    authCompleted,
    authError,
    loginInitiated,
    fetchMeInitiated,
    logoutInitiated,
    logoutCompleted,
    logoutError,
    accountDeletionInitiated,
    accountDeletionCompleted,
    accountDeletionError,
    forgetPasswordInitiated,
    verificationCodeSent,
    codeVerificationInitiated,
    codeVerificationCompleted,
    codeVerificationError,
    forgetPasswordError,
    resetPasswordInitiated,
    resetPasswordCompleted,
    resetPasswordError,
    updateDataInitiated,
    updateDataCompleted,
    updateDataError,
    toggleIsUpdatingProfile,
    updatingProfileInitiated,
    updatingProfileCompleted,
    updatingProfileError,
    updateAccessToken,
  },
});

const { actions, reducer: userReducer } = userSlice;

export const {
  signupInitiated: signupInitiatedAction,
  authCompleted: authCompletedAction,
  authError: authErrorAction,
  loginInitiated: loginInitiatedAction,
  fetchMeInitiated: fetchMeInitiatedAction,
  logoutInitiated: logoutInitiatedAction,
  logoutCompleted: logoutCompletedAction,
  logoutError: logoutErrorAction,
  accountDeletionInitiated: accountDeletionInitiatedAction,
  accountDeletionCompleted: accountDeletionCompletedAction,
  accountDeletionError: accountDeletionErrorAction,
  forgetPasswordInitiated: forgetPasswordInitiatedAction,
  verificationCodeSent: verificationCodeSentAction,
  codeVerificationInitiated: codeVerificationInitiatedAction,
  codeVerificationCompleted: codeVerificationCompletedAction,
  codeVerificationError: codeVerificationErrorAction,
  forgetPasswordError: forgetPasswordErrorAction,
  resetPasswordInitiated: resetPasswordInitiatedAction,
  resetPasswordCompleted: resetPasswordCompletedAction,
  resetPasswordError: resetPasswordErrorAction,
  updateDataInitiated: updateDataInitiatedAction,
  updateDataCompleted: updateDataCompletedAction,
  updateDataError: updateDataErrorAction,
  toggleIsUpdatingProfile: toggleIsUpdatingProfileAction,
  updatingProfileInitiated: updatingProfileInitiatedAction,
  updatingProfileCompleted: updatingProfileCompletedAction,
  updatingProfileError: updatingProfileErrorAction,
  updateAccessToken: updateAccessTokenAction,
} = actions;

export default userReducer;

function signupInitiated(
  state: UserState,
  _action: PayloadAction<SignUpPayload>
) {
  state.loading = true;
}

function authCompleted(
  state: UserState,
  action: PayloadAction<{ user: User; accessToken: string }>
) {
  state.loading = false;
  state.user = action.payload.user;
  state.accessToken = action.payload.accessToken ?? state.accessToken;
  state.isLoggedIn = true;
  localStorage.removeItem("cart");
}

function authError(state: UserState, action: PayloadAction<{ error: string }>) {
  state.loading = false;
  state.message = action.payload.error;
}

function loginInitiated(state: UserState, action: PayloadAction<LoginPayload>) {
  state.loading = true;
}

function fetchMeInitiated(state: UserState) {
  state.loading = true;
}

function logoutInitiated(state: UserState) {
  return initialState;
}

function logoutCompleted(
  state: UserState,
  action: PayloadAction<{ message: string }>
) {
  state.loading = false;
  state.message = action.payload.message;
}

function logoutError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function accountDeletionInitiated() {
  return initialState;
}

function accountDeletionCompleted(
  state: UserState,
  action: PayloadAction<{ message: string }>
) {
  state.loading = false;
  state.message = action.payload.message;
}

function accountDeletionError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function forgetPasswordInitiated(
  state: UserState,
  action: PayloadAction<{ email: string }>
) {
  state.loading = true;
  state.verificationEmail = action.payload.email;
  state.codeVerificationStatus = CodeVerification.INITIATED;
}

function verificationCodeSent(state: UserState) {
  state.loading = true;
}

function codeVerificationInitiated(
  state: UserState,
  _action: PayloadAction<{ email: string; verificationCode: string }>
) {}

function codeVerificationCompleted(
  state: UserState,
  action: PayloadAction<{ accessToken: string }>
) {
  state.codeVerificationStatus = CodeVerification.CODEVERIFIED;
  state.accessToken = action.payload.accessToken;
}

function codeVerificationError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
  state.codeVerificationStatus = CodeVerification.FAILURE;
}

function forgetPasswordError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
}

function resetPasswordInitiated(
  state: UserState,
  _action: PayloadAction<ResetPasswordPayload>
) {
  state.loading = true;
}

function resetPasswordCompleted(state: UserState) {
  state.codeVerificationStatus = CodeVerification.SUCCESS;
}

function resetPasswordError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.loading = false;
  state.message = action.payload.error;
  state.codeVerificationStatus = CodeVerification.FAILURE;
}

function updateDataInitiated() {}

function updateDataCompleted(
  state: UserState,
  action: PayloadAction<{ message: string }>
) {
  state.message = action.payload.message;
}

function updateDataError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
}

function toggleIsUpdatingProfile(state: UserState) {
  state.isUpdatingProfile = !state.isUpdatingProfile;
}

function updatingProfileInitiated(
  state: UserState,
  _action: PayloadAction<User>
) {}

function updatingProfileCompleted(
  state: UserState,
  action: PayloadAction<User>
) {
  state.user = {
    ...state.user,
    fullName: action.payload.fullName,
    userName: action.payload.userName,
  };
  state.isUpdatingProfile = false;
}

function updatingProfileError(
  state: UserState,
  action: PayloadAction<{ error: string }>
) {
  state.message = action.payload.error;
}

function updateAccessToken(state: UserState, action: PayloadAction<string>) {
  state.accessToken = action.payload;
}
