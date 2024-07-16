import { useQuery } from "@tanstack/react-query";
import { Dropdown } from "flowbite-react";
import React, { useEffect, useState } from "react";
import EmployeeListView from "../../Components/EmployeeListView";
import LoadingSpinner from "../../Components/LoadingSpinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const RequestAssets = () => {
  const axiosSecure = useAxiosSecure();
  const [sortBy, setSortBy] = useState("default");
  const [stockStatus, setStockStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    document.title = "Request for an Asset";
  }, []);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      try {
        const res = await axiosSecure(`/assets`);
        return res.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onError: (err) => {
      console.error("Failed to fetch assets:", err);
    },
  });


  const filterData = () => {
    let filteredData = data || [];

    if (stockStatus === "Available") {
      filteredData = filteredData.filter((asset) => asset.quantity > 0);
    } else if (stockStatus === "Out of Stock") {
      filteredData = filteredData.filter((asset) => asset.quantity === 0);
    }

    if (filterType !== "all") {
      filteredData = filteredData.filter(
        (asset) => asset.assetType === filterType
      );
    }

    if (searchQuery) {
      filteredData = filteredData.filter((asset) =>
        asset.assetName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredData;
  };

  const sortData = (data) => {
    if (!Array.isArray(data)) return [];
    if (sortBy === "default") {
      return [...data].sort(
        (a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)
      );
    } else if (sortBy === "quantity") {
      return [...data].sort((a, b) => b.quantity - a.quantity);
    }
    return data;
  };

  const resetFilters = () => {
    setSortBy("default");
    setStockStatus("all");
    setFilterType("all");
    setSearchQuery("");
    setCurrentPage(1); 
  };

  const filteredData = filterData();
  const sortedData = sortData(filteredData);

  if (isLoading) {
    return <LoadingSpinner/>;
  }

  return (
    <div className="bg-primary px-8">
      <div className="text-center my-8 pt-4">
        <h6 className="text-center uppercase text-teal-500 text-2xl font-bold">
          Available Assets
        </h6>
        <h1 className="mb-5 text-5xl font-extrabold text-white">
          Explore Company{" "}
          <span className="text-uppercase text-5xl text-teal-500">
            Asset Collection
          </span>
        </h1>
      </div>

      <div className="flex flex-col items-center mb-5 space-y-8">
        <input
          type="text"
          placeholder="Search by asset name"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setCurrentPage(1);  // Reset to first page on search
          }}
          className="p-2 rounded border border-gray-300 w-full max-w-md"
        />

        <div className="flex flex-col md:flex-row justify-center mb-5 space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative bg-teal-500 rounded-lg">
            <Dropdown
              label={`Sort By: ${
                sortBy === "default" ? "Default" : "Quantity"
              }`}
              dismissOnClick={false}
            >
              <Dropdown.Item
                className="dark:hover:bg-[#0f172b] text-black dark:text-white"
                onClick={() => {
                  setSortBy("default");
                  setCurrentPage(1);  // Reset to first page on sort change
                }}
              >
                Default
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:hover:bg-[#0f172b] text-black dark:text-white"
                onClick={() => {
                  setSortBy("quantity");
                  setCurrentPage(1);  // Reset to first page on sort change
                }}
              >
                Quantity
              </Dropdown.Item>
            </Dropdown>
          </div>

          <div className="relative bg-teal-500 rounded-lg">
            <Dropdown
              label={`Filter By Type: ${
                filterType === "all" ? "All Types" : filterType
              }`}
              dismissOnClick={false}
            >
              <Dropdown.Item
                className="dark:hover:bg-[#0f172b] text-black dark:text-white"
                onClick={() => {
                  setFilterType("all");
                  setCurrentPage(1);  // Reset to first page on filter change
                }}
              >
                All Types
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:hover:bg-[#0f172b] text-black dark:text-white"
                onClick={() => {
                  setFilterType("Returnable");
                  setCurrentPage(1);  // Reset to first page on filter change
                }}
              >
                Returnable
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:hover:bg-[#0f172b] text-black dark:text-white"
                onClick={() => {
                  setFilterType("Non-returnable");
                  setCurrentPage(1);  // Reset to first page on filter change
                }}
              >
                Non-returnable
              </Dropdown.Item>
            </Dropdown>
          </div>

          <div className="relative bg-teal-500 rounded-lg">
            <Dropdown
              label={`Filter By Stock: ${
                stockStatus === "all" ? "All Stock" : stockStatus
              }`}
              dismissOnClick={false}
            >
              <Dropdown.Item
                className="dark:hover:bg-[#0f172b] text-black dark:text-white"
                onClick={() => {
                  setStockStatus("all");
                  setCurrentPage(1);  // Reset to first page on filter change
                }}
              >
                All Stock
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:hover:bg-[#0f172b] text-black dark:text-white"
                onClick={() => {
                  setStockStatus("Available");
                  setCurrentPage(1);  // Reset to first page on filter change
                }}
              >
                Available
              </Dropdown.Item>
              <Dropdown.Item
                className="dark:hover:bg-[#0f172b] text-black dark:text-white"
                onClick={() => {
                  setStockStatus("Out of Stock");
                  setCurrentPage(1);  // Reset to first page on filter change
                }}
              >
                Out of Stock
              </Dropdown.Item>
            </Dropdown>
          </div>

          <button
            className="bg-teal-500 text-white py-2 px-4 rounded-lg border border-1"
            onClick={() => {
              resetFilters();
              setCurrentPage(1);  // Reset to first page on filter reset
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      <div className="text-center mb-5">
        <p className="text-xl font-bold text-white">
          Total Assets in the inventory: {filteredData.length}
        </p>
      </div>
      <div className="py-4">
        <EmployeeListView data={sortedData} refetch={refetch} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default RequestAssets;
