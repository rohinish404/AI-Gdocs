import { Node, mergeAttributes } from "@tiptap/react";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { SuggestionDiff } from "@/components/suggestion-diff";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    suggestionNode: {
      setSuggestion: (attributes: {
        originalContent: string;
        suggestedContent: string;
      }) => ReturnType;
    };
  }
}

export const SuggestionNode = Node.create({
  name: "suggestionNode",
  group: "block",
  atom: true, // This makes the node behave like a single unit and not directly editable.

  addAttributes() {
    return {
      originalContent: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-original-content"),
        renderHTML: (attributes) => ({
          "data-original-content": attributes.originalContent,
        }),
      },
      suggestedContent: {
        default: "",
        parseHTML: (element) => element.getAttribute("data-suggested-content"),
        renderHTML: (attributes) => ({
          "data-suggested-content": attributes.suggestedContent,
        }),
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "div[data-suggestion-node]",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-suggestion-node": "" }),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(SuggestionDiff);
  },

  addCommands() {
    return {
      setSuggestion:
        (attributes) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: attributes,
          });
        },
    };
  },
});
