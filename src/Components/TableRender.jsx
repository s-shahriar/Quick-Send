import React from "react";

const TableRender = ({ data }) => {
  const isEmpty = data.length === 0;

  return (
    <div className="container p-2 mx-auto sm:p-4 text-gray-800">
      <div className="overflow-x-auto">
        {isEmpty ? (
          <div className="text-center py-4 text-gray-500">
            You do not have any requests at the moment.
          </div>
        ) : (
          <table className="min-w-full text-xs">
            <colgroup>
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
                <tr key={`${item.assetId}-${item.requestDate}`} className="border-b border-opacity-20 border-gray-300 bg-gray-50">
                  <td className="p-3">
                    <p>{item.assetName}</p>
                  </td>
                  <td className="p-3">
                    <p>{item.companyName}</p>
                  </td>
                  <td className="p-3">
                    <p>{new Date(item.requestDate).toLocaleDateString()}</p>
                    <p className="text-gray-600">
                      {new Date(item.requestDate).toLocaleDateString('en-US', { weekday: 'long' })}
                    </p>
                  </td>
                  <td className="p-3">
                    <p>{item.assetType}</p>
                  </td>
                  <td className="p-3 text-center">
                    <span className="px-3 py-1 font-semibold rounded-md bg-primary text-white">
                      {item.requestStatus.charAt(0).toUpperCase() + item.requestStatus.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TableRender;
