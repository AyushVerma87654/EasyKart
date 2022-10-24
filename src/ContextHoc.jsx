import React, { useContext } from "react";
import { AlertContext, CartContext, UserContext } from "./Context";

const ContextHoc =
  (Context) =>
  (IncomingComponent) =>
  ({ ...props }) => {
    const data = useContext(Context);
    return <IncomingComponent {...props} {...data} />;
  };

export default ContextHoc;

export const withUser = ContextHoc(UserContext);
export const withAlert = ContextHoc(AlertContext);
export const withCart = ContextHoc(CartContext);
