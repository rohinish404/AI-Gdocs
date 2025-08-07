export interface AIModel {
  id: string;
  name: string;
  provider: string;
  description: string;
  maxTokens: number;
  supportsJson: boolean;
}

export const AI_MODELS: AIModel[] = [
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    description: "Latest GPT-4 with improved capabilities",
    maxTokens: 128000,
    supportsJson: true,
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai", 
    description: "GPT-4 optimized for conversation",
    maxTokens: 128000,
    supportsJson: true,
  },
  {
    id: "gpt-3.5-turbo",
    name: "GPT-3.5 Turbo",
    provider: "openai",
    description: "Fast and cost-effective GPT model",
    maxTokens: 16385,
    supportsJson: true,
  },
  {
    id: "claude-3-5-sonnet-20241022",
    name: "Claude 3.5 Sonnet",
    provider: "anthropic",
    description: "Anthropic's most capable model",
    maxTokens: 200000,
    supportsJson: true,
  },
  {
    id: "claude-3-haiku-20240307",
    name: "Claude 3 Haiku",
    provider: "anthropic",
    description: "Fast and cost-effective Claude model",
    maxTokens: 200000,
    supportsJson: true,
  },
  {
    id: "gemini-1.5-pro-latest",
    name: "Gemini 1.5 Pro",
    provider: "google",
    description: "Google's advanced multimodal model",
    maxTokens: 2000000,
    supportsJson: true,
  },
  {
    id: "gemini-1.5-flash-latest",
    name: "Gemini 1.5 Flash",
    provider: "google",
    description: "Fast and efficient Gemini model",
    maxTokens: 1000000,
    supportsJson: true,
  },
  {
    id: "moonshotai/kimi-k2-instruct",
    name: "Kimi K2 Instruct",
    provider: "groq",
    description: "Default model via Groq (current)",
    maxTokens: 128000,
    supportsJson: true,
  },
];

export const DEFAULT_MODEL = "moonshotai/kimi-k2-instruct";

export const getModelById = (id: string): AIModel | undefined => {
  return AI_MODELS.find(model => model.id === id);
};

export const getModelsByProvider = (provider: string): AIModel[] => {
  return AI_MODELS.filter(model => model.provider === provider);
};