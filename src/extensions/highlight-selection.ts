import { Extension } from "@tiptap/react";
import { Plugin, PluginKey } from "prosemirror-state";
import { Decoration, DecorationSet } from "prosemirror-view";

// Define the shape of our plugin's state
interface HighlightSelectionState {
  from: number | null;
  to: number | null;
}

// Define commands that will be available on the editor
declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    highlightSelection: {
      setHighlightDecoration: (range: {
        from: number;
        to: number;
      }) => ReturnType;
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
            tr.setMeta("highlight", { from: range.from, to: range.to });
            dispatch(tr);
          }
          return true;
        },
      clearHighlightDecoration:
        () =>
        ({ tr, dispatch }) => {
          if (dispatch) {
            tr.setMeta("highlight", null);
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
            return { from: null, to: null };
          },
          // This function updates the plugin's state based on transactions
          apply(tr, oldState): HighlightSelectionState {
            const meta = tr.getMeta("highlight");
            if (meta !== undefined) {
              return meta
                ? { from: meta.from, to: meta.to }
                : { from: null, to: null };
            }
            return oldState;
          },
        },
        props: {
          // This function renders the decorations based on the plugin's state
          decorations(state) {
            const pluginState: HighlightSelectionState = this.getState(state);
            if (pluginState.from !== null && pluginState.to !== null) {
              return DecorationSet.create(state.doc, [
                Decoration.inline(pluginState.from, pluginState.to, {
                  class: "fake-selection-highlight",
                }),
              ]);
            }
            return DecorationSet.empty;
          },
        },
      }),
    ];
  },
});
