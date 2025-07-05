import axios from "axios";
import { withFormik } from "formik";
import React, { FC, FormEventHandler } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import { withAlert, withUser } from "./ContextHoc";
import Input from "./Input";
import { setAlertType, setUserType } from "./models";

function callLoginApi(
  values: loginValuesType,
  bag: { props: { setUser: setUserType; setAlert: setAlertType } }
) {
  axios
    .post("https://myeasykart.codeyogi.io/login", {
      email: values.email,
      password: values.password,
    })
    .then((response) => {
      const { user, token } = response.data;
      localStorage.setItem("Token", token);
      bag.props.setUser(user);
      bag.props.setAlert({
        type: "success",
        message: "Login Completed Successfully",
      });
    })
    .catch(() => {
      bag.props.setAlert({ type: "error", message: "Invalid Credentials" });
    });
}

const initialValues = {
  email: "",
  password: "",
};

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(8).max(20).required(),
});

type loginValuesType = { email: string; password: string };

type LoginProps = {
  handleBlur: () => void;
  handleChange: () => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  touched: loginValuesType;
  errors: loginValuesType;
  values: loginValuesType;
  isValid: boolean;
};

const Login: FC<LoginProps> = ({
  handleBlur,
  handleChange,
  handleSubmit,
  touched,
  errors,
  values,
  isValid,
}) => {
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
          value={values.email}
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
          value={values.password}
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
              <CartButton type="submit" disabled={!isValid}>
                LOG IN
              </CartButton>
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
};

const myHoc = withFormik({
  mapPropsToValues: () => initialValues,
  validationSchema: schema,
  handleSubmit: callLoginApi,
  validateOnMount: true,
})(Login);

export default withAlert(withUser(myHoc));
