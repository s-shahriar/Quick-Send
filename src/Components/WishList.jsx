import React from "react";

const WishList = () => {
  const handleChange = () => [];

  return (
    <div className="flex justify-center px-2 my-[20%] bg-primary">
    <div className="max-w-2xl px-3 py-5 rounded-2xl md:px-8 md:py-7">
        <h4 className="text-2xl font-semibold tracking-wide text-white lg:text-3xl">Not Finding Your Company?</h4>
        <p className="max-w-xl mt-2 leading-relaxed text-blue-100 lg:text-lg">
        If your company is not listed in our service, please provide your
        company name below. We will get back to you soon.
        </p>
        <div className="my-4 sm:flex sm:flex-row sm:justify-evenly">
            <input className=" block w-full px-4 py-3 mt-3 text-gray-800 placeholder-gray-500 bg-white border border-gray-300 rounded-md appearance-none sm:max-w-xs focus:outline-none focus:ring focus:ring-blue-50 focus:border-blue-300" type="email" placeholder="Enter your company name"/>
            <button className="bg-teal-300 hover:bg-teal-200 block w-full py-3 mt-3 font-bold tracking-wide rounded shadow sm:ml-3 md:w-52 text-gray-900 focus">
                <span className="block ">Subscribe</span>
            </button>
        </div>
    </div>
</div>
  );
};

export default WishList;
