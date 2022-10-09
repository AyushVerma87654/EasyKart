import React from "react";
import { useContext } from "react";
import { AlertContext, UserContext } from "./Context";

function withAlert(IncomingComponent) {
  function OutgoingComponent({ ...props }) {
    const alert = useContext(AlertContext);
    return <IncomingComponent {...props} {...alert} />;
  }

  return OutgoingComponent;
}

export default withAlert;
