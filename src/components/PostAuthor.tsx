import React, { useState, useEffect, useCallback } from "react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import { useUpdateMe } from "@/hooks/auth/useUpdateMe";
import { useUpdateUser } from "@/hooks/users/useUpdateUser";
import { useMe } from "@/hooks/auth/useMe";
import { FiUserPlus, FiUserMinus } from "react-icons/fi";

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

interface PostAuthorProps {
  author: Author;
  postCreatedAt: string;
}

const PostAuthor: React.FC<PostAuthorProps> = ({ author, postCreatedAt }) => {
  const { user } = useMe();
  const { updateUser: updateCurrentUser } = useUpdateMe();
  const { updateUser } = useUpdateUser();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setIsFollowing(
      user?.following?.some(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (followedUser: any) => followedUser?._id === author?._id
      ) || false
    );
  }, [user?.following, author?._id]);

  const handleFollowUnfollow = useCallback(() => {
    if (!user) return;

    const newFollowing = isFollowing
      ? user.following.filter(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (followedUser: any) => followedUser?._id !== author?._id
        )
      : [
          ...(user?.following || []),
          {
            _id: author?._id,
            name: author?.name,
            email: author?.email,
            profilePic: author?.profilePic,
          },
        ];

    const newFollowers = isFollowing
      ? author?.followers?.filter((follower) => follower?._id !== user?._id)
      : [
          ...(author?.followers || []),
          {
            _id: user?._id,
            name: user?.name,
            email: user?.email,
            profilePic: user?.profilePic,
          },
        ];

    updateCurrentUser({ following: newFollowing });
    updateUser({
      userId: author?._id,
      newUser: { followers: newFollowers },
    });

    setIsFollowing(!isFollowing);
  }, [isFollowing, user, author, updateCurrentUser, updateUser]);

  return (
    // <div className="flex flex-col md:flex-row justify-between items-center gap-3">
    //   <div className="flex items-center space-x-4">
    //     <Image
    //       className="w-10 h-10 rounded-full object-cover"
    //       src={author?.profilePic}
    //       alt={`${author?.name}'s profile picture`}
    //       width={40}
    //       height={40}
    //     />
    //     <div>
    //       <div className="font-semibold text-gray-800 dark:text-white">
    //         {author?.name}
    //       </div>
    //       <div className="text-xs text-gray-500 dark:text-gray-400">
    //         {formatDistanceToNow(new Date(postCreatedAt), { addSuffix: true })}
    //       </div>
    //     </div>
    //   </div>
    //   {user && user?._id !== author?._id && (
    //     <button
    //       onClick={handleFollowUnfollow}
    //       className="px-2 md:px-3 text-sm md:text-base py-1 text-white rounded-md border items-center bg-blue-700 border-blue-700 hover:bg-blue-600 dark:hover:text-white transition ease-in-out duration-300 flex space-x-2"
    //     >
    //       {isFollowing ? <FiUserMinus /> : <FiUserPlus />}
    //       <span>{isFollowing ? "Unfollow" : "Follow"}</span>
    //     </button>
    //   )}
    // </div>
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4">
        <Image
          className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          src={author?.profilePic}
          alt={`${author?.name}'s profile picture`}
          width={40}
          height={40}
        />
        <div>
          <div className="font-semibold text-gray-800 dark:text-white text-lg md:text-xl">
            {author?.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {formatDistanceToNow(new Date(postCreatedAt), { addSuffix: true })}
          </div>
        </div>
      </div>
      {user && user?._id !== author?._id && (
        <button
          onClick={handleFollowUnfollow}
          className="mt-2 md:mt-0 px-2 md:px-3 text-sm md:text-base py-1 text-white rounded-md border items-center bg-blue-700 border-blue-700 hover:bg-blue-600 dark:hover:text-white transition ease-in-out duration-300 flex space-x-2"
        >
          {isFollowing ? <FiUserMinus /> : <FiUserPlus />}
          <span>{isFollowing ? "Unfollow" : "Follow"}</span>
        </button>
      )}
    </div>
  );
};

export default PostAuthor;
