"use client";
import PaymentChart from "@/components/PaymentChart";
import PostChart from "@/components/PostChart";
import StatsCard from "@/components/StatsCard";
import { format } from "date-fns";
import React from "react";
import { FaUser, FaPen, FaTags } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAnalyticsData,
  fetchPaymentMetrics,
  fetchPostMetrics,
} from "@/services/apiAnalytics";
import Spinner from "@/components/Spinner";

// Main page component
const Page = () => {
  // Fetch analytics data using react-query for caching and managing loading state
  const { data: analyticsData, isLoading: isLoadingAnalytics } = useQuery({
    queryKey: ["analyticsData"],
    queryFn: () => fetchAnalyticsData(),
  });

  // Fetch post metrics data with react-query
  const { data: postMetrics, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["postMetrics"],
    queryFn: () => fetchPostMetrics(),
  });

  // Fetch payment metrics data with react-query
  const { data: paymentMetrics, isLoading: isLoadingPayments } = useQuery({
    queryKey: ["paymentMetrics"],
    queryFn: () => fetchPaymentMetrics(),
  });

  // Show loading spinner if any of the data is still loading
  if (isLoadingAnalytics || isLoadingPosts || isLoadingPayments) {
    return <Spinner />;
  }

  // Process post metrics data for chart configuration
  const postDates = postMetrics?.map(
    (item: { date: string }) => format(new Date(item.date), "MMM d") // Format dates for better display
  );
  const postCounts = postMetrics?.map(
    (item: { postCount: number }) => item.postCount
  );
  const commentCounts = postMetrics?.map(
    (item: { commentCount: number }) => item.commentCount
  );
  const upvoteCounts = postMetrics?.map(
    (item: { upvoteCount: number }) => item.upvoteCount
  );

  // Define configuration for the post metrics chart
  const postChartConfig = {
    labels: postDates,
    datasets: [
      {
        label: "Posts Created",
        data: postCounts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Comments Written",
        data: commentCounts,
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
      {
        label: "Upvotes Received",
        data: upvoteCounts,
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Process payment metrics data for chart configuration
  const paymentDates = paymentMetrics?.map((item: { date: string }) =>
    format(new Date(item.date), "MMM d")
  );
  const paymentChartConfig = {
    labels: paymentDates,
    datasets: [
      {
        label: "Payments Received",
        data: paymentMetrics?.map(
          (item: { totalAmount: number }) => item.totalAmount
        ),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <section>
      {/* Stats cards for displaying summary of users, posts, and categories */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-10">
        <StatsCard
          title="Users"
          value={analyticsData?.user}
          icon={<FaUser />}
          borderColor="border-blue-500"
          textColor="text-blue-500"
        />
        <StatsCard
          title="Posts"
          value={analyticsData?.post}
          icon={<FaPen />}
          borderColor="border-green-500"
          textColor="text-green-500"
        />
        <StatsCard
          title="Categories"
          value={analyticsData?.category}
          icon={<FaTags />}
          borderColor="border-yellow-500"
          textColor="text-yellow-500"
        />
      </div>

      {/* Chart for displaying post metrics */}
      <div className="bg-secondary-background rounded-lg shadow-lg mb-8 p-5 lg:p-8">
        <h2 className="text-xl lg:text-2xl font-semibold text-center text-primary-text mb-5">
          Post Metrics
        </h2>
        <PostChart chartData={postChartConfig} />
      </div>

      {/* Chart for displaying payment metrics */}
      <div className="bg-secondary-background rounded-lg shadow-lg mb-8 p-5 lg:p-8">
        <h2 className="text-xl lg:text-2xl  font-semibold text-center text-primary-text mb-5">
          Payment Metrics
        </h2>
        <PaymentChart chartData={paymentChartConfig} />
      </div>
    </section>
  );
};

export default Page;
