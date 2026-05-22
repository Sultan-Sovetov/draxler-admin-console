import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { u as useVirtualizer } from "../_libs/tanstack__react-virtual.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { u as useQueue, b as useActivity, P as PageHeader, S as SectionCard, c as CATEGORIES, D as DEFAULT_SECTIONS, d as DEFAULT_SIZES } from "./queue.store-CE2zzy7y.mjs";
import { D as Dropzone, S as SegmentedControl } from "./SegmentedControl-bGF0hXCU.mjs";
import { u as useAuth } from "./auth.store-CgNwkmlF.mjs";
import { e as easeOut, d as dur } from "./motion-BPr3pHv4.mjs";
import { E as EmptyState } from "./EmptyState-fLMePVjw.mjs";
import { m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import { e as Send, T as Trash2, h as Minus, i as Plus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__virtual-core.mjs";
import "../_libs/zustand.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function IntervalConfigurator({ value, onChange }) {
  const set = (n) => onChange(Math.max(1, Math.min(720, Math.round(n))));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[2px] p-6 md:p-7", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground", children: "Интервал публикации" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => set(value - 5),
          "aria-label": "Уменьшить интервал",
          className: "w-11 h-11 rounded-full bg-muted text-foreground inline-flex items-center justify-center hover:bg-muted/70 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-4 h-4", strokeWidth: 1.8 })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-2 min-w-[120px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "number",
            min: 1,
            max: 720,
            value,
            onChange: (e) => set(Number(e.target.value)),
            className: "w-[88px] bg-transparent text-[44px] font-semibold tracking-tight tabular-nums outline-none text-foreground"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[14px] text-muted-foreground", children: "мин" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => set(value + 5),
          "aria-label": "Увеличить интервал",
          className: "w-11 h-11 rounded-full bg-muted text-foreground inline-flex items-center justify-center hover:bg-muted/70 transition-colors",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4", strokeWidth: 1.8 })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[13px] text-muted-foreground", children: "Интервал между публикациями (в минутах). По умолчанию 25." })
  ] });
}
function BatchPage() {
  const navigate = useNavigate();
  const intervalMin = useQueue((s) => s.intervalMin);
  const setInterval = useQueue((s) => s.setInterval);
  const addBatch = useQueue((s) => s.addBatch);
  const log = useActivity((s) => s.log);
  const actor = useAuth((s) => s.user?.name ?? "Система");
  const [drafts, setDrafts] = reactExports.useState([]);
  const [defaultCat, setDefaultCat] = reactExports.useState("luxury");
  const handleFiles = (files) => {
    const next = files.map((f) => ({
      id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: "",
      thumb: URL.createObjectURL(f),
      category: defaultCat,
      file: f
    }));
    setDrafts((prev) => [...prev, ...next]);
    toast.success(`Добавлено ${files.length} файл${files.length === 1 ? "" : files.length < 5 ? "а" : "ов"}`);
  };
  const removeDraft = (id) => setDrafts((prev) => prev.filter((d) => d.id !== id));
  const setDraftCat = (id, cat) => setDrafts((prev) => prev.map((d) => d.id === id ? {
    ...d,
    category: cat
  } : d));
  const setDraftTitle = (id, title) => setDrafts((prev) => prev.map((d) => d.id === id ? {
    ...d,
    title
  } : d));
  const sendToQueue = () => {
    if (drafts.length === 0) return;
    addBatch(drafts.map((d) => ({
      id: d.id,
      title: d.title,
      images: [d.thumb],
      sizes: [...DEFAULT_SIZES],
      section_1_title: DEFAULT_SECTIONS[0].title,
      section_1_text: DEFAULT_SECTIONS[0].text,
      section_2_title: DEFAULT_SECTIONS[1].title,
      section_2_text: DEFAULT_SECTIONS[1].text,
      section_3_title: DEFAULT_SECTIONS[2].title,
      section_3_text: DEFAULT_SECTIONS[2].text,
      section_4_title: DEFAULT_SECTIONS[3].title,
      section_4_text: DEFAULT_SECTIONS[3].text,
      section_5_title: DEFAULT_SECTIONS[4].title,
      section_5_text: DEFAULT_SECTIONS[4].text,
      category: d.category,
      tags: [],
      files: [d.file]
    })));
    log({
      actor,
      action: `загрузил батч (${drafts.length} шт.)`
    });
    toast.success(`Добавлено ${drafts.length} в очередь`);
    setDrafts([]);
    navigate({
      to: "/queue"
    });
  };
  const parentRef = reactExports.useRef(null);
  const rowVirtualizer = useVirtualizer({
    count: drafts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 96,
    overscan: 8
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
    opacity: 0,
    y: 6
  }, animate: {
    opacity: 1,
    y: 0
  }, transition: {
    duration: dur.base,
    ease: easeOut
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Контент", title: "Пакетная загрузка", description: "Загрузите до 500 изображений, задайте интервал, отправьте в очередь.", actions: drafts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: sendToQueue, className: "h-11 px-5 rounded-[2px] bg-primary text-primary-foreground text-[13px] font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4", strokeWidth: 1.8 }),
      "Отправить в очередь (",
      drafts.length,
      ")"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Dropzone, { variant: "batch", onFiles: handleFiles }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground", children: "Категория по умолчанию" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentedControl, { options: CATEGORIES, value: defaultCat, onChange: setDefaultCat, size: "sm" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(IntervalConfigurator, { value: intervalMin, onChange: setInterval })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground", children: "Загружено" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1 text-[18px] font-semibold text-foreground", children: [
            drafts.length,
            " карточек"
          ] })
        ] }),
        drafts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setDrafts([]), className: "text-[13px] text-muted-foreground hover:text-foreground transition-colors", children: "Очистить всё" })
      ] }),
      drafts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Пока ничего не загружено", description: "Перетащите изображения в зону загрузки выше, чтобы создать карточки." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: parentRef, className: "h-[520px] overflow-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
        height: rowVirtualizer.getTotalSize(),
        position: "relative"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: rowVirtualizer.getVirtualItems().map((row) => {
        const d = drafts[row.index];
        if (!d) return null;
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          transform: `translateY(${row.start}px)`,
          height: row.size
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center gap-4 h-full pr-2 border-b border-border py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-[2px] overflow-hidden bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.thumb, alt: "", className: "w-full h-full object-cover" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: d.title, onChange: (e) => setDraftTitle(d.id, e.target.value), placeholder: `Карточка #${row.index + 1}`, className: "w-full bg-transparent text-[13px] text-foreground border-b border-transparent focus:border-border/50 outline-none pb-1 transition-colors" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground truncate opacity-70 mt-1", children: d.file.name })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 pl-0 md:pl-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentedControl, { options: CATEGORIES, value: d.category, onChange: (v) => setDraftCat(d.id, v), size: "sm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => removeDraft(d.id), "aria-label": "Удалить", className: "w-11 h-11 rounded-full text-muted-foreground hover:text-destructive hover:bg-muted inline-flex items-center justify-center transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4", strokeWidth: 1.7 }) })
          ] })
        ] }) }, d.id);
      }) }) }) })
    ] })
  ] });
}
export {
  BatchPage as component
};
