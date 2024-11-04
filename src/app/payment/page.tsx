"use client";
import Button from "@/components/Button";
import { useMe } from "@/hooks/auth/useMe";
import { useInitPayment } from "@/hooks/payments/useInitPayment";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleArrowUp } from "react-icons/fa6";

const Payment = () => {
  const { user } = useMe();
  const { initPayment } = useInitPayment();

  const handlePayment = async () => {
    initPayment(undefined, {
      onSuccess: (data) => {
        console.log("Payment URL:", data.payment_url); // Console log the payment URL
        window.location.href = data.payment_url; // Redirect to the payment URL
      },
    });
  };

  return (
    <section className="max-w-8xl mx-auto px-5">
      <div className="rounded-lg shadow-md flex flex-col items-center justify-center bg-white py-16 px-8">
        {user?.isVerified ? (
          <FaCheckCircle className="text-8xl mb-6" />
        ) : (
          <FaCircleArrowUp className="text-8xl mb-6 animate-bounce" />
        )}

        <h2 className="text-3xl font-bold mb-4">
          {user?.isVerified
            ? "You are already a premium user"
            : "Upgrade Your Plan"}
        </h2>
        <p className="text-lg">
          {user?.isVerified
            ? "You have access to all premium features and exclusive content"
            : "Get access to premium features and exclusive content by upgrading your plan."}
        </p>
        {!user?.isVerified && (
          <Button onClick={handlePayment} className="mt-5">
            Pay Now
          </Button>
        )}
      </div>
    </section>
  );
};

export default Payment;
