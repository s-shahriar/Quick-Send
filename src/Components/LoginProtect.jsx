import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const LoginProtector = ({ children }) => {
  const { user, loading } = useAuth();
  console.log(user)
  const location = useLocation();

  if (loading) return <LoadingSpinner />;

  if (!user) return <Navigate to="/login" state={location.pathname} />;
  
  return <div>{children}</div>;
};

export default LoginProtector;
