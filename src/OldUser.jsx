import React from "react";
import { Navigate } from "react-router-dom";

function OldUser({ user, children }) {
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default OldUser;
