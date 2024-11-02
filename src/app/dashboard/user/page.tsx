"use client";
import ProfileInfo from "@/components/ProfileInfo";
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
    </div>
  );
};

export default UserDashboard;
