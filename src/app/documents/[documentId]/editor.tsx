"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from "@tiptap/extension-image";
import ImageResize from "tiptap-extension-resize-image";
import FontFamily from "@tiptap/extension-font-family";
import { TextStyle } from "@tiptap/extension-text-style";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import { LineHeightExtension } from "@/extensions/line-height";
import { DOMSerializer } from "prosemirror-model";
import { Button } from "@/components/ui/button";
import { MessageSquareIcon, FilePenIcon } from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { useAiSidebarStore } from "@/store/use-aisidebar-store";
import { FontSizeExtension } from "@/extensions/font-size";
import { SuggestionNode } from "@/extensions/suggestion-node";
import { Ruler } from "./ruler";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";
import { Id } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { useSavingStore } from "@/store/use-saving-store";
import { useState } from "react";
import { MultiQuickEditBubble } from "./multi-quick-edit-bubble";
import { Separator } from "@/components/ui/separator";
import { HighlightSelectionExtension } from "@/extensions/highlight-selection";

interface EditorProps {
  documentId: Id<"documents">;
  initialContent?: string | undefined;
}

interface QuickEditSelection {
  id: string;
  contextText: string;
  range: { from: number; to: number };
  filename?: string;
}

export const Editor = ({ documentId, initialContent }: EditorProps) => {
  const { setEditor } = useEditorStore();
  const { setIsSaving } = useSavingStore();
  const { setContext: setAiContext, isOpen: isAiSidebarOpen } =
    useAiSidebarStore();

  const updateContent = useMutation(api.documents.updateById);

  // State for the quick edit functionality
  const [isQuickEditing, setIsQuickEditing] = useState(false);
  const [quickEditSelections, setQuickEditSelections] = useState<
    QuickEditSelection[]
  >([]);
  const [bubbleMenuAnchorPos, setBubbleMenuAnchorPos] =
    useState<DOMRect | null>(null);

  const debouncedUpdate = useDebounce((html: string) => {
    setIsSaving(true);
    updateContent({
      id: documentId,
      initialContent: html,
    }).finally(() => {
      setIsSaving(false);
    });
  }, 1500);

  const editor = useEditor({
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
      const html = editor.getHTML();
      debouncedUpdate(html);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left:${LEFT_MARGIN_DEFAULT}px; padding-right:${RIGHT_MARGIN_DEFAULT}px;`,
        class:
          "focus:outline-none print:border-0 bg-white dark:bg-[#1f1f1f] border-border flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },
    extensions: [
      StarterKit,
      LineHeightExtension,
      FontSizeExtension,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
      TextStyle,
      Image,
      ImageResize,
      TaskList,
      Table,
      TableCell,
      TableHeader,
      TableRow,
      Underline,
      TaskItem.configure({
        nested: true,
      }),
      SuggestionNode,
      HighlightSelectionExtension,
    ],
    content: initialContent,
  });

  const getSelectionContext = () => {
    if (!editor) return null;
    const { from, to } = editor.state.selection;
    if (from === to) return null;
    const slice = editor.state.doc.slice(from, to);

    const serializer = DOMSerializer.fromSchema(editor.schema);
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(serializer.serializeFragment(slice.content));

    const htmlContent = tempDiv.innerHTML;
    return { htmlContent, range: { from, to } };
  };

  const handleAiButtonClick = () => {
    const context = getSelectionContext();
    if (context) {
      setAiContext(context.htmlContent, context.range);
    }
  };

  const handleEditButtonClick = () => {
    const context = getSelectionContext();
    if (context && editor) {
      // Anchor the main bubble menu to the first selection's position
      if (quickEditSelections.length === 0) {
        const { from } = editor.state.selection;
        const pos = editor.view.coordsAtPos(from);
        setBubbleMenuAnchorPos(new DOMRect(pos.left, pos.top, 0, 0));
      }

      const selectionId = `selection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const newSelection: QuickEditSelection = {
        id: selectionId,
        contextText: context.htmlContent,
        range: context.range,
        filename: "document",
      };

      const exists = quickEditSelections.some(
        (s) =>
          s.range.from === context.range.from &&
          s.range.to === context.range.to,
      );

      if (!exists) {
        setQuickEditSelections((prev) => [...prev, newSelection]);
        setIsQuickEditing(true);

        editor
          .chain()
          .focus()
          .setHighlightDecoration({
            id: selectionId,
            from: context.range.from,
            to: context.range.to,
          })
          .run();
      }
    }
  };

  const closeQuickEdit = () => {
    if (isQuickEditing) {
      setIsQuickEditing(false);
      setQuickEditSelections([]);
      setBubbleMenuAnchorPos(null);
      editor?.chain().focus().clearHighlightDecoration().run();
    }
  };

  const removeSelection = (selectionId: string) => {
    const remainingSelections = quickEditSelections.filter(
      (s) => s.id !== selectionId,
    );
    setQuickEditSelections(remainingSelections);

    editor?.chain().focus().removeHighlightDecoration(selectionId).run();

    if (remainingSelections.length === 0) {
      closeQuickEdit();
    }
  };

  return (
    <div className="size-full overflow-x-auto bg-secondary px-4 print:p-0 print:bg-white print:pverflow-visible">
      <Ruler />
      <div className="min-w-max justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        {editor && (
          <>
            {/* Bubble 1: The main multi-edit input, anchored to the first selection */}
            <BubbleMenu
              editor={editor}
              tippyOptions={{
                getReferenceClientRect: () => bubbleMenuAnchorPos,
                onHidden: closeQuickEdit,
                appendTo: "parent",
              }}
              shouldShow={() =>
                isQuickEditing && quickEditSelections.length > 0
              }
            >
              <MultiQuickEditBubble
                editor={editor}
                selections={quickEditSelections}
                onClose={closeQuickEdit}
                onRemoveSelection={removeSelection}
              />
            </BubbleMenu>

            {/* Bubble 2: The action menu for making new selections */}
            <BubbleMenu
              editor={editor}
              tippyOptions={{ duration: 100, appendTo: "parent" }}
              shouldShow={({ state, editor }) => {
                const { from, to } = state.selection;
                const isTextSelected = from !== to;
                if (!isTextSelected) return false;

                // Don't show if a suggestion node is selected
                let suggestionExists = false;
                editor.state.doc.nodesBetween(from, to, (node) => {
                  if (node.type.name === "suggestionNode") {
                    suggestionExists = true;
                  }
                });
                if (suggestionExists) return false;

                return true;
              }}
            >
              <div className="flex items-center gap-1 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md">
                <Button
                  onClick={handleEditButtonClick}
                  variant="ghost"
                  size="sm"
                  className="gap-x-2"
                >
                  <FilePenIcon className="size-4" />
                  Edit
                </Button>
                {isAiSidebarOpen && (
                  <>
                    <Separator orientation="vertical" className="h-6" />
                    <Button
                      onClick={handleAiButtonClick}
                      variant="ghost"
                      size="sm"
                      className="gap-x-2"
                    >
                      <MessageSquareIcon className="size-4" />
                      Chat
                    </Button>
                  </>
                )}
              </div>
            </BubbleMenu>
          </>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
