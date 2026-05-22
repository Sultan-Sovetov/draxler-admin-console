import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn, s as spring } from "./motion-BPr3pHv4.mjs";
import { F as FolderOpen, I as ImagePlus } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
function Dropzone({
  onFiles,
  variant = "single",
  multiple = true,
  accept = "image/*",
  className,
  hint
}) {
  const [over, setOver] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const handleFiles = (list) => {
    if (!list || list.length === 0) return;
    onFiles(Array.from(list));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: () => inputRef.current?.click(),
      onDragOver: (e) => {
        e.preventDefault();
        setOver(true);
      },
      onDragLeave: () => setOver(false),
      onDrop: (e) => {
        e.preventDefault();
        setOver(false);
        handleFiles(e.dataTransfer.files);
      },
      className: cn(
        "w-full block text-left transition-colors",
        "rounded-[3px] border border-dashed border-border",
        "px-6 py-10 md:py-14",
        over ? "bg-accent/40 border-foreground/40" : "bg-card hover:bg-muted/60",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ref: inputRef,
            type: "file",
            className: "hidden",
            accept,
            multiple,
            onChange: (e) => handleFiles(e.target.files)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground", children: variant === "batch" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FolderOpen, { className: "w-5 h-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[15px] font-medium text-foreground", children: variant === "batch" ? "Перетащите изображения дисков сюда" : "Перетащите изображение или нажмите" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 text-[13px] text-muted-foreground", children: hint ?? "Поддерживается: JPG, PNG, WEBP. До 500 файлов." })
          ] })
        ] })
      ]
    }
  );
}
function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  className
}) {
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      role: "tablist",
      className: cn(
        "inline-flex items-center bg-muted rounded-full p-1 relative",
        size === "md" ? "min-h-[44px]" : "min-h-[36px]",
        className
      ),
      children: options.map((opt) => {
        const active = opt.value === value;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": active,
            onClick: () => onChange(opt.value),
            className: cn(
              "relative z-10 px-4 md:px-5 rounded-full text-[13px] font-medium transition-colors",
              size === "md" ? "h-9" : "h-7 text-[12px]",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            ),
            children: [
              active && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.span,
                {
                  layoutId: `seg-${id}`,
                  transition: spring,
                  className: "absolute inset-0 bg-background rounded-full shadow-elevated -z-10"
                }
              ),
              opt.label
            ]
          },
          opt.value
        );
      })
    }
  );
}
export {
  Dropzone as D,
  SegmentedControl as S
};
