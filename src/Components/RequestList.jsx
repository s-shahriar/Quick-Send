import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LoadingSpinner from "./LoadingSpinner";
import TableRender from "./TableRender";

const RequestList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["requestedAssets", user.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure(`/requested-assets/${user.email}`);
        return res.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onError: (err) => {
      console.error("Failed to fetch requested assets:", err);
    },
  });

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Filter and sort requests made in the current month
  const monthlyRequests = data
    ? data
        .filter((item) => {
          const requestDate = new Date(item.requestDate);
          return (
            requestDate.getMonth() === currentMonth &&
            requestDate.getFullYear() === currentYear
          );
        })
        .sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate))
        .slice(0, 5) // Limit to maximum 5 requests
    : [];

  // Filter pending requests
  const pendingRequests = data
    ? data.filter((item) => item.requestStatus === "pending")
    : [];

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <div className="my-4 space-y-6">
        <div className="my-4">
          <h1 className="text-4xl font-bold text-center text-teal-500 my-4">
            My Monthly Requests
          </h1>
          <TableRender data={monthlyRequests} />
        </div>
        <div className="my-4">
          <h1 className="text-4xl font-bold text-center text-teal-500 my-4">
            All Pending Requests
          </h1>
          <TableRender data={pendingRequests} />
        </div>
      </div>
    </div>
  );
};

export default RequestList;
