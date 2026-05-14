import * as React from "react";
import { Minus, Plus } from "lucide-react";

interface IntervalConfiguratorProps {
  value: number;
  onChange: (n: number) => void;
}

export function IntervalConfigurator({ value, onChange }: IntervalConfiguratorProps) {
  const set = (n: number) => onChange(Math.max(1, Math.min(720, Math.round(n))));
  return (
    <div className="bg-card rounded-[2px] p-6 md:p-7">
      <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
        Интервал публикации
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => set(value - 5)}
          aria-label="Уменьшить интервал"
          className="w-11 h-11 rounded-full bg-muted text-foreground inline-flex items-center justify-center hover:bg-muted/70 transition-colors"
        >
          <Minus className="w-4 h-4" strokeWidth={1.8} />
        </button>
        <div className="flex items-baseline gap-2 min-w-[120px]">
          <input
            type="number"
            min={1}
            max={720}
            value={value}
            onChange={(e) => set(Number(e.target.value))}
            className="w-[88px] bg-transparent text-[44px] font-semibold tracking-tight tabular-nums outline-none text-foreground"
          />
          <span className="text-[14px] text-muted-foreground">мин</span>
        </div>
        <button
          type="button"
          onClick={() => set(value + 5)}
          aria-label="Увеличить интервал"
          className="w-11 h-11 rounded-full bg-muted text-foreground inline-flex items-center justify-center hover:bg-muted/70 transition-colors"
        >
          <Plus className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </div>
      <div className="mt-3 text-[13px] text-muted-foreground">
        Интервал между публикациями (в минутах). По умолчанию 25.
      </div>
    </div>
  );
}
