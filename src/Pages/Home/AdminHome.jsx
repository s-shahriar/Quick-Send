import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const fetchUsers = async (axiosSecure) => {
  const response = await axiosSecure.get("/users");
  return response.data;
};

const manageUser = async ({ axiosSecure, userId, action }) => {
  const response = await axiosSecure.patch("/manage-user", {
    userId,
    action,
  });
  return response.data;
};

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(axiosSecure),
  });

  const mutation = useMutation({
    mutationFn: (data) => manageUser(data),
    onSuccess: (data, { userId, action }) => {
      Swal.fire("Success", data.message, "success");
      queryClient.setQueryData(["users"], (oldUsers) =>
        oldUsers.map((user) =>
          user._id === userId
            ? {
                ...user,
                status:
                  action === "activate"
                    ? "approved"
                    : action === "block"
                    ? "blocked"
                    : user.status,
              }
            : user
        )
      );
    },
    onError: (error) => {
      Swal.fire("Error", error.response.data.message, "error");
    },
  });

  const handleAction = (userId, action) => {
    mutation.mutate({ axiosSecure, userId, action });
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="container">Loading...</div>;
  }

  if (isError) {
    return <div className="container">Error loading users</div>;
  }

  return (
    <div className="bg-primary">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 pt-4 space-y-6">
          <h1 className="text-4xl font-bold text-center text-teal-500 mb-6">
            Welcome Back, Admin!
          </h1>
        </div>
        <div className="text-center mb-4 pt-4">
          <h1 className="text-4xl font-extrabold text-white p-4">
            User Management
          </h1>
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-4 p-2 w-1/2 rounded-md"
          />
        </div>
        <div className="overflow-x-auto p-6">
          <table className="w-full table-auto border-collapse border border-gray-300 bg-primary">
            <thead className="bg-teal-500 text-white">
              <tr>
                <th className="py-2 px-4 border border-gray-300">Name</th>
                <th className="py-2 px-4 border border-gray-300">Email</th>
                <th className="py-2 px-4 border border-gray-300">Mobile</th>
                <th className="py-2 px-4 border border-gray-300">Role</th>
                <th className="py-2 px-4 border border-gray-300">Status</th>
                <th className="py-2 px-4 border border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody className="text-white">
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border border-gray-300">
                    {user.name}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {user.email}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {user.mobileNumber}
                  </td>
                  <td className="py-2 px-4 border border-gray-300 capitalize">
                    {user.role}
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    <span
                      className={`capitalize font-bold ${
                        user.status === "blocked"
                          ? "text-red-500"
                          : user.status === "approved"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border border-gray-300">
                    {user.status === "pending" && (
                      <button
                        onClick={() => handleAction(user._id, "activate")}
                        className="bg-green-500 text-white py-1 px-3 rounded-md mr-2"
                      >
                        Approve
                      </button>
                    )}
                    {user.status === "blocked" ? (
                      <button
                        onClick={() => handleAction(user._id, "activate")}
                        className="bg-green-500 text-white py-1 px-3 rounded-md"
                      >
                        Unblock
                      </button>
                    ) : user.status !== "pending" ? (
                      <button
                        onClick={() => handleAction(user._id, "block")}
                        className="bg-red-500 text-white py-1 px-3 rounded-md"
                      >
                        Block
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="text-center text-white mt-4">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
