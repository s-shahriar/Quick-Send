import React, { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const Transaction = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [allUsers, setAllUsers] = useState({});

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosSecure.get("/transaction-history");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transaction history", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await axiosSecure.get("/all-users");
        const usersMap = response.data.reduce((acc, user) => {
          acc[user._id] = user.name;
          return acc;
        }, {});
        setAllUsers(usersMap);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchTransactions();
    fetchAllUsers();
  }, [axiosSecure]);

  const filterTransactions = () => {
    if (user.role === "user") {
      return transactions.filter(
        (transaction) => transaction.fromUser === user._id
      );
    } else if (user.role === "agent") {
      return transactions.filter(
        (transaction) =>
          transaction.fromUser === user._id || transaction.toUser === user._id
      );
    }
    return transactions;
  };

  const currentTransactions = filterTransactions();

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatAmount = (amount) => `${amount} tk.`;
  const formatFee = (fee) => `${fee.toFixed(2)} tk.`;

  return (
    <div className="container mx-auto px-4 py-8 bg-primary">
      <div className="text-center mb-4 pt-4">
        <h6 className="text-center uppercase text-teal-500 text-2xl font-bold">
          Transaction History
        </h6>
        <h1 className="mb-5 text-5xl font-extrabold text-white">
          Explore Your{" "}
          <span className="text-uppercase text-5xl text-teal-500">
            Transaction History
          </span>
        </h1>
      </div>
      <div className="overflow-x-auto p-6">
        <table className="w-full table-auto border-collapse border border-gray-300 bg-primary">
          <thead className="bg-teal-500 text-white">
            <tr>
              <th className="py-2 px-4 border border-gray-300">Type</th>
              <th className="py-2 px-4 border border-gray-300">Amount</th>
              <th className="py-2 px-4 border border-gray-300">Fee</th>
              <th className="py-2 px-4 border border-gray-300">Sender</th>
              <th className="py-2 px-4 border border-gray-300">Receiver</th>
              <th className="py-2 px-4 border border-gray-300">Timestamp</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {currentItems.map((transaction) => (
              <tr key={transaction._id}>
                <td className="py-2 px-4 border border-gray-300">
                  {transaction.type === "sendMoney" ? "Send Money" : "Cash Out"}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {formatAmount(transaction.amount)}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {formatFee(transaction.fee)}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {allUsers[transaction.fromUser] || transaction.fromUser}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {allUsers[transaction.toUser] || transaction.toUser}
                </td>
                <td className="py-2 px-4 border border-gray-300">
                  {new Date(transaction.timestamp).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ul className="flex justify-center mt-4">
        {Array.from({
          length: Math.ceil(currentTransactions.length / itemsPerPage),
        }).map((_, index) => (
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
        ))}
      </ul>
    </div>
  );
};

export default Transaction;
