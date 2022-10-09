import React from "react";
import { useContext } from "react";
import { AlertContext, UserContext } from "./Context";

function withUser(IncomingComponent) {
  function OutgoingComponent({ ...props }) {
    const user = useContext(UserContext);
    return <IncomingComponent {...props} {...user} {...alert} />;
  }

  return OutgoingComponent;
}

export default withUser;
