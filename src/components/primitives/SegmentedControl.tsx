import * as React from "react";
import { motion } from "framer-motion";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  size?: "sm" | "md";
  className?: string;
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  size = "md",
  className,
}: SegmentedControlProps<T>) {
  const id = React.useId();
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center bg-muted rounded-full p-1 relative",
        size === "md" ? "min-h-[44px]" : "min-h-[36px]",
        className,
      )}
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative z-10 px-4 md:px-5 rounded-full text-[13px] font-medium transition-colors",
              size === "md" ? "h-9" : "h-7 text-[12px]",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={`seg-${id}`}
                transition={spring}
                className="absolute inset-0 bg-background rounded-full shadow-elevated -z-10"
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
