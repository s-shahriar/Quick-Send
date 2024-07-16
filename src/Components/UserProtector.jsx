import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "./LoadingSpinner";

const UserProtector = ({ children }) => {
  const { user, loading } = useAuth();
  const [data, isRoleLoading] = useRole();

  const location = useLocation();

  if (loading || isRoleLoading) return <LoadingSpinner />;

  if (!user) return <Navigate to="/login" state={location.pathname} />;
  
  if (data?.role !== 'user') return <Navigate to="/" />;

  return <div>{children}</div>;
};

export default UserProtector;
