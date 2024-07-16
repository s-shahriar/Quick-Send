import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const ListView = ({ data, refetch, currentPage, setCurrentPage }) => {
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleDelete = async (id) => {
    try {
      const confirmDelete = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmDelete.isConfirmed) {
        const res = await axiosSecure.delete(`/assets/${id}`);
        if (res.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "The asset has been deleted.",
            icon: "success",
          });
        }
        await refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while deleting the asset.",
        icon: "error",
      });
      console.error("Error deleting asset:", error);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8 mb-8">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 bg-primary">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Asset Name</th>
              <th className="py-2 px-4 border border-gray-300">Asset Type</th>
              <th className="py-2 px-4 border border-gray-300">Quantity</th>
              <th className="py-2 px-4 border border-gray-300">Date Added</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {currentItems.map((asset) => (
              <tr key={asset._id} className="dark:text-white">
                <td className="py-2 px-4 border border-gray-300">
                  {asset.assetName}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {asset.assetType}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {asset.quantity}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {new Date(asset.dateAdded).toLocaleDateString()}
                </td>
                <td className="flex py-2 px-4 border border-gray-300 justify-center">
                  <Link
                    to={`/update-asset/${asset._id}`}
                    className="btn btn-sm bg-blue-500 hover:bg-gray-800 text-white dark:text-white"
                  >
                    Update
                  </Link>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="btn btn-sm bg-red-500 hover:bg-gray-800 text-white dark:text-white ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
          (_, index) => (
            <li key={index} className="mx-1">
              <button
                onClick={() => paginate(index + 1)}
                className={`${
                  currentPage === index + 1
                    ? "bg-gray-500 text-white"
                    : "bg-gray-300 text-gray-800"
                } hover:bg-gray-400 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
              >
                {index + 1}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ListView;
