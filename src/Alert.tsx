import React, { FC, useEffect } from "react";
import { MdVerified } from "react-icons/md";
import { GoUnverified } from "react-icons/go";
import CartButton from "./CartButton";
import { withAlert } from "./ContextHoc";
import { alertType, setAlertType } from "./models";
import { IconType } from "react-icons/lib";

const theme = {
  success: {
    color: "text-green-500",
    Icon: MdVerified,
  },
  error: {
    color: "text-red-500",
    Icon: GoUnverified,
  },
};

type AlertProps = { alert: alertType; removeAlert: () => void };

const Alert: FC<AlertProps> = ({ alert, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(removeAlert, 3 * 1000);
    return () => clearTimeout(timeout);
  }, [alert]);
  if (!alert) {
    return <></>;
  }

  const { type, message } = alert;
  // const { color, Icon } = alert[type];
  const { color, Icon } = type == "success" ? theme.success : theme.error;
  // const { color, Icon } = object;
  return (
    <div className="flex items-center justify-between my-4 bg-white p-4">
      <div className="flex items-center space-x-3">
        <Icon className={"text-6xl " + color} />
        <div className="font-bold text-xl">{type}</div>
        <div>{message}</div>
      </div>
      <div className="w-20 h-10">
        <CartButton onClick={removeAlert}>Dismiss</CartButton>
      </div>
    </div>
  );
};

export default withAlert(Alert);

// const bgClasses = cn("rounded-3xl", {
//   "bg-secondary-400": levelLocked,
//   "bg-secondary-200 text-primary-600": !levelLocked,
// });

import { Form, FormikProps, FormikValues, useFormik, withFormik } from "formik";

// import { FormValues, Login } from "./index";
// interface MyFormikProps {

// }

// export const LoginView = withFormik<MyFormikProps, FormValues>({
//   enableReinitialize: true,
//   mapPropsToValues: (props) => {
//     return { title:"" };
//   },

//   handleSubmit: (values) => {
//     console.log(values);
//   },
// })(Login);

// Link

// https://stackoverflow.com/questions/69146545/formik-with-typescript-set-initalvalue-in-withformik-hoc
