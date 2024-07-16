import React from "react";

const LimitedStockItems = ({ data }) => {
  const isEmpty = data.length === 0;

  const renderTable = () => (
    <div className="container p-2 mx-auto sm:p-4 text-gray-800">
      <div className="overflow-x-auto">
        <table className="min-w-full text-xs">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <thead className="bg-primary text-white">
            <tr className="text-center">
              <th className="p-3">Asset Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id} className="border-b border-opacity-20 border-gray-300 bg-gray-50 text-center">
                <td className="p-3">{item.assetName || 'N/A'}</td>
                <td className="p-3">{item.assetType || 'N/A'}</td>
                <td className="p-3">{item.quantity || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="my-4">
      <h1 className="text-4xl font-bold text-center text-teal-500 my-4">Running Out of Stocks</h1>
      {isEmpty ? (
        <div className="text-center py-4 text-gray-500">No top requested items...</div>
      ) : (
        renderTable()
      )}
    </div>
  );
};

export default LimitedStockItems;
