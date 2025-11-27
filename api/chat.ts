import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { prompt, dataContext } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const systemPrompt = `You are a data analysis assistant. Answer questions about the user's dataset.

Dataset Context:
${dataContext || "No dataset context provided"}

Provide clear, helpful answers with emojis and formatting.`;

    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      system: systemPrompt,
      prompt: prompt,
    });

    return res.status(200).json({ response: text });
  } catch (error) {
    console.error("Chat AI call failed:", error);
    return res.status(500).json({ error: "Chat AI call failed" });
  }
}
