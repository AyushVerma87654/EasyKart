import { Formik, Form, withFormik } from "formik";
import Input from "./Input";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import FormikHoc from "./Input";
import { Navigate } from "react-router-dom";

const loginApi = ({
  fullname,
  email,
  username,
  password,
  confirmpassword,
  resetForm,
}) =>
  console.log(
    "Sending Data",
    fullname,
    email,
    username,
    password,
    confirmpassword
  );

const schema = Yup.object().shape({
  fullname: Yup.string().required(),
  email: Yup.string().email().required(),
  username: Yup.string().required(),
  password: Yup.string().min(8).max(15).required(),
  confirmpassword: Yup.string().min(8).max(15).required(),
});

const initialValues = {
  fullname: "",
  email: "",
  username: "",
  password: "",
  confirmpassword: "",
};

export function SignUpPage({
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  touched,
  errors,
  isValid,
  resetForm,
  user,
}) {
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <div className="text-gray-600 py-4">
      <h1 className="font-bold text-2xl mt-3 mb-6">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-400 rounded-md px-5 py-7 mb-10 font-semibold"
      >
        <Input
          label="Full Name"
          name="fullname"
          type="text"
          id="fullname"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          values={values.fullname}
          touched={touched.fullname}
          errors={errors.fullname}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          id="email"
          autoComplete="email"
          onChange={handleChange}
          onBlur={handleBlur}
          values={values.email}
          touched={touched.email}
          errors={errors.email}
        />
        <Input
          label="Username"
          name="username"
          type="text"
          id="username"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          values={values.username}
          touched={touched.username}
          errors={errors.username}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          id="password"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          values={values.password}
          touched={touched.password}
          errors={errors.password}
        />
        <Input
          label="Confirm Password"
          name="confirmpassword"
          type="password"
          id="confirmpassword"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          values={values.confirmpassword}
          touched={touched.confirmpassword}
          errors={errors.confirmpassword}
        />
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 w-32">
            <div className="my-2 h-10">
              <CartButton data="SIGN UP" type="submit" disabled={!isValid} />
            </div>

            <div className="my-2 h-10">
              <CartButton data="RESET" type="button" onClick={resetForm} />
            </div>
          </div>

          <Link className="text-orange-500 ml-12" to="/login">
            Already have an Account? Login Here
          </Link>
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

export default myHoc(SignUpPage);
