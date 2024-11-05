// "use client";
// import React, { useState } from "react";
// import { Table, Button as AntButton, Modal, Tag } from "antd";
// import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
// import { useUsers } from "@/hooks/users/useUsers";
// import { useDeleteUser } from "@/hooks/users/useDeleteUser";
// import Spinner from "@/components/Spinner";
// import ErrorMessage from "@/components/ErrorMessage";
// import UserModal from "@/components/modals/UserModal";

// export interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: "user" | "admin";
//   isBlocked?: boolean;
//   phone?: string;
//   address?: string;
// }

// const ManageUsers = () => {
//   const { users, error, isLoading } = useUsers();
//   const { deleteUser } = useDeleteUser();
//   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState<User | null>(null);

//   if (isLoading) return <Spinner />;
//   if (error) return <ErrorMessage message={error.message} />;
//   if (!users.length) return <ErrorMessage message={"No Users Found"} />;

//   const columns = [
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
//         <Tag
//           color={role === "admin" ? "blue" : role === "user" ? "green" : "red"}
//         >
//           {role.toUpperCase()}
//         </Tag>
//       ),
//     },
//     {
//       title: "Status",
//       dataIndex: "isBlocked",
//       key: "status",
//       render: (isBlocked: boolean) => (
//         <Tag color={isBlocked ? "volcano" : "green"}>
//           {isBlocked ? "Blocked" : "Active"}
//         </Tag>
//       ),
//     },
//     {
//       title: "Phone",
//       dataIndex: "phone",
//       key: "phone",
//     },
//     {
//       title: "Address",
//       dataIndex: "address",
//       key: "address",
//     },

//     {
//       title: "Actions",
//       key: "actions",
//       render: (_: unknown, user: User) => (
//         <div className="flex gap-2">
//           <AntButton
//             type="link"
//             onClick={() => {
//               setSelectedUser(user);
//               setModalIsOpen(true);
//             }}
//             icon={<FaRegPenToSquare />}
//           />
//           <AntButton
//             type="link"
//             onClick={() => {
//               setUserToDelete(user);
//               setIsConfirmDeleteOpen(true);
//             }}
//             icon={<FaRegTrashCan />}
//           />
//         </div>
//       ),
//     },
//   ];

//   const handleDelete = () => {
//     if (userToDelete) {
//       deleteUser(userToDelete._id);
//       setIsConfirmDeleteOpen(false);
//     }
//   };
//   return (
//     <section className="py-3 lg:py-5">
//       <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center mb-5 lg:mb-8">
//         Manage Users
//       </h2>
//       <div className="shadow overflow-x-auto rounded-lg">
//         <AntButton
//           type="primary"
//           onClick={() => {
//             setSelectedUser(null);
//             setModalIsOpen(true);
//           }}
//           icon={<FaPlus />}
//           style={{ marginBottom: 16 }}
//         >
//           Add User
//         </AntButton>
//         <Table
//           dataSource={users}
//           columns={columns}
//           rowKey="_id"
//           pagination={{ pageSize: 10 }}
//         />
//         <UserModal
//           modalIsOpen={modalIsOpen}
//           setModalIsOpen={setModalIsOpen}
//           user={selectedUser}
//         />
//         <Modal
//           title="Confirm Deletion"
//           open={isConfirmDeleteOpen}
//           onOk={handleDelete}
//           onCancel={() => setIsConfirmDeleteOpen(false)}
//           okText="Yes, Delete"
//           cancelText="Cancel"
//         >
//           <p>Are you sure you want to delete this user?</p>
//         </Modal>
//       </div>
//     </section>
//   );
// };

// export default ManageUsers;

"use client";
import React, { useState } from "react";
import { Table, Button as AntButton, Modal, Tag, Row, Col } from "antd";
import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useUsers } from "@/hooks/users/useUsers";
import { useDeleteUser } from "@/hooks/users/useDeleteUser";
import Spinner from "@/components/Spinner";
import ErrorMessage from "@/components/ErrorMessage";
import UserModal from "@/components/modals/UserModal";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  isBlocked?: boolean;
  phone?: string;
  address?: string;
}

const ManageUsers = () => {
  const { users, error, isLoading } = useUsers();
  const { deleteUser } = useDeleteUser();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!users.length) return <ErrorMessage message={"No Users Found"} />;

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
        <Tag
          color={role === "admin" ? "blue" : role === "user" ? "green" : "red"}
        >
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Status",
      dataIndex: "isBlocked",
      key: "status",
      render: (isBlocked: boolean) => (
        <Tag color={isBlocked ? "volcano" : "green"}>
          {isBlocked ? "Blocked" : "Active"}
        </Tag>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, user: User) => (
        <div className="flex gap-2">
          <AntButton
            type="link"
            onClick={() => {
              setSelectedUser(user);
              setModalIsOpen(true);
            }}
            icon={<FaRegPenToSquare />}
          />
          <AntButton
            type="link"
            onClick={() => {
              setUserToDelete(user);
              setIsConfirmDeleteOpen(true);
            }}
            icon={<FaRegTrashCan />}
          />
        </div>
      ),
    },
  ];

  const handleDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete._id);
      setIsConfirmDeleteOpen(false);
    }
  };

  return (
    <section className="py-3 lg:py-5">
      <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center mb-5 lg:mb-8">
        Manage Users
      </h2>
      <div className="shadow overflow-x-auto rounded-lg">
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Col>
            <AntButton
              type="primary"
              onClick={() => {
                setSelectedUser(null);
                setModalIsOpen(true);
              }}
              icon={<FaPlus />}
            >
              Add User
            </AntButton>
          </Col>
        </Row>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: true }} // Enables horizontal scrolling
          size="small" // Adjusts the size for better mobile compatibility
        />
        <UserModal
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          user={selectedUser}
        />
        <Modal
          title="Confirm Deletion"
          open={isConfirmDeleteOpen}
          onOk={handleDelete}
          onCancel={() => setIsConfirmDeleteOpen(false)}
          okText="Yes, Delete"
          cancelText="Cancel"
        >
          <p>Are you sure you want to delete this user?</p>
        </Modal>
      </div>
    </section>
  );
};

export default ManageUsers;
