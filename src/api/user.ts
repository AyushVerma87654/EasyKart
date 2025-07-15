import { ResponsePayload } from "./../models/response";
import axios from "axios";
import { AuthCompletedResponse } from "../models/user";

export const signupUser = async (data: {
  fullName: string;
  email: string;
  password: string;
}): Promise<ResponsePayload<AuthCompletedResponse>> =>
  axios
    .post("http://localhost:8888/signup", data, {
      withCredentials: true,
    })
    .then((res) => res.data);

export const loginUser = async (data: {
  email: string;
  password: string;
}): Promise<ResponsePayload<AuthCompletedResponse>> =>
  axios
    .post("http://localhost:8888/login", data, {
      withCredentials: true,
    })
    .then((res) => res.data);

//  {
//     fullName: "Raja",
//     userName: "Termi",
//     email: "term@gmail.com",
//     password: "termi",
//   },
