// "use client";
// import PostTable from "@/components/PostTable";

// import SearchFilter from "@/components/SearchFilter";

// const ManagePosts = () => {
//   return (
//     <section className="py-3 lg:py-5">
//       <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center mb-5 lg:mb-8">
//         Manage Posts
//       </h2>
//       <div className="space-y-4">
//         <SearchFilter />
//         <PostTable />
//       </div>
//     </section>
//   );
// };

// export default ManagePosts;


"use client";

import ErrorMessage from "@/components/ErrorMessage";
import PostModal from "@/components/modals/PostModal";
import SearchFilter from "@/components/SearchFilter";
import Spinner from "@/components/Spinner";
import { useMe } from "@/hooks/auth/useMe";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { usePosts } from "@/hooks/posts/usePosts";
import { Button, Table, Tag, Modal, Row, Col } from "antd";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroller";

interface Author {
  _id: string;
  name: string;
}

interface Category {
  name: string;
}

interface Post {
  _id: string;
  title: string;
  author: Author;
  category: Category;
  isPremium: boolean;
}

const getStatusBadgeColor = (isPremium: boolean): string => {
  return isPremium ? "green" : "red";
};

const ManagePosts = () => {
  const { user } = useMe();
  const {
    posts: allPosts,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = usePosts();

  const posts: Post[] =
    user?.role === "admin"
      ? allPosts
      : allPosts.filter((post: Post) => post.author._id === user?._id);

  const { deletePost } = useDeletePost();
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handleDeletePost = (postId: string) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletePost(postId);
      },
    });
  };

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!posts.length) return <ErrorMessage message={"No Posts Found"} />;

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      render: (_: unknown, __: unknown, index: number) => index + 1,
      width: 50,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Author",
      dataIndex: "author",
      render: (author: Author) => author.name,
      key: "author",
    },
    {
      title: "Category",
      dataIndex: "category",
      render: (category: string) => category,
      key: "category",
    },
    {
      title: "Status",
      dataIndex: "isPremium",
      render: (isPremium: boolean) => (
        <Tag color={getStatusBadgeColor(isPremium)}>
          {isPremium ? "Premium" : "Free"}
        </Tag>
      ),
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: unknown, post: Post) => (
        <div className="flex gap-2">
          <Button
            type="primary"
            icon={<FaRegPenToSquare />}
            onClick={() => {
              setSelectedPost(post);
              setModalIsOpen(true);
            }}
          />
          <Button
            icon={<FaRegTrashCan />}
            onClick={() => handleDeletePost(post._id)}
          />
        </div>
      ),
    },
  ];

  return (
    <section className="py-3 lg:py-5">
      <h2 className="text-2xl dark:text-white lg:text-3xl font-semibold text-center mb-5 lg:mb-8">
        Manage Posts
      </h2>
      <div className="space-y-4">
        <SearchFilter />
        <Row justify="end">
          <Col>
            <Button
              type="primary"
              className="text-sm py-2 px-2"
              onClick={() => {
                setSelectedPost(null);
                setModalIsOpen(true);
              }}
              icon={<FaPlus />}
            >
              Add Post
            </Button>
          </Col>
        </Row>

        <InfiniteScroll
          key={posts?.length}
          pageStart={1}
          loadMore={() => fetchNextPage()}
          hasMore={hasNextPage}
          loader={<Spinner className="my-4" />}
        >
          <div className="shadow overflow-x-auto rounded-lg">
            <Table
              columns={columns}
              dataSource={posts}
              pagination={{ pageSize: 10 }}
              rowKey="_id"
              scroll={{ x: true }} // Added horizontal scrolling
              size="middle" // Adjust size for better responsiveness
            />
            <PostModal
              modalIsOpen={modalIsOpen}
              setModalIsOpen={setModalIsOpen}
              post={selectedPost}
            />
          </div>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default ManagePosts;
