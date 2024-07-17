import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "./LoadingSpinner";

const LoginProtector = ({ children }) => {
  const { user, loading } = useAuth();
  const [data, isRoleLoading] = useRole();

  const location = useLocation();

  if (loading || isRoleLoading) return <LoadingSpinner />;

  if (!user) return <Navigate to="/login" state={location.pathname} />;

  return <div>{children}</div>;
};

export default LoginProtector;
