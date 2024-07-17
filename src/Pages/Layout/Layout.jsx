import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../../Components/Footer";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Navbar from "../../Components/NavBar";
import useAuth from "../../Hooks/useAuth";

const Layout = () => {
  const { loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <div className="m-auto">
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default Layout;
