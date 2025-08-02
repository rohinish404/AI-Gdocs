"use client";
import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { toast } from "sonner";
import { LoaderIcon, SparklesIcon } from "lucide-react";
import { useAiSidebarStore } from "@/store/use-aisidebar-store";
import { useEditorStore } from "@/store/use-editor-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "../../../../convex/_generated/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const AiSidebar = () => {
  const { contextText, selectionRange, clearContext } = useAiSidebarStore();
  const { editor } = useEditorStore();
  const generate = useAction(api.ai.generate);

  const [prompt, setPrompt] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // When contextText is cleared, also clear prompt.
    if (!contextText) {
      setPrompt("");
    }
  }, [contextText]);

  const handleGenerate = async () => {
    if (!prompt.trim() || !editor || !selectionRange || !contextText) {
      toast.error("An editor instance, selection, and context are required.");
      return;
    }

    setIsLoading(true);
    setExplanation("");

    try {
      const result = await generate({
        prompt: prompt.trim(),
        contextText: contextText,
      });

      if (result && result.content && result.explanation) {
        editor
          .chain()
          .focus()
          .deleteRange(selectionRange)
          .setSuggestion({
            originalContent: contextText,
            suggestedContent: result.content,
          })
          .run();

        setExplanation(result.explanation);
        clearContext();
        setPrompt("");
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleGenerate();
    }
  };

  return (
    <div className="p-0 flex flex-col h-full bg-background">
      <div className="p-4 border-b flex-shrink-0">
        <h2 className="flex items-center gap-x-2 font-semibold">
          <SparklesIcon className="size-5 text-primary" />
          AI Assistant
        </h2>
      </div>

      <ScrollArea className="flex-1 h-0">
        <div className="p-4 space-y-4">
          {contextText ? (
            <div>
              <h3 className="text-sm font-semibold mb-2">Selected Context</h3>
              <div
                className="text-sm text-muted-foreground bg-muted p-3 rounded-md border max-h-48 overflow-y-auto tiptap"
                dangerouslySetInnerHTML={{ __html: contextText }}
              />
            </div>
          ) : (
            <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md border text-center">
              Select text in the editor to use the AI Assistant.
            </div>
          )}

          <div>
            <h3 className="text-sm font-semibold mb-2">Your Prompt</h3>
            <Textarea
              placeholder="e.g., 'Fix spelling and grammar', 'Rewrite this professionally', 'Summarize this text'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              className="resize-none"
              disabled={!contextText || isLoading}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Press Ctrl+Enter (Cmd+Enter on Mac) to generate
            </p>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isLoading || !prompt.trim() || !contextText}
            className="w-full"
          >
            {isLoading && <LoaderIcon className="size-4 mr-2 animate-spin" />}
            {isLoading ? "Generating..." : "Generate & Show Diff"}
          </Button>

          {explanation && (
            <div>
              <Separator className="my-4" />
              <h3 className="text-sm font-semibold mb-2">Explanation</h3>
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md border">
                {explanation}
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
