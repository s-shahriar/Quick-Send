import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const LoginTo = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const { signIn, setLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const transformPinToPassword = (pin) => {
    return `${pin}A1`;
  };

  const onSubmit = async (data) => {
    const { identifier, pin } = data;
    setLoading(true);

    try {
      let email = identifier;

      // If the identifier is not an email, assume it's a mobile number
      if (!/\S+@\S+\.\S+/.test(identifier)) {
        const response = await axiosSecure.post("/get-email", {
          mobileNumber: identifier,
        });
        email = response.data.email;
      }

      const password = transformPinToPassword(pin);
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

  return (
    <div className="hero bg-secondary my-5 py-5 dark:bg-gradient-to-r dark:from-gray-900 dark:to-gray-700">
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="hero-content flex-col lg:flex-row-reverse justify-evenly">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-[#0f172b] text-white mx-auto">
            <h1 className="text-2xl font-bold text-center">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-1 text-sm ">
                <label htmlFor="identifier" className="block text-white">
                  Email Address or Mobile Number
                </label>
                <input
                  {...register("identifier", { required: true })}
                  type="text"
                  name="identifier"
                  id="identifier"
                  placeholder="Enter your email or mobile number"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                {errors.identifier && (
                  <span className="text-red-400">This field is required</span>
                )}
              </div>

              <div className="space-y-1 text-sm relative">
                <label htmlFor="pin" className="block  text-white">
                  PIN
                </label>
                <input
                  {...register("pin", { required: true })}
                  type={showPassword ? "text" : "password"}
                  name="pin"
                  id="pin"
                  placeholder="PIN"
                  className="w-full px-4 py-3 rounded-md border-gray-300 bg-gray-50 text-gray-800 focus:border-violet-600"
                />
                {errors.pin && (
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
                    </svg>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="block w-full p-3 text-center rounded-sm text-white bg-teal-400"
              >
                Login
              </button>
            </form>


            <p className="text-xs text-center sm:px-6 text-gray-400">
              Don't have an account? {" "}
              <Link to={"/register"} className="underline text-gray-100">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTo;
