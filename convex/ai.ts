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
    contextText: v.string(),
    prompt: v.string(),
    // We'll keep this simple for now, but you can pass the model from the frontend
  },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) {
      throw new Error("Not authenticated");
    }

    const response = await openai.chat.completions.create({
      model: "moonshotai/kimi-k2-instruct",
      messages: [
        {
          role: "system",
          content: `You are a writing assistant. A user has selected the following text from their document: "${args.contextText}". Please follow the user's instructions to modify this text.`,
        },
        {
          role: "user",
          content: args.prompt,
        },
      ],
    });

    const newContent = response.choices[0].message.content;

    return newContent;
  },
});
