import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "flat" | "raised";
}

export function SectionCard({ tone = "flat", className, ...props }: SectionCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-[2px] p-6 md:p-8",
        tone === "raised" && "shadow-elevated",
        className,
      )}
      {...props}
    />
  );
}
