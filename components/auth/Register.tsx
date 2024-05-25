/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// Define validation schema using Zod
const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type IFormInput = z.infer<typeof schema>;

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const { email, password } = data;
      await signUp({ username: email, password });

      toast.success("Register successful! Redirecting to confirmation page...");
      setTimeout(
        () => router.push(`/confirm?email=${encodeURIComponent(email)}`),
        2000
      );
    } catch (error: any) {
      console.error("Error signing up:", error);
      toast.error("Error signing up. Please try again.");
    }
  };

  return (
    <>
      <section className="flex justify-center relative ">
        <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
          <Image
            src="/logo.svg"
            alt="cs logo"
            className="mx-auto lg:mb-11 mb-8 h-16"
            width={2294}
            height={450}
          />
          <div className="rounded-2xl bg-white border-4 border-jaffa-400">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="lg:p-11 p-7 mx-auto"
            >
              <div className="mb-11">
                <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                  Create an Account
                </h1>
                <p className="text-gray-500 text-center text-base font-medium leading-6">
                  Join our p2p coding bootcamp today
                </p>
              </div>

              <input
                {...register("email")}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-jaffa-500">
                  {(errors.email as any).message}
                </p>
              )}

              <input
                {...register("password")}
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-jaffa-500">
                  {(errors.password as any).message}
                </p>
              )}

              <input
                {...register("confirmPassword")}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-jaffa-500">
                  {(errors.confirmPassword as any).message}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-jaffa-600 transition-all duration-700 bg-jaffa-500 shadow-sm mb-11"
              >
                Register
              </button>

              <a
                href="/login"
                className="flex justify-center text-gray-900 text-base font-medium leading-6"
              >
                Already have an account?
                <span className="text-jaffa-500 font-semibold pl-3">
                  {" "}
                  Login
                </span>
              </a>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Register;
