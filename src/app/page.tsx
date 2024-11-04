"use client";
import RightPart from "@/components/Greeting";
import Post from "@/components/Post";
import SearchFilter from "@/components/SearchFilter";
import Spinner from "@/components/Spinner";
import { usePosts } from "@/hooks/posts/usePosts";
import React from "react";
import InfiniteScroll from "react-infinite-scroller";

const HomePage = () => {
  const { posts, isLoading, fetchNextPage, hasNextPage } = usePosts();

  return (
    <div className="container mx-auto px-5 py-4 mb-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="space-y-6 order-3 lg:order-2 lg:col-span-2">
          <SearchFilter />
          {isLoading ? (
            <Spinner className="my-4" />
          ) : posts?.length === 0 ? (
            <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
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
                  <Post key={post._id} post={post} />
                ))}
              </div>
            </InfiniteScroll>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 order-1 lg:order-3">
          <RightPart />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
