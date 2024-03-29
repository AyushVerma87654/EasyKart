import { withFormik } from "formik";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import Input from "./Input";

const loginApi = ({ email }) => console.log("Sending Data", email);

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const initialValues = {
  email: "",
};

function ForgetPassword({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isValid,
  user,
}) {
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="p-12 text-orange-500 w-full">
      <h1 className="my-4 mb-8 font-bold">
        Lost your password? Please enter your email address. You will receive a
        link to create a new password via email.
      </h1>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-400 rounded-md px-5 py-7 mb-10 font-semibold"
      >
        <Input
          label="Enter Email"
          name="email"
          type="email"
          id="email"
          autoComplete="email"
          values={values}
          touched={touched.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.email}
        />

        <div className="flex items-center my-4">
          <div className="w-40 h-12 mr-20">
            <CartButton
              data="Reset Password"
              type="submit"
              disabled={!isValid}
            />
          </div>
          <Link to="/login">Back To Login Page</Link>
        </div>
      </form>
    </div>
  );
}

const myHoc = withFormik({
  initialValues: initialValues,
  handleSubmit: loginApi,
  validationSchema: schema,
  validateOnMount: "true",
});

export default myHoc(ForgetPassword);
