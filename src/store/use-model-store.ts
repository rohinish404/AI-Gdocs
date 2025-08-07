import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_MODEL, getModelById, type AIModel } from "@/config/models";

interface ModelStore {
  selectedModel: string;
  isAutoMode: boolean;
  setSelectedModel: (modelId: string) => void;
  setAutoMode: (auto: boolean) => void;
  getSelectedModel: () => AIModel | undefined;
}

export const useModelStore = create<ModelStore>()(
  persist(
    (set, get) => ({
      selectedModel: DEFAULT_MODEL,
      isAutoMode: true,
      setSelectedModel: (modelId: string) => {
        set({ selectedModel: modelId, isAutoMode: false });
      },
      setAutoMode: (auto: boolean) => {
        set({ 
          isAutoMode: auto,
          selectedModel: auto ? DEFAULT_MODEL : get().selectedModel
        });
      },
      getSelectedModel: () => {
        const state = get();
        return getModelById(state.selectedModel);
      },
    }),
    {
      name: "model-selection-store",
      partialize: (state) => ({
        selectedModel: state.selectedModel,
        isAutoMode: state.isAutoMode,
      }),
    }
  )
);