import React, { createContext } from "react";
import { useState } from "react";

const UserContext = createContext({ email: "", auth: false });

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ email: "", auth: false });

  const loginContext = (email, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setUser((user) => {
      return { email: email, auth: true };
    });
  };

  const logout = () => {
    // localStorage.removeItem("token");
    // localStorage.removeItem("email");
    setUser((user) => {
      return { email: "", auth: false };
    });
  };

  return (
    <UserContext.Provider value={{ user, logout, loginContext }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
