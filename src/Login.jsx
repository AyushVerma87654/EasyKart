import { withFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import Input from "./Input";

function callLoginApi(values) {
  console.log("call Login Api", values);
}

const initialValues = {
  email: "",
  password: "",
};

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(20).required(),
});

function Login({
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  errors,
  values,
  isValid,
}) {
  return (
    <div className="text-gray-600">
      <h1 className="text-2xl font-bold my-6">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="border font-semibold rounded-md border-gray-400 p-5 mb-20"
      >
        <Input
          name="email"
          type="email"
          id="email"
          label="Email Address"
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.email}
          errors={errors.email}
          values={values.email}
          autoComplete="email"
        />
        <Input
          name="password"
          type="password"
          id="password"
          label="Enter Password"
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.password}
          errors={errors.password}
          values={values.password}
          autoComplete="current-password"
        />

        <div className="flex items-center py-6">
          <div>
            <div className="mb-1 mt-2">
              <input type="checkbox" id="check" />
              <label htmlFor="check" className="ml-1">
                Remember me
              </label>
            </div>

            <div className="h-10 my-2">
              <CartButton type="submit" data="LOG IN" disabled={!isValid} />
            </div>

            <div>
              <Link className="p-1 font-normal text-orange-500" to="/forget">
                Lost your password?
              </Link>
            </div>
          </div>

          <Link className="mx-20 text-orange-500" to="/signup">
            Don't have an account? Sign Up for free
          </Link>
        </div>
      </form>
    </div>
  );
}

const myHoc = withFormik({
  initialValues: initialValues,
  validationSchema: schema,
  handleSubmit: callLoginApi,
  validateOnMount: "true",
});

export default myHoc(Login);
