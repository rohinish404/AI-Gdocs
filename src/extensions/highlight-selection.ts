import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

// Define the shape of our plugin's state
interface HighlightRange {
  id: string;
  from: number;
  to: number;
}

interface HighlightSelectionState {
  highlights: HighlightRange[];
}

// Define commands that will be available on the editor
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    highlightSelection: {
      setHighlightDecoration: (range: {
        id: string;
        from: number;
        to: number;
      }) => ReturnType;
      removeHighlightDecoration: (id: string) => ReturnType;
      clearHighlightDecoration: () => ReturnType;
    };
  }
}

export const HighlightSelectionExtension = Extension.create({
  name: "highlightSelection",

  addCommands() {
    return {
      setHighlightDecoration:
        (range) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta("highlight", { 
              type: "add",
              highlight: { id: range.id, from: range.from, to: range.to }
            });
            dispatch(tr);
          }
          return true;
        },
      removeHighlightDecoration:
        (id) =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta("highlight", { type: "remove", id });
            dispatch(tr);
          }
          return true;
        },
      clearHighlightDecoration:
        () =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta("highlight", { type: "clear" });
            dispatch(tr);
          }
          return true;
        },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("highlightSelection"),
        state: {
          init(): HighlightSelectionState {
            return { highlights: [] };
          },
          // This function updates the plugin's state based on transactions
          apply(tr, oldState): HighlightSelectionState {
            const meta = tr.getMeta("highlight");
            if (meta !== undefined) {
              if (meta.type === "add") {
                // Add new highlight, avoiding duplicates
                const existingIndex = oldState.highlights.findIndex(h => h.id === meta.highlight.id);
                if (existingIndex >= 0) {
                  // Update existing highlight
                  const newHighlights = [...oldState.highlights];
                  newHighlights[existingIndex] = meta.highlight;
                  return { highlights: newHighlights };
                } else {
                  // Add new highlight
                  return { highlights: [...oldState.highlights, meta.highlight] };
                }
              } else if (meta.type === "remove") {
                // Remove highlight by id
                return { 
                  highlights: oldState.highlights.filter(h => h.id !== meta.id)
                };
              } else if (meta.type === "clear") {
                // Clear all highlights
                return { highlights: [] };
              }
            }
            return oldState;
          },
        },
        props: {
          // This function renders the decorations based on the plugin's state
          decorations(state) {
            const pluginState: HighlightSelectionState = this.getState(state);
            if (pluginState.highlights.length > 0) {
              const decorations = pluginState.highlights.map((highlight, index) => {
                // Use different classes for different highlights to allow different colors
                const colorClass = `fake-selection-highlight-${(index % 5) + 1}`;
                return Decoration.inline(highlight.from, highlight.to, {
                  class: `fake-selection-highlight ${colorClass}`,
                  "data-highlight-id": highlight.id,
                });
              });
              return DecorationSet.create(state.doc, decorations);
            }
            return DecorationSet.empty;
          },
        },
      }),
    ];
  },
});
