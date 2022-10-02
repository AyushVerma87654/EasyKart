import { Formik, Form } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import FormikHoc from "./Input";

function SignUpPage() {
  const loginApi = ({ fullname, email, username, password, confirmpassword }) =>
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

  return (
    <div className="text-gray-600 py-4">
      <h1 className="font-bold text-2xl mt-3 mb-6">Sign Up</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={loginApi}
        validationSchema={schema}
        validateOnMount
      >
        <Form className="border border-gray-400 rounded-md px-5 py-7 mb-10 font-semibold">
          <FormikHoc
            label="Full Name"
            name="fullname"
            type="text"
            id="fullname"
            autoComplete="text"
          />
          <FormikHoc
            label="Email"
            name="email"
            type="email"
            id="email"
            autoComplete="email"
          />
          <FormikHoc
            label="Username"
            name="username"
            type="text"
            id="username"
            autoComplete="text"
          />
          <FormikHoc
            label="Password"
            name="password"
            type="password"
            id="password"
            autoComplete="text"
          />
          <FormikHoc
            label="Confirm Password"
            name="confirmpassword"
            type="password"
            id="confirmpassword"
            autoComplete="text"
          />
          <div className="flex items-center">
            <div className="flex flex-col space-y-2 w-32">
              <div className="my-2 h-10">
                <CartButton data="SIGN UP" type="submit" />
              </div>

              <div className="my-2 h-10">
                <CartButton data="RESET" type="button" />
              </div>
            </div>

            <Link className="text-orange-500 ml-12" to="/login">
              Already have an Account? Login Here
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

export default SignUpPage;
