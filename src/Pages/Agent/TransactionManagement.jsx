import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const TransactionManagement = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Fetch all requests
  const { data: requests, error: requestsError } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const response = await axiosSecure.get("/requests");
      return response.data;
    }
  });

  // Fetch all users
  const { data: users, error: usersError } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const response = await axiosSecure.get("/all-users");
      return response.data.reduce((acc, user) => {
        acc[user._id] = user.name;
        return acc;
      }, {});
    }
  });


  // Mutation for handling actions (approve/deny)
  const handleAction = useMutation({
    mutationFn: async ({ requestId, action }) => {
      const { data } = await axiosSecure.post('/manage-transaction', { requestId, action });
      return data;
    },
    onSuccess: (data, variables) => {
      Swal.fire({
        title: 'Success',
        text: data.message,
        icon: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
    onError: (error) => {
      Swal.fire({
        title: 'Error',
        text: error?.response?.data?.message,
        icon: 'error',
      });
    },
  });

  if (requestsError) {
    return <div>Error fetching requests: {requestsError.message}</div>;
  }

  if (usersError) {
    return <div>Error fetching users: {usersError.message}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-primary">
      <div className="text-center mb-4 pt-4">
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
        {requests?.length === 0 ? (
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
              {requests && requests.map(request => (
                <tr key={request._id}>
                  <td className="py-2 px-4 border border-gray-300 capitalize">
                    {request?.type?.replace(/([A-Z])/g, " $1")}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {request?.amount} BDT
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {users?.[request.userId] || request.userId}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {users?.[request.agentId] || request.agentId}
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
