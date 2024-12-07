"use client";
import RightPart from "@/components/Greeting";
import PostModal from "@/components/modals/PostModal";
import Post from "@/components/Post";
import SearchFilter from "@/components/SearchFilter";
import Spinner from "@/components/Spinner";
import { useMe } from "@/hooks/auth/useMe";
import { usePosts } from "@/hooks/posts/usePosts";
import Link from "next/link";
import React, { useState } from "react";
import { FaPlusCircle, FaSpinner, FaFireAlt, FaTag } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroller";

const HomePage = () => {
  const { posts, isLoading, fetchNextPage, hasNextPage } = usePosts();
  const { user } = useMe();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  // Example of popular tags
  const popularTags = [
    "Technology",
    "Health",
    "Travel",
    "Lifestyle",
    "Education",
  ];

  // Example of trending posts
  const trendingPosts = [
    {
      title: "New Advances in AI Technology",
      link: "/post/1",
    },
    {
      title: "Health Benefits of Meditation",
      link: "/post/2",
    },
    {
      title: "Top Travel Destinations for 2024",
      link: "/post/3",
    },
    {
      title: "How to Stay Productive During Remote Work",
      link: "/post/4",
    },
  ];

  return (
    <div className="container mx-auto px-5 py-4 mb-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        {/* <aside className="col-span-12 lg:col-span-3 bg-white text-gray-800 p-6 rounded-lg space-y-6 h-screen sticky top-1 overflow-y-auto"> */}
        <aside className="col-span-12 lg:col-span-3 bg-white text-gray-800 p-6 rounded-lg space-y-6 h-screen sticky top-1 overflow-y-auto lg:block hidden">
          <h2 className="text-2xl font-bold">Explore</h2>

          {/* Popular Tags Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center space-x-2 hover:underline transition duration-300 gap-2">
              <FaTag /> Popular Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {popularTags.map((tag, index) => (
                <span
                  key={index}
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-600 transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Trending Posts Section */}
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center space-x-2 hover:underline transition duration-300 gap-2">
              <FaFireAlt /> Trending Posts
            </h3>
            <ul className="space-y-2">
              {trendingPosts.map((post, index) => (
                <li key={index}>
                  <Link
                    href={post.link}
                    className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-6 space-y-6 z-50">
          <SearchFilter />
          {user && (
            <button onClick={() => setModalIsOpen(true)} className="w-full">
              <div className="flex h-12 items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white transition-transform transform  rounded-lg p-3 cursor-pointer shadow-lg dark:bg-green-500 dark:hover:bg-green-600 w-full">
                <FaPlusCircle className="text-lg" />
                <span className="font-semibold">Create New Post</span>
              </div>
            </button>
          )}
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <FaSpinner className="animate-spin dark:text-white" size={40} />
            </div>
          ) : posts?.length === 0 ? (
            <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center mb-5 lg:mb-8">
              No Posts Found
            </h2>
          ) : (
            <InfiniteScroll
              key={posts?.length}
              pageStart={1}
              loadMore={() => fetchNextPage()}
              hasMore={hasNextPage}
              loader={<Spinner className="my-4" />}
            >
              <div className="flex flex-col gap-4">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {posts?.map((post: any) => (
                  <Post key={post?._id} post={post} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>
        <PostModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
        {/* Right Sidebar */}
        {/* <div className="col-span-12 lg:col-span-3 space-y-6 h-screen sticky top-0">
          <RightPart />
        </div> */}
        <div className="col-span-12 lg:col-span-3 space-y-6 h-screen sticky top-0 lg:block hidden">
          <RightPart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
