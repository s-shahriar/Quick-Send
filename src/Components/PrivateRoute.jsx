import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <LoadingSpinner />;
  if (user) return <div>{children}</div>

  return <Navigate to="/login" state={location.pathname} />;
};

export default PrivateRoute;