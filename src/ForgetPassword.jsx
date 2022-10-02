import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import Errors from "./Errors";
import FormikInput from "./FormikInput";

function ForgetPassword() {
  const loginApi = ({ email }) => console.log("Sending Data", email);

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const initialValues = {
    email: "",
  };

  return (
    <div className="p-12 text-orange-500 w-full">
      <h1 className="my-4 mb-8 font-bold">
        Lost your password? Please enter your email address. You will receive a
        link to create a new password via email.
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={loginApi}
        validationSchema={schema}
        validateOnMount
      >
        <Form className="border border-gray-400 rounded-md px-5 py-7 mb-10 font-semibold">
          <FormikInput
            label="Enter Email"
            name="email"
            type="email"
            id="email"
            autoComplete="text"
          />

          <div className="flex items-center my-4">
            <div className="w-40 h-12 mr-20">
              <CartButton data="Reset Password" type="submit" />
            </div>
            <Link to="/login">Back To Login Page</Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default ForgetPassword;
