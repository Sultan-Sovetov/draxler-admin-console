import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Trash2, Send } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/primitives/PageHeader";
import { SectionCard } from "@/components/primitives/SectionCard";
import { Dropzone } from "@/components/primitives/Dropzone";
import { SegmentedControl } from "@/components/primitives/SegmentedControl";
import { IntervalConfigurator } from "@/components/batch/IntervalConfigurator";
import { CATEGORIES, SEO_TEMPLATE } from "@/lib/mock/seed";
import type { Category } from "@/store/queue.store";
import { useQueue } from "@/store/queue.store";
import { useActivity } from "@/store/activity.store";
import { useAuth } from "@/store/auth.store";
import { dur, easeOut } from "@/lib/motion";
import { EmptyState } from "@/components/primitives/EmptyState";

export const Route = createFileRoute("/_app/batch")({
  head: () => ({ meta: [{ title: "Пакетная загрузка — Draxler" }] }),
  component: BatchPage,
});

interface Draft {
  id: string;
  thumb: string;
  category: Category;
}

function BatchPage() {
  const navigate = useNavigate();
  const intervalMin = useQueue((s) => s.intervalMin);
  const setInterval = useQueue((s) => s.setInterval);
  const addBatch = useQueue((s) => s.addBatch);
  const log = useActivity((s) => s.log);
  const actor = useAuth((s) => s.user?.name ?? "Система");

  const [drafts, setDrafts] = React.useState<Draft[]>([]);
  const [defaultCat, setDefaultCat] = React.useState<Category>("luxury");

  const handleFiles = (files: File[]) => {
    const next: Draft[] = files.map((f) => ({
      id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      thumb: URL.createObjectURL(f),
      category: defaultCat,
    }));
    setDrafts((prev) => [...prev, ...next]);
    toast.success(`Добавлено ${files.length} файл${files.length === 1 ? "" : files.length < 5 ? "а" : "ов"}`);
  };

  const removeDraft = (id: string) => setDrafts((prev) => prev.filter((d) => d.id !== id));
  const setDraftCat = (id: string, cat: Category) =>
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, category: cat } : d)));

  const sendToQueue = () => {
    if (drafts.length === 0) return;
    addBatch(
      drafts.map((d) => ({
        id: d.id,
        images: [d.thumb],
        text: SEO_TEMPLATE,
        category: d.category,
        tags: [],
      })),
    );
    log({ actor, action: `загрузил батч (${drafts.length} шт.)` });
    toast.success(`Добавлено ${drafts.length} в очередь`);
    setDrafts([]);
    navigate({ to: "/queue" });
  };

  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: drafts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 96,
    overscan: 8,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dur.base, ease: easeOut }}
    >
      <PageHeader
        eyebrow="Контент"
        title="Пакетная загрузка"
        description="Загрузите до 500 изображений, задайте интервал, отправьте в очередь."
        actions={
          drafts.length > 0 && (
            <button
              type="button"
              onClick={sendToQueue}
              className="h-11 px-5 rounded-[2px] bg-primary text-primary-foreground text-[13px] font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" strokeWidth={1.8} />
              Отправить в очередь ({drafts.length})
            </button>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-6">
        <SectionCard>
          <Dropzone variant="batch" onFiles={handleFiles} />
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-[11px] tracking-wider uppercase text-muted-foreground">
              Категория по умолчанию
            </div>
            <SegmentedControl options={CATEGORIES} value={defaultCat} onChange={setDefaultCat} size="sm" />
          </div>
        </SectionCard>
        <IntervalConfigurator value={intervalMin} onChange={setInterval} />
      </div>

      <SectionCard>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">Загружено</div>
            <div className="mt-1 text-[18px] font-semibold text-foreground">{drafts.length} карточек</div>
          </div>
          {drafts.length > 0 && (
            <button
              type="button"
              onClick={() => setDrafts([])}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
            >
              Очистить всё
            </button>
          )}
        </div>

        {drafts.length === 0 ? (
          <EmptyState
            title="Пока ничего не загружено"
            description="Перетащите изображения в зону загрузки выше, чтобы создать карточки."
          />
        ) : (
          <div ref={parentRef} className="h-[520px] overflow-auto">
            <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}>
              <AnimatePresence initial={false}>
                {rowVirtualizer.getVirtualItems().map((row) => {
                  const d = drafts[row.index];
                  if (!d) return null;
                  return (
                    <div
                      key={d.id}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        transform: `translateY(${row.start}px)`,
                        height: row.size,
                      }}
                    >
                      <div className="flex items-center gap-4 h-full pr-2 border-b border-border">
                        <div className="w-16 h-16 rounded-[2px] overflow-hidden bg-muted shrink-0">
                          <img src={d.thumb} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-[13px] text-foreground truncate">
                            Карточка #{row.index + 1}
                          </div>
                          <div className="text-[11px] text-muted-foreground truncate">id: {d.id}</div>
                        </div>
                        <div className="hidden md:block">
                          <SegmentedControl
                            options={CATEGORIES}
                            value={d.category}
                            onChange={(v) => setDraftCat(d.id, v)}
                            size="sm"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeDraft(d.id)}
                          aria-label="Удалить"
                          className="w-11 h-11 rounded-full text-muted-foreground hover:text-destructive hover:bg-muted inline-flex items-center justify-center transition-colors"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.7} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </SectionCard>
    </motion.div>
  );
}
