// "use client";
// import { useMe } from "@/hooks/auth/useMe";
// import Image from "next/image";
// import React, { useState } from "react";
// import Button from "./Button";
// import { FaPlusCircle } from "react-icons/fa";
// import PostModal from "./modals/PostModal";

// const RightPart = () => {
//   const { user } = useMe();
//   const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

//   return (
//     <div className="p-6 bg-white border  rounded-2xl flex xl:flex-row flex-col justify-start items-center space-x-2 gap-8 transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:shadow-2xl dark:hover:shadow-2xl">
//       {/* User Profile Section */}
//       <div className="flex flex-col items-center">
//         <div className="relative w-16 h-16">
//           <Image
//             src={
//               user?.profilePic ||
//               "https://res.cloudinary.com/dkfphaooa/image/upload/v1729743544/ihcgtzfktxsmck7zew4c.png"
//             }
//             alt="avatar"
//             className="rounded-full object-cover ring-2 ring-blue-500 hover:ring-blue-700 transition duration-300 ease-in-out"
//             fill
//           />
//         </div>
//         <h2 className="text-xl font-bold mt-3 text-gray-900 dark:text-white">
//           {user?.name || "Guest"}
//         </h2>
//         <p className="text-gray-400 text-center text-sm mt-1 dark:text-gray-300">
//           Lets share our knowledge
//         </p>
//       </div>

//       {/* Quick Actions */}
//       <div className="flex flex-col gap-2">
//         <Button
//           className="text-sm h-12 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
//           href={user?.role === "admin" ? "/dashboard/admin" : "/user"}
//         >
//           Go to {user?.role === "admin" ? "Dashboard" : "My Profile"}
//         </Button>
//         {/* Conditionally Render "Create New Post" Button */}
//         {user && (
//           <button onClick={() => setModalIsOpen(true)}>
//             <div className="flex h-12 items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white transition-transform transform hover:scale-105 duration-300 rounded-lg p-3 cursor-pointer shadow-lg dark:bg-green-500 dark:hover:bg-green-600">
//               <FaPlusCircle className="text-lg" />
//               <span className="font-semibold">Create New Post</span>
//             </div>
//           </button>
//         )}
//       </div>
//       <PostModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
//     </div>
//   );
// };

// export default RightPart;
"use client";
import { useMe } from "@/hooks/auth/useMe";
import Image from "next/image";
import Button from "./Button";

const RightPart = () => {
  const { user } = useMe();

  return (
    <div className="p-6 bg-white border  rounded-2xl flex flex-col justify-start items-center space-x-2 gap-8 transition-shadow duration-300 ease-in-out dark:bg-gray-800 dark:shadow-2xl dark:hover:shadow-2xl ">
      {/* User Profile Section */}
      <div className="flex flex-col items-center">
        <div className="relative w-16 h-16">
          <Image
            src={
              user?.profilePic ||
              "https://res.cloudinary.com/dkfphaooa/image/upload/v1729743544/ihcgtzfktxsmck7zew4c.png"
            }
            alt="avatar"
            className="rounded-full object-cover ring-2 ring-blue-500 hover:ring-blue-700 transition duration-300 ease-in-out"
            fill
          />
        </div>
        <h2 className="text-xl font-bold mt-3 text-gray-900 dark:text-white">
          {user?.name || "Guest"}
        </h2>
        <p className="text-gray-400 text-center text-sm mt-1 dark:text-gray-300">
          Lets share our knowledge
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-2">
        <Button
          className="text-sm h-12 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
          href={user?.role === "admin" ? "/dashboard/admin" : "/user"}
        >
          Go to {user?.role === "admin" ? "Dashboard" : "My Profile"}
        </Button>
      </div>
    </div>
  );
};

export default RightPart;
