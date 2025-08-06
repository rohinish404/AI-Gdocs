"use client";
import { useState } from "react";
import { useAction } from "convex/react";
import { toast } from "sonner";
import {
  LoaderIcon,
  CornerDownLeftIcon,
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";
import { type Editor as EditorClass } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "../../../../convex/_generated/api";

interface QuickEditSelection {
  id: string;
  contextText: string;
  range: { from: number; to: number };
  filename?: string;
}

interface MultiQuickEditBubbleProps {
  editor: EditorClass;
  selections: QuickEditSelection[];
  onClose: () => void;
  onRemoveSelection: (id: string) => void;
}

export const MultiQuickEditBubble = ({
  editor,
  selections,
  onClose,
  onRemoveSelection,
}: MultiQuickEditBubbleProps) => {
  const generate = useAction(api.ai.generate);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSelections, setExpandedSelections] = useState<Set<string>>(
    new Set(),
  );

  const toggleSelectionExpanded = (selectionId: string) => {
    setExpandedSelections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(selectionId)) {
        newSet.delete(selectionId);
      } else {
        newSet.add(selectionId);
      }
      return newSet;
    });
  };

  const handleGenerate = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!prompt.trim() || selections.length === 0) {
      toast.error("A selection and prompt are required.");
      return;
    }

    setIsLoading(true);
    try {
      // Process each selection individually to get personalized AI responses
      const results = await Promise.all(
        selections.map(async (selection) => {
          const result = await generate({
            prompt: prompt.trim(),
            contextText: selection.contextText,
          });
          return { selection, result };
        }),
      );

      // Sort results by position from end to beginning to avoid range shift issues
      const sortedResults = results.sort(
        (a, b) => b.selection.range.from - a.selection.range.from,
      );

      // Create a single transaction to apply all changes at once
      const tr = editor.state.tr;
      let hasErrors = false;

      // Apply changes from end to beginning to maintain position integrity
      for (const { selection, result } of sortedResults) {
        if (result && result.content) {
          // Calculate the position for this suggestion node
          const { from, to } = selection.range;

          // Delete the original content
          tr.delete(from, to);

          // Insert the suggestion node at the same position
          const suggestionNode = editor.schema.nodes.suggestionNode.create({
            originalContent: selection.contextText,
            suggestedContent: result.content,
          });

          tr.insert(from, suggestionNode);
        } else {
          hasErrors = true;
          console.error(
            "Failed to get valid response for selection:",
            selection.id,
          );
        }
      }

      // Apply the transaction if there are any changes
      if (!tr.steps.length && hasErrors) {
        toast.error(
          "All selections failed to process. Check console for details.",
        );
      } else {
        // Dispatch the transaction
        editor.view.dispatch(tr);

        if (hasErrors) {
          toast.error(
            "Some selections failed to process. Check console for details.",
          );
        } else {
          toast.success(
            `Successfully created ${sortedResults.length} diffs. Accept or reject each individually.`,
          );
        }
      }

      onClose();
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
    <div className="rounded-lg border bg-popover text-popover-foreground shadow-md min-w-[600px]">
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Text selections ({selections.length})
          </span>
        </div>
      </div>

      {/* Individual collapsible selections */}
      <div className="border-b max-h-80 overflow-y-auto">
        <div className="space-y-1 p-2">
          {selections.map((selection, index) => {
            const isExpanded = expandedSelections.has(selection.id);
            const previewText = selection.contextText
              .replace(/<[^>]*>/g, "")
              .trim();
            const colorClass = `fake-selection-highlight-${(index % 5) + 1}`;

            return (
              <div key={selection.id} className="rounded border bg-muted/30">
                {/* Selection header */}
                <div className="flex items-center gap-2 p-2">
                  <Button
                    onClick={() => toggleSelectionExpanded(selection.id)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 flex-shrink-0"
                  >
                    {isExpanded ? (
                      <ChevronUpIcon className="h-3 w-3" />
                    ) : (
                      <ChevronDownIcon className="h-3 w-3" />
                    )}
                  </Button>

                  <div
                    className={`w-3 h-3 rounded-sm ${colorClass} flex-shrink-0`}
                  />

                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium truncate">
                      {selection.filename || "document"}
                    </div>
                    {!isExpanded && (
                      <div className="text-xs text-muted-foreground truncate">
                        {previewText.substring(0, 50)}
                        {previewText.length > 50 ? "..." : ""}
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => onRemoveSelection(selection.id)}
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 flex-shrink-0"
                  >
                    <XIcon className="h-3 w-3" />
                  </Button>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-2 pb-2">
                    <div className="text-muted-foreground bg-muted/30 p-2 rounded text-xs font-mono whitespace-pre-wrap break-words max-h-32 overflow-y-auto">
                      {previewText}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Input form */}
      <form onSubmit={handleGenerate} className="flex items-center gap-1 p-1">
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
