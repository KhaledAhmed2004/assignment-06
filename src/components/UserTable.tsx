// // "use client";
// // import React, { useState } from "react";
// // import { Table, Button as AntButton, Modal } from "antd";
// // import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
// // import { useUsers } from "../hooks/users/useUsers";
// // import { useDeleteUser } from "../hooks/users/useDeleteUser";
// // import Spinner from "./Spinner";
// // import ErrorMessage from "./ErrorMessage";
// // import UserModal from "./modals/UserModal";

// // // Define a User interface for type safety
// // interface User {
// //   _id: string;
// //   name: string;
// //   email: string;
// //   role: string;
// //   phone: string;
// //   address: string;
// // }

// // const getRoleBadgeColor = (role: string) => {
// //   switch (role) {
// //     case "admin":
// //       return "bg-primary-blue text-white";
// //     case "user":
// //       return "bg-primary-green text-white";
// //     default:
// //       return "bg-secondary-red text-white";
// //   }
// // };

// // const UserTable: React.FC = () => {
// //   const { users, error, isLoading } = useUsers();
// //   const { deleteUser } = useDeleteUser();
// //   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
// //   const [selectedUser, setSelectedUser] = useState<User | null>(null);

// //   const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
// //   const [userToDelete, setUserToDelete] = useState<User | null>(null);

// //   if (isLoading) return <Spinner />;
// //   if (error) return <ErrorMessage message={error.message} />;
// //   if (!users.length) return <ErrorMessage message={"No Users Found"} />;

// //   const columns = [
// //     {
// //       title: "Name",
// //       dataIndex: "name",
// //       key: "name",
// //     },
// //     {
// //       title: "Email",
// //       dataIndex: "email",
// //       key: "email",
// //     },
// //     {
// //       title: "Role",
// //       dataIndex: "role",
// //       key: "role",
// //       render: (role: string) => (
// //         <span
// //           className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getRoleBadgeColor(
// //             role
// //           )}`}
// //         >
// //           {role}
// //         </span>
// //       ),
// //     },
// //     {
// //       title: "Phone",
// //       dataIndex: "phone",
// //       key: "phone",
// //     },
// //     {
// //       title: "Address",
// //       dataIndex: "address",
// //       key: "address",
// //     },
// //     {
// //       title: "Actions",
// //       key: "actions",
// //       render: (_: unknown, user: User) => (
// //         <div className="flex gap-2">
// //           <AntButton
// //             type="link"
// //             onClick={() => {
// //               setSelectedUser(user);
// //               setModalIsOpen(true);
// //             }}
// //             icon={<FaRegPenToSquare />}
// //           />
// //           <AntButton
// //             type="link"
// //             onClick={() => {
// //               setUserToDelete(user);
// //               setIsConfirmDeleteOpen(true);
// //             }}
// //             icon={<FaRegTrashCan />}
// //           />
// //         </div>
// //       ),
// //     },
// //   ];

// //   const handleDelete = () => {
// //     if (userToDelete) {
// //       deleteUser(userToDelete._id);
// //       setIsConfirmDeleteOpen(false);
// //     }
// //   };

// //   return (
// //     <div className="shadow overflow-x-auto rounded-lg">
// //       <AntButton
// //         type="primary"
// //         onClick={() => {
// //           setSelectedUser(null);
// //           setModalIsOpen(true);
// //         }}
// //         icon={<FaPlus />}
// //         style={{ marginBottom: 16 }}
// //       >
// //         Add User
// //       </AntButton>
// //       <Table
// //         dataSource={users}
// //         columns={columns}
// //         rowKey="_id"
// //         pagination={false}
// //         className="bg-primary-background"
// //       />
// //       <UserModal
// //         modalIsOpen={modalIsOpen}
// //         setModalIsOpen={setModalIsOpen}
// //         user={selectedUser}
// //       />
// //       <Modal
// //         title="Confirm Deletion"
// //         open={isConfirmDeleteOpen}
// //         onOk={handleDelete}
// //         onCancel={() => setIsConfirmDeleteOpen(false)}
// //         okText="Yes, Delete"
// //         cancelText="Cancel"
// //       >
// //         <p>Are you sure you want to delete this user?</p>
// //       </Modal>
// //     </div>
// //   );
// // };

// // export default UserTable;

// "use client";
// import React, { useState } from "react";
// import { Table, Button as AntButton, Modal, Tag } from "antd";
// import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
// import { useUsers } from "../hooks/users/useUsers";
// import { useDeleteUser } from "../hooks/users/useDeleteUser";
// import Spinner from "./Spinner";
// import ErrorMessage from "./ErrorMessage";
// import UserModal from "./modals/UserModal";

// interface User {
//   _id: string;
//   name: string;
//   email: string;
//   role: string;
//   phone: string;
//   address: string;
// }

// const UserTable: React.FC = () => {
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
//         <Tag color={role === "admin" ? "blue" : role === "user" ? "green" : "red"}>
//           {role.toUpperCase()}
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
//     <div className="shadow overflow-x-auto rounded-lg">
//       <AntButton
//         type="primary"
//         onClick={() => {
//           setSelectedUser(null);
//           setModalIsOpen(true);
//         }}
//         icon={<FaPlus />}
//         style={{ marginBottom: 16 }}
//       >
//         Add User
//       </AntButton>
//       <Table
//         dataSource={users}
//         columns={columns}
//         rowKey="_id"
//         pagination={false}
//         className="bg-primary-background"
//       />
//       <UserModal
//         modalIsOpen={modalIsOpen}
//         setModalIsOpen={setModalIsOpen}
//         user={selectedUser}
//       />
//       <Modal
//         title="Confirm Deletion"
//         open={isConfirmDeleteOpen}
//         onOk={handleDelete}
//         onCancel={() => setIsConfirmDeleteOpen(false)}
//         okText="Yes, Delete"
//         cancelText="Cancel"
//       >
//         <p>Are you sure you want to delete this user?</p>
//       </Modal>
//     </div>
//   );
// };

// export default UserTable;

"use client";
import React, { useState } from "react";
import { Table, Button as AntButton, Modal, Tag } from "antd";
import { FaPlus, FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useUsers } from "../hooks/users/useUsers";
import { useDeleteUser } from "../hooks/users/useDeleteUser";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import UserModal from "./modals/UserModal";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  address: string;
  isBlocked: boolean; // Using isBlocked instead of status
}

const UserTable: React.FC = () => {
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
    <div className="shadow overflow-x-auto rounded-lg">
      <AntButton
        type="primary"
        onClick={() => {
          setSelectedUser(null);
          setModalIsOpen(true);
        }}
        icon={<FaPlus />}
        style={{ marginBottom: 16 }}
      >
        Add User
      </AntButton>
      <Table
        dataSource={users}
        columns={columns}
        rowKey="_id"
        pagination={false}
        className="bg-primary-background"
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
  );
};

export default UserTable;
