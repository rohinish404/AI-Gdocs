"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { toast } from "sonner";
import { LoaderIcon, SparklesIcon } from "lucide-react";
import { useAiSidebarStore } from "@/store/use-aisidebar-store";
import { useEditorStore } from "@/store/use-editor-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { api } from "../../../../convex/_generated/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

export const AiSidebar = () => {
  const { isOpen, close, contextText, selectionRange } = useAiSidebarStore();
  const { editor } = useEditorStore();
  const generate = useAction(api.ai.generate);

  const [prompt, setPrompt] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setPrompt("");
    setExplanation("");
    close();
  };

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
        // Replace the selection with our new suggestion node
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
        // We can close the sidebar now, as the interaction is in the editor
        handleClose();
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
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-[400px] sm:w-[540px] p-0 flex flex-col h-full"
      >
        <SheetHeader className="p-4 border-b flex-shrink-0">
          <SheetTitle className="flex items-center gap-x-2">
            <SparklesIcon className="size-5 text-primary" />
            AI Assistant
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 h-0">
          <div className="p-4 space-y-4">
            {contextText && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Selected Context</h3>
                <div
                  className="text-sm text-muted-foreground bg-muted p-3 rounded-md border max-h-48 overflow-y-auto tiptap"
                  dangerouslySetInnerHTML={{ __html: contextText }}
                />
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
              />
              <p className="text-xs text-muted-foreground mt-1">
                Press Ctrl+Enter (Cmd+Enter on Mac) to generate
              </p>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isLoading || !prompt.trim()}
              className="w-full"
            >
              {isLoading && <LoaderIcon className="size-4 mr-2 animate-spin" />}
              {isLoading ? "Generating..." : "Generate & Show Diff"}
            </Button>

            {/* The explanation and suggestion preview are no longer needed here */}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
