import * as React from "react";
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, error, className, value, defaultValue, id, ...props }, ref) => {
    const reactId = React.useId();
    const inputId = id ?? reactId;
    const [isFocused, setIsFocused] = React.useState(false);
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const v = value !== undefined ? value : internalValue;
    const filled = String(v ?? "").length > 0;
    const floated = isFocused || filled;

    return (
      <div className="relative">
        <input
          ref={ref}
          id={inputId}
          value={value}
          defaultValue={defaultValue}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          onChange={(e) => {
            if (value === undefined) setInternalValue(e.target.value);
            props.onChange?.(e);
          }}
          className={cn(
            "peer w-full bg-transparent text-[15px] text-foreground pt-6 pb-2 px-0 outline-none",
            "border-0 border-b transition-colors",
            error ? "border-destructive" : "border-border focus:border-foreground",
            className,
          )}
          {...props}
        />
        <label
          htmlFor={inputId}
          className={cn(
            "absolute left-0 pointer-events-none transition-all duration-200 text-muted-foreground",
            floated ? "top-1 text-[11px] tracking-wider uppercase" : "top-5 text-[15px]",
          )}
        >
          {label}
        </label>
        {error && <div className="mt-1 text-[12px] text-destructive">{error}</div>}
      </div>
    );
  },
);
FloatingLabelInput.displayName = "FloatingLabelInput";
