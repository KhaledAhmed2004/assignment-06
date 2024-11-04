"use client";
import React, { useState } from "react";
import PostModal from "./modals/PostModal";

const PublishPost = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <section>
      <div
        className="flex justify-between items-center p-2 gap-2 w-full"
        onClick={() => setModalIsOpen(true)}
      >
        <input
          type="text"
          placeholder="Write a post..."
          className="w-full mb-0.5 rounded-md shadow-sm border outline-none py-1.5 lg:py-2 px-3"
        />
        <button
          className="px-3 py-1.5 text-white rounded-md border hover:bg-white transition ease-in-out duration-300"
        >
          Publish
        </button>
      </div>
      <PostModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
    </section>
  );
};

export default PublishPost;
