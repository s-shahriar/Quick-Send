import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const JoinAsHR = () => {
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { createUser, updateUser, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [validPassword, setValidPassword] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Handle image upload
      const imageFile = new FormData();
      imageFile.append('image', data.companyLogo[0]);
      setLoading(true)
      const imageRes = await axios.post(image_hosting_api, imageFile, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      });
  
      if (imageRes.data.success) {
        // Proceed with form submission
        const userInfo = {
          displayName: data.name,
          photoURL: imageRes.data.data.display_url
        };
  
        const requestBody = {
          fullName: data.name,
          companyName: data.companyName,
          companyLogo: imageRes.data.data.display_url,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dob,
        };
  
        const result = await createUser(data.email, data.password);
        if (result.user) {
          toast.success("Account created successfully!", {
            position: "top-center",
          });
  
          const response = await axiosSecure.post("/register-hr-manager", requestBody);
          if (response.status === 201) {
            await updateUser(userInfo);
            window.location.href = `/payment/${data.packageName}`;
            //navigate(`/payment/${data.packageName}`)
          } else {
            console.error("Error registering HR manager:", response.data.error);
            toast.error("Something went wrong...", {
              position: "top-center",
            });
          }
        }
      } else {
        // Show error if image upload fails
        console.error("Error uploading image:", imageRes.data.error);
        toast.error("Something went wrong...", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.code, {
        position: "top-center",
      });
    }
    setLoading(false);
  };
  


  return (
    <div className="hero bg-secondary my-5 py-10">
      <Helmet>
        <title>Join as an HR</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse justify-evenly">
        <div className="text-center lg:text-left lg:w-1/3">
          <h1 className="text-5xl font-bold text-blue-500">Join as an HR</h1>
          <p className="py-6 text-white">
            Register now to unlock a world of opportunities and seamless access
            to exclusive features. Join our community of professionals and
            enthusiasts today. Start your journey towards growth and discovery
            by becoming a valued member of our team.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#0f172b] text-white mx-auto">
            <h1 className="text-2xl font-bold text-center">Join As An HR</h1>
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
                <label htmlFor="companyName" className="block text-white">
                  Company Name
                </label>
                <select
                  {...register("companyName", { required: true })}
                  name="companyName"
                  id="companyName"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                >
                  <option value="">Please Select</option>
                  <option value="Company X">Company X</option>
                  <option value="Company Y">Company Y</option>
                  <option value="Company Z">Company Z</option>
                </select>
                {errors.companyName && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="space-y-1 text-sm relative">
                <label htmlFor="companyLogo" className="block text-white">
                  Company Logo
                </label>
                <input
                  {...register("companyLogo", { required: true })}
                  type="file"
                  name="companyLogo"
                  id="companyLogo"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                {errors.companyLogo && (
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
                <label htmlFor="password" className="block text-white">
                  Password
                </label>
                <input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                <button
                  type="button"
                  className="absolute top-[32px] right-0 mt-2 mr-4 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <path
                        fillRule="evenodd"
                        d="M23.654 11.315c-1.12-1.423-2.687-2.674-4.645-3.765-2.227-1.248-4.784-1.996-7.805-1.996-3.02 0-5.578.748-7.805 1.996-1.959 1.091-3.525 2.342-4.645 3.765-.17.216-.17.53 0 .746 1.12 1.423 2.687 2.674 4.645 3.765 2.227 1.248 4.784 1.996 7.805 1.996 3.02 0 5.578-.748 7.805-1.996 1.959-1.091 3.525-2.342 4.645-3.765.17-.216.17-.53 0-.746zM11.998 19c-2.533 0-4.833-.617-6.581-1.654-.174-.105-.344-.23-.505-.374-.41-.354-.77-.814-1.084-1.386-.319-.576-.486-1.24-.486-1.986s.167-1.41.486-1.986c.314-.572.674-1.032 1.084-1.386.161-.145.331-.27.505-.375 1.748-1.037 4.048-1.654 6.581-1.654s4.833.617 6.581 1.654c.174.105.344.23.505.375.41.354.77.814 1.084 1.386.319.576.486 1.24.486 1.986s-.167 1.41-.486 1.986c-.314.572-.674 1.032-1.084 1.386-.161.145-.331.27-.505.375-1.748 1.037-4.048 1.654-6.581 1.654zm0-13c-1.935 0-3.518 1.575-3.518 3.5s1.583 3.5 3.518 3.5c1.934 0 3.518-1.575 3.518-3.5s-1.584-3.5-3.518-3.5z"
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
                        d="M23.654 11.315c-1.12-1.423-2.687-2.674-4.645-3.765-2.227-1.248-4.784-1.996-7.805-1.996-3.02 0-5.578.748-7.805 1.996-1.959 1.091-3.525 2.342-4.645 3.765-.17.216-.17.53 0 .746 1.12 1.423 2.687 2.674 4.645 3.765 2.227 1.248 4.784 1.996 7.805 1.996 3.02 0 5.578-.748 7.805-1.996 1.959-1.091 3.525-2.342 4.645-3.765.17-.216.17-.53 0-.746zM11.998 19c-2.533 0-4.833-.617-6.581-1.654-.174-.105-.344-.23-.505-.374-.41-.354-.77-.814-1.084-1.386-.319-.576-.486-1.24-.486-1.986s.167-1.41.486-1.986c.314-.572.674-1.032 1.084-1.386.161-.145.331-.27.505-.375 1.748-1.037 4.048-1.654 6.581-1.654s4.833.617 6.581 1.654c.174.105.344.23.505.375.41.354.77.814 1.084 1.386.319.576.486 1.24.486 1.986s-.167 1.41-.486 1.986c-.314.572-.674 1.032-1.084 1.386-.161.145-.331.27-.505.375-1.748 1.037-4.048 1.654-6.581 1.654zm0-13c-1.935 0-3.518 1.575-3.518 3.5s1.583 3.5 3.518 3.5c1.934 0 3.518-1.575 3.518-3.5s-1.584-3.5-3.518-3.5z"
                      />
                      <path
                        fillRule="evenodd"
                        d="M11.998 16c-1.935 0-3.518-1.575-3.518-3.5s1.583-3.5 3.518-3.5c1.934 0 3.518 1.575 3.518 3.5s-1.584 3.5-3.518 3.5zM11.998 10c-1.366 0-2.518 1.102-2.518 2.5s1.152 2.5 2.518 2.5c1.366 0 2.518-1.102 2.518-2.5s-1.152-2.5-2.518-2.5z"
                      />
                    </svg>
                  )}
                </button>
                {!validPassword && (
                  <span className="text-red-400">
                    Password must contain at least 6 characters, including one
                    uppercase and one lowercase letter.
                  </span>
                )}
              </div>

              <div className="space-y-1 text-sm relative">
                <label htmlFor="dob" className="block text-white">
                  Date of Birth
                </label>
                <input
                  {...register("dob", { required: true })}
                  type="date"
                  name="dob"
                  id="dob"
                  placeholder="Enter your date of birth"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                {errors.dob && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="space-y-1 text-sm relative">
                <label htmlFor="packageName" className="block text-white">
                  Package
                </label>
                <select
                  {...register("packageName", { required: true })}
                  name="packageName"
                  id="packageName"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                >
                  <option value="">Please Select</option>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
                {errors.packageName && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <button
                type="submit"
                className="block w-full p-3 text-center rounded-sm text-white bg-blue-500"
              >
                Sign Up
              </button>
            </form>

            <p className="text-xs text-center sm:px-6 text-white">
              Already have an account?
              <Link to="/login" className="underline text-white">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinAsHR;
