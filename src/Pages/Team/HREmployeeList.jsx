import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Swal from 'sweetalert2';
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const HREmployeeTeam = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = "Employee List";
  }, []);

  // Fetch team members query
  const { data: teamMembers = [], isLoading, error, refetch } = useQuery({
    queryKey: ["teamMembers", user.email],
    queryFn: async () => {
      const response = await axiosSecure.post("/employee-list", {
        email: user.email,
      });
      return response.data;
    },
  });

  // Remove from team mutation
  const { mutateAsync } = useMutation({
    mutationFn: async (employeeId) => {
      const hrManagerEmail = user.email;
      const { data } = await axiosSecure.put(`/remove-from-team/${employeeId}`, {
        hrManagerEmail,
      });
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Employee removed from team',
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ['teamMembers'] });
    },
    onError: (error) => {
      console.error('Error removing employee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to remove employee',
      });
    },
  });

  const removeFromTeam = (employeeId) => {
    mutateAsync(employeeId).catch((err) => console.error(err));
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (error) return <p>Error: {error.message}</p>;

  // Filter out HR manager from the team
  const filteredTeamMembers = teamMembers.filter(
    (member) => member.email !== user.email
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-primary">
      <h1 className="text-4xl font-bold mb-8 text-center text-white mt-8 py-4">Your Team Members List</h1>
      {filteredTeamMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
          {filteredTeamMembers.map((teamMember) => (
            <div
              key={teamMember._id}
              className="w-full max-w-md p-8 sm:flex sm:space-x-6 bg-gray-50 text-gray-800 rounded-xl border border-red-900"
            >
              <div className="flex-shrink-0 w-full h-44 sm:h-32 sm:w-32 mb-6 sm:mb-0">
                <img
                  src={teamMember.photoURL || "https://i.ibb.co/hfZnRhv/images-q-tbn-ANd9-Gc-RIpx-Yi1tsp-Yp-BDWAt4qe-VB37-ZEomz-Av-MXG0-Q-s.png"}
                  alt="Team member profile picture"
                  className="object-cover object-center w-full h-full rounded bg-gray-500"
                />
              </div>
              <div className="flex flex-col space-y-4 flex-grow">
                <div>
                  <h2 className="text-2xl font-semibold">{teamMember.fullName}</h2>
                  <p className="text-sm text-gray-600">{teamMember.role.charAt(0).toUpperCase() + teamMember.role.slice(1)}</p>
                  <span className="text-sm text-gray-600">{teamMember.companyName}</span>
                </div>
                <div className="space-y-1">
                  <span className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      aria-label="Email address"
                      className="w-4 h-4"
                    >
                      <path
                        fill="currentColor"
                        d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                      />
                    </svg>
                    <span className="text-gray-600">{teamMember.email}</span>
                  </span>
                  {teamMember.dateOfBirth && (
                    <span className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        aria-label="Date of Birth"
                        className="w-4 h-4"
                      >
                        <path
                          fill="currentColor"
                          d="M448,64H64C46.33,64,32,78.33,32,96v320c0,17.67,14.33,32,32,32h384c17.67,0,32-14.33,32-32V96C480,78.33,465.67,64,448,64z M448,416H64V160h384V416z M128,128V96h64v32H128z M320,128V96h64v32H320z"
                        />
                      </svg>
                      <span className="text-gray-600">{teamMember.dateOfBirth}</span>
                    </span>
                  )}
                </div>
                <button
                  onClick={() => removeFromTeam(teamMember._id)}
                  className="mt-4 py-2 px-4 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                >
                  Remove From Team
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-white uppercase font-extrabold">No team members found...</p>
      )}
    </div>
  );
};

export default HREmployeeTeam;
