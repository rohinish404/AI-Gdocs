"use client";

import { Preloaded, usePreloadedQuery } from "convex/react";
import { Editor } from "./editor";
import { Navbar } from "./navbar";
import { Toolbar } from "./toolbar";
import { api } from "../../../../convex/_generated/api";
import { AiSidebar } from "./ai-sidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useAiSidebarStore } from "@/store/use-aisidebar-store";
import { ImperativePanelGroupHandle } from "react-resizable-panels";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface DocumentProps {
  preloadedDocument: Preloaded<typeof api.documents.getById>;
}

export const Document = ({ preloadedDocument }: DocumentProps) => {
  const document = usePreloadedQuery(preloadedDocument);
  const { isOpen, toggle: toggleAiSidebar } = useAiSidebarStore();
  const panelGroupRef = useRef<ImperativePanelGroupHandle>(null);

  useEffect(() => {
    const panelGroup = panelGroupRef.current;
    if (panelGroup) {
      const panels = panelGroup.getLayout();
      if (panels.length > 1) {
        if (isOpen && panels[1] < 10) {
          panelGroup.setLayout([65, 35]);
        } else if (!isOpen && panels[1] > 0) {
          panelGroup.setLayout([100, 0]);
        }
      }
    }
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-secondary">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-secondary print:hidden">
        <Navbar data={document} />
        <Toolbar />
      </div>

      <div className="fixed top-[114px] bottom-0 left-0 right-0 print:static print:top-0 print:pt-0">
        <ResizablePanelGroup
          ref={panelGroupRef}
          direction="horizontal"
          className="h-full"
        >
          <ResizablePanel
            defaultSize={65}
            minSize={30}
            className="overflow-y-auto"
          >
            <Editor
              documentId={document._id}
              initialContent={document.initialContent}
            />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel
            defaultSize={35}
            collapsible
            collapsedSize={0}
            minSize={20}
            maxSize={40}
            onCollapse={() => {
              if (isOpen) {
                toggleAiSidebar();
              }
            }}
            onExpand={() => {
              if (!isOpen) {
                toggleAiSidebar();
              }
            }}
          >
            <AiSidebar />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
