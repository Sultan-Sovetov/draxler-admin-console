import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  onRemove?: () => void;
  variant?: "default" | "accent";
  className?: string;
}

export function Chip({ children, onRemove, variant = "default", className }: ChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 h-8 pl-3 rounded-full text-[13px] leading-none select-none",
        variant === "default" && "bg-muted text-foreground",
        variant === "accent" && "bg-accent text-accent-foreground",
        onRemove ? "pr-1" : "pr-3",
        className,
      )}
    >
      <span className="truncate max-w-[180px]">{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label="Удалить"
          className="inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-foreground/5 transition-colors"
        >
          <X className="w-3 h-3" strokeWidth={2.2} />
        </button>
      )}
    </span>
  );
}
