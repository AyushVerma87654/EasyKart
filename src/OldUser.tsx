import { FC, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./Context";

type OldUserProps = { children: JSX.Element };

const OldUser: FC<OldUserProps> = ({ children }) => {
  const { user } = useContext(UserContext);
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default OldUser;
