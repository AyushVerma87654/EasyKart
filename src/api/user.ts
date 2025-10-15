import { ResponsePayload } from "./../models/response";
import instance from "./axios";
import { AuthCompletedResponse, User } from "../models/user";

export const signupUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}): Promise<ResponsePayload<AuthCompletedResponse>> =>
  instance.post("/signup", data).then((res) => res.data);

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ResponsePayload<AuthCompletedResponse>> =>
  instance.post("/login", data).then((res) => res.data);

export const fetchMe = async (): Promise<
  ResponsePayload<AuthCompletedResponse>
> => instance.get("/me").then((res) => res.data);

export const logout = async (): Promise<ResponsePayload<{ message: string }>> =>
  instance.get("/logout").then((res) => res.data);

export const deleteAccount = async (): Promise<
  ResponsePayload<{ message: string }>
> => instance.get("/deleteAccount").then((res) => res.data);

export const sendMail = async (data: {
  email: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  instance.post("/sendMail", data).then((res) => res.data);

export const codeVerification = async (data: {
  verificationCode: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  instance.post("/codeVerification", data).then((res) => res.data);

export const resetPassword = async (data: {
  password: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  instance.post("/resetPassword", data).then((res) => res.data);

export const dataUpdate = async (): Promise<
  ResponsePayload<{ message: string }>
> => instance.get("/updateData").then((res) => res.data);

export const updateProfile = async (
  data: User
): Promise<ResponsePayload<{ message: string }>> =>
  instance.post("/update-profile", { user: data }).then((res) => res.data);
