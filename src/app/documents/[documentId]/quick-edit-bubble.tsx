"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { toast } from "sonner";
import { LoaderIcon, CornerDownLeftIcon } from "lucide-react";
import { type Editor as EditorClass } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../convex/_generated/api";
import { ModelSelector } from "@/components/model-selector";
import { useModelStore } from "@/store/use-model-store";
interface QuickEditBubbleProps {
  editor: EditorClass;
  contextText: string;
  selectionRange: { from: number; to: number };
  onClose: () => void;
}
export const QuickEditBubble = ({
  editor,
  contextText,
  selectionRange,
  onClose,
}: QuickEditBubbleProps) => {
  const generate = useAction(api.ai.generate);
  const { selectedModel } = useModelStore();
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || !selectionRange || !contextText) {
      toast.error("A selection and prompt are required.");
      return;
    }
    setIsLoading(true);
    try {
      const result = await generate({
        prompt: prompt.trim(),
        contextText: contextText,
        model: selectedModel,
      });
      if (result && result.content) {
        editor
          .chain()
          .focus()
          .deleteRange(selectionRange)
          .setSuggestion({
            originalContent: contextText,
            suggestedContent: result.content,
          })
          .run();
        onClose(); // This will hide the bubble menu
      } else {
        toast.error("Failed to get a valid response from AI.");
      }
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error(
        "An error occurred while generating content. See console for details.",
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md min-w-[600px]">
      <div className="flex items-center justify-between px-2 py-1 border-b">
        <span className="text-xs text-muted-foreground">Edit selected code</span>
        <ModelSelector variant="ghost" size="sm" />
      </div>
      <form onSubmit={handleGenerate} className="flex items-center gap-1">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Fix spelling'"
          className="h-15 p-2 border-none bg-transparent focus-visible:ring-0"
          autoFocus
          disabled={isLoading}
        />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="size-7"
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? (
            <LoaderIcon className="size-4 animate-spin" />
          ) : (
            <CornerDownLeftIcon className="size-4" />
          )}
        </Button>
      </form>
    </div>
  );
};
