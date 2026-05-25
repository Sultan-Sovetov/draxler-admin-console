import * as React from "react";
import { Chip } from "@/components/primitives/Chip";

interface TagInputProps {
  value: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
}

export function TagInput({ value, onChange, placeholder }: TagInputProps) {
  const [text, setText] = React.useState("");

  const commit = (raw: string) => {
    const parts = raw
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0 && !value.includes(s));
    if (parts.length === 0) return;
    onChange([...value, ...parts]);
  };

  return (
    <div className="border-b border-border focus-within:border-foreground transition-colors pt-6 pb-2">
      <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-2">Теги</div>
      <div className="flex flex-wrap gap-2 items-center">
        {value.map((tag) => (
          <Chip key={tag} onRemove={() => onChange(value.filter((t) => t !== tag))}>
            {tag}
          </Chip>
        ))}
        <input
          value={text}
          onChange={(e) => {
            const v = e.target.value;
            if (v.endsWith(",")) {
              commit(v);
              setText("");
            } else {
              setText(v);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit(text);
              setText("");
            } else if (e.key === "Backspace" && text === "" && value.length > 0) {
              onChange(value.slice(0, -1));
            }
          }}
          onBlur={() => {
            if (text.trim()) {
              commit(text);
              setText("");
            }
          }}
          placeholder={placeholder ?? "Пример: кованый, r20, 5x112"}
          className="flex-1 min-w-[180px] bg-transparent text-[14px] outline-none py-1 placeholder:text-muted-foreground/70"
        />
      </div>
    </div>
  );
}
