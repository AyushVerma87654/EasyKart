import axios from "axios";
import { withFormik } from "formik";
import { FC, FormEventHandler } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import Input from "./Input";
import { setAlertType, setUserType } from "./models";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { LoginPayload } from "./models/user";
import { loginInitiatedAction } from "./redux/slice/userSlice";

const initialValues = {
  email: "",
  password: "",
};

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).max(20).required(),
});

interface LoginProps extends ReduxProps {
  handleBlur: () => void;
  handleChange: () => void;
  handleSubmit: FormEventHandler<HTMLFormElement>;
  touched: LoginPayload;
  errors: LoginPayload;
  values: LoginPayload;
  isValid: boolean;
}

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

const myHoc = withFormik<LoginProps, LoginPayload>({
  mapPropsToValues: () => initialValues,
  validationSchema: schema,
  handleSubmit: (values: LoginPayload, { props }) => {
    props.loginUser(values);
  },
  validateOnMount: true,
})(Login);

const mapStateToProps = (state: AppState) => ({});

const mapDispatchToProps = {
  loginUser: loginInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(myHoc);
