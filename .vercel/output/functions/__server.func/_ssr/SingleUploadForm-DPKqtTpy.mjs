import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { D as Dropzone, S as SegmentedControl } from "./SegmentedControl-bGF0hXCU.mjs";
import { R as Root2, I as Item, H as Header, T as Trigger2, C as Content2 } from "../_libs/radix-ui__react-accordion.mjs";
import { c as cn } from "./motion-BPr3pHv4.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { a as useArchive, u as useQueue, b as useActivity, d as DEFAULT_SIZES, D as DEFAULT_SECTIONS, c as CATEGORIES, p as placeholderImage, g as generateNextTitle, e as publishProduct } from "./queue.store-CE2zzy7y.mjs";
import { u as useAuth } from "./auth.store-CgNwkmlF.mjs";
import { X, k as Check, l as ChevronDown } from "../_libs/lucide-react.mjs";
function ImageThumbStrip({ images, onRemove }) {
  if (images.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1 py-1", children: images.map((src, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative shrink-0 w-24 h-24 md:w-28 md:h-28 rounded-[2px] overflow-hidden bg-muted group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src, alt: "", className: "w-full h-full object-cover" }),
        onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onRemove(i),
            "aria-label": "Удалить изображение",
            className: "absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-background/95 text-foreground inline-flex items-center justify-center opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity shadow-elevated",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5", strokeWidth: 2.2 })
          }
        )
      ]
    },
    `${src}-${i}`
  )) });
}
const Accordion = Root2;
const AccordionItem = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Item, { ref, className: cn("border-b", className), ...props }));
AccordionItem.displayName = "AccordionItem";
const AccordionTrigger = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Header, { className: "flex", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
  Trigger2,
  {
    ref,
    className: cn(
      "flex flex-1 items-center justify-between py-4 text-sm font-medium cursor-pointer transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" })
    ]
  }
) }));
AccordionTrigger.displayName = Trigger2.displayName;
const AccordionContent = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("pb-4 pt-0", className), children })
  }
));
AccordionContent.displayName = Content2.displayName;
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
function Chip({ children, onRemove, variant = "default", className }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1.5 h-8 pl-3 rounded-full text-[13px] leading-none select-none",
        variant === "default" && "bg-muted text-foreground",
        variant === "accent" && "bg-accent text-accent-foreground",
        onRemove ? "pr-1" : "pr-3",
        className
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[180px]", children }),
        onRemove && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onRemove,
            "aria-label": "Удалить",
            className: "inline-flex items-center justify-center w-6 h-6 rounded-full hover:bg-foreground/5 transition-colors",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3 h-3", strokeWidth: 2.2 })
          }
        )
      ]
    }
  );
}
function TagInput({ value, onChange, placeholder }) {
  const [text, setText] = reactExports.useState("");
  const commit = (raw) => {
    const parts = raw.split(",").map((s) => s.trim().toLowerCase()).filter((s) => s.length > 0 && !value.includes(s));
    if (parts.length === 0) return;
    onChange([...value, ...parts]);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border focus-within:border-foreground transition-colors pt-6 pb-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground mb-2", children: "Теги" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
      value.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Chip, { onRemove: () => onChange(value.filter((t) => t !== tag)), children: tag }, tag)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: text,
          onChange: (e) => {
            const v = e.target.value;
            if (v.endsWith(",")) {
              commit(v);
              setText("");
            } else {
              setText(v);
            }
          },
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              commit(text);
              setText("");
            } else if (e.key === "Backspace" && text === "" && value.length > 0) {
              onChange(value.slice(0, -1));
            }
          },
          onBlur: () => {
            if (text.trim()) {
              commit(text);
              setText("");
            }
          },
          placeholder: placeholder ?? "например: для бмв 7, ковка",
          className: "flex-1 min-w-[180px] bg-transparent text-[14px] outline-none py-1 placeholder:text-muted-foreground/70"
        }
      )
    ] })
  ] });
}
function SingleUploadForm({ initial, mode = "create", onSaved, archiveId }) {
  const navigate = useNavigate();
  const updateArchive = useArchive((s) => s.update);
  const updateInSupabase = useArchive((s) => s.updateInSupabase);
  const updateQueue = useQueue((s) => s.update);
  const log = useActivity((s) => s.log);
  const actor = useAuth((s) => s.user?.name ?? "Система");
  const [images, setImages] = reactExports.useState(initial?.images ?? []);
  const [files, setFiles] = reactExports.useState([]);
  const [title, setTitle] = reactExports.useState(initial?.title ?? "");
  const [category, setCategory] = reactExports.useState(initial?.category ?? "luxury");
  const [tags, setTags] = reactExports.useState(initial?.tags ?? []);
  const [isSubmitting, setIsSubmitting] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState("");
  const [sizes, setSizes] = reactExports.useState(() => {
    if (initial?.sizes && initial.sizes.length > 0) return initial.sizes;
    return [...DEFAULT_SIZES];
  });
  const [sections, setSections] = reactExports.useState(() => {
    if (initial?.section_1_title !== void 0) {
      return [
        { title: initial.section_1_title ?? "", text: initial.section_1_text ?? "" },
        { title: initial.section_2_title ?? "", text: initial.section_2_text ?? "" },
        { title: initial.section_3_title ?? "", text: initial.section_3_text ?? "" },
        { title: initial.section_4_title ?? "", text: initial.section_4_text ?? "" },
        { title: initial.section_5_title ?? "", text: initial.section_5_text ?? "" }
      ];
    }
    return DEFAULT_SECTIONS.map((s) => ({ title: s.title, text: s.text }));
  });
  const toggleSize = (size) => {
    setSizes(
      (prev) => prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };
  const updateSection = (index, field, value) => {
    setSections(
      (prev) => prev.map((s, i) => i === index ? { ...s, [field]: value } : s)
    );
  };
  const handleFiles = (incomingFiles) => {
    const urls = incomingFiles.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
    setFiles((prev) => [...prev, ...incomingFiles]);
  };
  const removeImage = (index) => {
    URL.revokeObjectURL(images[index]);
    setImages(images.filter((_, idx) => idx !== index));
    setFiles(files.filter((_, idx) => idx !== index));
  };
  const resetCreateForm = () => {
    images.forEach((image) => URL.revokeObjectURL(image));
    setImages([]);
    setFiles([]);
    setTitle("");
    setCategory("luxury");
    setTags([]);
    setSizes([...DEFAULT_SIZES]);
    setSections(DEFAULT_SECTIONS.map((s) => ({ title: s.title, text: s.text })));
    setProgress("");
  };
  const sectionFields = () => ({
    section_1_title: sections[0].title,
    section_1_text: sections[0].text,
    section_2_title: sections[1].title,
    section_2_text: sections[1].text,
    section_3_title: sections[2].title,
    section_3_text: sections[2].text,
    section_4_title: sections[3].title,
    section_4_text: sections[3].text,
    section_5_title: sections[4].title,
    section_5_text: sections[4].text
  });
  const onSubmit = async (e) => {
    e.preventDefault();
    const finalImages = images.length > 0 ? images : [placeholderImage(`u-${Date.now()}`)];
    if (mode === "edit" && initial?.id) {
      const patch = {
        title,
        images: finalImages,
        category,
        tags,
        sizes,
        ...sectionFields()
      };
      if (archiveId) {
        try {
          await updateInSupabase(initial.id, patch);
        } catch {
          updateArchive(initial.id, patch);
        }
      } else {
        updateQueue(initial.id, patch);
      }
      log({ actor, action: `обновил карточку диска ${category}` });
      toast.success("Сохранено");
      onSaved?.();
      return;
    }
    if (files.length === 0) {
      toast.error("Добавьте хотя бы одно изображение");
      return;
    }
    setIsSubmitting(true);
    try {
      setProgress("Генерация названия...");
      let autoTitle;
      try {
        autoTitle = await generateNextTitle(category);
      } catch {
        autoTitle = `DRX-${Date.now().toString().slice(-4)}`;
      }
      await publishProduct(
        {
          title: autoTitle,
          type: category,
          parameters: JSON.stringify({ tags }),
          sizes,
          ...sectionFields()
        },
        files,
        setProgress
      );
      log({ actor, action: `опубликовал одиночную карточку (${category}) — ${autoTitle}` });
      toast.success(`Карточка ${autoTitle} опубликована`);
      resetCreateForm();
      navigate({ to: "/upload" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Не удалось опубликовать карточку";
      toast.error(message);
      setProgress(message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit, className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground", children: "Изображения" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Dropzone, { variant: "single", onFiles: handleFiles, hint: "JPG, PNG, WEBP. Можно загрузить несколько фото." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ImageThumbStrip,
        {
          images,
          onRemove: isSubmitting ? void 0 : removeImage
        }
      )
    ] }),
    mode === "edit" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground mb-2", children: "Название (Title)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          value: title,
          onChange: (e) => setTitle(e.target.value),
          disabled: isSubmitting,
          placeholder: "DRX-XXX (авто)",
          className: "w-full bg-card rounded-[2px] px-4 py-3 text-[14px] leading-relaxed text-foreground outline-none border-0 focus:bg-muted/70 transition-colors"
        }
      )
    ] }),
    mode === "create" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 bg-card rounded-[2px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[13px] text-muted-foreground", children: "Название генерируется автоматически (DRX-XXX) при публикации" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground mb-2", children: "Категория" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentedControl, { options: CATEGORIES, value: category, onChange: setCategory })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground mb-3", children: "Размеры дисков" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: DEFAULT_SIZES.map((size) => {
        const isChecked = sizes.includes(size);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "label",
          {
            className: `
                  inline-flex items-center gap-2 px-3 py-2 rounded-[2px] cursor-pointer
                  transition-all duration-150 select-none text-[13px]
                  ${isChecked ? "bg-primary/10 text-primary border border-primary/30" : "bg-card text-muted-foreground border border-transparent hover:bg-muted/70"}
                `,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: isChecked,
                  onCheckedChange: () => toggleSize(size),
                  disabled: isSubmitting,
                  className: "h-3.5 w-3.5"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: size })
            ]
          },
          size
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-[11px] text-muted-foreground", children: [
        "Выбрано: ",
        sizes.length,
        " из ",
        DEFAULT_SIZES.length
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground mb-3", children: "Разделы описания" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { type: "multiple", className: "border border-border rounded-[2px] overflow-hidden", children: sections.map((section, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: `section-${idx}`, className: "border-b border-border last:border-b-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { className: "px-4 py-3 text-[13px] font-medium tracking-[0.02em] hover:no-underline hover:bg-muted/40 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold", children: idx + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: section.title || `Раздел ${idx + 1}` })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionContent, { className: "px-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground mb-1.5", children: "Заголовок" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: section.title,
                onChange: (e) => updateSection(idx, "title", e.target.value),
                disabled: isSubmitting,
                placeholder: `Заголовок раздела ${idx + 1}`,
                className: "w-full bg-muted/50 rounded-[2px] px-3 py-2.5 text-[13px] leading-relaxed text-foreground outline-none border-0 focus:bg-muted transition-colors"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground mb-1.5", children: "Текст" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: section.text,
                onChange: (e) => updateSection(idx, "text", e.target.value),
                disabled: isSubmitting,
                rows: 6,
                className: "w-full bg-muted/50 rounded-[2px] px-3 py-2.5 text-[13px] leading-relaxed text-foreground outline-none border-0 focus:bg-muted transition-colors resize-y"
              }
            )
          ] })
        ] }) })
      ] }, idx)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { value: tags, onChange: setTags }),
    progress && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-muted-foreground", children: progress }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end gap-3 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "submit",
        disabled: isSubmitting,
        className: "h-12 px-7 rounded-[2px] bg-primary text-primary-foreground text-[14px] font-medium tracking-[0.02em] hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed",
        children: isSubmitting ? "Публикация..." : mode === "edit" ? "Сохранить" : "Опубликовать"
      }
    ) })
  ] });
}
export {
  SingleUploadForm as S
};
