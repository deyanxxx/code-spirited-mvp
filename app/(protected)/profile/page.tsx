/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  fetchUserAttributes,
  updateUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth";
import { uploadData, getUrl } from "aws-amplify/storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define validation schema using Zod
const schema = z.object({
  email: z.string().email("Invalid email address"),
  fullName: z.string().min(2, "Full name is required"),
  preferredUsername: z.string().min(2, "Preferred username is required"),
  gender: z.enum(["Male", "Female", "Other"]),
});

const ProfilePage = () => {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<any>(
    "/profile-blank.png"
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const loadUserAttributes = async () => {
      try {
        const attributes = await fetchUserAttributes();
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        console.log(currentUser, attributes);
        if (attributes) {
          setValue("email", attributes.email || "");
          setValue("fullName", attributes.name || "");
          setValue("preferredUsername", attributes.preferred_username || "");
          setValue("gender", attributes.gender || "");
          setProfilePictureUrl(attributes.picture || "/profile-blank.png");
        }
      } catch (error) {
        console.error("Error fetching user attributes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserAttributes();
  }, [setValue]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (file) {
      try {
        const uploadTask = await uploadData({
          path: `media/profile-pictures/${user.userId}/pic.png`,
          data: file,
        });

        try {
          await uploadTask.result;
          const fileURL = await getUrl({
            path: `media/profile-pictures/${user.userId}/pic.png`,
          });
          setProfilePictureUrl(fileURL.url.href);

          await updateUserAttributes({
            userAttributes: {
              picture: fileURL.url.href,
            },
          });

          toast.success("Profile picture uploaded successfully!");
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error("Error uploading file. Please try again.");
      }
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const { fullName, preferredUsername, gender } = data;
      await updateUserAttributes({
        userAttributes: {
          name: fullName,
          preferred_username: preferredUsername,
          gender,
        },
      });

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error updating profile. Please try again.");
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="lg:p-11 p-7 mx-auto">
          <div className="mb-11">
            <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
              Edit Profile
            </h1>
            <p className="text-gray-500 text-center text-base font-medium leading-6">
              Update your profile details
            </p>
          </div>

          {loading ? (
            <p className="pb-3">Loading...</p>
          ) : (
            <>
              <div className="mb-6 flex justify-center">
                <img
                  src={profilePictureUrl}
                  alt="Profile Picture"
                  className="w-24 h-24 rounded-full"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="profilePicture"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Profile Picture
                </label>
                <input
                  id="profilePicture"
                  name="profilePicture"
                  type="file"
                  accept="image/png"
                  onChange={handleFileChange}
                  className="w-full text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
                />
                <button
                  type="button"
                  onClick={handleFileUpload}
                  className="mt-2 w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-jaffa-800 transition-all duration-700 bg-jaffa-600 shadow-sm"
                >
                  Upload Picture
                </button>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email Address
                </label>
                <input
                  {...register("email")}
                  id="email"
                  name="email"
                  type="email"
                  readOnly
                  className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4 bg-gray-100 cursor-not-allowed"
                />
                {errors.email && (
                  <p className="mt-1 text-red-500">
                    {(errors.email as any).message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="preferredUsername"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Preferred Username
                </label>
                <input
                  {...register("preferredUsername")}
                  id="preferredUsername"
                  name="preferredUsername"
                  type="text"
                  required
                  className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
                />
                {errors.preferredUsername && (
                  <p className="mt-1 text-red-500">
                    {(errors.preferredUsername as any).message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="fullName"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Full Name
                </label>
                <input
                  {...register("fullName")}
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
                />
                {errors.fullName && (
                  <p className="mt-1 text-red-500">
                    {(errors.fullName as any).message}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="gender"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Gender
                </label>
                <select
                  {...register("gender")}
                  id="gender"
                  name="gender"
                  required
                  className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-red-500">
                    {(errors.gender as any).message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-jaffa-800 transition-all duration-700 bg-jaffa-600 shadow-sm mb-11"
              >
                Update Profile
              </button>
            </>
          )}
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default ProfilePage;
