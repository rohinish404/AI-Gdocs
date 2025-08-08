"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { templates } from "@/constants/templates";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Upload, Plus } from "lucide-react";
import { useRef } from "react";
import mammoth from "mammoth";

export const TemplatesGallery = () => {
  const router = useRouter();
  const create = useMutation(api.documents.create);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isCreating, setIsCreating] = useState(false);

  const onTemplateClick = (title: string, initialContent: string) => {
    setIsCreating(true);
    create({ title, initialContent })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !file.name.endsWith('.docx')) {
      alert('Please select a valid .docx file');
      return;
    }

    setIsCreating(true);
    try {
      const arrayBuffer = await file.arrayBuffer();
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const htmlContent = result.value;
      const fileName = file.name.replace('.docx', '');
      
      const documentId = await create({ 
        title: fileName, 
        initialContent: htmlContent 
      });
      
      router.push(`/documents/${documentId}`);
    } catch (error) {
      console.error('Error processing file:', error);
      alert('Error processing the file. Please try again.');
    } finally {
      setIsCreating(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="bg-muted/50">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            <CarouselItem className="basis-1/2 sm:basis-1/4 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%]">
              <div className={cn("aspect-[3/4] flex flex-col gap-y-2.5", isCreating && "pointer-events-none opacity-50")}>
                <button
                  disabled={isCreating}
                  onClick={onUploadClick}
                  className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                >
                  <Upload className="size-6 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Upload .docx</p>
                </button>
                <p className="text-sm font-medium truncate">Upload Document</p>
              </div>
            </CarouselItem>
            <CarouselItem className="basis-1/2 sm:basis-1/4 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%]">
              <div className={cn("aspect-[3/4] flex flex-col gap-y-2.5", isCreating && "pointer-events-none opacity-50")}>
                <button
                  disabled={isCreating}
                  onClick={() => onTemplateClick("Untitled Document", "")}
                  className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                >
                  <Plus className="size-6 text-muted-foreground" />
                </button>
                <p className="text-sm font-medium truncate">Blank Document</p>
              </div>
            </CarouselItem>
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/4 md:basis-1/4 lg:basis-1/5 xl:basis-1/6
                2xl:basis-[14.285714%] gap-y-4"
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2.5",
                    isCreating && "pointer-events-none opacity-50",
                  )}
                >
                  <button
                    disabled={isCreating}
                    onClick={() =>
                      onTemplateClick(template.label, template.initialContent)
                    }
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50
                    transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <input
          ref={fileInputRef}
          type="file"
          accept=".docx"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>
    </div>
  );
};
