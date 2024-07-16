import { useQuery } from "@tanstack/react-query";
import React from "react";
import HRRequestList from "../../Components/HRRequestList";
import LoadingSpinner from "../../Components/LoadingSpinner";
import NoticeBoard from "../../Components/NoticeBoard";
import PieChartRender from "../../Components/PieChartRender";
import WishList from "../../Components/WishList";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";
import NewPayment from "../Payment/NewPayment";

const HRHome = () => {
  const [role, companyName, companyLogo, isRoleLoading] = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // requested assets
  const {
    data: requestsData,
    isLoading: isLoadingRequests,
    error: requestsError,
  } = useQuery({
    queryKey: ["requestedAssets", user.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure(`/requests/${user.email}`);
        return res.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onError: (err) => {
      console.error("Failed to fetch requested assets:", err);
    },
  });



  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="my-4 space-y-6">
      <h1 className="text-4xl font-bold text-center text-teal-500 mb-6">
        Welcome Back, {user.displayName}!
      </h1>
      <NoticeBoard />
      <HRRequestList />
      <PieChartRender data={requestsData} />
      <NewPayment></NewPayment>
      <WishList />
    </div>
  );
};

export default HRHome;
