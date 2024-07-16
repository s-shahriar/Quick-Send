import { PDFDownloadLink } from "@react-pdf/renderer";
import React, { useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import AssetPDF from "./AssetPdf";

const EmployeeRequestedView = ({
  data,
  refetch,
  currentPage,
  setCurrentPage,
}) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [itemsPerPage] = useState(10);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handleReturn = async (requestId) => {
    try {
      const res = await axiosSecure.post("/return-asset", { requestId });

      if (res.status === 200) {
        Swal.fire({
          title: "Returned!",
          text: "The asset has been returned successfully.",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while returning the asset.",
        icon: "error",
      });
    }
  };

  const handleCancel = async (id) => {
    try {
      const res = await axiosSecure.post("/cancel-request", {
        requestId: id,
      });
      if (res.status === 200) {
        Swal.fire({
          title: "Canceled!",
          text: "Your request has been canceled.",
          icon: "success",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "An error occurred while canceling the request.",
        icon: "error",
      });
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
              <th className="py-2 px-4 border border-gray-300">Request Date</th>
              <th className="py-2 px-4 border border-gray-300">
                Approval Date
              </th>
              <th className="py-2 px-4 border border-gray-300">
                Request Status
              </th>
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
                  {new Date(asset.requestDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {asset.approvalDate
                    ? new Date(asset.approvalDate).toLocaleDateString()
                    : "--"}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {asset.requestStatus.charAt(0).toUpperCase() +
                    asset.requestStatus.slice(1)}
                </td>
                <td className="flex py-2 px-4 border border-gray-300 justify-center">
                  {asset.requestStatus.toLowerCase() === "pending" ? (
                    <button
                      onClick={() => handleCancel(asset._id)}
                      className="btn btn-sm bg-red-500 hover:bg-gray-800 text-white dark:text-white"
                    >
                      Cancel
                    </button>
                  ) : asset.requestStatus.toLowerCase() === "approved" &&
                    asset.assetType.toLowerCase() === "returnable" ? (
                    <>
                      <button
                        onClick={() => handleReturn(asset._id)}
                        className="btn btn-sm bg-blue-500 hover:bg-gray-800 text-white dark:text-white"
                      >
                        Return
                      </button>
                      <button className="btn btn-sm bg-green-500 hover:bg-gray-800 text-white dark:text-white ml-2">
                        <PDFDownloadLink
                          document={
                            <AssetPDF
                              data={{
                                ...asset,
                                employeeName: user.displayName,
                                userEmail: user.email,
                              }}
                            />
                          }
                          fileName={`${asset.assetName}_Request_Details.pdf`}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? "Loading..." : "Print"
                          }
                        </PDFDownloadLink>
                      </button>
                    </>
                  ) : asset.requestStatus.toLowerCase() === "approved" &&
                    asset.assetType.toLowerCase() === "non-returnable" ? (
                    <>
                      <button className="btn btn-sm bg-green-500 hover:bg-gray-800 text-white dark:text-white ml-2">
                        <PDFDownloadLink
                          document={
                            <AssetPDF
                              data={{
                                ...asset,
                                employeeName: user.displayName,
                                userEmail: user.email,
                              }}
                            />
                          }
                          fileName={`${asset.assetName}_Request_Details.pdf`}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? "Loading..." : "Print"
                          }
                        </PDFDownloadLink>
                      </button>
                    </>
                  ) : asset.requestStatus.toLowerCase() === "returned" ? (
                    <span className="text-green-500 font-bold">Item Returned</span>
                  ) : asset.requestStatus.toLowerCase() === "rejected" ? (
                    <span className="text-red-500 font-bold">Request Rejected</span>
                  )  : (
                    "Request Canceled"
                  )}
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

export default EmployeeRequestedView;
