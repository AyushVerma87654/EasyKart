import { FC, FormEventHandler } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { withFormik } from "formik";
import * as Yup from "yup";
import { fnType } from "./models";
import { ForgetPasswordPayload } from "./models/user";
import Input from "./Input";
import CartButton from "./CartButton";
import { Link, Navigate } from "react-router-dom";
import {
  codeVerificationStatusSelector,
  verificationEmailSelector,
} from "./redux/selectors/userSelector";
import { resetPasswordInitiatedAction } from "./redux/slice/userSlice";
import { CodeVerification } from "./utility/constant";

const schema = Yup.object().shape({
  newPassword: Yup.string().required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required(),
});

const initialValues = {
  newPassword: "",
  confirmPassword: "",
};

type ResetPasswordProps = typeof initialValues;

interface ResetPasswordPageProps extends ReduxProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: fnType;
  resetForm: fnType;
  handleBlur: fnType;
  values: ResetPasswordProps;
  touched: ResetPasswordProps;
  errors: ResetPasswordProps;
  isValid: boolean;
  user: {};
}

const ResetPasswordPage: FC<ResetPasswordPageProps> = ({
  handleChange,
  handleSubmit,
  handleBlur,
  values,
  touched,
  errors,
  isValid,
  codeVerificationStatus,
}) => {
  if (codeVerificationStatus === CodeVerification.SUCCESS)
    return <Navigate to="/" />;
  return (
    <div className="px-12 text-orange-500 w-full">
      <h1 className="my-3 font-bold text-center">Reset Your Password</h1>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-400 rounded-md px-5 pt-2 mb-10 font-semibold"
      >
        <Input
          label="New Password"
          name="newPassword"
          type="newPassword"
          id="newPassword"
          autoComplete="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newPassword}
          touched={touched.newPassword}
          errors={errors.newPassword}
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

        <div className="flex items-center my-4">
          <div className="w-40 h-12 mr-20">
            <CartButton type="submit" disabled={!isValid}>
              Verify
            </CartButton>
          </div>
          <Link to="/login">Back To Login Page</Link>
        </div>
      </form>
    </div>
  );
};

const myHoc = withFormik<ResetPasswordPageProps, ResetPasswordProps>({
  mapPropsToValues: () => {
    return initialValues;
  },
  handleSubmit: (values, { props }) => {
    console.log("values hand;lesubhdf", values);
    props.resetPassword({
      email: props.verificationEmail,
      password: values.newPassword,
    });
  },
  validationSchema: schema,
  validateOnMount: true,
})(ResetPasswordPage);

const mapStateToProps = (state: AppState) => ({
  verificationEmail: verificationEmailSelector(state),
  codeVerificationStatus: codeVerificationStatusSelector(state),
});

const mapDispatchToProps = {
  resetPassword: resetPasswordInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(myHoc);
