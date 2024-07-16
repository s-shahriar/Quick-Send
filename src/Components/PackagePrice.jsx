import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "../Pages/Payment/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const PackagePrice = ({ packageName, totalPrice, member }) => {
  return (
    <div>
      <section className="py-20 bg-primary text-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <span className="font-bold tracking-wider uppercase text-teal-500">
              Package Pricing
            </span>
            <h2 className="text-4xl font-bold lg:text-5xl">
              Your chosen package is {packageName.toUpperCase()}
            </h2>
          </div>
          <div className="flex flex-wrap items-stretch justify-center">
            <div className="flex w-full mb-8 sm:px-4 md:w-1/2 lg:w-1/3 lg:mb-0">
              <div className="flex flex-grow flex-col p-6 space-y-6 rounded shadow sm:p-8 bg-teal-500 text-gray-50">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold">
                    {packageName.toUpperCase()}
                  </h4>
                  <span className="text-6xl font-bold">
                    ${totalPrice}
                    <span className="text-sm tracking-wide">/month</span>
                  </span>
                </div>
                <p className="leading-relaxed">
                  Includes essential features for your teams.
                </p>
                <ul className="flex-1 space-y-2">
                  <li className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>All fundamental tools are available</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Support for any issues</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Access to fundamental tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="flex-shrink-0 w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Entry-level package with core features</span>
                  </li>
                </ul>
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    totalPrice={totalPrice}
                    member={member}
                    packageName={packageName}
                  />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackagePrice;
