import React, { useEffect, useState } from "react";
import LoadingSpinner from "../../Components/LoadingSpinner";
import Warning from "../../Components/Warning";
import useRole from "../../Hooks/useRole";

const UserHome = () => {
  const [data, isRoleLoading, error] = useRole();
  const { name, email, mobileNumber, balance, status } = data;
  const [showBalance, setShowBalance] = useState(false);

  useEffect(() => {
    let timeoutId;
    if (showBalance) {
      timeoutId = setTimeout(() => {
        setShowBalance(false);
      }, 10000); 
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showBalance]);

  if (isRoleLoading) {
    return <LoadingSpinner />;
  }

  if (status === "pending" || status === "blocked") {
    return (
      <div className="my-4 space-y-6">
        <h1 className="text-4xl font-bold text-center text-teal-500 mb-6">
          Welcome Back, {name}!
        </h1>
        <Warning />
      </div>
    );
  }

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="my-4 space-y-6 px-2">
      <h1 className="text-4xl font-bold text-center text-teal-500 mb-6">
        Welcome Back, {name}!
      </h1>
      <div className="bg-white overflow-hidden shadow rounded-lg border max-w-4xl mx-auto">
        <div className="px-4 py-5 sm:px-6 text-center bg-teal-500 text-white">
          <h3 className="text-2xl leading-6 font-medium">
            Your Profile Information
          </h3>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Full name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Email address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone number</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {mobileNumber}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Account Balance</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {showBalance ? (
                  <>
                    {balance} BDT
                    <br />
                    <span className="text-xs text-gray-500">(shown for 10 seconds)</span>
                  </>
                ) : (
                  <button onClick={toggleBalanceVisibility} className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1 rounded-lg">
                    Show
                  </button>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
