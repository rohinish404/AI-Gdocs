import { create } from "zustand";

interface AiSidebarState {
  isOpen: boolean;
  contextText: string;
  selectionRange: { from: number; to: number } | null;
  toggle: () => void;
  setContext: (text: string, range: { from: number; to: number }) => void;
  clearContext: () => void;
}

export const useAiSidebarStore = create<AiSidebarState>((set) => ({
  isOpen: true, // Open by default
  contextText: "",
  selectionRange: null,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setContext: (contextText, selectionRange) =>
    set({ contextText, selectionRange }),
  clearContext: () => set({ contextText: "", selectionRange: null }),
}));
