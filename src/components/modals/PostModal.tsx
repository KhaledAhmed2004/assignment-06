import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Button,
  Select,
  Checkbox,
  Spin,
  Upload,
  message,
  Input,
} from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useCategories } from "@/hooks/categories/useCategories";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
import { useMe } from "@/hooks/auth/useMe";
import dynamic from "next/dynamic";
import Image from "next/image";

interface PostModalProps {
  modalIsOpen: boolean;
  setModalIsOpen: (value: boolean) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  post?: any | null;
}

interface FormData {
  title: string;
  content: string;
  category: string;
  author: string;
  images: string[];
  isPremium: boolean;
}

interface Category {
  _id: string;
  name: string;
}

const PostModal: React.FC<PostModalProps> = ({
  modalIsOpen,
  setModalIsOpen,
  post,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      content: "",
      category: "",
      images: [],
      isPremium: false,
    },
  });

  const { categories }: { categories: Category[] } = useCategories();

  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { createPost, isPending: isCreating } = useCreatePost();
  const { updatePost, isPending: isUpdating } = useUpdatePost();
  const { user } = useMe();

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        content: post.content,
        category: post.category?._id,
        images: post.images,
        isPremium: post.isPremium,
      });
      setUploadedImages(post.images);
    } else {
      reset({
        title: "",
        content: "",
        category: "",
        images: [],
        isPremium: false,
      });
      setUploadedImages([]);
    }
  }, [post, reset]);

  const onSubmit = (newPost: FormData) => {
    clearErrors("images");
    newPost.images = uploadedImages;

    if (post) {
      updatePost({ postId: post._id, newPost });
    } else {
      newPost.author = user._id;
      createPost(newPost);
    }
    closeModal();
  };

  const onUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "kpfdlvon");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkfphaooa/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch {
      message.error("Error uploading image");
      return null;
    }
  };

  const handleUploadChange = async ({ file }: { file: File }) => {
    setLoading(true);
    const url = await onUpload(file);
    if (url) {
      setUploadedImages((prev) => [...prev, url]);
    }
    setLoading(false);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          visible={modalIsOpen}
          onCancel={closeModal}
          footer={null}
          title={post ? "Edit Post" : "Add New Post"}
          centered
          closeIcon={<CloseOutlined />}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-1">
                <label className="font-medium">Title</label>
                <Controller
                  name="title"
                  control={control}
                  rules={{ required: "Title is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ width: "100%" }}
                      placeholder="Enter post title"
                    />
                  )}
                />
                {errors.title && (
                  <p className="text-sm">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label>Category</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select a category"
                      options={categories?.map((cat: Category) => ({
                        value: cat.name,
                        label: cat.name,
                      }))}
                      value={field.value || undefined}
                      className="w-full"
                    />
                  )}
                />
                {errors.category && (
                  <p className="text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label>Content</label>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => <ReactQuill {...field} theme="snow" />}
                />
                {errors.content && (
                  <p className="text-sm">
                    {errors.content.message}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label>Images</label>
                <Upload
                  accept="image/*"
                  customRequest={({ file }) =>
                    handleUploadChange({ file: file as File })
                  }
                  listType="picture-card"
                  showUploadList={false}
                  multiple
                >
                  {loading ? <Spin /> : <UploadOutlined />}
                </Upload>
                {errors.images && (
                  <p className="text-sm">
                    {errors.images.message}
                  </p>
                )}

                <div className="mt-2 flex gap-3">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={url}
                        alt="uploaded"
                        width={96}
                        height={96}
                        className="w-24 h-24"
                      />
                      {/* <img src={url} alt="uploaded" className="w-24 h-24" /> */}
                      <button onClick={() => removeImage(index)}>
                        <CloseOutlined className="absolute top-0 right-0 text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox {...register("isPremium")}>Mark as Premium</Checkbox>
              </div>

              <div className="text-center mt-6">
                <Button
                  type="primary"
                  loading={isUpdating || isCreating || loading}
                  htmlType="submit"
                >
                  {post ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </form>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default PostModal;
