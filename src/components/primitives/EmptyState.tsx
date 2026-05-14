import * as React from "react";

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, action, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center text-center py-16 md:py-24">
      {icon && (
        <div className="mb-5 w-12 h-12 rounded-full bg-muted text-muted-foreground inline-flex items-center justify-center">
          {icon}
        </div>
      )}
      <div className="text-[18px] font-semibold text-foreground">{title}</div>
      {description && (
        <p className="mt-2 max-w-sm text-[14px] text-muted-foreground">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
