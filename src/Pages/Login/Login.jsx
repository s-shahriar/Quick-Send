import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Login = () => {
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const { googleLogin, signIn, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const result = await signIn(email, password);
      if (result.user) {
        toast.success("Logged in", {
          position: "top-center",
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error("Wrong Credentials", {
        position: "top-center",
      });
      setLoading(false);
    }
  };

  const googleHandler = async () => {
    try {
      const result = await googleLogin();
      if (result.user) {
        toast.success("Logged in", {
          position: "top-center",
        });
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast.error(error.code, {
        position: "top-center",
      });
      setLoading(false);
    }
  };

  return (
    <div className="hero bg-secondary my-5 py-5 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse justify-evenly">
        <div className="text-center lg:text-left lg:w-1/3">
          <h1 className="text-5xl font-bold text-blue-500">Login</h1>
          <p className="py-6 text-white">
            If you have not registered through{" "}
            <strong className="px-2 py-1 bg-teal-500 rounded-xl text-warning">
              <Link to={"/join-employee"}>Join as an Employee</Link>
            </strong>{" "}
            or{" "}
            <strong className="px-2 py-1 bg-teal-500 rounded-xl text-warning">
              <Link to={"/join-hr"}>Join as an HR</Link>
            </strong>
            {" "}at first, complete your registration there, only then login from
            here.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#0f172b] text-white mx-auto">
            <h1 className="text-2xl font-bold text-center">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1 text-sm ">
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
                <label htmlFor="password" className="block  text-white">
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
                {errors.password && (
                  <span className="text-red-400">This field is required</span>
                )}
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
              </div>
              <button className="block w-full p-3 text-center rounded-sm text-gray-50 bg-slate-600">
                Sign in
              </button>
            </form>

            <div className="flex items-center pt-4 space-x-1">
              <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
              <p className="px-3 text-sm text-white">
                Login with social accounts
              </p>
              <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
            </div>
            <div
              onClick={googleHandler}
              className="flex items-center justify-center p-4 space-x-4 border rounded-md cursor-pointer border-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-5 h-5 fill-current text-white"
              >
                <path d="M16.318 13.714v5.896h8.374c-.37 2.207-2.544 6.474-8.374 6.474-5.042 0-9.154-4.158-9.154-9.286s4.112-9.286 9.154-9.286c2.876 0 4.8 1.195 5.896 2.23l4.012-4.012C22.852 3.018 19.88 2 16.318 2 7.996 2 1.5 8.524 1.5 16s6.496 14 14.818 14c8.518 0 13.474-6.074 13.474-13.716 0-.93-.103-1.63-.23-2.326H16.318z"></path>
              </svg>
              <p className="text-white">Sign in with Google</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
