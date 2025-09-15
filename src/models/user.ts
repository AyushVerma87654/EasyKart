export type User = {
  fullName: string;
  userName: string;
  email: string;
  isVerified: boolean;
};

export type SignUpPayload = {
  fullName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type ForgetPasswordPayload = {
  email: string;
};

export type CodeVerificationPayload = {
  verificationCode: string;
};

export type ResetPasswordPayload = {
  password: string;
  email: string;
};

export type AuthCompletedResponse = {
  user: User;
  accessToken: string;
};
