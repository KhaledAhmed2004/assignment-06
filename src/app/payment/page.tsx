// "use client";
// import Button from "@/components/Button";
// import { useMe } from "@/hooks/auth/useMe";
// import { useInitPayment } from "@/hooks/payments/useInitPayment";
// import React from "react";
// import { FaCheckCircle } from "react-icons/fa";
// import { FaCircleArrowUp } from "react-icons/fa6";

// const Payment = () => {
//   const { user } = useMe();
//   const { initPayment } = useInitPayment();

//   const handlePayment = async () => {
//     initPayment(undefined, {
//       onSuccess: (data) => {
//         console.log("Payment URL:", data.payment_url); // Console log the payment URL
//         window.location.href = data.payment_url; // Redirect to the payment URL
//       },
//     });
//   };

//   return (
//     <section className="max-w-8xl mx-auto px-5">
//       <div className="rounded-lg shadow-md flex flex-col items-center justify-center bg-white py-16 px-8">
//         {user?.isVerified ? (
//           <FaCheckCircle className="text-8xl mb-6" />
//         ) : (
//           <FaCircleArrowUp className="text-8xl mb-6 animate-bounce" />
//         )}

//         <h2 className="text-3xl font-bold mb-4">
//           {user?.isVerified
//             ? "You are already a premium user"
//             : "Upgrade Your Plan"}
//         </h2>
//         <p className="text-lg">
//           {user?.isVerified
//             ? "You have access to all premium features and exclusive content"
//             : "Get access to premium features and exclusive content by upgrading your plan."}
//         </p>
//         {!user?.isVerified && (
//           <Button onClick={handlePayment} className="mt-5">
//             Pay Now
//           </Button>
//         )}
//       </div>
//     </section>
//   );
// };

// export default Payment;

"use client";
import Button from "@/components/Button";
import { useMe } from "@/hooks/auth/useMe";
import { useInitPayment } from "@/hooks/payments/useInitPayment";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleArrowUp } from "react-icons/fa6";

const Payment = () => {
  const { user } = useMe();
  const { initPayment } = useInitPayment();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    initPayment(undefined, {
      onSuccess: (data) => {
        console.log("Payment URL:", data.payment_url); // Console log the payment URL
        window.location.href = data.payment_url; // Redirect to the payment URL
      },
      onError: () => {
        setLoading(false); // Reset loading state on error
      },
    });
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full mx-auto px-5">
        <div className="rounded-lg shadow-md flex flex-col items-center justify-center bg-white dark:bg-gray-800 py-12 px-8">
          {user?.isVerified ? (
            <FaCheckCircle className="text-8xl text-green-500 mb-6 dark:text-green-400" />
          ) : (
            <FaCircleArrowUp className="text-8xl text-blue-500 mb-6 animate-bounce dark:text-blue-400" />
          )}

          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            {user?.isVerified ? "Premium Access" : "Upgrade Your Plan"}
          </h2>

          <p className="text-lg mb-4 text-gray-700 dark:text-gray-300 text-center">
            {user?.isVerified
              ? "You already have access to premium features and exclusive content."
              : "Unlock premium features and exclusive content for only $20 per month."}
          </p>

          {!user?.isVerified && (
            <div className="flex items-center mb-4">
              <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                $20
              </span>
              <span className="text-lg text-gray-600 dark:text-gray-400 ml-1">
                / month
              </span>
            </div>
          )}

          {!user?.isVerified && (
            <Button onClick={handlePayment} className="mt-5 dark:text-white" disabled={loading}>
              {loading ? "Loading..." : "Pay Now"}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Payment;
