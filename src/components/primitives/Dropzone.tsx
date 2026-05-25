import * as React from "react";
import { ImagePlus, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropzoneProps {
  onFiles: (files: File[]) => void;
  variant?: "single" | "batch";
  multiple?: boolean;
  accept?: string;
  className?: string;
  hint?: string;
}

export function Dropzone({
  onFiles,
  variant = "single",
  multiple = true,
  accept = "image/*",
  className,
  hint,
}: DropzoneProps) {
  const [over, setOver] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    onFiles(Array.from(list));
  };

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handleFiles(e.dataTransfer.files);
      }}
      className={cn(
        "w-full block text-left transition-colors",
        "rounded-[3px] border border-dashed border-border",
        "px-6 py-10 md:py-14",
        over ? "bg-accent/40 border-foreground/40" : "bg-card hover:bg-muted/60",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => handleFiles(e.target.files)}
      />
      <div className="flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          {variant === "batch" ? (
            <FolderOpen className="w-5 h-5" />
          ) : (
            <ImagePlus className="w-5 h-5" />
          )}
        </div>
        <div>
          <div className="text-[15px] font-medium text-foreground">
            {variant === "batch"
              ? "Перетащите изображения дисков сюда"
              : "Перетащите изображение или нажмите"}
          </div>
          <div className="mt-1.5 text-[13px] text-muted-foreground">
            {hint ?? "Поддерживается: JPG, PNG, WEBP. До 500 файлов."}
          </div>
        </div>
      </div>
    </button>
  );
}
