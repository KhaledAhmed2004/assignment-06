"use client";
import PostTable from "@/components/PostTable";
import ProfileInfo from "@/components/ProfileInfo";
import SearchFilter from "@/components/SearchFilter";
import Spinner from "@/components/Spinner";
import { useMe } from "@/hooks/auth/useMe";
import React from "react";

const UserDashboard = () => {
  const { user, isLoading } = useMe();
  if (isLoading) return <Spinner />;

  return (
    <div className="bg-primary-background text-primary-text">
      <div>
        <div className="col-span-2 space-y-6">
          <ProfileInfo user={user} />
        </div>
      </div>
      <section className="py-3 px-4 lg:py-5 lg:px-0 max-w-8xl mx-auto">
        <h2 className="text-2xl lg:text-3xl font-semibold text-center text-primary-text mb-5 lg:mb-8">
          My Posts
        </h2>
        <div className="space-y-4">
          <SearchFilter />
          <div className="overflow-x-auto">
            <PostTable />
          </div>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
