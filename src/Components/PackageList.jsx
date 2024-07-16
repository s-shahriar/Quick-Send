import React from "react";

const PackageList = () => {
  return (
    <div className="lg:flex items-center justify-between p-6 md:p-12 dark:bg-gray-700">
      <div className="lg:w-1/2 w-full">
        <p className="text-base leading-4 text-gray-600 dark:text-gray-200">
          Choose your plan
        </p>
        <h1
          role="heading"
          className="md:text-5xl text-3xl font-bold leading-10 mt-3 text-teal-500 dark:text-white"
        >
          Our pricing plan
        </h1>
        <p
          role="contentinfo"
          className="text-base leading-5 mt-5 text-gray-600 dark:text-gray-200"
        >
          We’re working on a suit of tools to make managing complex systems
          easier, for everyone for free. we can’t wait to hear what you think
        </p>
        <div className="w-56">
          <button
            className="bg-gray-100 dark:bg-gray-800 shadow flex items-center mt-10 rounded-full"
          >
            <div
              className="bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:outline-none text-base leading-none text-gray-600 dark:text-gray-200 rounded-full py-4 px-6 mr-1"
              id="monthly"
            >
              Monthly
            </div>
            <div
              className="bg-teal-500 focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 focus:outline-none text-base leading-none text-white rounded-full py-4 px-6"
              id="annually"
            >
              Annually
            </div>
          </button>
        </div>
      </div>
      <div
        className="xl:w-1/2 lg:w-7/12 relative w-full lg:mt-0 mt-12 md:px-8"
        role="list"
      >
        <img
          src="https://i.ibb.co/0n6DSS3/bgimg.png"
          className="absolute w-full -ml-12 mt-24"
          alt="background circle images"
        />
        <div
          role="listitem"
          className="bg-white dark:bg-gray-800 cursor-pointer shadow rounded-lg p-8 relative z-30"
        >
          <div className="md:flex items-center justify-between">
            <h2 className="text-2xl font-semibold leading-6 text-teal-500 dark:text-white">
              Beginner
            </h2>
            <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800 dark:text-white">
              $5<span className="font-normal text-base">/month</span>
            </p>
          </div>
          <p className="md:w-80 text-base leading-6 mt-4 text-gray-600 dark:text-gray-200">
            Specialized for a small team. Upto 5 members are allowed.
          </p>
        </div>
        <div
          role="listitem"
          className="bg-white dark:bg-gray-800 cursor-pointer shadow rounded-lg mt-3 flex relative z-30"
        >
          <div className="w-2.5 h-auto bg-teal-500 rounded-tl-md rounded-bl-md"></div>
          <div className="w-full p-8">
            <div className="md:flex items-center justify-between">
              <h2 className="text-2xl font-semibold leading-6 text-teal-500 dark:text-white">
                Standard
              </h2>
              <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800 dark:text-white">
                $8<span className="font-normal text-base">/month</span>
              </p>
            </div>
            <p className="md:w-80 text-base leading-6 mt-4 text-gray-600 dark:text-gray-200">
              Great for medium sized teams. Upto 10 members are allowed.
            </p>
          </div>
        </div>
        <div
          role="listitem"
          className="bg-white dark:bg-gray-800 cursor-pointer shadow rounded-lg p-8 relative z-30 mt-7"
        >
          <div className="md:flex items-center justify-between">
            <h2 className="text-2xl font-semibold leading-6 text-teal-500 dark:text-white">
              Premium
            </h2>
            <p className="text-2xl md:mt-0 mt-4 font-semibold leading-6 text-gray-800 dark:text-white">
              $15<span className="font-normal text-base">/month</span>
            </p>
          </div>
          <p className="md:w-80 text-base leading-6 mt-4 text-gray-600 dark:text-gray-200">
            Best fit for large team members. Upto 20 members are allowed.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageList;
