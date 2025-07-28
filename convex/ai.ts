import { action } from "./_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";
import { api } from "./_generated/api";

const openai = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const generate = action({
  args: {
    prompt: v.string(),
    contextText: v.string(), // This will now be HTML
  },
  handler: async (_ctx, { prompt, contextText }) => {
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

    const response = await openai.chat.completions.create({
      model: "moonshotai/kimi-k2-instruct",
      response_format: { type: "json_object" }, // Use JSON mode
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

    const responseContent = response.choices[0].message.content;

    if (!responseContent) {
      throw new Error("No response from AI");
    }

    try {
      const parsed = JSON.parse(responseContent);
      if (
        typeof parsed.content !== "string" ||
        typeof parsed.explanation !== "string"
      ) {
        throw new Error("AI response is not in the expected format.");
      }
      return parsed; // Return the parsed object
    } catch (e) {
      console.error("Failed to parse AI response:", e);
      throw new Error("AI returned invalid JSON.");
    }
  },
});
