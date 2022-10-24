import React, { useState } from "react";
import { AlertContext } from "../src/Context";

function AlertProvider({ children }) {
  const [alert, setAlert] = useState();
  const removeAlert = () => setAlert();
  return (
    <AlertContext.Provider value={{ alert, setAlert, removeAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
