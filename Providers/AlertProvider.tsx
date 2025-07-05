import React, { useState, FC } from "react";
import { AlertContext } from "../src/Context";
import { alertType } from "../src/models";

type AlertProviderProps = { children: JSX.Element };

const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alert, setAlert] = useState<alertType>();
  const removeAlert = () => setAlert(undefined);
  return (
    <AlertContext.Provider value={{ alert, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertProvider;
