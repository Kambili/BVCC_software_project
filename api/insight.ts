import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const schema = z.object({
  summary: z.string(),
  anomalies: z.array(z.string()),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const { object } = await generateObject({
      model: openai("gpt-4o-mini"),
      schema,
      prompt,
    });

    return res.status(200).json({
      summary: object.summary,
      anomalies: object.anomalies
    });
  } catch (error) {
    console.error("AI insight call failed:", error);
    return res.status(500).json({ error: "AI call failed" });
  }
}
