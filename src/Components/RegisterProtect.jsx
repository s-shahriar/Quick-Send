import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import LoadingSpinner from "./LoadingSpinner";

const RegisterProtect = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) {
    return <div>{children}</div>;
  }

  return <Navigate to="/" state={location.pathname} />;
};

export default RegisterProtect;