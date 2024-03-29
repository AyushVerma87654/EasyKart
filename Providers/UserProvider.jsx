import React, { useState, useEffect } from "react";
import { UserContext } from "../src/Context";
import Loading from "../src/Loading";
import axios from "axios";

function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("Token");
  const isLoggedIn = !!token;

  useEffect(() => {
    if (token) {
      axios
        .get("https://myeasykart.codeyogi.io/me", {
          headers: { Authorization: token },
        })
        .then((response) => {
          setUser(response.data);
          // console.log(user);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("Token");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const handleButtonRemoveUser = () => {
    setUser(undefined);
    localStorage.removeItem("Token");
  };

  if (loading) {
    <Loading />;
  }

  return (
    <UserContext.Provider
      value={{ user, setUser, handleButtonRemoveUser, isLoggedIn }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
