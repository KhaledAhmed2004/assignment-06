// "use client";
// import { useUsers } from "@/hooks/users/useUsers";
// import { Table, Tag } from "antd";
// import ErrorMessage from "../../../../components/ErrorMessage";
// import Spinner from "../../../../components/Spinner";
// import { format } from "date-fns";

// // Define User type based on the expected data shape
// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   loggedInAt: string;
// }

// const getRoleBadgeColor = (role: string) => {
//   switch (role) {
//     case "admin":
//       return "blue";
//     case "user":
//       return "green";
//     default:
//       return "red";
//   }
// };

// const PaymentTable = () => {
//   const { users, error, isLoading } = useUsers();

//   if (isLoading) return <Spinner />;
//   if (error) return <ErrorMessage message={error.message} />;
//   if (!users.length) return <ErrorMessage message="No Users Found" />;

//   const columns = [
//     {
//       title: "No.",
//       dataIndex: "index",
//       key: "index",
//       render: (_: unknown, __: unknown, index: number) => index + 1,
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//     },
//     {
//       title: "Role",
//       dataIndex: "role",
//       key: "role",
//       render: (role: string) => (
//         <Tag color={getRoleBadgeColor(role)}>{role.toUpperCase()}</Tag>
//       ),
//     },
//     {
//       title: "Logged in at",
//       dataIndex: "loggedInAt",
//       key: "loggedInAt",
//       render: (loggedInAt: string) =>
//         format(new Date(loggedInAt), "MMMM d, yyyy hh:mm a"),
//     },
//   ];

//   // Map user data for table
//   const dataSource = users.map((user: User, index: number) => ({
//     key: user._id,
//     index: index + 1,
//     name: user.name,
//     email: user.email,
//     role: user.role,
//     loggedInAt: user.loggedInAt,
//   }));

//   return (
//     <section>
//       <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center mb-5 lg:mb-8">
//         Activity Logs
//       </h2>
//       <Table
//         columns={columns}
//         dataSource={dataSource}
//         pagination={{ pageSize: 10 }}
//         className="shadow overflow-x-auto rounded-lg"
//       />
//     </section>
//   );
// };

// export default PaymentTable;

"use client";
import { useUsers } from "@/hooks/users/useUsers";
import { Table, Tag } from "antd";
import ErrorMessage from "../../../../components/ErrorMessage";
import Spinner from "../../../../components/Spinner";
import { format } from "date-fns";

// Define User type based on the expected data shape
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  loggedInAt: string;
}

const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case "admin":
      return "blue";
    case "user":
      return "green";
    default:
      return "red";
  }
};

const PaymentTable = () => {
  const { users, error, isLoading } = useUsers();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!users.length) return <ErrorMessage message="No Users Found" />;

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (_: unknown, __: unknown, index: number) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={getRoleBadgeColor(role)}>{role.toUpperCase()}</Tag>
      ),
    },
    {
      title: "Logged in at",
      dataIndex: "loggedInAt",
      key: "loggedInAt",
      render: (loggedInAt: string) =>
        format(new Date(loggedInAt), "MMMM d, yyyy hh:mm a"),
    },
  ];

  // Map user data for table
  const dataSource = users.map((user: User, index: number) => ({
    key: user._id,
    index: index + 1,
    name: user.name,
    email: user.email,
    role: user.role,
    loggedInAt: user.loggedInAt,
  }));

  return (
    <section className="p-4 md:p-8">
      <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center mb-5 lg:mb-8">
        Activity Logs
      </h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 10 }}
        className="shadow overflow-x-auto rounded-lg"
        scroll={{ x: 768 }} // Enable horizontal scroll if screen is smaller than 768px
      />
    </section>
  );
};

export default PaymentTable;
