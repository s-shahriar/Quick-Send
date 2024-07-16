import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UpdateAsset = () => {
  const {id} = useParams()
  const axiosSecure = useAxiosSecure();
  const [assetLoading, setAssetLoading] = useState(false);
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Update Asset Information";
  }, []);

  // Fetch asset data and populate form fields
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosSecure(`/assets/${id}`);
        setValue("assetName", res.data.assetName);
        setValue("assetType", res.data.assetType);
        setValue("quantity", res.data.quantity);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [axiosSecure, setValue]);

  const onSubmit = async (data) => {
    setAssetLoading(true);
    const updatedData = {
      ...data,
      quantity: parseInt(data.quantity, 10),
    };
    try {
      const res = await axiosSecure.patch(`/assets/${id}`, updatedData);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success",
          text: "Asset information modified successfully",
          icon: "success",
          confirmButtonText: "Continue",
        });
      }
    } catch (err) {
      console.error(err);
    }
    setAssetLoading(false);
    navigate("/asset-list")
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
              Update Asset Information
            </p>
            <p className="text-lg text-center">
              Update the asset details below.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="assetName" className="text-sm">
                Product Name *
              </label>
              <input
                id="assetName"
                type="text"
                placeholder="Product Name"
                {...register("assetName", { required: true })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.assetName ? "border-red-500" : ""
                }`}
              />
              {errors.assetName && (
                <span className="text-red-500 text-sm">
                  {errors.assetName.message || "Product Name is required"}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="assetType" className="text-sm">
                Product Type *
              </label>
              <select
                id="assetType"
                {...register("assetType", { required: true })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.assetType ? "border-red-500" : ""
                }`}
              >
                <option value="">Please Select</option>
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
              {errors.assetType && (
                <span className="text-red-500 text-sm">
                  {errors.assetType.message || "Product Type is required"}
                </span>
              )}
            </div>
            <div>
              <label htmlFor="quantity" className="text-sm">
                Product Quantity *
              </label>
              <input
                id="quantity"
                type="number"
                placeholder="Product Quantity"
                min="0"
                {...register("quantity", {
                  required: true,
                  min: { value: 0, message: "Quantity cannot be negative" },
                })}
                className={`w-full rounded-md focus:ring focus:ring-opacity-75 text-gray-900 focus:ring-violet-600 border-gray-300 ${
                  errors.quantity ? "border-red-500" : ""
                }`}
              />
              {errors.quantity && (
                <span className="text-red-500 text-sm">
                  {errors.quantity.message ||
                    "Product Quantity is required"}
                </span>
              )}
            </div>
            <div className="col-span-full">
              <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-blue-900 transition-colors duration-300 uppercase font-extrabold"
              >
                Update Asset
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </section>
  );
};

export default UpdateAsset;

