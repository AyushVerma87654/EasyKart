import { useState, useEffect } from "react";
import { UserContext } from "../src/Context";
import Loading from "../src/Loading";
import axios from "axios";

function UserProvider({ children }) {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("Token");
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
    <UserContext.Provider value={{ user, setUser, handleButtonRemoveUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
