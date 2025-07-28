"use client";

import { useEditor, EditorContent } from "@tiptap/react";
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
import { BubbleMenu } from "@tiptap/react";
import { DOMSerializer } from "prosemirror-model";

import { Button } from "@/components/ui/button";
import { MessageSquareIcon } from "lucide-react";

import { useEditorStore } from "@/store/use-editor-store";
import { useAiSidebarStore } from "@/store/use-aisidebar-store";
import { FontSizeExtension } from "@/extensions/font-size";

import { Ruler } from "./ruler";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margins";

interface EditorProps {
  initialContent?: string | undefined;
}
export const Editor = ({ initialContent }: EditorProps) => {
  const { setEditor } = useEditorStore();
  const { open: openAiSidebar } = useAiSidebarStore();

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
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
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
    ],
    content: initialContent,
  });

  const handleAiButtonClick = () => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    const slice = editor.state.doc.slice(from, to);

    const serializer = DOMSerializer.fromSchema(editor.schema);
    const tempDiv = document.createElement("div");
    tempDiv.appendChild(serializer.serializeFragment(slice.content));

    const htmlContent = tempDiv.innerHTML;

    openAiSidebar(htmlContent, { from, to });
  };

  return (
    <div className="size-full overflow-x-auto bg-secondary px-4 print:p-0 print:bg-white print:pverflow-visible">
      <Ruler />
      <div className="min-w-max justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        {editor && (
          <BubbleMenu
            editor={editor}
            tippyOptions={{ duration: 100 }}
            shouldShow={({ state }) => {
              const { from, to } = state.selection;
              const isTextSelected = from !== to;
              return isTextSelected && !useAiSidebarStore.getState().isOpen;
            }}
          >
            <Button
              onClick={handleAiButtonClick}
              variant="ghost"
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground gap-x-2"
            >
              <MessageSquareIcon className="size-4" />
              Chat
            </Button>
          </BubbleMenu>
        )}
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
