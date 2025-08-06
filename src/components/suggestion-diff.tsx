import React from "react";
import { NodeViewWrapper, NodeViewProps } from "@tiptap/react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export const SuggestionDiff = (props: NodeViewProps) => {
  const { node, getPos, editor } = props;
  const { originalContent, suggestedContent } = node.attrs;

  const handleAccept = () => {
    const from = getPos();
    const to = from + node.nodeSize;
    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .insertContentAt(from, suggestedContent)
      .run();
  };

  const handleReject = () => {
    const from = getPos();
    const to = from + node.nodeSize;
    editor
      .chain()
      .focus()
      .deleteRange({ from, to })
      .insertContentAt(from, originalContent)
      .run();
  };

  return (
    <NodeViewWrapper className="suggestion-node my-4 p-4 border rounded-lg bg-muted/50 transition-colors hover:bg-muted/70">
      <div className="flex flex-col gap-4">
        {/* Header with diff identifier */}
        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
            AI Suggestion
          </div>
          <div className="text-xs text-muted-foreground">
            Accept or reject this change
          </div>
        </div>

        {/* Original Content Panel */}
        <div>
          <h4 className="text-xs font-semibold mb-2 text-destructive/80">
            BEFORE
          </h4>
          <div className="p-3 rounded-md border border-destructive/20 bg-destructive/5">
            <div
              className="tiptap text-sm prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{
                __html: originalContent || "<p>Nothing was selected.</p>",
              }}
            />
          </div>
        </div>

        <Separator />

        {/* Suggested Content Panel */}
        <div>
          <h4 className="text-xs font-semibold mb-2 text-green-600 dark:text-green-500">
            AFTER (AI SUGGESTION)
          </h4>
          <div className="p-3 rounded-md border border-green-600/20 bg-green-600/5">
            <div
              className="tiptap text-sm prose dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: suggestedContent }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" size="sm" onClick={handleReject}>
          Reject
        </Button>
        <Button
          size="sm"
          onClick={handleAccept}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Accept
        </Button>
      </div>
    </NodeViewWrapper>
  );
};
