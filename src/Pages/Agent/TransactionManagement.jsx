import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from "react";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TransactionManagement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  console.log("User Email:", user.email); // Check if user.email is set

  // Fetch all requests
  const { data: requests, error: requestsError } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const response = await axiosSecure.get("/requests");
      return response.data;
    }
  });

  console.log("Requests:", requests); // Log requests data

  // Fetch all users and map them by email
  const { data: users, error: usersError } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const response = await axiosSecure.get("/all-users");
      console.log(response.data); // Log user data to verify email field
      return response.data.reduce((acc, user) => {
        acc[user.email] = user.name; // Map by email
        return acc;
      }, {});
    }
  });

  console.log("Users:", users); // Log users data

  // Filter requests to show only those related to the agent's email
  const filteredRequests = requests?.filter((request) => {
    console.log("Request Agent ID:", request.agentId); // Log agent ID from request
    const agentEmail = Object.keys(users).find(key => users[key] === user.name);
    return agentEmail === user.email;
  });

  console.log("Filtered Requests:", filteredRequests); // Log filtered requests

  if (requestsError) {
    return <div>Error fetching requests: {requestsError.message}</div>;
  }

  if (usersError) {
    return <div className='container'>Error fetching users: {usersError.message}</div>;
  }

  // Sort the filtered requests to show the latest ones first
  const sortedRequests = filteredRequests?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="mx-auto px-4 py-8 bg-primary">
      <div className="container text-center mb-4 pt-4">
        <h6 className="text-center uppercase text-teal-500 text-2xl font-bold">
          Transaction Management
        </h6>
        <h1 className="mb-5 text-5xl font-extrabold text-white">
          Manage Your{" "}
          <span className="text-uppercase text-5xl text-teal-500">
            Transactions
          </span>
        </h1>
      </div>
      <div className="overflow-x-auto p-6">
        {sortedRequests?.length === 0 ? (
          <div className="text-center text-white">
            No outstanding requests at this moment.........
          </div>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300 bg-primary">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">Type</th>
                <th className="py-2 px-4 border border-gray-300">Amount</th>
                <th className="py-2 px-4 border border-gray-300">User</th>
                <th className="py-2 px-4 border border-gray-300">Agent</th>
                <th className="py-2 px-4 border border-gray-300">Timestamp</th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
                <th className="py-2 px-4 border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {sortedRequests && sortedRequests.map(request => (
                <tr key={request._id}>
                  <td className="py-2 px-4 border border-gray-300 capitalize">
                    {request?.type?.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {request?.amount} BDT
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {users?.[request.userEmail] || request.userEmail} {/* Assuming request contains userEmail */}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {users?.[request.agentEmail] || request.agentEmail} {/* Assuming request contains agentEmail */}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {new Date(request.timestamp).toLocaleString()}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 capitalize">
                    {request.status}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {request.status === "pending" ? (
                      <>
                        <button
                          onClick={() => handleAction.mutate({ requestId: request._id, action: "approve" })}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleAction.mutate({ requestId: request._id, action: "deny" })}
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded mx-1"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className={`capitalize font-bold ${request?.status === 'denied' ? 'text-red-500' : request?.status === 'approved' ? 'text-green-500' : ''}`}>
                        {request?.status}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TransactionManagement;
