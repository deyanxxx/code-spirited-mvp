'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { confirmResetPassword } from 'aws-amplify/auth';
import { z } from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from 'next/image';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  code: z.string().min(6, 'Verification code must be at least 6 characters long'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters long'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters long'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type IFormInput = z.infer<typeof schema>;

const ResetPassword = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IFormInput>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';

  useEffect(() => {
    setValue('email', email);
  }, [email, setValue]);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await confirmResetPassword({
        username: data.email,
        confirmationCode: data.code,
        newPassword: data.newPassword,
      });
      toast.success('Password reset successfully! Redirecting to login page...');
      setTimeout(() => router.push('/login'), 2000);
    } catch (error: any) {
      toast.error('Error resetting password. Please try again.');
      console.error('Error resetting password:', error);
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
                  Reset Password
                </h1>
                <p className="text-gray-500 text-center text-base font-medium leading-6">
                  Enter the verification code and your new password
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

              <input
                {...register('code')}
                id="code"
                name="code"
                type="text"
                autoComplete="off"
                required
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Verification Code"
              />
              {errors.code && (
                <p className="mt-1 text-jaffa-500">{errors.code.message}</p>
              )}

              <input
                {...register('newPassword')}
                id="newPassword"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="New Password"
              />
              {errors.newPassword && (
                <p className="mt-1 text-jaffa-500">{errors.newPassword.message}</p>
              )}

              <input
                {...register('confirmPassword')}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                placeholder="Confirm New Password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-jaffa-500">{errors.confirmPassword.message}</p>
              )}

              <button
                type="submit"
                className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-jaffa-800 transition-all duration-700 bg-jaffa-600 shadow-sm mb-11"
              >
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default ResetPassword;
