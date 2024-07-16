import React from "react";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const NoticeBoard = () => {
  const notices = [
    {
      title: "Company Policy Update",
      message: "Please be informed that the company policy regarding remote work has been updated. Kindly review the new guidelines on the company portal.",
      date: "2024-06-08",
      icon: <FaInfoCircle className="text-teal-500 text-2xl" />,
      type: "info",
    },
    {
      title: "Server Maintenance",
      message: "Scheduled server maintenance will take place this weekend. Please save your work and log out by 6 PM on Friday. Thank you for your cooperation.",
      date: "2024-06-06",
      icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
      type: "alert",
    },
  ];

  return (
    <div className="my-4 space-y-4">
      {notices.map((notice, index) => (
        <div
          key={index}
          className={`bg-white shadow-lg rounded-lg p-6 border-l-4 ${
            notice.type === "info"
              ? "border-teal-500"
              : notice.type === "warning"
              ? "border-yellow-500"
              : notice.type === "alert"
              ? "border-red-500"
              : "border-green-500"
          } hover:shadow-xl transition-shadow duration-300`}
        >
          <div className="flex items-center mb-4">
            <div className="text-2xl">{notice.icon}</div>
            <div className="ml-4">
              <div className="text-xl font-semibold text-teal-500">{notice.title}</div>
              <div className="text-sm text-gray-500">{new Date(notice.date).toLocaleDateString()}</div>
            </div>
          </div>
          <div className="text-gray-700 text-base mb-4">{notice.message}</div>
        </div>
      ))}
    </div>
  );
};

export default NoticeBoard;
