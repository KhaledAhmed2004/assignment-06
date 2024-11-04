"use client";
import Button from "@/components/Button";
import { useLogin } from "@/hooks/auth/useLogin";
import Link from "next/link";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FiLock, FiMail } from "react-icons/fi";

interface IFormInput {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const { login, isPending } = useLogin();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    login(data);
  };

  return (
    <section className="flex items-center justify-center min-h-screen py-8 lg:py-10">
      <div className="w-full max-w-md p-8 shadow-xl rounded-2xl bg-white bg-opacity-90 border">
        <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
          Sign In
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
          <Button
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
            disabled={isPending}
            loading={isPending}
          >
            Submit
          </Button>

          <div className="flex justify-between items-center text-sm text-gray-600 font-medium">
            <Link
              href="/forgot-password"
              className="hover:text-blue-500 transition-all duration-300 font-semibold"
            >
              Forgot Password?
            </Link>
            <Link
              href="/sign-up"
              className="font-semibold text-blue-600 hover:underline"
            >
              Sign Up Instead
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
