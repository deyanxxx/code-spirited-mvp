"use client";
import React, { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>();

const BootcampPage = () => {
  const [bootcamps, setBootcamps] = useState<Schema["Bootcamp"]["type"][]>([]);

  const fetchTodos = async () => {
    const { data: items, errors } = await client.models.Bootcamp.list();
    setBootcamps(items);
    console.log(items)
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <ul>
        {bootcamps.map((bootcamp, idx) => (
          <li key={idx}>{bootcamp.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default BootcampPage;
