"use client";

import { ChevronDownIcon, CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useModelStore } from "@/store/use-model-store";
import { AI_MODELS } from "@/config/models";

interface ModelSelectorProps {
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg";
  className?: string;
}

export const ModelSelector = ({ 
  variant = "outline", 
  size = "sm",
  className 
}: ModelSelectorProps) => {
  const { 
    selectedModel, 
    isAutoMode, 
    setSelectedModel, 
    setAutoMode, 
    getSelectedModel 
  } = useModelStore();

  const currentModel = getSelectedModel();
  const displayName = isAutoMode ? "Auto" : currentModel?.name || "Unknown";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={`flex items-center gap-2 ${className}`}
        >
          <span className="text-sm">{displayName}</span>
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="flex items-center space-x-2 px-3 py-2">
          <Switch
            id="auto-mode"
            checked={isAutoMode}
            onCheckedChange={setAutoMode}
          />
          <Label htmlFor="auto-mode" className="text-sm">
            Auto
          </Label>
        </div>
        <DropdownMenuSeparator />
        
        {AI_MODELS.map((model) => (
          <DropdownMenuItem
            key={model.id}
            onClick={() => setSelectedModel(model.id)}
            className="flex items-center justify-between px-3 py-2"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{model.name}</span>
              <span className="text-xs text-muted-foreground">
                {model.description}
              </span>
            </div>
            {!isAutoMode && selectedModel === model.id && (
              <CheckIcon className="h-4 w-4" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};