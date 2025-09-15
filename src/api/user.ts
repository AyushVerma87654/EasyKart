import { ResponsePayload } from "./../models/response";
import instance from "./axios";
import { AuthCompletedResponse } from "../models/user";

export const signupUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}): Promise<ResponsePayload<AuthCompletedResponse>> =>
  instance.post("/api/signup", data).then((res) => res.data);

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ResponsePayload<AuthCompletedResponse>> =>
  instance.post("/api/login", data).then((res) => res.data);

export const fetchMe = async (): Promise<
  ResponsePayload<AuthCompletedResponse>
> => instance.get("/me", { withCredentials: true }).then((res) => res.data);

export const logout = async (): Promise<ResponsePayload<{ message: string }>> =>
  instance.get("/logout").then((res) => res.data);

export const deleteAccount = async (data: {
  email: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  instance
    .post("/deleteAccount", data, { withCredentials: true })
    .then((res) => res.data);

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
  email: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  instance
    .post("/resetPassword", data, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const dataUpdate = async (): Promise<
  ResponsePayload<{ message: string }>
> =>
  instance
    .get("/updateData", { withCredentials: true })
    .then((res) => res.data);
