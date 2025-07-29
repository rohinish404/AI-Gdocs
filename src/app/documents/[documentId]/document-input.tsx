import { BsCloudCheck } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import React, { useRef, useState, useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
  isSaving: boolean;
}
export const DocumentInput = ({ title, id, isSaving }: DocumentInputProps) => {
  const [value, setValue] = useState(title);

  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  const debounceUpdate = useDebounce((newValue: string) => {
    if (newValue === title) return;

    setIsPending(true);
    mutate({ id, title: newValue })
      .then(() => toast.success("Document Renamed"))
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsPending(false));
  }, 1000);

  useEffect(() => {
    setValue(title);
  }, [title]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debounceUpdate(newValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending(true);
    mutate({ id, title: value })
      .then(() => {
        toast.success("Document Renamed");
        setIsEditing(false);
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsPending(false));
  };

  const showLoader = isPending || isSaving;

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form
          onSubmit={handleSubmit}
          onBlur={() => setIsEditing(false)}
          className="relative w-fit max-w-[50ch]"
        >
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || " "}
          </span>
          <input
            ref={(ref) => {
              inputRef.current = ref;
              if (ref && isEditing) {
                ref.focus();
              }
            }}
            value={value}
            onChange={onChange}
            className="absolute inset-0 text-lg px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditing(true);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title}
        </span>
      )}
      {!showLoader && <BsCloudCheck className="text-muted-foreground" />}
      {showLoader && (
        <LoaderIcon className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};
