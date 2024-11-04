"use client";
import Button from "@/components/Button";
import { useSignup } from "@/hooks/auth/useSignup";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiUser, FiMail, FiLock, FiPhone } from "react-icons/fi";

interface IFormInput {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  terms: boolean;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { signup, isPending } = useSignup();

  const onSubmit: SubmitHandler<IFormInput> = (newUser) => {
    signup(newUser);
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-12 px-4 lg:px-8">
      <div className="max-w-lg w-full p-8 lg:p-10 bg-white shadow-xl rounded-2xl">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Name
            </label>
            <div className="relative">
              <FiUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200"
                placeholder="Enter your name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">
                *{errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid email format",
                  },
                })}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200"
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                *{errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200"
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                *{errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value, { password }) =>
                    value === password || "Passwords must match",
                })}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200"
                placeholder="Re-enter your password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                *{errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Phone Number (Optional)
            </label>
            <div className="relative">
              <FiPhone className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
              <input
                type="text"
                {...register("phone")}
                className="w-full pl-10 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none py-2 px-3 transition duration-200"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="flex items-center font-medium">
            <input
              type="checkbox"
              {...register("terms", {
                required: "You must accept the terms and conditions",
              })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label className="ml-2 text-sm text-gray-700">
              I agree to the{" "}
              <Link
                href="/terms"
                className="font-semibold text-blue-600 hover:underline"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs mt-1">*{errors.terms.message}</p>
          )}

          <Button
            className="w-full py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isPending}
            loading={isPending}
          >
            Sign Up
          </Button>

          <p className="text-sm text-center font-medium text-gray-600">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-blue-600 hover:underline"
            >
              Login Instead
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignUp;
