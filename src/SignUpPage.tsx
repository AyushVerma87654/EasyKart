import { withFormik } from "formik";
import Input from "./Input";
import React, { FC, FormEventHandler } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import axios from "axios";
import { withAlert, withUser } from "./ContextHoc";
import { fnType, setAlertType, setUserType } from "./models";
import { SignUpPayload } from "./models/user";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { signupInitiatedAction } from "./redux/slice/userSlice";

const schema = Yup.object().shape({
  fullName: Yup.string().required(),
  email: Yup.string().email().required(),
  userName: Yup.string().required(),
  password: Yup.string().min(4).max(15).required(),
  confirmPassword: Yup.string()
    .min(4)
    .max(15)
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required(),
});

const initialValues = {
  fullName: "",
  email: "",
  userName: "",
  password: "",
  confirmPassword: "",
};

interface SignUpPageProps extends ReduxProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: fnType;
  resetForm: fnType;
  handleBlur: fnType;
  values: SignUpPayload;
  touched: SignUpPayload;
  errors: SignUpPayload;
  isValid: boolean;
  user: {};
}

const SignUpPage: FC<SignUpPageProps> = ({
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  touched,
  errors,
  isValid,
  resetForm,
}) => {
  return (
    <div className="text-gray-600 py-4">
      <h1 className="font-bold text-2xl mt-3 mb-6">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-400 rounded-md px-5 py-7 mb-10 font-semibold"
      >
        <Input
          label="Full Name"
          name="fullName"
          type="text"
          id="fullname"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.fullName}
          touched={touched.fullName}
          errors={errors.fullName}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          id="email"
          autoComplete="email"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email}
          touched={touched.email}
          errors={errors.email}
        />
        <Input
          label="Username"
          name="userName"
          type="text"
          id="username"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.userName}
          touched={touched.userName}
          errors={errors.userName}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          id="password"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          touched={touched.password}
          errors={errors.password}
        />
        <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          id="confirmpassword"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.confirmPassword}
          touched={touched.confirmPassword}
          errors={errors.confirmPassword}
        />
        <div className="flex items-center">
          <div className="flex flex-col space-y-2 w-32">
            <div className="my-2 h-10">
              <CartButton type="submit" disabled={!isValid}>
                SIGN UP
              </CartButton>
            </div>

            <div className="my-2 h-10">
              <CartButton type="submit" onClick={resetForm}>
                RESET
              </CartButton>
            </div>
          </div>

          <Link className="text-orange-500 ml-12" to="/login">
            Already have an Account? Login Here
          </Link>
        </div>
      </form>
    </div>
  );
};

const myHoc = withFormik<SignUpPageProps, SignUpPayload>({
  mapPropsToValues: () => {
    return initialValues;
  },
  handleSubmit: (values, { props }) => {
    props.signupUser(values);
  },
  validationSchema: schema,
  validateOnMount: true,
})(SignUpPage);

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {
  signupUser: signupInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(myHoc);
