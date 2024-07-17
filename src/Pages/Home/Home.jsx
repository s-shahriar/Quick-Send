import React from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useRole from "../../Hooks/useRole";
import AdminHome from "./AdminHome";
import GuestHome from "./GuestHome";
import UserHome from "./UserHome";


const Home = () => {
  const [data, isRoleLoading, error] = useRole();

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Helmet>
        <title>Home - Quick Send</title>
      </Helmet>
      {(data?.role === undefined) && <GuestHome />}
      {(data?.role === 'user' ||data?.role === 'agent') && <UserHome />}
      {data?.role === 'admin' && <AdminHome />}
    </div>
  );
};

export default Home;
