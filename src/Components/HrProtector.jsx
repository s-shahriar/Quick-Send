import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import LoadingSpinner from "./LoadingSpinner";

const HrProtector = ({ children }) => {
  const { user, loading } = useAuth();
  const [role, companyName, companyLogo, isRoleLoading] = user ? useRole() : [null, null, null, false];
  const location = useLocation();

  if (loading || isRoleLoading) return <LoadingSpinner />;

  if (!user) return <Navigate to="/login" state={location.pathname }/>;

  if (role !== 'hr') return <Navigate to="/" />;

  return <div>{children}</div>;
};

export default HrProtector;
