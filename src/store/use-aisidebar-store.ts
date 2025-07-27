import { create } from "zustand";

interface AiSidebarState {
  isOpen: boolean;
  contextText: string;
  selectionRange: { from: number; to: number } | null;
  open: (text: string, range: { from: number; to: number }) => void;
  close: () => void;
}

export const useAiSidebarStore = create<AiSidebarState>((set) => ({
  isOpen: false,
  contextText: "",
  selectionRange: null,
  open: (contextText, selectionRange) =>
    set({ isOpen: true, contextText, selectionRange }),
  close: () => set({ isOpen: false, contextText: "", selectionRange: null }),
}));
