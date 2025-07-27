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
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClose = () => {
    setPrompt("");
    setResponse("");
    close();
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }

    setIsLoading(true);
    setResponse("");

    try {
      const result = await generate({
        prompt: prompt.trim(),
        contextText: contextText || "",
      });

      if (result && typeof result === "string" && result.trim()) {
        setResponse(result.trim());
      } else {
        toast.error("Failed to get a valid response from AI.");
      }
    } catch (error) {
      console.error("AI generation error:", error);
      toast.error("An error occurred while generating content.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = () => {
    if (!response || !editor) {
      toast.error("No response to apply or editor not available.");
      return;
    }

    try {
      if (selectionRange) {
        // Replace selected content
        editor.chain().focus().insertContentAt(selectionRange, response).run();
      } else {
        // Insert at current cursor position
        editor.chain().focus().insertContent(response).run();
      }

      toast.success("AI suggestion applied successfully!");
      handleClose();
    } catch (error) {
      console.error("Error applying suggestion:", error);
      toast.error("Failed to apply suggestion.");
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
        className="w-[400px] sm:w-[540px] p-0 flex flex-col"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="flex items-center gap-x-2">
            <SparklesIcon className="size-5 text-primary" />
            AI Assistant
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {contextText && (
              <div>
                <h3 className="text-sm font-semibold mb-2">Selected Context</h3>
                <div className="text-sm text-muted-foreground bg-muted p-3 rounded-md border max-h-48 overflow-y-auto whitespace-pre-wrap">
                  {contextText}
                </div>
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
              {isLoading ? "Generating..." : "Generate"}
            </Button>

            {response && (
              <>
                <Separator />
                <div>
                  <h3 className="text-sm font-semibold mb-2">AI Suggestion</h3>
                  <div className="text-sm bg-muted p-3 rounded-md border max-h-64 overflow-y-auto whitespace-pre-wrap">
                    {response}
                  </div>
                </div>
                <Button
                  onClick={handleApply}
                  variant="outline"
                  className="w-full"
                  disabled={!editor}
                >
                  Apply Suggestion
                </Button>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
