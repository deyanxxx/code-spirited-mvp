/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/label-has-associated-control */

"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateClient } from "aws-amplify/data";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MarkdownIt from "markdown-it";
import { Schema } from "@/amplify/data/resource";

const mdParser = new MarkdownIt(/* Markdown-it options */);
const client = generateClient<Schema>();

// Define validation schema using Zod
const schema = z.object({
  title: z.string().min(2, "Title is required"),
  description: z.string().min(10, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
  timezone: z.string().min(1, "Timezone is required"),
  country: z.string().min(1, "Country is required"),
  maxHeadcount: z.number().min(1, "Max headcount must be at least 1"),
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  schedule: z.string().min(1, "Schedule is required"),
  prerequisites: z.string().min(10, "Prerequisites are required"),
  instructors: z.string().min(10, "Instructors' information is required"),
  learningOutcomes: z.string().min(10, "Learning outcomes are required"),
  tools: z.string().min(10, "Tools and resources are required"),
  format: z.string().min(1, "Format is required"),
  registration: z.string().min(1, "Registration process is required"),
  support: z.string().min(1, "Support and communication is required"),
  assessment: z.string().min(1, "Assessment and certification is required"),
  feedback: z.string().min(1, "Feedback and improvement process is required"),
  curriculum: z.string().min(10, "Curriculum is required"),
});

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      data.maxHeadcount = parseInt(data.maxHeadcount, 10);
      await client.models.Bootcamp.create(data);
      toast.success("Bootcamp created successfully!");
      reset();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create bootcamp.");
    }
  };

  const handleGenerateCurriculum = () => {
    const generatedContent =
      "## AI Generated Curriculum\n\n- Topic 1\n- Topic 2\n- Topic 3";
    setValue("curriculum", generatedContent);
  };

  function handleEditorChange({ html, text }: any) {
    setValue("curriculum", text);
    console.log("handleEditorChange", html, text);
  }

  return (
    <>
      <div className="max-w-4xl mx-auto pt-16">
        <form onSubmit={handleSubmit(onSubmit)} className="p-7 mx-auto">
          <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-8">
            Organize a P2P Coding Bootcamp
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Title
              </label>
              <input
                {...register("title")}
                type="text"
                placeholder="Full-Stack Web Development Bootcamp"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.title && (
                <p className="mt-1 text-red-500">
                  {(errors.title as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                placeholder="Learn the fundamentals of full-stack web development, including HTML, CSS, JavaScript, and back-end technologies."
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.description && (
                <p className="mt-1 text-red-500">
                  {(errors.description as any).message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Duration
              </label>
              <input
                {...register("duration")}
                type="text"
                placeholder="10 weeks, from July 1 to September 9"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.duration && (
                <p className="mt-1 text-red-500">
                  {(errors.duration as any).message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Timezone
              </label>
              <input
                {...register("timezone")}
                type="text"
                placeholder="GMT+8"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.timezone && (
                <p className="mt-1 text-red-500">
                  {(errors.timezone as any).message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Country
              </label>
              <input
                {...register("country")}
                type="text"
                placeholder="Philippines"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.country && (
                <p className="mt-1 text-red-500">
                  {(errors.country as any).message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Max Headcount
              </label>
              <input
                {...register("maxHeadcount", { valueAsNumber: true })}
                type="number"
                placeholder="25"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.maxHeadcount && (
                <p className="mt-1 text-red-500">
                  {(errors.maxHeadcount as any).message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Level
              </label>
              <select
                {...register("level")}
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.level && (
                <p className="mt-1 text-red-500">
                  {(errors.level as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Schedule
              </label>
              <input
                {...register("schedule")}
                type="text"
                placeholder="Sessions every Tuesday, Thursday, and Saturday from 7 PM to 10 PM"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.schedule && (
                <p className="mt-1 text-red-500">
                  {(errors.schedule as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Prerequisites
              </label>
              <textarea
                {...register("prerequisites")}
                placeholder="Basic understanding of HTML, CSS, and JavaScript"
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.prerequisites && (
                <p className="mt-1 text-red-500">
                  {(errors.prerequisites as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Instructors
              </label>
              <textarea
                {...register("instructors")}
                placeholder="Jane Doe, a senior full-stack developer with 7 years of experience in AWS and cloud technologies"
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.instructors && (
                <p className="mt-1 text-red-500">
                  {(errors.instructors as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Learning Outcomes
              </label>
              <textarea
                {...register("learningOutcomes")}
                placeholder="Ability to build, deploy, and manage a full-stack web application using AWS Amplify and other modern web technologies"
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.learningOutcomes && (
                <p className="mt-1 text-red-500">
                  {(errors.learningOutcomes as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tools and Resources
              </label>
              <textarea
                {...register("tools")}
                placeholder="VSCode, GitHub, AWS Amplify, Node.js, React, and access to an online code editor"
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.tools && (
                <p className="mt-1 text-red-500">
                  {(errors.tools as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Format
              </label>
              <input
                {...register("format")}
                type="text"
                placeholder="Online, with live coding sessions and project-based learning"
                className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-full border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.format && (
                <p className="mt-1 text-red-500">
                  {(errors.format as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Registration Process
              </label>
              <textarea
                {...register("registration")}
                placeholder="Register online by June 25, with a registration fee of $150"
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.registration && (
                <p className="mt-1 text-red-500">
                  {(errors.registration as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Support and Communication
              </label>
              <textarea
                {...register("support")}
                placeholder="Join our Slack group for continuous support and updates throughout the bootcamp"
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.support && (
                <p className="mt-1 text-red-500">
                  {(errors.support as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Assessment and Certification
              </label>
              <textarea
                {...register("assessment")}
                placeholder="Regular assessments through quizzes, coding challenges, and a final project, with a certificate of completion"
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.assessment && (
                <p className="mt-1 text-red-500">
                  {(errors.assessment as any).message}
                </p>
              )}
            </div>
            <div className="lg:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Feedback and Improvement Process
              </label>
              <textarea
                {...register("feedback")}
                placeholder="Anonymous feedback forms after each session and a final survey at the end of the bootcamp"
                className="w-full h-24 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-lg border-gray-300 border shadow-sm focus:outline-none px-4"
              />
              {errors.feedback && (
                <p className="mt-1 text-red-500">
                  {(errors.feedback as any).message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Curriculum
            </label>
            <div className="flex flex-col space-y-2">
              <MdEditor
                style={{ height: "540px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
                config={{
                  view: {
                    menu: true,
                    md: true,
                    html: false, // Disable the preview pane
                  },
                }}
              />
              <button
                type="button"
                onClick={handleGenerateCurriculum}
                className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-jaffa-800 transition-all duration-700 bg-jaffa-600 shadow-sm"
              >
                Generate Curriculum with AI
              </button>
            </div>
            {errors.curriculum && (
              <p className="mt-1 text-red-500">
                {(errors.curriculum as any).message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-full hover:bg-jaffa-800 transition-all duration-700 bg-jaffa-600 shadow-sm mt-6"
          >
            Submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default CreatePage;
