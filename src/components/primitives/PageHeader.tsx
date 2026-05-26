import * as React from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ eyebrow, title, description, actions }: PageHeaderProps) {
  return (
    <header className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
      <div>
        {eyebrow && (
          <div className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="text-foreground">{title}</h1>
        {description && (
          <p className="mt-3 max-w-xl text-[15px] text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">{actions}</div>}
    </header>
  );
}
