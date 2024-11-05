import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaCheck } from "react-icons/fa";

const page = () => {
  return (
    <section className="max-w-8xl mx-auto px-5 mt-2">
      <div className="rounded-lg shadow-lg flex flex-col items-center justify-center bg-white dark:bg-gray-900 py-16 px-8">
        <div className="w-32 h-32 mb-6 flex items-center justify-center rounded-full bg-green-600">
          <FaCheck className="text-6xl" />
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
          Payment Successful!
        </h1>
        <p className="text-lg mb-8 text-black dark:text-white">
          Thank you for your payment. Your transaction has been completed
          successfully.
        </p>

        {/* Interactive Buttons */}
        <div className="flex space-x-4">
          <Link
            href="/user"
            className="bg-gray-800 border border-gray-700 py-2 px-6 rounded-lg flex items-center hover:bg-gray-700 transition ease-in duration-300 text-white"
          >
            Back to Dashboard
            <FiArrowRight className="ml-2" size={20} />
          </Link>
          <Link
            href="/"
            className="bg-blue-600 text-white py-2 px-6 rounded-lg flex items-center hover:bg-blue-500 transition ease-in duration-300"
          >
            Back to Home
            <FiArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
