import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQueue, a as useArchive, b as useActivity, P as PageHeader, S as SectionCard, C as CATEGORY_LABEL } from "./queue.store-CE2zzy7y.mjs";
import { e as easeOut, d as dur, c as cn } from "./motion-BPr3pHv4.mjs";
import { u as useTicker } from "./useTicker-DKuI-xT8.mjs";
import { f as formatTime, a as formatCountdown, b as formatRelative } from "./format-B0GbAjD0.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { W as Wrench, S as Sparkles, M as Mountain, d as Activity } from "../_libs/lucide-react.mjs";
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
function StatCard({ label, value, hint, className, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("bg-card rounded-[2px] p-6 md:p-7", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[36px] md:text-[44px] leading-none font-semibold tracking-tight text-foreground tabular-nums", children: value }),
      children
    ] }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[13px] text-muted-foreground", children: hint })
  ] });
}
const CAT_ICON = {
  "off-road": Mountain,
  luxury: Sparkles,
  sport: Wrench
};
function Dashboard() {
  const items = useQueue((s) => s.items);
  const intervalMin = useQueue((s) => s.intervalMin);
  const archive = useArchive((s) => s.items);
  const activity = useActivity((s) => s.entries);
  const now = useTicker(1e3);
  const activeQueue = items.filter((i) => !i.paused);
  const totalSlots = 100;
  const publishedToday = archive.filter((a) => now - a.publishedAt < 24 * 36e5).length;
  const next = activeQueue[0];
  const nextLabel = next ? `Следующий диск: ${formatTime(next.scheduledAt)} · ${formatCountdown(next.scheduledAt, now)}` : "Очередь пуста";
  const counts = {
    "off-road": archive.filter((a) => a.category === "off-road").length,
    luxury: archive.filter((a) => a.category === "luxury").length,
    sport: archive.filter((a) => a.category === "sport").length
  };
  const total = counts["off-road"] + counts.luxury + counts.sport || 1;
  const progressPct = Math.min(100, publishedToday / totalSlots * 100);
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
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { eyebrow: "Обзор", title: "Главный экран", description: "Состояние активного батча, распределение каталога и последние события." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { className: "mb-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground", children: "Активный батч" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 text-[20px] font-semibold text-foreground", children: [
            "Опубликовано ",
            publishedToday,
            "/",
            totalSlots
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[13px] text-muted-foreground tabular-nums", children: nextLabel })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-[3px] w-full bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        width: 0
      }, animate: {
        width: `${progressPct}%`
      }, transition: {
        duration: 0.6,
        ease: easeOut
      }, className: "absolute inset-y-0 left-0 bg-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between text-[12px] text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Интервал публикации: ",
          intervalMin,
          " мин"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "В очереди: ",
          items.length
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4 mb-6", children: ["off-road", "luxury", "sport"].map((cat) => {
      const Icon = CAT_ICON[cat];
      const pct = Math.round(counts[cat] / total * 100);
      return /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { label: CATEGORY_LABEL[cat], value: counts[cat], hint: `${pct}% каталога`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-14 h-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DonutRing, { pct }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "absolute inset-0 m-auto w-4 h-4 text-muted-foreground", strokeWidth: 1.6 })
      ] }) }, cat);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SectionCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] tracking-[0.18em] uppercase text-muted-foreground", children: "Активность" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[18px] font-semibold text-foreground", children: "Последние события" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-muted-foreground", strokeWidth: 1.6 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-[5px] top-2 bottom-2 w-px bg-border" }),
        activity.slice(0, 8).map((e) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "relative pl-7 py-3 first:pt-0 last:pb-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 top-[18px] w-[11px] h-[11px] rounded-full bg-background border border-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row md:items-center md:justify-between gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-[14px] text-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: e.actor }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: e.action })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[12px] text-muted-foreground tabular-nums shrink-0", children: formatRelative(e.at, now) })
          ] })
        ] }, e.id))
      ] })
    ] })
  ] });
}
function DonutRing({
  pct
}) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const off = c - pct / 100 * c;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 56 56", className: "w-full h-full -rotate-90", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "28", cy: "28", r, fill: "none", stroke: "var(--muted)", strokeWidth: "2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "28", cy: "28", r, fill: "none", stroke: "var(--foreground)", strokeWidth: "2", strokeDasharray: c, strokeDashoffset: off, strokeLinecap: "round" })
  ] });
}
export {
  Dashboard as component
};
