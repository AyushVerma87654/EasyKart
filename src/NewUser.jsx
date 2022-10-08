import React from "react";
import { Navigate } from "react-router-dom";

function NewUser({ user, children }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default NewUser;
