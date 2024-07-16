import axios from "axios";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, updateUser, setLoading } = useAuth();
  const { displayName, email, photoURL, phoneNumber } = user;
  const [photo, setPhoto] = useState(null);
  const defaultPhotoURL =
    "https://i.ibb.co/hfZnRhv/images-q-tbn-ANd9-Gc-RIpx-Yi1tsp-Yp-BDWAt4qe-VB37-ZEomz-Av-MXG0-Q-s.png";


  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: displayName || "Anonymous",
      phoneNumber: phoneNumber || "+25 381 77 983",
      photo: null,
    },
  });

  useEffect(() => {
    document.title = "Profile Page";
    reset({
      name: displayName || "Anonymous",
      phoneNumber: phoneNumber || "+25 381 77 983",
    });
  }, [displayName, phoneNumber, reset]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      let updatedPhotoURL = user.photoURL;
  
      if (photo) {
        const imageFile = new FormData();
        imageFile.append("image", photo);
  
        const imageRes = await axios.post(image_hosting_api, imageFile, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
  
        if (imageRes.data.success) {
          updatedPhotoURL = imageRes.data.data.display_url;
        } else {
          console.error("Error uploading image:", imageRes.data.error);
          toast.error("Something went wrong with image upload.", {
            position: "top-center",
          });
          setLoading(false);
          return;
        }
      }
  
      const userInfo = {
        displayName: data.name,
        photoURL: updatedPhotoURL === "" ? defaultPhotoURL : updatedPhotoURL,
        phoneNumber: data.phoneNumber, // Make sure to include phoneNumber if needed
      };
  
      // Call backend API to update user profile in the database
      const response = await axiosSecure.put(`/updateProfile/${user.email}`, {
        fullName: data.name,
        photoURL: updatedPhotoURL,
        phoneNumber: data.phoneNumber,
      });
  
      if (response.data.message === 'Profile updated successfully') {
        await updateUser(userInfo);
        toast.success("Profile Updated", {
          position: "top-center",
        });
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div>
      <section className="py-6 bg-primary text-white mt-8">
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 lg:grid-cols-2 lg:divide-x my-4">
          {/* profile section */}
          <div className="max-w-md w-full lg:w-auto p-8 sm:flex sm:space-x-6 bg-gray-50 text-gray-800 mx-auto lg:mx-0">
            <div className="flex-shrink-0 w-full mb-6 sm:mb-0 sm:w-32 sm:h-32 h-44 mx-auto sm:mx-0">
              <img
                src={photoURL || defaultPhotoURL}
                alt={displayName || "Anonymous"}
                className="object-cover object-center w-full h-full rounded bg-gray-500"
              />
            </div>
            <div className="flex flex-col space-y-4 text-center sm:text-left">
              <div>
                <h2 className="text-2xl font-semibold">
                  {displayName || "Anonymous"}
                </h2>
                <span className="text-sm text-gray-600">General User</span>
              </div>
              <div className="space-y-1">
                <span className="flex items-center justify-center sm:justify-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-label="Email address"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                    ></path>
                  </svg>
                  <span className="text-gray-600">
                    {email || "user.email@example.com"}
                  </span>
                </span>
                <span className="flex items-center justify-center sm:justify-start space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    aria-label="Phonenumber"
                    className="w-4 h-4"
                  >
                    <path
                      fill="currentColor"
                      d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"
                    ></path>
                  </svg>
                  <span className="text-gray-600">
                    {phoneNumber || "+25 381 77 983"}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* profile update section */}
          <form
            noValidate=""
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col py-6 space-y-6 md:py-0 md:px-6 text-black"
          >
            <label className="block">
              <span className="mb-1 text-white">Full name</span>
              <Controller
                control={control}
                name="name"
                rules={{ required: "Full name is required" }}
                render={({ field }) => (
                  <input
                    type="text"
                    {...field}
                    className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-default-600 bg-gray-100"
                  />
                )}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  {errors.name.message}
                </p>
              )}
            </label>
            <label className="block">
              <span className="mb-1 text-white">Email address</span>
              <input
                type="email"
                value={email || "user.email@example.com"}
                readOnly
                className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:ring-default-600 bg-gray-100"
              />
            </label>

            <label className="block">
              <span className="mb-1 text-white">Profile Picture</span>
              <input
                type="file"
                onChange={(e) => setPhoto(e.target.files[0])}
                className="block w-full text-gray-500 bg-gray-50 rounded-md"
              />
            </label>
            <button
              type="submit"
              className="self-center px-8 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 bg-teal-500 text-gray-50 focus:ring-default-600 hover:ring-default-600"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Profile;
