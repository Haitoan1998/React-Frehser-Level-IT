import React, { Children, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate, Route, Routes } from "react-router";
import { useSelector } from "react-redux";

export default function PrivateRoutes({ children, path }) {
  // const { user } = useContext(UserContext);
  // const isLogin = user.auth;
  const user = useSelector((state) => state.user.account);
  const isLogin = user.auth;
  return <>{user && isLogin ? <>{children}</> : <Navigate to="/login" />}</>;
}
