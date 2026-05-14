import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { PageHeader } from "@/components/primitives/PageHeader";
import { SectionCard } from "@/components/primitives/SectionCard";
import { SegmentedControl } from "@/components/primitives/SegmentedControl";
import { EmptyState } from "@/components/primitives/EmptyState";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SingleUploadForm } from "@/components/upload/SingleUploadForm";
import { useArchive, type ArchiveItem } from "@/store/archive.store";
import type { Category } from "@/store/queue.store";
import { CATEGORY_LABEL } from "@/lib/mock/seed";
import { formatDateTime } from "@/lib/format";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { spring } from "@/lib/motion";

export const Route = createFileRoute("/_app/archive")({
  head: () => ({ meta: [{ title: "Архив контента — Draxler" }] }),
  component: ArchivePage,
});

const CAT_OPTIONS: { value: "all" | Category; label: string }[] = [
  { value: "all", label: "Все" },
  { value: "off-road", label: "Off-Road" },
  { value: "luxury", label: "Luxury" },
  { value: "sport", label: "Sport" },
];

function ArchivePage() {
  const items = useArchive((s) => s.items);
  const filters = useArchive((s) => s.filters);
  const setFilter = useArchive((s) => s.setFilter);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [editing, setEditing] = React.useState<ArchiveItem | null>(null);

  const filtered = React.useMemo(() => {
    return items.filter((i) => {
      if (filters.category && i.category !== filters.category) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !i.tags.some((t) => t.includes(q)) &&
          !i.text.toLowerCase().includes(q) &&
          !CATEGORY_LABEL[i.category].toLowerCase().includes(q)
        )
          return false;
      }
      return true;
    });
  }, [items, filters]);

  const catValue: "all" | Category = filters.category ?? "all";

  return (
    <div>
      <PageHeader
        eyebrow="Каталог"
        title="Управление контентом"
        description="Архив всех опубликованных карточек. Фильтруйте, ищите и редактируйте без перехода на отдельную страницу."
      />

      <SectionCard className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative md:max-w-[320px] w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.7} />
            <input
              value={filters.query}
              onChange={(e) => setFilter({ query: e.target.value })}
              placeholder="Поиск по тегам или тексту"
              className="w-full h-11 pl-10 pr-10 rounded-[2px] bg-muted text-[14px] outline-none focus:bg-background focus:ring-1 focus:ring-foreground/20 transition-colors"
            />
            {filters.query && (
              <button
                type="button"
                onClick={() => setFilter({ query: "" })}
                aria-label="Очистить"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full text-muted-foreground hover:text-foreground inline-flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            )}
          </div>
          <SegmentedControl
            options={CAT_OPTIONS}
            value={catValue}
            onChange={(v) => setFilter({ category: v === "all" ? undefined : (v as Category) })}
            size="sm"
          />
        </div>
      </SectionCard>

      {filtered.length === 0 ? (
        <SectionCard>
          <EmptyState
            title="Ничего не найдено"
            description="Измените фильтры или поисковый запрос."
          />
        </SectionCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
          <AnimatePresence initial={false}>
            {filtered.map((it) => (
              <motion.button
                key={it.id}
                type="button"
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={spring}
                onClick={() => setEditing(it)}
                whileHover={{ y: -1 }}
                className="group text-left bg-card rounded-[2px] overflow-hidden focus:outline-none focus:ring-1 focus:ring-foreground/30"
              >
                <div className="aspect-square bg-muted overflow-hidden">
                  <img
                    src={it.images[0]}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-4">
                  <div className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground">
                    {CATEGORY_LABEL[it.category]}
                  </div>
                  <div className="mt-1.5 text-[13px] text-foreground truncate">
                    {it.tags.length > 0 ? it.tags.slice(0, 2).join(" · ") : "Без тегов"}
                  </div>
                  <div className="mt-1 text-[11px] text-muted-foreground tabular-nums">
                    {formatDateTime(it.publishedAt)}
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      <Sheet open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <SheetContent
          side={isDesktop ? "right" : "bottom"}
          className={
            isDesktop
              ? "w-full sm:max-w-[560px] overflow-y-auto bg-background border-l border-border"
              : "h-[92vh] rounded-t-[12px] overflow-y-auto bg-background border-t border-border"
          }
        >
          <SheetHeader className="text-left">
            <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              Редактирование
            </div>
            <SheetTitle className="text-foreground text-[20px] font-semibold tracking-tight">
              Карточка диска
            </SheetTitle>
          </SheetHeader>
          {editing && (
            <div className="mt-6">
              <SingleUploadForm
                mode="edit"
                initial={editing}
                archiveId={editing.id}
                onSaved={() => setEditing(null)}
              />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
