"use client";

import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";
import { useParams } from "next/navigation";
import MarkdownIt from "markdown-it";

const client = generateClient<Schema>({
  authMode: 'apiKey',
});
const mdParser = new MarkdownIt();

const BootcampByIdPage = () => {
  const { id } = useParams<{ id: string }>();
  const [bootcamp, setBootcamp] = useState<Schema["Bootcamp"]["type"] | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  useEffect(() => {
    const fetchBootcamp = async () => {
      try {
        const { data: item, errors } = await client.models.Bootcamp.get({ id });

        if (item) {
          setBootcamp(item);
        }

        if (errors) {
          console.error(errors);
        }
      } catch (error) {
        console.error("Error fetching bootcamp:", error);
      }
    };

    fetchBootcamp();
  }, [id]);

  return (
    <div>
      {bootcamp && (
        <div className="max-w-4xl mx-auto pt-16 p-7">
          <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-8">
            {bootcamp.title}
          </h1>
          <div className="tabs">
            <button onClick={() => setActiveTab("details")} className={`tab ${activeTab === "details" ? "active" : ""}`}>
              Details
            </button>
            <button onClick={() => setActiveTab("curriculum")} className={`tab ${activeTab === "curriculum" ? "active" : ""}`}>
              Curriculum
            </button>
          </div>
          {activeTab === "details" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Description</h2>
                <p className="text-gray-900">{bootcamp.description}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Duration</h2>
                <p className="text-gray-900">{bootcamp.duration}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Timezone</h2>
                <p className="text-gray-900">{bootcamp.timezone}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Country</h2>
                <p className="text-gray-900">{bootcamp.country}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Max Headcount</h2>
                <p className="text-gray-900">{bootcamp.maxHeadcount}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Level</h2>
                <p className="text-gray-900">{bootcamp.level}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Schedule</h2>
                <p className="text-gray-900">{bootcamp.schedule}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Prerequisites</h2>
                <p className="text-gray-900">{bootcamp.prerequisites}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Instructors</h2>
                <p className="text-gray-900">{bootcamp.instructors}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Learning Outcomes</h2>
                <p className="text-gray-900">{bootcamp.learningOutcomes}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Tools and Resources</h2>
                <p className="text-gray-900">{bootcamp.tools}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Format</h2>
                <p className="text-gray-900">{bootcamp.format}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Registration Process</h2>
                <p className="text-gray-900">{bootcamp.registration}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Support and Communication</h2>
                <p className="text-gray-900">{bootcamp.support}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Assessment and Certification</h2>
                <p className="text-gray-900">{bootcamp.assessment}</p>
              </div>
              <div>
                <h2 className="text-gray-700 text-xl font-semibold">Feedback and Improvement Process</h2>
                <p className="text-gray-900">{bootcamp.feedback}</p>
              </div>
            </div>
          )}
          {activeTab === "curriculum" && (
            <div className="markdown-body" dangerouslySetInnerHTML={{ __html: mdParser.render(bootcamp.curriculum || '') }}></div>
          )}
        </div>
      )}
    </div>
  );
};

export default BootcampByIdPage;
