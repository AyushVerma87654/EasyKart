import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

function Login() {
  // function loginApi(values) {
  //   console.log("Sending Data", values.email, values.password);
  // }

  const loginApi = (values) =>
    console.log("Sending Data", values.email, values.password);

  // , errors, touched, isValid  // onSubmit: loginApi,
  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginApi,
  });

  return (
    <div className="text-gray-600">
      <h1 className="text-2xl font-bold my-6">Login</h1>

      <form
        onSubmit={handleSubmit}
        className="border font-semibold rounded-md border-gray-400 p-5 mb-20"
      >
        <div className="py-1">
          <label htmlFor="email" className="my-2">
            Email Address
          </label>
        </div>

        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="email"
          className="border border-gray-300 w-full px-3 h-12"
          placeholder="Email"
        />
        <div className="py-1 mt-2">
          <label htmlFor="password" className="my-2">
            Password
          </label>
        </div>

        <input
          id="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          autoComplete="current-password"
          className="border border-gray-300 px-3 w-full h-12"
          placeholder="password"
        />
        <div></div>
        <div></div>
        <div></div>
        <div className="flex items-center">
          <div>
            <div className="mb-1 mt-2">
              <input
                // class="woocommerce-form__input woocommerce-form__input-checkbox"
                type="checkbox"
                id="check"
              />
              <label htmlFor="check" className="ml-1">
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className="bg-orange-500 text-white px-12 py-2 rounded-md"
            >
              LOG IN
            </button>
            <div>
              <Link
                className="p-1 font-normal text-orange-500"
                to="/signuppage"
              >
                Lost your password?
              </Link>
            </div>
          </div>
          <Link className="mx-20 text-orange-500" to="/signuppage">
            Don't have an account? Sign Up for free
          </Link>
        </div>
      </form>
    </div>
  );
}

// Dont have an account? Signup

export default Login;
