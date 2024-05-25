"use client";
import React, { useCallback, useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>({
  authMode: "apiKey",
});

const BootcampPage = () => {
  const [bootcamps, setBootcamps] = useState<any>([]);

  const fetchBootcamps = useCallback(async () => {
    const selectionSet = [
      "title",
      "description",
      "level",
      "duration",
      "maxHeadcount",
      "owner",
      "id"
    ] as const;
    const { data: items } = await client.models.Bootcamp.list({
      selectionSet,
    });

    setBootcamps(items);
  }, []);

  useEffect(() => {
    fetchBootcamps();
  }, [fetchBootcamps]);

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="space-y-8">
        {bootcamps.length > 0 ? (
          bootcamps.map((bootcamp: any, idx: number) => (
            <div
              key={idx}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {bootcamp.title}
                </h2>
                <p className="mt-4 text-gray-700">{bootcamp.description}</p>
                <div className="mt-4">
                  <span className="text-gray-600">Duration:</span>{" "}
                  <span className="text-gray-900">{bootcamp.duration}</span>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">Level:</span>{" "}
                  <span className="text-gray-900">{bootcamp.level}</span>
                </div>
                <div className="mt-2">
                  <span className="text-gray-600">Max Headcount:</span>{" "}
                  <span className="text-gray-900">{bootcamp.maxHeadcount}</span>
                </div>
                <div className="mt-4">
                  <a
                    href={`/p2p-coding-bootcamp/${bootcamp.id}`}
                    className="text-jaffa-500 hover:text-jaffa-600"
                  >
                    View Details
                  </a>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="space-y-8 min-h-screen">
              <div className="text-center">
                Loading...
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BootcampPage;
