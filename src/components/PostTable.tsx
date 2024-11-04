"use client";
import { usePosts } from "../hooks/posts/usePosts";
import { useDeletePost } from "../hooks/posts/useDeletePost";
import ErrorMessage from "./ErrorMessage";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroller";
import Image from "next/image";
import React, { useState } from "react";
import PostMedia from "./PostMedia";
import PostAuthor from "./PostAuthor";
import Link from "next/link";
import { useMe } from "@/hooks/auth/useMe";
import { FaStar, FaEllipsisH } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { IoMdLock } from "react-icons/io";
import Button from "./Button";
import { Modal, message } from "antd";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import PostModal from "./modals/PostModal";

interface Author {
  _id: string;
  name: string;
  profilePic: string;
  email: string;
  followers: Array<{
    _id: string;
    name: string;
    email: string;
    profilePic: string;
  }>;
  following: Array<{
    _id: string;
    name: string;
    email: string;
    profilePic: string;
  }>;
}

export interface TPost {
  _id?: string;
  title: string;
  content: string;
  author: Author; // Use the Author type
  category: string;
  images: string[];
  isPremium: boolean;
  upvotes: string[];
  downvotes: string[];
  createdAt: string; // Add createdAt as a required field (string if it's an ISO date string)
  totalComments: number; // Make this required
}

const PostTable = () => {
  const { user } = useMe();
  const {
    posts: allPosts,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = usePosts();

  const posts =
    user?.role === "admin"
      ? allPosts
      : allPosts.filter((post) => post.author._id === user?._id);

  const { deletePost } = useDeletePost();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<TPost | null>(null);

  if (isLoading) return <Spinner />;

  if (error) {
    return <ErrorMessage message={error.message} />;
  }

  if (!posts.length)
    return (
      <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
        No Posts Found
      </h2>
    );

  const PostItem = ({ post }: { post: TPost }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const isPremium = post.isPremium;
    const canAccessPremium =
      user?.isVerified ||
      user?.role === "admin" ||
      user?._id === post.author._id;

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

    const handleMenuToggle = () => {
      setMenuVisible((prev) => !prev);
    };

    const handleDelete = () => {
      Modal.confirm({
        title: "Are you sure you want to delete this post?",
        content: "This action cannot be undone.",
        okText: "Yes, Delete",
        okType: "danger",
        cancelText: "Cancel",
        okButtonProps: {
          style: {
            backgroundColor: "#3b82f6",
            color: "#ffffff",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
          },
        },
        cancelButtonProps: {
          style: {
            backgroundColor: "#dbeafe",
            color: "#2563eb",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            fontWeight: "600",
          },
        },

        onOk: async () => {
          if (post._id) {
            // Ensure post._id is defined
            try {
              await deletePost(post._id);
              message.success("Post deleted successfully!");
            } catch {
              message.error("Failed to delete the post. Please try again.");
            }
          } else {
            message.error("Post ID is not available.");
          }
        },
        onCancel: () => {
          setMenuVisible(false);
        },
      });
    };

    return (
      <div className="p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:via-gray-700 dark:to-gray-900 shadow-lg rounded-3xl mb-8 transition-transform duration-300 transform">
        {/* Header section with menu icon and options */}
        <div className="relative mb-4">
          <div className="absolute top-4 right-4 cursor-pointer">
            <FaEllipsisH
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              size={20}
              onClick={handleMenuToggle}
            />
            {menuVisible && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md z-10">
                <button
                  onClick={() => {
                    setModalIsOpen(true);
                    setSelectedPost(post);
                  }}
                  className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 w-full text-left"
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center px-4 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 w-full text-left"
                >
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Author Info and Premium Badge */}
        <div className="flex justify-between items-center mb-4">
          <PostAuthor author={post.author} postCreatedAt={post.createdAt} />
        </div>
        <div>
          {isPremium && (
            <div className="flex w-fit items-center space-x-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100 px-2 py-1 rounded-full text-sm font-semibold">
              <FaStar size={16} />
              <span>Premium</span>
            </div>
          )}
        </div>
        {/* Post Link */}
        <Link
          href={
            !canAccessPremium && post.isPremium
              ? "/dashboard/user/payment"
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
          <div className="mt-4 bg-primary-background rounded-lg overflow-hidden relative shadow-md transition-transform duration-300 transform hover:shadow-xl">
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
        {post._id && (
          <PostMedia
            postUpvotes={post.upvotes}
            postDownvotes={post.downvotes}
            postId={post._id}
            totalComments={post.totalComments}
          />
        )}
      </div>
    );
  };

  return (
    <InfiniteScroll
      key={posts.length}
      pageStart={1}
      loadMore={() => fetchNextPage()}
      hasMore={hasNextPage}
      loader={<Spinner className="my-4" />}
    >
      <div className="pb-4">
        <Button
          onClick={() => {
            setSelectedPost(null);
            setModalIsOpen(true);
          }}
          className="gap-2"
        >
          <IoMdAdd className="text-xl" />
          Create New Post
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
      <PostModal
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        post={selectedPost}
      />
    </InfiniteScroll>
  );
};

export default PostTable;
