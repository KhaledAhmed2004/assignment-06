// import React, { useEffect, useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// import {
//   Modal,
//   Button,
//   Select,
//   Checkbox,
//   Spin,
//   Upload,
//   message,
//   Input,
// } from "antd";
// import { AnimatePresence, motion } from "framer-motion";
// import { CloseOutlined, UploadOutlined } from "@ant-design/icons";
// import axios from "axios";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
// import "react-quill/dist/quill.snow.css";
// import { useCategories } from "@/hooks/categories/useCategories";
// import { useCreatePost } from "@/hooks/posts/useCreatePost";
// import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
// import { useMe } from "@/hooks/auth/useMe";
// import dynamic from "next/dynamic";
// import Image from "next/image";

// interface PostModalProps {
//   modalIsOpen: boolean;
//   setModalIsOpen: (value: boolean) => void;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   post?: any | null;
// }

// interface FormData {
//   title: string;
//   content: string;
//   category: string;
//   author: string;
//   images: string[];
//   isPremium: boolean;
// }

// interface Category {
//   _id: string;
//   name: string;
// }

// const PostModal: React.FC<PostModalProps> = ({
//   modalIsOpen,
//   setModalIsOpen,
//   post,
// }) => {
//   const {
//     handleSubmit,
//     reset,
//     control,
//     formState: { errors },
//     clearErrors,
//   } = useForm<FormData>({
//     defaultValues: {
//       title: "",
//       content: "",
//       category: "",
//       images: [],
//       isPremium: false,
//     },
//   });

//   const { categories }: { categories: Category[] } = useCategories();

//   const [uploadedImages, setUploadedImages] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const { createPost, isPending: isCreating } = useCreatePost();
//   const { updatePost, isPending: isUpdating } = useUpdatePost();
//   const { user } = useMe();

//   const closeModal = () => {
//     setModalIsOpen(false);
//   };

//   useEffect(() => {
//     if (post) {
//       reset({
//         title: post.title,
//         content: post.content,
//         // category: post.category?._id,
//         category: post.category,
//         images: post.images,
//         isPremium: post.isPremium,
//       });
//       setUploadedImages(post.images);
//     } else {
//       reset({
//         title: "",
//         content: "",
//         category: "",
//         images: [],
//         isPremium: false,
//       });
//       setUploadedImages([]);
//     }
//   }, [post, reset]);

//   const onSubmit = (newPost: FormData) => {
//     clearErrors("images");

//     // Check if there are no uploaded images
//     if (uploadedImages.length === 0) {
//       message.error("At least one image is required"); // Show error message
//       return; // Prevent form submission
//     }

//     newPost.images = uploadedImages;

//     if (post) {
//       updatePost({ postId: post._id, newPost });
//     } else {
//       newPost.author = user._id;
//       createPost(newPost);
//     }
//     closeModal();
//   };

//   const onUpload = async (file: File) => {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "kpfdlvon");

//     try {
//       const response = await axios.post(
//         "https://api.cloudinary.com/v1_1/dkfphaooa/image/upload",
//         formData
//       );
//       return response.data.secure_url;
//     } catch {
//       message.error("Error uploading image");
//       return null;
//     }
//   };

//   const handleUploadChange = async ({ file }: { file: File }) => {
//     setLoading(true);
//     const url = await onUpload(file);
//     if (url) {
//       setUploadedImages((prev) => [...prev, url]);
//     }
//     setLoading(false);
//   };

//   const removeImage = (index: number) => {
//     setUploadedImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   return (
//     <AnimatePresence>
//       {modalIsOpen && (
//         <Modal
//           open={modalIsOpen}
//           onCancel={closeModal}
//           footer={null}
//           title={post ? "Edit Post" : "Add New Post"}
//           centered
//           closeIcon={<CloseOutlined />}
//         >
//           <motion.div
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.5 }}
//             transition={{ duration: 0.3 }}
//           >
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//               <div className="space-y-1">
//                 <label className="font-medium">Title</label>
//                 <Controller
//                   name="title"
//                   control={control}
//                   rules={{ required: "Title is required" }}
//                   render={({ field }) => (
//                     <Input
//                       {...field}
//                       style={{ width: "100%" }}
//                       placeholder="Enter post title"
//                     />
//                   )}
//                 />
//                 {errors.title && (
//                   <p className="text-sm">{errors.title.message}</p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label>Category</label>
//                 <Controller
//                   name="category"
//                   control={control}
//                   rules={{ required: "Category is required" }}
//                   render={({ field }) => (
//                     <Select
//                       {...field}
//                       placeholder="Select a category"
//                       options={categories?.map((cat: Category) => ({
//                         value: cat.name,
//                         label: cat.name,
//                       }))}
//                       value={field.value || undefined}
//                       className="w-full"
//                     />
//                   )}
//                 />
//                 {errors.category && (
//                   <p className="text-sm">{errors.category.message}</p>
//                 )}
//               </div>

//               <div className="space-y-1">
//                 <label>Content</label>
//                 <Controller
//                   name="content"
//                   control={control}
//                   rules={{ required: "Content is required" }}
//                   render={({ field }) => <ReactQuill {...field} theme="snow" />}
//                 />
//                 {errors.content && (
//                   <p className="text-sm">{errors.content.message}</p>
//                 )}
//               </div>

//               {/* Image Upload Field */}
//               <div className="space-y-1">
//                 <label>Images</label>
//                 <Upload
//                   accept="image/*"
//                   customRequest={({ file }) =>
//                     handleUploadChange({ file: file as File })
//                   }
//                   listType="picture-card"
//                   showUploadList={false}
//                   multiple
//                 >
//                   {loading ? <Spin /> : <UploadOutlined />}
//                 </Upload>
//                 {uploadedImages.length === 0 && (
//                   <p className="text-sm text-red-500">
//                     At least one image is required
//                   </p>
//                 )}

//                 <div className="mt-2 flex gap-3">
//                   {uploadedImages.map((url, index) => (
//                     <div key={index} className="relative">
//                       <Image
//                         src={url}
//                         alt="uploaded"
//                         width={96}
//                         height={96}
//                         className="w-24 h-24"
//                       />
//                       <button onClick={() => removeImage(index)}>
//                         <CloseOutlined className="absolute top-0 right-0 text-red-500" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <Controller
//                 name="isPremium"
//                 control={control}
//                 render={({ field }) => (
//                   <Checkbox {...field} checked={field.value}>
//                     Mark as Premium
//                   </Checkbox>
//                 )}
//               />

//               <div className="text-center mt-6">
//                 <Button
//                   type="primary"
//                   loading={isUpdating || isCreating || loading}
//                   htmlType="submit"
//                 >
//                   {post ? "Update Post" : "Create Post"}
//                 </Button>
//               </div>
//             </form>
//           </motion.div>
//         </Modal>
//       )}
//     </AnimatePresence>
//   );
// };

// export default PostModal;

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Button, Select, Checkbox, message, Input } from "antd";
import { AnimatePresence, motion } from "framer-motion";
import { CloseOutlined } from "@ant-design/icons";
import axios from "axios";
import dynamic from "next/dynamic";
import Image from "next/image";
import { IoMdCloudUpload } from "react-icons/io"; // Make sure to import IoMdCloudUpload
import { RxCross2 } from "react-icons/rx"; // Make sure to import RxCross2
import Dropzone from "react-dropzone"; // Ensure Dropzone is imported

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useCategories } from "@/hooks/categories/useCategories";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
import { useMe } from "@/hooks/auth/useMe";

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
        category: post.category,
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

    // Check if there are no uploaded images
    if (uploadedImages.length === 0) {
      message.error("At least one image is required"); // Show error message
      return; // Prevent form submission
    }

    newPost.images = uploadedImages;

    if (post) {
      updatePost({ postId: post._id, newPost });
    } else {
      newPost.author = user._id;
      createPost(newPost);
    }
    closeModal();
  };

  const onDrop = async (acceptedFiles: File[]) => {
    setLoading(true); // Start loading state
    const imgUrls = await Promise.all(
      acceptedFiles.map(async (file) => await onUpload(file))
    );
    setUploadedImages((prev) => [...prev, ...imgUrls.filter((url) => url)]);
    setLoading(false); // End loading state
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

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AnimatePresence>
      {modalIsOpen && (
        <Modal
          open={modalIsOpen}
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
                  <p className="text-sm">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label>Category</label>
                <Controller
                  name="category"
                  control={control}
                  rules={{ required: "Category is required" }}
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
                  <p className="text-sm">{errors.category.message}</p>
                )}
              </div>

              <div className="space-y-1">
                <label>Content</label>
                <Controller
                  name="content"
                  control={control}
                  rules={{ required: "Content is required" }}
                  render={({ field }) => <ReactQuill {...field} theme="snow" />}
                />
                {errors.content && (
                  <p className="text-sm">{errors.content.message}</p>
                )}
              </div>

              {/* New Image Upload Field */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-primary-text">
                  Images
                </label>
                <Controller
                  name="images"
                  control={control}
                  rules={{
                    validate: () =>
                      uploadedImages.length > 0 ||
                      "At least one image is required",
                  }}
                  render={({ field }) => (
                    <Dropzone
                      onDrop={async (acceptedFiles) => {
                        await onDrop(acceptedFiles);
                        field.onChange(uploadedImages); // Update form state with new images
                      }}
                      multiple
                      accept={{
                        "image/png": [".png"],
                        "image/jpg": [".jpg"],
                        "image/jpeg": [".jpeg"],
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div
                          {...getRootProps()}
                          className="w-full px-8 py-3 border border-secondary-grey hover:border-primary-orange rounded-md cursor-pointer"
                        >
                          <input {...getInputProps()} />
                          <div className="flex justify-center text-4xl">
                            <IoMdCloudUpload className="text-primary-orange" />
                          </div>
                          <p className="text-secondary-text text-center">
                            Upload relevant images for the post
                          </p>
                          {loading && (
                            <p className="text-primary-text text-center">
                              Uploading...
                            </p>
                          )}
                        </div>
                      )}
                    </Dropzone>
                  )}
                />
                {errors.images && (
                  <p className="text-primary-red text-sm">
                    {errors.images.message}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-3">
                  {uploadedImages.map((url, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={url}
                        alt={`Uploaded ${index}`}
                        className="h-24 w-24 rounded-md object-cover"
                        width={96}
                        height={96}
                      />
                      <button
                        type="button"
                        className="absolute top-0 right-0 bg-primary-red text-primary-white rounded-full p-1 hover:bg-red-700"
                        onClick={() => removeImage(index)}
                      >
                        <RxCross2 />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Controller
                  name="isPremium"
                  control={control}
                  render={({ field }) => (
                    <Checkbox {...field} checked={field.value}>
                      Is Premium
                    </Checkbox>
                  )}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  htmlType="submit"
                  loading={isCreating || isUpdating || loading} // Disable button during loading
                  type="primary"
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
