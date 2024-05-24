import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath } from "next/cache";
import { cookiesClient } from "@/utils/amplify-utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title } = req.body;

    try {
      await cookiesClient.models.Todo.create({
        content: title,
        done: false,
        priority: "medium",
      });

      revalidatePath("/");
      res.status(200).json({ message: "Todo added successfully" });
    } catch (error) {
      console.error("Error adding todo:", error);
      res.status(500).json({ error: "Error adding todo" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
