import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useArchive, C as CATEGORY_LABEL, P as PageHeader, S as SectionCard } from "./queue.store-CE2zzy7y.mjs";
import { S as SegmentedControl } from "./SegmentedControl-bGF0hXCU.mjs";
import { E as EmptyState } from "./EmptyState-fLMePVjw.mjs";
import { u as useMediaQuery, S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./useMediaQuery-pQna-pfg.mjs";
import { s as spring, c as cn } from "./motion-BPr3pHv4.mjs";
import { S as SingleUploadForm } from "./SingleUploadForm-DPKqtTpy.mjs";
import { c as formatDateTime } from "./format-B0GbAjD0.mjs";
import "../_libs/sonner.mjs";
import { R as RefreshCw, j as Search, X } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "./auth.store-CgNwkmlF.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props });
}
const CAT_OPTIONS = [{
  value: "all",
  label: "Все"
}, {
  value: "off-road",
  label: "Off-Road"
}, {
  value: "luxury",
  label: "Luxury"
}, {
  value: "sport",
  label: "Sport"
}];
function ArchivePage() {
  const items = useArchive((s) => s.items);
  const filters = useArchive((s) => s.filters);
  const setFilter = useArchive((s) => s.setFilter);
  const isLoading = useArchive((s) => s.isLoading);
  const hasFetched = useArchive((s) => s.hasFetched);
  const fetchFromSupabase = useArchive((s) => s.fetchFromSupabase);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [editing, setEditing] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!hasFetched) {
      fetchFromSupabase();
    }
  }, [hasFetched, fetchFromSupabase]);
  const filtered = reactExports.useMemo(() => {
    return items.filter((i) => {
      if (filters.category && i.category !== filters.category) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const searchableText = [...i.tags, i.section_1_title, i.section_1_text, i.section_2_title, i.section_2_text, i.section_3_title, i.section_3_text, i.section_4_title, i.section_4_text, i.section_5_title, i.section_5_text, CATEGORY_LABEL[i.category]].join(" ").toLowerCase();
        if (!searchableText.includes(q)) return false;
      }
      return true;
    });
  }, [items, filters]);
  const catValue = filters.category ?? "all";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Каталог", title: "Управление контентом", description: "Архив всех опубликованных карточек. Фильтруйте, ищите и редактируйте без перехода на отдельную страницу.", actions: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => fetchFromSupabase(), disabled: isLoading, className: "h-11 px-5 rounded-[2px] bg-card text-foreground text-[13px] font-medium inline-flex items-center gap-2 hover:bg-muted transition-colors disabled:opacity-60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}`, strokeWidth: 1.8 }),
      "Обновить"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { className: "mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative md:max-w-[320px] w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground", strokeWidth: 1.7 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: filters.query, onChange: (e) => setFilter({
          query: e.target.value
        }), placeholder: "Поиск по тегам или тексту", className: "w-full h-11 pl-10 pr-10 rounded-[2px] bg-muted text-[14px] outline-none focus:bg-background focus:ring-1 focus:ring-foreground/20 transition-colors" }),
        filters.query && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setFilter({
          query: ""
        }), "aria-label": "Очистить", className: "absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full text-muted-foreground hover:text-foreground inline-flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5", strokeWidth: 2 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SegmentedControl, { options: CAT_OPTIONS, value: catValue, onChange: (v) => setFilter({
        category: v === "all" ? void 0 : v
      }), size: "sm" })
    ] }) }),
    isLoading && !hasFetched ? (
      /* Loading skeleton */
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5", children: Array.from({
        length: 10
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-[2px] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-16" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" })
        ] })
      ] }, i)) })
    ) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Ничего не найдено", description: hasFetched ? "Измените фильтры или поисковый запрос." : "Загрузка данных..." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: filtered.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.button, { type: "button", layout: true, initial: {
      opacity: 0,
      y: 8
    }, animate: {
      opacity: 1,
      y: 0
    }, exit: {
      opacity: 0
    }, transition: spring, onClick: () => setEditing(it), whileHover: {
      y: -1
    }, className: "group text-left bg-card rounded-[2px] overflow-hidden focus:outline-none focus:ring-1 focus:ring-foreground/30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-square bg-muted overflow-hidden", children: it.images[0] ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: it.images[0], alt: "", className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center text-muted-foreground text-[12px]", children: "Нет фото" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] tracking-[0.18em] uppercase text-muted-foreground", children: CATEGORY_LABEL[it.category] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 text-[13px] font-medium text-foreground truncate", children: it.title || "Без названия" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[12px] text-muted-foreground truncate", children: it.tags.length > 0 ? it.tags.slice(0, 2).join(" · ") : "Без тегов" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1.5 text-[11px] text-muted-foreground tabular-nums opacity-80", children: formatDateTime(it.publishedAt) })
      ] })
    ] }, it.id)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!editing, onOpenChange: (open) => !open && setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: isDesktop ? "right" : "bottom", className: isDesktop ? "w-full sm:max-w-[560px] overflow-y-auto bg-background border-l border-border" : "h-[92vh] rounded-t-[12px] overflow-y-auto bg-background border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground", children: "Редактирование" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-foreground text-[20px] font-semibold tracking-tight", children: "Карточка диска" })
      ] }),
      editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SingleUploadForm, { mode: "edit", initial: editing, archiveId: editing.id, onSaved: () => setEditing(null) }) })
    ] }) })
  ] });
}
export {
  ArchivePage as component
};
