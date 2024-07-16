import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import HRRequestedView from "../../Components/HRRequestedView";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const HRRequestsPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "Employee Requests List";
  }, []);

  const {
    data: requests,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["requests", user.email],
    queryFn: async () => {
      try {
        const { data } = await axiosSecure.get(`/requests/${user.email}`);
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    enabled: !!user.email, // Only run the query if user.email is available
    onError: (err) => {
      console.error("Error fetching requests:", err);
    },
  });

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div>Error fetching requests: {error.message}</div>;
  }

  // Filter requests based on the search query
  const filteredRequests = requests.filter((request) => {
    const requesterName = `${request.requesterFirstName} ${request.requesterLastName}`.toLowerCase();
    const requesterEmail = request.requesterEmail.toLowerCase();
    const searchLower = searchQuery.toLowerCase();

    return requesterName.includes(searchLower) || requesterEmail.includes(searchLower);
  });

  return (
    <div className="bg-primary px-8">
      <div className="text-center my-8 pt-4">
        <h6 className="text-center uppercase text-teal-500 text-2xl font-bold">
          Requested Assets
        </h6>
        <h1 className="mb-5 text-5xl font-extrabold text-white">
          Check Your Requested{" "}
          <span className="text-uppercase text-5xl text-teal-500">
            Asset List
          </span>
        </h1>
      </div>

      <div className="flex flex-col items-center mb-5 space-y-8">
        <input
          type="text"
          placeholder="Search by using EMAIL ADDRESS...."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
          className="p-2 rounded border border-gray-300 w-full max-w-md"
        />
      </div>
      <div className="py-4">
      <HRRequestedView
        data={filteredRequests}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
      />
      </div>

    </div>
  );
};

export default HRRequestsPage;
