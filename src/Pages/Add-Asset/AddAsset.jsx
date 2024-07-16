import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AddAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [assetLoading, setAssetLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Add A New Asset";
  }, []);

  const onSubmit = async (data) => {
    setAssetLoading(true);
    try {
      const res = await axiosSecure.post("/assets", data);
      if (res.data.assetId) {
        reset();
        Swal.fire({
          title: "Success",
          text: "New asset added successfully",
          icon: "success",
          confirmButtonText: "Continue",
        });
      }
    } catch (err) {
    }
    setAssetLoading(false);
  };

  if (assetLoading) return <LoadingSpinner />;

  return (
    <section className="p-6 bg-primary text-grey-900">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate=""
        action=""
        className="container flex flex-col mx-auto space-y-6 w-full max-w-lg"
      >
        <fieldset className="p-6 rounded-md shadow-sm bg-gray-50">
          <div className="space-y-4 m-auto mb-6">
            <p className="font-bold text-2xl text-center text-teal-500">
              Add A New Asset
            </p>
            <p className="text-lg text-center">
              Welcome Back! Got a new asset to add?
              <br />
              Fill up all the necessary information below.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="productName" className="text-sm">
                Product Name *
              </label>
              <input
                id="productName"
                type="text"
                placeholder="Product Name"
                {...register("productName", { required: true })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.productName ? "border-red-500" : ""
                }`}
              />
              {errors.productName && (
                <span className="text-red-500 text-sm">
                  {errors.productName.message || "Product Name is required"}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="productType" className="text-sm">
                Product Type *
              </label>
              <select
                id="productType"
                {...register("productType", { required: true })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.productType ? "border-red-500" : ""
                }`}
              >
                <option value="">Please Select</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
              {errors.productType && (
                <span className="text-red-500 text-sm">
                  {errors.productType.message || "Product Type is required"}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="productQuantity" className="text-sm">
                Product Quantity *
              </label>
              <input
                id="productQuantity"
                type="number"
                placeholder="Product Quantity"
                min="0"
                {...register("productQuantity", {
                  required: true,
                  min: { value: 0, message: "Quantity cannot be negative" },
                })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.productQuantity ? "border-red-500" : ""
                }`}
              />
              {errors.productQuantity && (
                <span className="text-red-500 text-sm">
                  {errors.productQuantity.message ||
                    "Product Quantity is required"}
                </span>
              )}
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-blue-900 transition-colors duration-300 uppercase font-extrabold"
              >
                Add An Asset
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default AddAsset;