import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  hint?: string;
  className?: string;
  children?: React.ReactNode;
}

export function StatCard({ label, value, hint, className, children }: StatCardProps) {
  return (
    <div className={cn("bg-card rounded-[2px] p-6 md:p-7", className)}>
      <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground">
        {label}
      </div>
      <div className="mt-3 flex items-end justify-between gap-4">
        <div className="text-[36px] md:text-[44px] leading-none font-semibold tracking-tight text-foreground tabular-nums">
          {value}
        </div>
        {children}
      </div>
      {hint && <div className="mt-3 text-[13px] text-muted-foreground">{hint}</div>}
    </div>
  );
}
