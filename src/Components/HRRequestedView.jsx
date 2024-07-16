import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const HRRequestedView = ({ data, currentPage, setCurrentPage, itemsPerPage }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const handleApprove = useMutation({
    mutationFn: async (requestId) => {
      const { data } = await axiosSecure.post('/approve-request', { requestId });
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Approved!',
        text: 'The asset request has been approved successfully.',
        icon: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
    onError: (error) => {
      console.error('Error approving request:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while approving the request.',
        icon: 'error',
      });
    },
  });

  const handleReject = useMutation({
    mutationFn: async (requestId) => {
      const { data } = await axiosSecure.post('/reject-request', { requestId });
      return data;
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Rejected!',
        text: 'The asset request has been rejected successfully.',
        icon: 'success',
      });
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
    onError: (error) => {
      console.error('Error rejecting request:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while rejecting the request.',
        icon: 'error',
      });
    },
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 py-8 mb-8">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 bg-primary">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Requester Name</th>
              <th className="py-2 px-4 border border-gray-300">Requester Email</th>
              <th className="py-2 px-4 border border-gray-300">Asset Name</th>
              <th className="py-2 px-4 border border-gray-300">Asset Type</th>
              <th className="py-2 px-4 border border-gray-300">Request Date</th>
              <th className="py-2 px-4 border border-gray-300">Status</th>
              <th className="py-2 px-4 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {currentItems.map((request) => (
              <tr key={request._id} className="dark:text-white">
                <td className="py-2 px-4 border border-gray-300">{request.requesterName}</td>
                <td className="py-2 px-4 border border-gray-300">{request.requesterEmail}</td>
                <td className="py-2 px-4 border border-gray-300">{request.assetName}</td>
                <td className="py-2 px-4 border border-gray-300">{request.assetType}</td>
                <td className="py-2 px-4 border border-gray-300">
                  {new Date(request.requestDate).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {request.requestStatus.charAt(0).toUpperCase() + request.requestStatus.slice(1)}
                </td>
                <td className="flex py-2 px-4 border border-gray-300 justify-center">
                  {request.requestStatus.toLowerCase() === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleApprove.mutate(request._id)}
                        className="btn btn-sm bg-green-500 hover:bg-gray-800 text-white dark:text-white mr-2"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject.mutate(request._id)}
                        className="btn btn-sm bg-red-500 hover:bg-gray-800 text-white dark:text-white"
                      >
                        Reject
                      </button>
                    </>
                  ) : request.requestStatus.toLowerCase() === 'approved' ? (
                    <span className="text-green-500 font-bold">Approved</span>
                  ) : request.requestStatus.toLowerCase() === 'rejected' ? (
                    <span className="text-red-500 font-bold">Rejected</span>
                  ) : request.requestStatus.toLowerCase() === 'canceled' ? (
                    <span className="text-red-500 font-bold">Cancelled by Employee</span>
                  ) : request.requestStatus.toLowerCase() === 'returned' ? (
                    <span className="text-green-500 font-bold">Returned by Employee</span>
                  ) : (
                    <span className="text-gray-500 font-bold">Cancelled</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map((_, index) => (
          <li key={index} className="mx-1">
            <button
              onClick={() => paginate(index + 1)}
              className={`${
                currentPage === index + 1 ? 'bg-gray-500 text-white' : 'bg-gray-300 text-gray-800'
              } hover:bg-gray-400 font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline`}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HRRequestedView;
