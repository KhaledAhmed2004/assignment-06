import { useUpdateMe } from "@/hooks/auth/useUpdateMe";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { FaCheckCircle, FaEdit, FaSpinner } from "react-icons/fa";
import Button from "./Button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiMail, FiMapPin, FiPhone, FiUser } from "react-icons/fi";
import { BiSolidHide } from "react-icons/bi";
import { Modal } from "antd";
import { RiSecurePaymentLine } from "react-icons/ri";
import Link from "next/link";

interface IFormInput {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profilePic?: string;
}

interface IUser {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  profilePic?: string;
  isVerified?: boolean; // Add this line

  followers?: { name: string; email: string; profilePic: string }[]; // Array of followers
  following?: { name: string; email: string; profilePic: string }[]; // Array of following users
}

const UserProfile = ({ user }: { user: IUser }) => {
  const { isUpdating, updateUser } = useUpdateMe();
  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.profilePic);
  const [showFields, setShowFields] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentList, setCurrentList] = useState<"followers" | "following">(
    "followers"
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFormInput>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      profilePic: user?.profilePic,
    },
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setLoading(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "kpfdlvon");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkfphaooa/image/upload",
          formData
        );
        const newProfilePic = response.data.secure_url;
        setProfilePic(newProfilePic);
        setValue("profilePic", newProfilePic);
      } catch (error) {
        console.error("Error uploading image:", error);
      }

      setLoading(false);
    },
    [setValue]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg"],
    },
    maxFiles: 1,
  });

  const onSubmit = (updatedUser: IFormInput) => {
    updateUser(updatedUser);
  };

  const showModal = (type: "followers" | "following") => {
    setCurrentList(type);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    // <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
    //   <h2 className="text-2xl font-semibold mb-6 dark:text-gray-200">
    //     Profile Information
    //   </h2>

    //   {/* Profile Image */}
    //   <div className="flex items-center space-x-4 mb-6">
    //     <div
    //       {...getRootProps()}
    //       className="relative border p-1 rounded-full cursor-pointer transition-transform transform hover:scale-105 dark:border-gray-600"
    //     >
    //       <input {...getInputProps()} />

    //       {/* Loading Indicator */}
    //       {loading ? (
    //         <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
    //           <FaSpinner className="animate-spin text-lg" />
    //         </div>
    //       ) : (
    //         <>
    //           <Image
    //             src={profilePic as string}
    //             alt="Profile"
    //             className="w-20 h-20 rounded-full object-cover object-center"
    //             width={80}
    //             height={80}
    //           />
    //           {/* <FaCheckCircle className="absolute bottom-1 right-1 text-xl text-green-500" /> */}
    //           {user.isVerified && (
    //             <FaCheckCircle className="absolute bottom-1 right-1 text-xl text-green-500" />
    //           )}

    //           {isDragActive && (
    //             <div className="absolute inset-0 bg-blue-200 bg-opacity-50 flex items-center justify-center rounded-full">
    //               <p className="text-sm text-blue-700">Drop the image here</p>
    //             </div>
    //           )}
    //         </>
    //       )}
    //     </div>
    //     <div>
    //       <h3 className="text-xl font-medium dark:text-gray-200">
    //         {user?.name}
    //       </h3>
    //       <p className="text-sm italic dark:text-gray-400">{user?.email}</p>
    //       <p className="text-xs mt-1 dark:text-gray-400">
    //         Click to change profile picture add save changes
    //       </p>
    //     </div>
    //     <button
    //       onClick={() => showModal("followers")}
    //       className="dark:text-gray-400"
    //     >
    //       {user?.followers?.length || 0} Followers
    //     </button>
    //     <button
    //       onClick={() => showModal("following")}
    //       className="dark:text-gray-400"
    //     >
    //       {user?.following?.length || 0} Following
    //     </button>
    //   </div>

    //   <div className="flex gap-2">
    //     {/* Toggle Button */}
    //     <Button
    //       className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-600 dark:text-white"
    //       onClick={() => setShowFields(!showFields)}
    //     >
    //       {showFields ? (
    //         <>
    //           <BiSolidHide className="mr-2" /> Hide Profile Fields
    //         </>
    //       ) : (
    //         <>
    //           <FaEdit className="mr-2" /> Edit Profile
    //         </>
    //       )}
    //     </Button>
    //     <Link
    //       href={"/payment"}
    //       className="bg-green-500 text-green-100 hover:bg-green-600 rounded-xl px-5 py-2.5 border font-medium flex justify-center items-center focus:ring-2 focus:ring-opacity-50 dark:bg-green-600 dark:text-white"
    //     >
    //       <RiSecurePaymentLine className="mr-2" />
    //       Subscribe
    //     </Link>
    //   </div>

    //   {/* Conditionally Show Form Fields */}
    //   {showFields && (
    //     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
    //       <div>
    //         <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
    //           Name
    //         </label>
    //         <div className="relative">
    //           <FiUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 dark:text-gray-400" />
    //           <input
    //             type="text"
    //             {...register("name", { required: "Name is required" })}
    //             className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200 hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
    //             placeholder="Enter your name"
    //           />
    //         </div>
    //         {errors.name && (
    //           <p className="text-red-500 text-xs mt-1">{`*${errors.name.message}`}</p>
    //         )}
    //       </div>

    //       <div>
    //         <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
    //           Email Address
    //         </label>
    //         <div className="relative">
    //           <FiMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 dark:text-gray-400" />
    //           <input
    //             type="email"
    //             {...register("email", {
    //               required: "Email is required",
    //               pattern: {
    //                 value: /\S+@\S+\.\S+/,
    //                 message: "Invalid email address",
    //               },
    //             })}
    //             className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200 hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
    //             placeholder="Enter your email"
    //             disabled
    //           />
    //         </div>
    //         {errors.email && (
    //           <p className="text-red-500 text-xs mt-1">{`*${errors.email.message}`}</p>
    //         )}
    //       </div>

    //       <div>
    //         <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
    //           Phone Number
    //         </label>
    //         <div className="relative">
    //           <FiPhone className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 dark:text-gray-400" />
    //           <input
    //             type="text"
    //             {...register("phone")}
    //             className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200 hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
    //             placeholder="Enter your phone number"
    //           />
    //         </div>
    //       </div>

    //       <div>
    //         <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
    //           Address
    //         </label>
    //         <div className="relative">
    //           <FiMapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 dark:text-gray-400" />
    //           <input
    //             type="text"
    //             {...register("address")}
    //             className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200 hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
    //             placeholder="Enter your address"
    //           />
    //         </div>
    //       </div>

    //       <button
    //         type="submit"
    //         className={`flex items-center justify-center w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200 ${
    //           isUpdating ? "opacity-50 cursor-not-allowed" : ""
    //         }`}
    //         disabled={isUpdating}
    //       >
    //         {isUpdating ? (
    //           <FaSpinner className="animate-spin" />
    //         ) : (
    //           "Save Changes"
    //         )}
    //         {isUpdating && <span className="ml-2">Saving...</span>}{" "}
    //         {/* Optional text */}
    //       </button>
    //     </form>
    //   )}

    //   {/* Modal for Followers and Following */}
    //   <Modal
    //     title={currentList === "followers" ? "Followers" : "Following"}
    //     open={isModalVisible}
    //     onOk={handleOk}
    //     onCancel={handleCancel}
    //     footer={null}
    //   >
    //     <div>
    //       {currentList === "followers" ? (
    //         user?.followers?.length ? (
    //           user.followers.map((follower, index) => (
    //             <div key={index} className="flex items-center space-x-2">
    //               <Image
    //                 src={follower.profilePic}
    //                 alt=""
    //                 className="w-10 h-10 rounded-full"
    //                 width={40}
    //                 height={40}
    //               />
    //               <div>
    //                 <div className="font-semibold italic">{follower.name}</div>
    //                 <div className="text-xs text-gray-500 italic dark:text-gray-400">
    //                   {follower.email}
    //                 </div>
    //               </div>
    //             </div>
    //           ))
    //         ) : (
    //           <p className="text-gray-500 dark:text-gray-400">
    //             No followers yet.
    //           </p>
    //         )
    //       ) : user?.following?.length ? (
    //         user.following.map((followingUser, index) => (
    //           <div key={index} className="flex items-center space-x-2">
    //             <Image
    //               src={followingUser.profilePic}
    //               alt=""
    //               className="w-10 h-10 rounded-full"
    //               width={40}
    //               height={40}
    //             />
    //             <div>
    //               <div className="font-semibold italic">
    //                 {followingUser.name}
    //               </div>
    //               <div className="text-xs text-gray-500 italic dark:text-gray-400">
    //                 {followingUser.email}
    //               </div>
    //             </div>
    //           </div>
    //         ))
    //       ) : (
    //         <p className="text-gray-500 dark:text-gray-400">
    //           Not following anyone yet.
    //         </p>
    //       )}
    //     </div>
    //   </Modal>
    // </div>
    <div className="p-6 sm:p-8 bg-white rounded-lg shadow-md dark:bg-gray-800 dark:text-white max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 dark:text-gray-200 text-center sm:text-left">
        Profile Information
      </h2>

      {/* Profile Image and Info Section */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 mb-6">
        <div
          {...getRootProps()}
          className="relative border p-1 rounded-full cursor-pointer transition-transform transform hover:scale-105 dark:border-gray-600"
        >
          <input {...getInputProps()} />
          {/* Loading Indicator */}
          {loading ? (
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center bg-gray-200 dark:bg-gray-700">
              <FaSpinner className="animate-spin text-lg" />
            </div>
          ) : (
            <>
              <Image
                src={profilePic as string}
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover"
                width={80}
                height={80}
              />
              {user.isVerified && (
                <FaCheckCircle className="absolute bottom-1 right-1 text-xl text-green-500" />
              )}
              {isDragActive && (
                <div className="absolute inset-0 bg-blue-200 bg-opacity-50 flex items-center justify-center rounded-full">
                  <p className="text-sm text-blue-700">Drop the image here</p>
                </div>
              )}
            </>
          )}
        </div>
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-medium dark:text-gray-200">
            {user?.name}
          </h3>
          <p className="text-sm italic dark:text-gray-400">{user?.email}</p>
          <p className="text-xs mt-1 dark:text-gray-400">
            Click to change profile picture and save changes
          </p>
        </div>
        <div className="flex gap-4 sm:gap-2">
          <button
            onClick={() => showModal("followers")}
            className="dark:text-gray-400"
          >
            {user?.followers?.length || 0} Followers
          </button>
          <button
            onClick={() => showModal("following")}
            className="dark:text-gray-400"
          >
            {user?.following?.length || 0} Following
          </button>
        </div>
      </div>

      {/* Toggle Button and Subscribe Link */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Button
          className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-600 dark:text-white"
          onClick={() => setShowFields(!showFields)}
        >
          {showFields ? (
            <>
              <BiSolidHide className="mr-2" /> Hide Profile Fields
            </>
          ) : (
            <>
              <FaEdit className="mr-2" /> Edit Profile
            </>
          )}
        </Button>
        <Link
          href={"/payment"}
          className="bg-green-500 text-green-100 hover:bg-green-600 rounded-xl px-5 py-2.5 border font-medium flex justify-center items-center focus:ring-2 focus:ring-opacity-50 dark:bg-green-600 dark:text-white"
        >
          <RiSecurePaymentLine className="mr-2" />
          Subscribe
        </Link>
      </div>

      {/* Conditionally Show Form Fields */}
      {showFields && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Name
            </label>
            <div className="relative">
              <FiUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200 hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{`*${errors.name.message}`}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 dark:text-gray-400" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200 hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
                placeholder="Enter your email"
                disabled
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{`*${errors.email.message}`}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Phone Number
            </label>
            <div className="relative">
              <FiPhone className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                {...register("phone")}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200 hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
              Address
            </label>
            <div className="relative">
              <FiMapPin className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                {...register("address")}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200 hover:border-blue-400 dark:bg-gray-700 dark:border-gray-600 dark:focus:border-blue-500"
                placeholder="Enter your address"
              />
            </div>
          </div>
          {/* Save Button */}
          <button
            type="submit"
            className={`flex items-center justify-center w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition duration-200 ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <FaSpinner className="animate-spin" />
            ) : (
              "Save Changes"
            )}
            {isUpdating && <span className="ml-2">Saving...</span>}
          </button>
        </form>
      )}

      {/* Modal for Followers and Following */}
      <Modal
        title={currentList === "followers" ? "Followers" : "Following"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <div>
          {currentList === "followers" ? (
            user?.followers?.length ? (
              user.followers.map((follower, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Image
                    src={follower.profilePic}
                    alt=""
                    className="w-10 h-10 rounded-full"
                    width={40}
                    height={40}
                  />
                  <div>
                    <div className="font-semibold italic">{follower.name}</div>
                    <div className="text-xs text-gray-500 italic dark:text-gray-400">
                      {follower.email}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No followers yet.
              </p>
            )
          ) : user?.following?.length ? (
            user.following.map((followingUser, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Image
                  src={followingUser.profilePic}
                  alt=""
                  className="w-10 h-10 rounded-full"
                  width={40}
                  height={40}
                />
                <div>
                  <div className="font-semibold italic">
                    {followingUser.name}
                  </div>
                  <div className="text-xs text-gray-500 italic dark:text-gray-400">
                    {followingUser.email}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Not following anyone yet.
            </p>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default UserProfile;
