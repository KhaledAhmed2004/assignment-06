"use client";

import { usePayments } from "@/hooks/payments/usePayments";
import { Alert, Spin, Table, Tag } from "antd";
import { format } from "date-fns";
import React from "react";

type Payment = {
  _id: string;
  user: { name: string };
  amount: number;
  currency: string;
  payment_status: string;
  createdAt: string;
};
const getStatusBadgeColor = (status: string) => {
  switch (status) {
    case "pending":
      return "blue";
    case "completed":
      return "green";
    case "failed":
      return "red";
    default:
      return "gray";
  }
};
const PaymentTablePage = () => {
  const { payments, error, isLoading } = usePayments();

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: "User",
      dataIndex: ["user", "name"],
      key: "user",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Status",
      dataIndex: "payment_status",
      key: "status",
      render: (status: string) => (
        <Tag color={getStatusBadgeColor(status)}>{status.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (date: string) => format(new Date(date), "MMMM d, yyyy"),
    },
  ];

  if (isLoading) return <Spin size="large" />;
  if (error) return <Alert message={error.message} type="error" showIcon />;
  if (!payments.length)
    return <Alert message="No Payments Found" type="warning" showIcon />;
  return (
    <section className="py-3 lg:py-5">
      <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        Payments History
      </h2>
      <div className="shadow overflow-x-auto rounded-lg">
        <Table
          columns={columns}
          dataSource={payments}
          rowKey={(payment: Payment) => payment?._id}
          pagination={{ pageSize: 10 }}
        />
      </div>
    </section>
  );
};

export default PaymentTablePage;
