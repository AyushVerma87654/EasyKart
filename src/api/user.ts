import { ResponsePayload } from "./../models/response";
import axios from "axios";
import { AuthCompletedResponse } from "../models/user";

export const signupUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}): Promise<ResponsePayload<AuthCompletedResponse>> =>
  axios.post("/api/signup", data).then((res) => res.data);

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ResponsePayload<AuthCompletedResponse>> =>
  axios.post("/api/login", data).then((res) => res.data);

export const fetchMe = async (): Promise<
  ResponsePayload<AuthCompletedResponse>
> => axios.get("/api/me", { withCredentials: true }).then((res) => res.data);

export const logout = async (): Promise<ResponsePayload<{ message: string }>> =>
  axios.get("/api/logout").then((res) => res.data);

export const deleteAccount = async (data: {
  email: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  axios
    .post("/api/deleteAccount", data, { withCredentials: true })
    .then((res) => res.data);

export const sendMail = async (data: {
  email: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  axios.post("/api/sendMail", data).then((res) => res.data);

export const codeVerification = async (data: {
  verificationCode: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  axios.post("/api/codeVerification", data).then((res) => res.data);

export const resetPassword = async (data: {
  password: string;
  email: string;
}): Promise<ResponsePayload<{ message: string }>> =>
  axios
    .post("/api/resetPassword", data, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const dataUpdate = async (): Promise<
  ResponsePayload<{ message: string }>
> =>
  axios
    .get("/api/updateData", { withCredentials: true })
    .then((res) => res.data);
