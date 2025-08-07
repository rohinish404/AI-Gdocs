"use client";

import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { createPortal } from "react-dom";
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
import { useState, useRef, useEffect } from "react";
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
  const [bubbleMenuAnchorPos, setBubbleMenuAnchorPos] = useState<{
    top: number;
    left: number;
  } | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // A ref to the container to position the quick edit bubble relative to it
  const editorContainerRef = useRef<HTMLDivElement>(null);

  // Set mounted state for client-side rendering
  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      // We no longer need to auto-close quick edit on selection change.
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

  // NEW: This function ADDS the current selection to an ACTIVE session
  const addSelectionToSession = () => {
    const context = getSelectionContext();
    if (context && editor) {
      const selectionId = `selection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newSelection: QuickEditSelection = {
        id: selectionId,
        contextText: context.htmlContent,
        range: context.range,
        filename: "document",
      };

      // Check for duplicates before adding
      const exists = quickEditSelections.some(
        (s) =>
          s.range.from === context.range.from &&
          s.range.to === context.range.to,
      );

      if (!exists) {
        setQuickEditSelections((prev) => [...prev, newSelection]);
        editor
          .chain()
          .focus()
          .setHighlightDecoration({
            id: selectionId,
            from: context.range.from,
            to: context.range.to,
          })
          // Collapse selection to the start to indicate it has been "added"
          .setTextSelection(context.range.from)
          .run();
      }
    }
  };

  // MODIFIED: This function now only STARTS a session
  const startQuickEditSession = () => {
    const context = getSelectionContext();
    if (context && editor && editorContainerRef.current) {
      const selectionId = `selection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const newSelection: QuickEditSelection = {
        id: selectionId,
        contextText: context.htmlContent,
        range: context.range,
        filename: "document",
      };

      // Get position relative to the container, not the viewport
      if (editorContainerRef.current && isMounted) {
        try {
          const containerRect = editorContainerRef.current.getBoundingClientRect();
          const pos = editor.view.coordsAtPos(context.range.from);

          setBubbleMenuAnchorPos({
            top: Math.max(0, pos.top - containerRect.top),
            left: Math.max(0, pos.left - containerRect.left),
          });
        } catch (error) {
          console.warn("Failed to calculate bubble menu position:", error);
          setBubbleMenuAnchorPos({ top: 0, left: 0 });
        }
      }

      setQuickEditSelections([newSelection]);
      setIsQuickEditing(true);

      editor
        .chain()
        .focus()
        .setHighlightDecoration({
          id: selectionId,
          from: context.range.from,
          to: context.range.to,
        })
        .setTextSelection(context.range.from) // Collapse selection
        .run();
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
    <div
      ref={editorContainerRef}
      className="relative size-full overflow-x-auto bg-secondary px-4 print:p-0 print:bg-white print:overflow-visible"
    >
      <Ruler />
      <div className="min-w-max justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        {editor && (
          <>
            {/* The "session panel" - NOT a BubbleMenu */}
            {isQuickEditing && bubbleMenuAnchorPos && isMounted &&
              editorContainerRef.current &&
              createPortal(
                <div
                  className="fixed z-50"
                  style={{
                    top: `${bubbleMenuAnchorPos.top + editorContainerRef.current.getBoundingClientRect().top}px`,
                    left: `${bubbleMenuAnchorPos.left + editorContainerRef.current.getBoundingClientRect().left}px`,
                  }}
                >
                  <MultiQuickEditBubble
                    editor={editor}
                    selections={quickEditSelections}
                    onClose={closeQuickEdit}
                    onRemoveSelection={removeSelection}
                  />
                </div>,
                document.body
              )}

            {/* The true BubbleMenu - for contextual actions */}
            <BubbleMenu
              editor={editor}
              tippyOptions={{ duration: 100, appendTo: "parent" }}
              shouldShow={({ state, editor }) => {
                const { from, to } = state.selection;
                const isTextSelected = from !== to;
                if (!isTextSelected) return false;

                let suggestionExists = false;
                editor.state.doc.nodesBetween(from, to, (node) => {
                  if (node.type.name === "suggestionNode") {
                    suggestionExists = true;
                  }
                });
                return !suggestionExists;
              }}
            >
              <div className="flex items-center gap-1 rounded-lg border bg-popover p-1 text-popover-foreground shadow-md">
                {isQuickEditing ? (
                  // If a session is active, show the "Add" button
                  <Button
                    onClick={addSelectionToSession}
                    variant="ghost"
                    size="sm"
                    className="gap-x-2"
                  >
                    <FilePenIcon className="size-4" />
                    Add Selection
                  </Button>
                ) : (
                  // Otherwise, show the default "Edit" and "Chat" buttons
                  <>
                    <Button
                      onClick={startQuickEditSession}
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
