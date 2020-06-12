import React, { useState, useEffect, useContext, createContext } from "react";
import UseAuth from "../hooks/useAuth";
import Password from "antd/lib/input/Password";

const authContext = createContext(null);

export function ProvideAuth({ children }) {
  const auth = UseAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
