"use client";
import React, { useState } from "react";
import { usePost } from "@/hooks/posts/usePost";
import { useForm } from "react-hook-form";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import ErrorMessage from "@/components/ErrorMessage";
import PostAuthor from "@/components/PostAuthor";
import PostMedia from "@/components/PostMedia";
import { format } from "date-fns";
import { useCreateComment } from "@/hooks/comments/useCreateComments";
import { useMe } from "@/hooks/auth/useMe";
import { FaSpinner, FaEdit, FaTrash } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { usePDF } from "react-to-pdf";
import { FaRegFilePdf } from "react-icons/fa6";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import { useUpdateComment } from "@/hooks/comments/useUpdateComment";

interface FormData {
  text: string;
}

interface Comment {
  _id: string;
  text: string;
  author: {
    _id: string;
    name: string;
    profilePic: string;
  };
  createdAt: string;
}

const PostDetails = () => {
  const { toPDF, targetRef } = usePDF({ filename: "post-details.pdf" });
  const queryClient = useQueryClient();
  const { user } = useMe();
  const { post, isLoading, error } = usePost();
  const { createComment, isPending: isCreating } = useCreateComment();
  const { deleteComment, isPending: isDeleting } = useDeleteComment();
  const { updateComment, isPending: isUpdating } = useUpdateComment();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  const onSubmit = (data: FormData) => {
    createComment(
      {
        text: data.text,
        post: post._id,
        author: user._id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["post", post._id],
          });
          reset();
        },
      }
    );
  };

  const handleDeleteComment = (commentId: string) => {
    deleteComment(commentId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["post", post._id],
        });
      },
    });
  };

  const handleEditComment = (comment: Comment) => {
    setEditingCommentId(comment._id);
    setEditedCommentText(comment.text);
  };

  const handleUpdateComment = () => {
    if (editingCommentId) {
      updateComment(
        {
          newComment: {
            text: editedCommentText,
          },
          commentId: editingCommentId,
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["post", post._id],
            });
            setEditingCommentId(null);
            setEditedCommentText("");
          },
        }
      );
    }
  };

  const handleGeneratePDF = async () => {
    setIsPdfGenerating(true);
    await toPDF();
    setIsPdfGenerating(false);
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <FaSpinner className="animate-spin dark:text-white" size={40} />
      </div>
    );
  if (error) return <ErrorMessage message={error.message} />;
  if (!post) return <ErrorMessage message={"No Post Found"} />;

  return (
    <div className="container mx-auto">
      <div className="max-w-6xl mx-auto px-5 py-4">
        <div
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md space-y-6"
          ref={targetRef}
        >
          {/* Post Title */}
          <div className="flex items-center gap-3 justify-between">
            {/* Title */}
            <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-3 hover:text-blue-600 dark:hover:text-blue-400 transition duration-300">
              {post.title}
            </h2>
          </div>
          {/* Author and Date */}
          <PostAuthor author={post.author} postCreatedAt={post.createdAt} />
          {/* Category Badge */}
          <div>
            <span className="text-base text-blue-700 bg-blue-100 dark:text-white dark:bg-blue-600 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          {/* Post Content */}
          <p
            className="dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div>
            <Swiper
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {post.images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <div className="dark:bg-gray-700 rounded-lg">
                    <Image
                      src={image}
                      alt="Slide 1"
                      className="w-full h-96 object-contain rounded-md"
                      width={768}
                      height={432}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <PostMedia
            postUpvotes={post.upvotes}
            postDownvotes={post.downvotes}
            postId={post._id}
            totalComments={post.comments.length}
          />

          {/* Comments Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold dark:text-gray-200">
                Comments
              </h2>
              <button
                onClick={handleGeneratePDF}
                className="flex items-center gap-2 dark:text-gray-300 px-2 py-1 dark:bg-gray-700 rounded-md dark:hover:bg-gray-600 transition ease-in duration-300 text-xs border"
                disabled={isPdfGenerating}
              >
                <FaRegFilePdf className="" size={16} />{" "}
                {isPdfGenerating ? "Generating PDF..." : "Generate PDF"}
              </button>
            </div>
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment: Comment) => (
                <div
                  key={comment._id}
                  className="dark:bg-gray-700 p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={comment.author.profilePic}
                      alt="Author"
                      className="w-10 h-10 rounded-full"
                      width={40}
                      height={40}
                    />
                    <div>
                      <div className="font-semibold italic dark:text-gray-200">
                        {comment.author.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 italic">
                        {format(new Date(comment.createdAt), "PPP")}
                      </div>
                    </div>
                  </div>
                  {editingCommentId === comment._id ? (
                    <div className="mt-3">
                      <textarea
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-300"
                        rows={3}
                      />
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={handleUpdateComment}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md"
                          disabled={isUpdating}
                        >
                          {isUpdating ? "Updating..." : "Update"}
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="px-3 py-1 bg-gray-300 text-gray-700 dark:bg-gray-600 dark:text-gray-200 rounded-md"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="dark:text-gray-300 mt-3">{comment.text}</p>
                  )}
                  {user?._id === comment.author._id &&
                    editingCommentId !== comment._id && (
                      <div className="mt-2 flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditComment(comment)}
                          className="px-3 py-1 dark:text-white rounded-md border
                        hover:bg-white dark:hover:bg-gray-800 transition ease-in-out duration-300
                        "
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="px-3 py-1 dark:text-white rounded-md border 
                        hover:bg-white dark:hover:bg-gray-800 transition ease-in-out duration-300
                        "
                          disabled={isDeleting}
                        >
                          {isDeleting ? (
                            <FaSpinner className="animate-spin" />
                          ) : (
                            <FaTrash />
                          )}
                        </button>
                      </div>
                    )}
                </div>
              ))
            ) : (
              <p className="dark:text-gray-300">No comments yet.</p>
            )}
          </div>

          {/* Add Comment Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center mt-4"
          >
            <textarea
              className="w-full p-2 border rounded-md dark:bg-gray-800 dark:text-gray-300"
              rows={3}
              placeholder="Write a comment..."
              {...register("text", { required: true })}
            />
            <button
              type="submit"
              disabled={isCreating}
              className="dark:text-white px-3 py-2 rounded-md ml-3 border hover:bg-white dark:hover:bg-gray-800 transition ease-in-out duration-300"
            >
              {isCreating ? <FaSpinner className="animate-spin" /> : "Comment"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
