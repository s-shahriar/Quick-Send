import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../Hooks/useAuth";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import LimitedStockItems from "./LimitedStockItems";
import LoadingSpinner from "./LoadingSpinner";
import PendingRequests from "./PendingRequests";
import TopRequestedItems from "./TopRequestedItems";

const HRRequestList = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: requestsData,
    isLoading: isLoadingRequests,
    error: requestsError,
  } = useQuery({
    queryKey: ["requestedAssets", user.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure(`/requests/${user.email}`);
        return res.data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onError: (err) => {
      console.error("Failed to fetch requested assets:", err);
    },
  });

  const {
    data: assetsData,
    isLoading: isLoadingAssets,
    error: assetsError,
  } = useQuery({
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

  const currentDate = new Date();

  const pendingRequests = requestsData
    ? requestsData
        .filter((item) => item.requestStatus === "pending")
        .slice(0, 5)
    : [];

  const topRequestedItems = requestsData
    ? Object.entries(
        requestsData.reduce((acc, item) => {
          acc[item.assetId] = {
            count: (acc[item.assetId]?.count || 0) + 1,
            assetName: item.assetName,
            assetType: item.assetType,
            quantity:
              assetsData.find((asset) => asset._id === item.assetId)
                ?.quantity || 0,
          };
          return acc;
        }, {})
      )
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 4)
        .map(([assetId, details]) => ({
          assetName: details.assetName,
          assetType: details.assetType,
          quantity: details.quantity,
        }))
    : [];

  const limitedStockItems = assetsData
    ? assetsData
        .map((item) => ({
          ...item,
          quantity: parseInt(item.quantity, 10), // Convert quantity to integer
        }))
        .filter((item) => item.quantity < 10)
        .sort((a, b) => a.quantity - b.quantity) // Sort by quantity in ascending order
        .slice(0, 5)
    : [];

  if (isLoadingRequests || isLoadingAssets) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="my-4 space-y-6">
        <PendingRequests data={pendingRequests} />
        <TopRequestedItems data={topRequestedItems} />
        <LimitedStockItems data={limitedStockItems} />
      </div>
    </div>
  );
};

export default HRRequestList;
