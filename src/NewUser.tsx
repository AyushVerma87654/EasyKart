import React, { FC } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Context";

type NewUserProps = { children: JSX.Element };

const NewUser: FC<NewUserProps> = ({ children }) => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default NewUser;
