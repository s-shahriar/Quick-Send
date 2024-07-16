import React from "react";

const PendingRequests = ({ data }) => {
  const isEmpty = data.length === 0;

  const renderTable = () => (
    <div className="container p-2 mx-auto sm:p-4 text-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead className="bg-primary text-white">
            <tr className="text-left">
              <th className="p-3">Asset Name</th>
              <th className="p-3">Company</th>
              <th className="p-3">Requested</th>
              <th className="p-3">Type</th>
              <th className="p-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                <td className="p-3">{item.assetName || 'N/A'}</td>
                <td className="p-3">{item.companyName || 'N/A'}</td>
                <td className="p-3">
                  <p>{item.requestDate ? new Date(item.requestDate).toLocaleDateString() : 'N/A'}</p>
                  <p className="text-gray-600">
                    {item.requestDate ? new Date(item.requestDate).toLocaleDateString('en-US', { weekday: 'long' }) : 'N/A'}
                  </p>
                </td>
                <td className="p-3">{item.assetType || 'N/A'}</td>
                <td className="p-3 text-center">
                  <span className={`px-3 py-1 font-semibold rounded-md ${item.requestStatus === 'pending' ? 'bg-primary text-white' : 'bg-gray-500 text-gray-50'}`}>
                    {item.requestStatus.charAt(0).toUpperCase() + item.requestStatus.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="my-4">
      <h1 className="text-4xl font-bold text-center text-teal-500 my-4">All Pending Requests</h1>
      {isEmpty ? (
        <div className="text-center py-4 text-gray-500">You do not have any pending requests...</div>
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default PendingRequests;
