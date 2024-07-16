import React from "react";
import { Helmet } from "react-helmet";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useRole from "../../Hooks/useRole"
import UserHome from "./UserHome";
import GuestHome from "./GuestHome";
import HRHome from "./HRHome";


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
      {data?.role === 'user' && <UserHome />}
      {data?.role === 'admin' && <HRHome />}
      // TODO - AGENT
    </div>
  );
};

export default Home;
