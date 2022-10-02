import { Formik, Form } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import Input from "./Input";

function Login() {
  const loginApi = (values) =>
    console.log("Sending Data", values.email, values.password);

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(8).max(15).required(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className="text-gray-600">
      <h1 className="text-2xl font-bold my-6">Login</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={loginApi}
        validationSchema={schema}
        validateOnMount
      >
        <Form className="border font-semibold rounded-md border-gray-400 p-5 mb-20">
          <Input
            label="Email Address"
            id="email"
            name="email"
            type="email"
            autoComplete="email"
          />

          <Input
            label="Password"
            id="password"
            name="password"
            type="password"
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
                <CartButton type="submit" data="LOG IN" />
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
        </Form>
      </Formik>
    </div>
  );
}

export default Login;
