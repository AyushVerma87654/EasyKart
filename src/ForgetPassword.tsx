import { withFormik } from "formik";
import React, { FC, FormEventHandler } from "react";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import Input from "./Input";
import { fnType } from "./models";

const loginApi = (values: { email: string }) =>
  console.log("Sending Data", values.email);

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const initialValue = {
  email: "",
};

type ForgetPasswordProps = {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: fnType;
  handleBlur: fnType;
  values: { email: string };
  touched: { email: string };
  errors: { email: string };
  isValid: boolean;
  user: {};
};

const ForgetPassword: FC<ForgetPasswordProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isValid,
  user,
}) => {
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
          value={values.email}
          touched={touched.email}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.email}
        />

        <div className="flex items-center my-4">
          <div className="w-40 h-12 mr-20">
            <CartButton type="submit" disabled={!isValid}>
              Reset Password
            </CartButton>
          </div>
          <Link to="/login">Back To Login Page</Link>
        </div>
      </form>
    </div>
  );
};

const myHoc = withFormik({
  handleSubmit: loginApi,
  validationSchema: schema,
  validateOnMount: true,
  mapPropsToValues: () => {
    return { email: "" };
  },
});

export default myHoc(ForgetPassword);
