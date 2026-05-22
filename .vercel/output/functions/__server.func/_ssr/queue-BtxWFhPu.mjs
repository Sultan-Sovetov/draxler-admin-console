import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { c as useSensors, d as useSensor, D as DndContext, e as closestCenter, T as TouchSensor, P as PointerSensor } from "../_libs/dnd-kit__core.mjs";
import { S as SortableContext, v as verticalListSortingStrategy, u as useSortable } from "../_libs/dnd-kit__sortable.mjs";
import { C as CSS } from "../_libs/dnd-kit__utilities.mjs";
import { u as useQueue, P as PageHeader, S as SectionCard, C as CATEGORY_LABEL } from "./queue.store-CE2zzy7y.mjs";
import { E as EmptyState } from "./EmptyState-fLMePVjw.mjs";
import { u as useMediaQuery, S as Sheet, a as SheetContent, b as SheetHeader, c as SheetTitle } from "./useMediaQuery-pQna-pfg.mjs";
import { S as SingleUploadForm } from "./SingleUploadForm-DPKqtTpy.mjs";
import { u as useTicker } from "./useTicker-DKuI-xT8.mjs";
import { f as formatTime, a as formatCountdown } from "./format-B0GbAjD0.mjs";
import { s as spring, c as cn } from "./motion-BPr3pHv4.mjs";
import { u as useAuth } from "./auth.store-CgNwkmlF.mjs";
import { e as Send, G as GripVertical, P as Pencil, f as CirclePlay, g as Pause, Z as Zap, T as Trash2 } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/dnd-kit__accessibility.mjs";
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
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/isbot.mjs";
import "./SegmentedControl-bGF0hXCU.mjs";
import "../_libs/radix-ui__react-accordion.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-collapsible.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function QueuePage() {
  const items = useQueue((s) => s.items);
  const intervalMin = useQueue((s) => s.intervalMin);
  const reorder = useQueue((s) => s.reorder);
  const togglePause = useQueue((s) => s.togglePause);
  const publishNow = useQueue((s) => s.publishNow);
  const processQueue = useQueue((s) => s.processQueue);
  const isProcessing = useQueue((s) => s.isProcessing);
  const remove = useQueue((s) => s.remove);
  const actor = useAuth((s) => s.user?.name ?? "Система");
  const now = useTicker(1e3);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [editing, setEditing] = reactExports.useState(null);
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 6
    }
  }), useSensor(TouchSensor, {
    activationConstraint: {
      delay: 180,
      tolerance: 6
    }
  }));
  const onDragEnd = (e) => {
    const {
      active,
      over
    } = e;
    if (!over || active.id === over.id) return;
    const from = items.findIndex((i) => i.id === active.id);
    const to = items.findIndex((i) => i.id === over.id);
    if (from < 0 || to < 0) return;
    reorder(from, to);
    toast.success("Очередь перестроена");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Публикация", title: "Очередь", description: `Перетаскивайте карточки, чтобы изменить порядок. Интервал: ${intervalMin} мин.`, actions: items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: () => {
      processQueue(actor);
      toast.success("Обработка очереди запущена");
    }, disabled: isProcessing, className: "h-11 px-5 rounded-[2px] bg-primary text-primary-foreground text-[13px] font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Send, { className: "w-4 h-4", strokeWidth: 1.8 }),
      isProcessing ? "Публикуется..." : "Запустить очередь"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SectionCard, { children: items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { title: "Очередь пуста", description: "Загрузите карточки через одиночную или пакетную публикацию." }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: items.map((i) => i.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: items.map((item, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(QueueRow, { item, now, index: idx, onPause: () => {
      if (item.status !== "uploading") togglePause(item.id);
    }, onPublish: () => publishNow(item.id, actor), onRemove: () => {
      if (item.status === "uploading") return;
      remove(item.id);
      toast.success("Карточка удалена из очереди");
    }, onEdit: () => setEditing(item) }, item.id)) }) }) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: !!editing, onOpenChange: (open) => !open && setEditing(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetContent, { side: isDesktop ? "right" : "bottom", className: isDesktop ? "w-full sm:max-w-[560px] overflow-y-auto bg-background border-l border-border" : "h-[92vh] rounded-t-[12px] overflow-y-auto bg-background border-t border-border", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground", children: "Редактирование" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { className: "text-foreground text-[20px] font-semibold tracking-tight", children: "Карточка из очереди" })
      ] }),
      editing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SingleUploadForm, { mode: "edit", initial: editing, onSaved: () => setEditing(null) }) })
    ] }) })
  ] });
}
function QueueRow({
  item,
  now,
  index,
  onPause,
  onPublish,
  onRemove,
  onEdit
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: item.id
  });
  const [swipeX, setSwipeX] = reactExports.useState(0);
  const startX = reactExports.useRef(null);
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    if (startX.current == null) return;
    const dx = e.touches[0].clientX - startX.current;
    setSwipeX(Math.max(-120, Math.min(120, dx)));
  };
  const onTouchEnd = () => {
    if (swipeX > 80) onPublish();
    else if (swipeX < -80) onPause();
    setSwipeX(0);
    startX.current = null;
  };
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const isUploading = item.status === "uploading";
  const statusText = item.status === "uploading" ? item.progress || "Публикуется..." : item.status === "error" ? item.error || "Ошибка публикации" : item.status === "success" ? "Опубликовано" : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.li, { ref: setNodeRef, style, layout: true, initial: {
    opacity: 0,
    y: 8
  }, animate: {
    opacity: 1,
    y: 0
  }, exit: {
    opacity: 0,
    x: 60,
    transition: {
      duration: 0.18
    }
  }, transition: spring, className: cn("relative bg-background rounded-[2px] overflow-hidden", isDragging && "shadow-lift z-10"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 w-32 bg-[oklch(0.95_0.04_150)] text-[oklch(0.32_0.08_150)] flex items-center justify-start pl-5 text-[12px] font-medium md:hidden", children: "Опубликовать" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 right-0 w-32 bg-accent text-accent-foreground flex items-center justify-end pr-5 text-[12px] font-medium md:hidden", children: item.paused ? "Возобновить" : "Пауза" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { onTouchStart, onTouchMove, onTouchEnd, style: {
      transform: `translate3d(${swipeX}px, 0, 0)`
    }, className: cn("relative bg-card transition-transform", item.paused && "opacity-60"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 md:gap-4 px-3 md:px-5 py-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { ref: (el) => {
          if (el) el.style.touchAction = "none";
        }, ...attributes, ...listeners, "aria-label": "Перетащить", className: "w-8 h-11 md:h-12 inline-flex items-center justify-center text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GripVertical, { className: "w-4 h-4", strokeWidth: 1.7 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 md:w-16 md:h-16 rounded-[2px] overflow-hidden bg-muted shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.images[0], alt: "", className: "w-full h-full object-cover" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] tracking-[0.16em] uppercase text-muted-foreground", children: [
              "#",
              (index + 1).toString().padStart(2, "0")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] tracking-[0.12em] uppercase text-muted-foreground", children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-foreground", children: CATEGORY_LABEL[item.category] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[13px] font-medium text-foreground truncate", children: item.title || "Авто (DRX-XXX)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 text-[12px] text-muted-foreground truncate", children: item.tags.length > 0 ? item.tags.join(" · ") : "Без тегов" }),
          statusText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-1 text-[12px] truncate", item.status === "error" ? "text-destructive" : "text-muted-foreground"), children: statusText })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex flex-col items-end shrink-0 mr-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-wider uppercase text-muted-foreground", children: "Публикация" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-1 text-[14px] font-medium tabular-nums", item.status === "error" ? "text-destructive" : "text-foreground"), children: statusText || (item.paused ? "На паузе" : formatTime(item.scheduledAt)) }),
          !item.paused && !statusText && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-muted-foreground tabular-nums", children: formatCountdown(item.scheduledAt, now) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { label: "Редактировать", onClick: onEdit, disabled: isUploading, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-4 h-4", strokeWidth: 1.7 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { label: item.paused ? "Возобновить" : "Пауза", onClick: onPause, disabled: isUploading, children: item.paused ? /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlay, { className: "w-4 h-4", strokeWidth: 1.7 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4", strokeWidth: 1.7 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { label: "Вне очереди", onClick: onPublish, disabled: isUploading, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4", strokeWidth: 1.7 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBtn, { label: "Удалить", onClick: onRemove, disabled: isUploading, danger: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4", strokeWidth: 1.7 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:hidden px-3 pb-3 -mt-1 text-[12px] text-muted-foreground tabular-nums", children: statusText || (item.paused ? "На паузе" : `${formatTime(item.scheduledAt)} · ${formatCountdown(item.scheduledAt, now)}`) })
    ] })
  ] });
}
function IconBtn({
  children,
  onClick,
  label,
  danger,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick, disabled, "aria-label": label, title: label, className: cn("w-11 h-11 rounded-full inline-flex items-center justify-center transition-colors", disabled ? "text-muted-foreground/50 cursor-not-allowed" : danger ? "text-muted-foreground hover:text-destructive hover:bg-muted" : "text-muted-foreground hover:text-foreground hover:bg-muted"), children });
}
export {
  QueuePage as component
};
