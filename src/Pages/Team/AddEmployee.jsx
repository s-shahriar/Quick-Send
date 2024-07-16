import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddEmployee = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  useEffect(() => {
    document.title = "Add Employee to Team";
  }, []);

  // Fetch unaffiliated employees query
  const {
    data: unaffiliatedEmployees = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["unaffiliatedEmployees"],
    queryFn: async () => {
      const response = await axiosSecure.get("/unaffiliated-employees");
      return response.data;
    },
  });

  // Fetch employee count and HR limit
  const { data: employeeData } = useQuery({
    queryKey: ["employeeList"],
    queryFn: async () => {
      const response = await axiosSecure.post("/employee-list", {
        email: user.email,
      });
      return response.data;
    },
  });

  const { data: hrLimitData } = useQuery({
    queryKey: ["hrLimit"],
    queryFn: async () => {
      const response = await axiosSecure.post("/hr-limit", {
        email: user.email,
      });
      return response.data;
    },
  });

  const hrLimit = hrLimitData?.limit || 0;

  // Add to team mutation
  const addToTeamMutation = useMutation({
    mutationFn: async (employeeIds) => {
      const { data } = await axiosSecure.put("/add-to-team", {
        employeeIds,
        hrManagerEmail: user.email,
      });
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Selected employees added to the team",
        timer: 2000,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries({ queryKey: ["unaffiliatedEmployees"] });
      queryClient.invalidateQueries({ queryKey: ["hrLimit"] }); // Invalidate hrLimit query
      queryClient.invalidateQueries({ queryKey: ["employeeList"] }); // Invalidate employeeList query
      setSelectedEmployees([]); // Clear the selection after successful addition
    },
    onError: (error) => {
      console.error("Error adding employees to the team:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text:
          error.response.data.error || "Failed to add employees to the team",
      });
    },
  });

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelected) =>
      prevSelected.includes(employeeId)
        ? prevSelected.filter((id) => id !== employeeId)
        : [...prevSelected, employeeId]
    );
  };

  const handleAddToTeam = () => {
    if (selectedEmployees.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "No selection",
        text: "Please select at least one employee to add to the team",
      });
      return;
    }
    addToTeamMutation.mutate(selectedEmployees);
  };

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8 bg-primary mt-8">
      {/* Package Section */}
      <div className="mb-8 p-6">
        <h2 className="text-4xl font-semibold mb-4 text-white text-center">
          Package Section
        </h2>
        <p className="mb-2 text-white text-center">
          Total Employees Under Your Current Package:{" "}
          {employeeData?.length || 0}
        </p>
        <p className="mb-2 text-white text-center">
          Your Current Package Limit: {hrLimit}
        </p>
        <div className="flex justify-center">
          <Link
            to="/payment"
            className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-green-700 mt-2"
          >
            Upgrade Package
          </Link>
        </div>
      </div>
      <hr className="w-3/4 mx-auto border-gray-500" />

      <h1 className="text-4xl font-bold mb-8 text-center text-white mt-8 py-4">
        Unaffiliated Employees
      </h1>
      {unaffiliatedEmployees.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 justify-items-center">
          {unaffiliatedEmployees.map((employee) => (
            <div
              key={employee._id}
              className="w-full max-w-md p-8 sm:flex sm:space-x-6 bg-gray-50 text-gray-800 rounded-xl border border-red-900 relative"
            >
              <div className="flex-shrink-0 w-full h-44 sm:h-32 sm:w-32 mb-6 sm:mb-0 flex items-center justify-center relative">
                <input
                  type="checkbox"
                  className="form-checkbox absolute top-2 left-2"
                  checked={selectedEmployees.includes(employee._id)}
                  onChange={() => handleCheckboxChange(employee._id)}
                />
                <img
                  src={employee.image || "https://i.ibb.co/hfZnRhv/images-q-tbn-ANd9-Gc-RIpx-Yi1tsp-Yp-BDWAt4qe-VB37-ZEomz-Av-MXG0-Q-s.png"}
                  alt="Employee profile picture"
                  className="object-cover object-center w-full h-full rounded bg-gray-500"
                />
              </div>
              <div className="flex flex-col space-y-4 flex-grow">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {employee.fullName}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {employee.role.charAt(0).toUpperCase() +
                      employee.role.slice(1)}
                  </p>
                  <span className="text-sm text-gray-600">
                    {employee.companyName}
                  </span>
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
                    <span className="text-gray-600">{employee.email}</span>
                  </span>
                  {employee.dateOfBirth && (
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
                      <span className="text-gray-600">
                        {employee.dateOfBirth}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-xl text-white uppercase font-extrabold">
          No unaffiliated employees found...
        </p>
      )}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleAddToTeam}
          className="py-2 px-4 bg-teal-500 text-white font-semibold rounded hover:bg-green-700"
        >
          Add Selected Members to the Team
        </button>
      </div>
    </div>
  );
};

export default AddEmployee;
