import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { setLoading, createUser } = useAuth();
  const [showPin, setShowPin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const transformPinToPassword = (pin) => {
    return `${pin}A1`;
  };

  const onSubmit = async (data) => {
    const { name, pin, mobileNumber, email, role } = data;

    const mobileNumberPattern = /^\d{11}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      toast.error("Mobile Number must be a 11-digit number", {
        position: "top-center",
      });
      return;
    }

    const pinPattern = /^\d{5}$/;
    if (!pinPattern.test(pin)) {
      toast.error("PIN must be a 5-digit number", {
        position: "top-center",
      });
      return;
    }

    const password = transformPinToPassword(pin);

    try {
      // Send backend API request to register user
      const requestBody = {
        name,
        pin,
        mobileNumber,
        email,
        role,
      };

      const result = await createUser(email, password);

      const response = await axiosSecure.post("/register", requestBody);
      if (response.status === 201) {
        toast.success("Account created successfully!", {
          position: "top-center",
        });
        navigate("/login");
      } else {
        toast.error("Something went wrong...", {
          position: "top-center",
        });
      }
    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
      });
    }
    setLoading(false);
  };

  return (
    <div className="hero bg-secondary my-5 py-10">
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse justify-evenly">
        <div className="text-center lg:text-left lg:w-1/3">
          <h1 className="text-5xl font-bold text-blue-500">Register</h1>
          <p className="py-6 text-white">
            Joining is very simple. Just fill up your information and you will be ready to exchange in no time
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#0f172b] text-white mx-auto">
            <h1 className="text-2xl font-bold text-center">Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1 text-sm relative">
                <label htmlFor="name" className="block text-white">
                  Full Name
                </label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                {errors.name && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="space-y-1 text-sm relative">
                <label htmlFor="email" className="block text-white">
                  Email Address
                </label>
                <input
                  {...register("email", { required: true })}
                  type="text"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                {errors.email && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="space-y-1 text-sm relative">
                <label htmlFor="mobileNumber" className="block text-white">
                  Mobile Number
                </label>
                <input
                  {...register("mobileNumber", { required: true })}
                  type="text"
                  name="mobileNumber"
                  id="mobileNumber"
                  placeholder="Enter your mobile number"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                {errors.mobileNumber && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="space-y-1 text-sm relative">
                <label htmlFor="pin" className="block text-white">
                  5-digit PIN
                </label>
                <input
                  {...register("pin", { required: true })}
                  type={showPin ? "text" : "password"}
                  name="pin"
                  id="pin"
                  placeholder="Enter your 5-digit PIN"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                <button
                  type="button"
                  className="absolute top-[32px] right-0 mt-2 mr-4 text-gray-600"
                  onClick={() => setShowPin(!showPin)}
                >
                  {showPin ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <path
                        fillRule="evenodd"
                        d="M23.654 11.315c-1.12-1.423-2.687-2.674-4.645-3.765-2.227-1.248-4.784-1.996-7.805-1.996-3.02 0-5.578.748-7.805 1.996-1.959 1.091-3.525 2.342-4.645 3.765-.17.216-.17.53 0 .746 1.12 1.423 2.687 2.674 4.645 3.765 2.227 1.248 4.784 1.996 7.805 1.996 3.02 0 5.578-.748 7.805-1.996 1.959-1.091 3.525-2.342 4.645-3.765.17-.216.17-.53 0-.746zM11.998 19c-2.533 0-4.833-.617-6.581-1.654-.174-.105-.344-.23-.505-.374-.41-.354-.77-.814-1.084-1.386-.319-.576-.486-1.24-.486-1.986s.167-1.41.486-1.986c.314-.572.674-1.032 1.084-1.386.161-.145.331-.27.505-.375 1.748-1.037 4.048-1.654 6.581-1.654s4.833.617 6.581 1.654c.174.105.344.23.505.375.41.354.77.814 1.084 1.386.319.576.486 1.24.486 1.986s-.167 1.41-.486 1.986c-.314.572-.674 1.032-1.084 1.386-.161.145-.331.27-.505.374-1.748 1.037-4.048 1.654-6.581 1.654zM2.708 10.98c.282-.282.727-.293 1.01-.011 1.463 1.463 3.264 2.201 5.281 2.201s3.818-.738 5.281-2.201c.282-.282.728-.271 1.01.011.281.281.293.728.011 1.01-1.654 1.654-3.748 2.451-6.292 2.451s-4.638-.797-6.292-2.451c-.281-.282-.27-.729.011-1.01zm6.291 4.032c-1.243 0-2.25-1.007-2.25-2.25s1.007-2.25 2.25-2.25 2.25 1.007 2.25 2.25-1.007 2.25-2.25 2.25zm0-3.5c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm2.05-4.53c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.12 2.12c-.29.29-.77.29-1.06 0-.29-.29-.29-.77 0-1.06l2.12-2.12z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <path
                        fillRule="evenodd"
                        d="M23.654 11.315c-1.12-1.423-2.687-2.674-4.645-3.765-2.227-1.248-4.784-1.996-7.805-1.996-3.02 0-5.578.748-7.805 1.996-1.959 1.091-3.525 2.342-4.645 3.765-.17.216-.17.53 0 .746 1.12 1.423 2.687 2.674 4.645 3.765 2.227 1.248 4.784 1.996 7.805 1.996 3.02 0 5.578-.748 7.805-1.996 1.959-1.091 3.525-2.342 4.645-3.765.17-.216.17-.53 0-.746zM11.998 19c-2.533 0-4.833-.617-6.581-1.654-.174-.105-.344-.23-.505-.374-.41-.354-.77-.814-1.084-1.386-.319-.576-.486-1.24-.486-1.986s.167-1.41.486-1.986c.314-.572.674-1.032 1.084-1.386.161-.145.331-.27.505-.375 1.748-1.037 4.048-1.654 6.581-1.654s4.833.617 6.581 1.654c.174.105.344.23.505.375.41.354.77.814 1.084 1.386.319.576.486 1.24.486 1.986s-.167 1.41-.486 1.986c-.314.572-.674 1.032-1.084 1.386-.161.145-.331.27-.505.374-1.748 1.037-4.048 1.654-6.581 1.654zM2.708 10.98c.282-.282.727-.293 1.01-.011 1.463 1.463 3.264 2.201 5.281 2.201s3.818-.738 5.281-2.201c.282-.282.728-.271 1.01.011.281.281.293.728.011 1.01-1.654 1.654-3.748 2.451-6.292 2.451s-4.638-.797-6.292-2.451c-.281-.282-.27-.729.011-1.01zm6.291 4.032c-1.243 0-2.25-1.007-2.25-2.25s1.007-2.25 2.25-2.25 2.25 1.007 2.25 2.25-1.007 2.25-2.25 2.25zm0-3.5c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm2.05-4.53c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06l-2.12 2.12c-.29.29-.77.29-1.06 0-.29-.29-.29-.77 0-1.06l2.12-2.12z"
                      />
                    </svg>
                  )}
                </button>
                {errors.pin && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="space-y-1 text-sm relative">
                <label htmlFor="role" className="block text-white">
                  Role
                </label>
                <select
                  {...register("role", { required: true })}
                  name="role"
                  id="role"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                >
                  <option value="">Select a role</option>
                  <option value="agent">Agent</option>
                  <option value="user">Regular</option>
                </select>
                {errors.role && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <button
                type="submit"
                className="block w-full p-3 text-center rounded-sm text-white bg-blue-500"
              >
                Register
              </button>
            </form>
            <p className="text-xs text-center sm:px-6 text-gray-400">
              Already have an account?&nbsp;
              <Link to="/login" className="underline text-gray-100">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;