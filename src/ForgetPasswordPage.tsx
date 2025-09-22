import { withFormik } from "formik";
import { FC, FormEventHandler } from "react";
import { Link, Navigate } from "react-router-dom";
import * as Yup from "yup";
import CartButton from "./CartButton";
import Input from "./Input";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { ForgetPasswordPayload } from "./models/user";
import { forgetPasswordInitiatedAction } from "./redux/slice/userSlice";
import { codeVerificationStatusSelector } from "./redux/selectors/userSelector";
import { CodeVerification } from "./utility/constant";

const schema = Yup.object().shape({
  email: Yup.string().email().required(),
});

const initialValue = {
  email: "",
};

interface ForgetPasswordPageProps extends ReduxProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: () => {};
  resetForm: () => {};
  handleBlur: () => {};
  values: ForgetPasswordPayload;
  touched: ForgetPasswordPayload;
  errors: ForgetPasswordPayload;
  isValid: boolean;
  user: {};
}

const ForgetPasswordPage: FC<ForgetPasswordPageProps> = ({
  handleSubmit,
  handleChange,
  handleBlur,
  values,
  touched,
  errors,
  isValid,
  user,
  codeVerificationStatus,
}) => {
  if (codeVerificationStatus === CodeVerification.INITIATED)
    return <Navigate to="/code-verification" />;

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
              {/* <Link to="/code-verification">Reset Password</Link> */}
              Reset Password
            </CartButton>
          </div>
          <Link to="/login">Back To Login Page</Link>
        </div>
      </form>
    </div>
  );
};

const myHoc = withFormik<ForgetPasswordPageProps, ForgetPasswordPayload>({
  handleSubmit: (values, { props }) => {
    console.log("handlesubmit");
    props.forgetPassword(values);
  },
  validationSchema: schema,
  validateOnMount: true,
  mapPropsToValues: () => {
    return initialValue;
  },
})(ForgetPasswordPage);

const mapStateToProps = (state: AppState) => ({
  codeVerificationStatus: codeVerificationStatusSelector(state),
});

const mapDispatchToProps = {
  forgetPassword: forgetPasswordInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(myHoc);
