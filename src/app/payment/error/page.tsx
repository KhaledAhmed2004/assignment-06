import Link from "next/link";
import React from "react";
import { FiRefreshCw } from "react-icons/fi";
import { GiCancel } from "react-icons/gi";

const page = () => {
  return (
    <section className="max-w-8xl mx-auto px-5 mt-2">
      <div className="rounded-2xl shadow-lg flex flex-col items-center justify-center bg-white dark:bg-gray-800 py-16 px-10 transition-transform duration-300 transform hover:shadow-xl ">
        {/* Icon with animation */}
        <div className="w-24 h-24 mb-6 text-red-600 dark:text-red-500 animate-pulse">
          <GiCancel size="100%" />
        </div>

        {/* Unsuccessful Message */}
        <h1 className="text-4xl font-extrabold mb-4 text-red-600 dark:text-red-500">
          Payment Failed!
        </h1>
        <p className="text-lg text-gray-600 dark:text-white mb-8 text-center">
          Unfortunately, we were unable to process your payment. Please try
          again.
        </p>

        {/* Interactive Button */}
        <div className="flex space-x-4">
          <Link
            href="/payment"
            className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-white py-3 px-8 rounded-lg flex items-center shadow-md hover:shadow-xl hover:scale-105 transform transition ease-in duration-300"
          >
            Retry Payment
            <FiRefreshCw className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default page;
