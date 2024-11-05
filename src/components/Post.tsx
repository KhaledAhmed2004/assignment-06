import Image from "next/image";
import React from "react";
import PostMedia from "./PostMedia";
import PostAuthor from "./PostAuthor";
import Link from "next/link";
import { useMe } from "@/hooks/auth/useMe";
import { FaStar } from "react-icons/fa";
import { IoMdLock } from "react-icons/io";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Post = ({ post }: any) => {
  const { user } = useMe();

  const isPremium = post.isPremium;
  const canAccessPremium =
    user?.isVerified || user?.role === "admin" || user?._id === post.author._id;

  const stripHtmlTags = (htmlContent: string) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    return div.textContent || div.innerText || "";
  };

  const maxLength = 150;
  const rawContent = stripHtmlTags(post.content); // Clean HTML tags
  const truncatedContent =
    rawContent.length > maxLength
      ? `${rawContent.slice(0, maxLength)}...`
      : rawContent;

  return (
    <div className="p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 shadow-lg rounded-3xl mb-8 transition-transform duration-300 transform">
      {/* Author */}
      <div className="flex mb-2 justify-between ic">
        {/* Author Info */}
        <PostAuthor author={post.author} postCreatedAt={post.createdAt} />
        {/* Premium Badge */}
        {isPremium && (
          <div className="flex items-center space-x-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100 px-2 py-1 rounded-full text-sm font-semibold mb-4">
            <FaStar size={16} />
            <span>Premium</span>
          </div>
        )}
      </div>

      {/* Post Link */}
      <Link
        href={
          !canAccessPremium && post.isPremium
            ? "/payment"
            : `/post/${post._id}`
        }
      >
        {/* Title */}
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">
          {post.title}
        </h2>

        {/* Category Badge */}
        <span className="text-base text-blue-700 bg-blue-100 dark:text-white dark:bg-blue-600 px-3 py-1 rounded-full">
          {post.category}
        </span>
        {/* Post Image */}
        <div className="mt-4 rounded-lg overflow-hidden relative shadow-md transition-transform duration-300 transform hover:shadow-xl">
          <Image
            className="w-full h-64 object-cover transition-transform duration-300 transform hover:scale-105"
            src={post.images[0]}
            alt="Post image"
            width={500}
            height={300}
          />
          {isPremium && !canAccessPremium && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-white text-center">
                <IoMdLock className="mx-auto mb-2" size={24} />
                <p className="font-semibold">Premium Content</p>
                <p className="text-sm">Verify your account to access</p>
              </div>
            </div>
          )}
        </div>

        {/* Post Content */}
        <div className="text-gray-700 dark:text-gray-300 mb-4">
          <span dangerouslySetInnerHTML={{ __html: truncatedContent }} />
          {rawContent.length > maxLength && (
            <Link
              href={
                !canAccessPremium && post.isPremium
                  ? "/dashboard/user/payment"
                  : `/post/${post._id}`
              }
              className="text-blue-500 hover:underline font-medium dark:text-blue-400"
            >
              Read More
            </Link>
          )}
        </div>
      </Link>

      {/* Post Interactions */}
      <PostMedia
        postUpvotes={post.upvotes}
        postDownvotes={post.downvotes}
        postId={post._id}
        totalComments={post.totalComments}
      />
    </div>
  );
};

export default Post;
