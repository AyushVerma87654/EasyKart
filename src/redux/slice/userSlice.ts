import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LoginPayload, SignUpPayload, User } from "../../models/user";

export type UserState = {
  user: User;
  accessToken: string;
  loading: boolean;
  error: string;
};

const initialState: UserState = {
  user: {
    fullName: "",
    userName: "",
    email: "",
    isVerified: false,
  },
  accessToken: "",
  loading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupInitiated,
    authCompleted,
    authError,
    loginInitiated,
    refreshAuth,
  },
});

const { actions, reducer: userReducer } = userSlice;

export const {
  signupInitiated: signupInitiatedAction,
  authCompleted: authCompletedAction,
  authError: authErrorAction,
  loginInitiated: loginInitiatedAction,
  refreshAuth: refreshAuthAction,
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
  state.accessToken = action.payload.accessToken;
}

function authError(state: UserState, action: PayloadAction<{ error: string }>) {
  state.loading = false;
  state.error = action.payload.error;
}

function loginInitiated(state: UserState, action: PayloadAction<LoginPayload>) {
  state.loading = true;
}

function refreshAuth(_state: UserState) {}
