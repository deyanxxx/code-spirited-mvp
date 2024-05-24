'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { resetPassword } from 'aws-amplify/auth';
import { z } from 'zod';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const schema = z.object({
  email: z.string().email('Invalid email address'),
});

type IFormInput = z.infer<typeof schema>;

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await resetPassword({ username: data.email });
      toast.success('A reset code has been sent to your email address. Redirecting to reset password page...');
      setTimeout(() => router.push(`/reset-password?email=${encodeURIComponent(data.email)}`), 2000);
    } catch (error: any) {
      toast.error('Error sending reset code. Please try again.');
      console.error('Error sending reset code:', error);
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
          <div className="rounded-2xl bg-white shadow-xl">
            <form onSubmit={handleSubmit(onSubmit)} className="lg:p-11 p-7 mx-auto">
              <div className="mb-11">
                <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                  Forgot Password
                </h1>
                <p className="text-gray-500 text-center text-base font-medium leading-6">
                  Enter your email address to receive a reset code
                </p>
              </div>

              <input
                {...register('email')}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Email address"
              />
              {errors.email && (
                <p className="mt-1 text-jaffa-500">{errors.email.message}</p>
              )}

              <button
                type="submit"
                className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-jaffa-800 transition-all duration-700 bg-jaffa-600 shadow-sm mb-11"
              >
                Send Reset Code
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
