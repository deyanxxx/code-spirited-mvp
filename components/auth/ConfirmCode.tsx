/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { confirmSignUp } from "aws-amplify/auth";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

// Define validation schema using Zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  code: z.string().length(6, "Confirmation code must be exactly 6 characters long"),
});

type IFormInput = z.infer<typeof schema>;

const ConfirmCode = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");

  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (emailParam) {
      setValue("email", emailParam);
    }
  }, [emailParam, setValue]);

  const onSubmit = async (data: IFormInput) => {
    try {
      const { email, code } = data;
      await confirmSignUp({ username: email, confirmationCode: code });

      toast.success("Account confirmed successfully! Redirecting to login page...");
      setTimeout(() => router.push("/login"), 2000);
    } catch (error: any) {
      toast.error("Error confirming sign up. Please try again.");
      console.error("Error confirming sign up:", error);
    }
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = event.clipboardData.getData("text");
    if (pasteData.length === 6) {
      pasteData.split("").forEach((char, index) => {
        if (codeRefs.current[index]) {
          codeRefs.current[index]!.value = char;
          setValue(`code`, codeRefs.current.map(input => input?.value).join(""));
        }
      });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    if (/^[0-9]$/.test(value)) {
      if (codeRefs.current[index + 1]) {
        codeRefs.current[index + 1]!.focus();
      }
      setValue(`code`, codeRefs.current.map(input => input?.value).join(""));
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === "Backspace" && !event.currentTarget.value && codeRefs.current[index - 1]) {
      codeRefs.current[index - 1]!.focus();
    }
  };

  return (
    <>
      <section className="flex justify-center relative">
        <div className="mx-auto max-w-lg px-6 lg:px-8 absolute py-20">
          <Image
            src="/logo.svg"
            alt="cs logo"
            className="mx-auto lg:mb-11 mb-8 h-16"
            width={2294}
            height={450}
          />
          <div className="rounded-2xl bg-white border-4 border-jaffa-400">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:p-11 p-7 mx-auto">
              <div className="mb-11">
                <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                  Confirm your account
                </h1>
                <p className="text-gray-500 text-center text-base font-medium leading-6">
                  Enter the confirmation code sent to your email
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

              <div className="flex justify-between mb-6">
                {Array(6).fill(0).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    ref={(el) => (codeRefs.current[index] = el)}
                    onPaste={handlePaste}
                    onChange={event => handleChange(event, index)}
                    onKeyDown={event => handleKeyDown(event, index)}
                    className="w-12 h-12 text-center text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none"
                  />
                ))}
              </div>
              {errors.code && (
                <p className="mt-1 text-jaffa-500">
                  {(errors.code as any).message}
                </p>
              )}

              <button
                type="submit"
                className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-jaffa-600 transition-all duration-700 bg-jaffa-500 shadow-sm mb-11"
              >
                Confirm
              </button>
              <a
                href="/register"
                className="flex justify-center text-gray-900 text-base font-medium leading-6"
              >
                Didn&apos;t receive a code?{" "}
                <span className="text-jaffa-500 font-semibold pl-3">
                  Resend code
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

export default ConfirmCode;
