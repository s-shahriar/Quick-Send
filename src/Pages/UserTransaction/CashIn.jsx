import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useRole from "../../Hooks/useRole";

const CashIn = () => {
  const axiosSecure = useAxiosSecure();
  const [data] = useRole(); // Extract current user's data
  const [cashingIn, setCashingIn] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Cash In";
  }, []);

  const onSubmit = async (data) => {
    setCashingIn(true);
    try {
      const res = await axiosSecure.post("/cash-in", data);
      if (res?.data?.message === "Cash-in request created successfully") {
        reset();
        Swal.fire({
          title: "Success",
          text: "Cash-in request created successfully",
          icon: "success",
          confirmButtonText: "Continue",
        });
        navigate("/");
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.response?.data?.message || "Failed to create cash-in request",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    setCashingIn(false);
  };

  if (cashingIn) return <LoadingSpinner />;

  return (
    <section className="p-6 bg-primary text-gray-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-6 w-full max-w-lg"
      >
        <fieldset className="p-6 rounded-md shadow-sm bg-gray-50">
          <div className="space-y-4 m-auto mb-6">
            <p className="font-bold text-2xl text-center text-teal-500">
              Cash In
            </p>
            <p className="text-lg text-center">
              Ready to cash in? Fill in the necessary information below.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="agentMobileNumber" className="text-sm">
                Agent Mobile Number *
              </label>
              <input
                id="agentMobileNumber"
                type="tel"
                pattern="[0-9]{11}"
                placeholder="Agent Mobile Number"
                {...register("agentMobileNumber", {
                  required: true,
                })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.agentMobileNumber ? "border-red-500" : ""
                }`}
              />
              {errors.agentMobileNumber && (
                <span className="text-red-500 text-sm">
                  {errors.agentMobileNumber.message ||
                    "Agent Mobile Number is required"}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="amount" className="text-sm">
                Amount *
              </label>
              <input
                id="amount"
                type="number"
                placeholder="Amount"
                min="50"
                {...register("amount", {
                  required: true,
                  min: { value: 50, message: "Amount must be at least 50" },
                })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.amount ? "border-red-500" : ""
                }`}
              />
              {errors.amount && (
                <span className="text-red-500 text-sm">
                  {errors.amount.message || "Amount is required"}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="pin" className="text-sm">
                PIN *
              </label>
              <input
                id="pin"
                type="password"
                placeholder="PIN"
                {...register("pin", { required: true })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.pin ? "border-red-500" : ""
                }`}
              />
              {errors.pin && (
                <span className="text-red-500 text-sm">
                  {errors.pin.message || "PIN is required"}
                </span>
              )}
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-blue-900 transition-colors duration-300 uppercase font-extrabold"
              >
                Cash In
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default CashIn;
