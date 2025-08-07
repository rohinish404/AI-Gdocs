import { action } from "./_generated/server";
import { v } from "convex/values";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

// Response schema
const responseSchema = z.object({
  content: z.string(),
  explanation: z.string(),
});

// Provider configurations
const getProvider = (model: string) => {
  if (model.startsWith("gpt-") || model.includes("openai")) {
    return openai(model);
  }

  if (model.startsWith("claude-")) {
    return anthropic(model);
  }

  if (model.startsWith("gemini-")) {
    return google(model);
  }

  // For Groq models (including kimi), use groq provider
  return groq(model);
};

export const generate = action({
  args: {
    prompt: v.string(),
    contextText: v.string(),
    model: v.optional(v.string()),
  },
  handler: async (
    _ctx,
    { prompt, contextText, model = "moonshotai/kimi-k2-instruct" },
  ) => {
    const userMessage = `
User Prompt: "${prompt}"

Context (HTML):
\`\`\`html
${contextText}
\`\`\`
`;

    const systemMessage = `You are an expert writing assistant. Your task is to process the user's prompt based on the provided HTML context.

You MUST follow these rules:
1.  Analyze the user's prompt and the HTML context.
2.  Generate a response that fulfills the user's request, maintaining the original HTML structure and styling as much as possible.
3.  Your final output MUST be a single, valid JSON object. Do not add any text before or after the JSON object.
4.  The JSON object must have exactly two keys:
    -   "content": A string containing the new, modified, or generated HTML that should replace the original selection in the document.
    -   "explanation": A string containing a brief explanation of the changes you made or the reasoning behind your response. This explanation will be shown to the user in a separate panel and will NOT be inserted into the document.

Example:
If the user prompt is "make this bold" and the context is "<p>Hello World</p>", your response should be:
{
  "content": "<p><strong>Hello World</strong></p>",
  "explanation": "I have wrapped the text 'Hello World' in a 'strong' tag to make it bold, as requested."
}
`;

    const provider = getProvider(model);

    const { object } = await generateObject({
      model: provider,
      schema: responseSchema,
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    return object;
  },
});
