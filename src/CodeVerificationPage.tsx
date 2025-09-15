import { FC, FormEventHandler } from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppState } from "./redux/store";
import { fnType } from "./models";
import { CodeVerificationPayload } from "./models/user";
import { withFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import CartButton from "./CartButton";
import Input from "./Input";
import { codeVerificationInitiatedAction } from "./redux/slice/userSlice";
import {
  codeVerificationStatusSelector,
  verificationEmailSelector,
} from "./redux/selectors/userSelector";
import { CodeVerification } from "./utility/constant";

const schema = Yup.object().shape({
  verificationCode: Yup.string().min(8).max(8).required(),
});

const initialValue = {
  verificationCode: "",
};

interface CodeVerificationPageProps extends ReduxProps {
  handleSubmit: FormEventHandler<HTMLFormElement>;
  handleChange: fnType;
  resetForm: fnType;
  handleBlur: fnType;
  values: CodeVerificationPayload;
  touched: CodeVerificationPayload;
  errors: CodeVerificationPayload;
  isValid: boolean;
  user: {};
}

const CodeVerificationPage: FC<CodeVerificationPageProps> = ({
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
  if (codeVerificationStatus === CodeVerification.CODEVERIFIED)
    return <Navigate to="/reset-password" />;

  return (
    <div className="p-12 text-orange-500 w-full">
      <h1 className="my-4 mb-8 font-bold">
        Enter the code sent on your registered email
      </h1>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-400 rounded-md px-5 py-7 mb-10 font-semibold"
      >
        <Input
          label="Enter Verification Code"
          name="verificationCode"
          type="verificationCode"
          id="verificationCode"
          autoComplete="string"
          value={values.verificationCode}
          touched={touched.verificationCode}
          onChange={handleChange}
          onBlur={handleBlur}
          errors={errors.verificationCode}
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

const myHoc = withFormik<CodeVerificationPageProps, CodeVerificationPayload>({
  handleSubmit: (values, { props }) => {
    props.codeVerification({
      email: props.verificationEmail,
      verificationCode: values.verificationCode,
    });
  },
  validationSchema: schema,
  validateOnMount: true,
  mapPropsToValues: () => {
    return initialValue;
  },
})(CodeVerificationPage);

const mapStateToProps = (state: AppState) => ({
  verificationEmail: verificationEmailSelector(state),
  codeVerificationStatus: codeVerificationStatusSelector(state),
});

const mapDispatchToProps = {
  codeVerification: codeVerificationInitiatedAction,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(myHoc);
