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
import { CATEGORIES } from "@/lib/mock/seed";
import { DEFAULT_SIZES, DEFAULT_SECTIONS } from "@/lib/defaults";
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
  title: string;
  thumb: string;
  category: Category;
  file: File;
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
      title: "",
      thumb: URL.createObjectURL(f),
      category: defaultCat,
      file: f,
    }));
    setDrafts((prev) => [...prev, ...next]);
    toast.success(`Добавлено ${files.length} файл${files.length === 1 ? "" : files.length < 5 ? "а" : "ов"}`);
  };

  const removeDraft = (id: string) => setDrafts((prev) => prev.filter((d) => d.id !== id));
  const setDraftCat = (id: string, cat: Category) =>
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, category: cat } : d)));
  const setDraftTitle = (id: string, title: string) =>
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, title } : d)));

  const sendToQueue = () => {
    if (drafts.length === 0) return;
    addBatch(
      drafts.map((d) => ({
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
        files: [d.file],
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
                      <div className="flex flex-col md:flex-row md:items-center gap-4 h-full pr-2 border-b border-border py-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-16 h-16 rounded-[2px] overflow-hidden bg-muted shrink-0">
                            <img src={d.thumb} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <input
                              type="text"
                              value={d.title}
                              onChange={(e) => setDraftTitle(d.id, e.target.value)}
                              placeholder={`Карточка #${row.index + 1}`}
                              className="w-full bg-transparent text-[13px] text-foreground border-b border-transparent focus:border-border/50 outline-none pb-1 transition-colors"
                            />
                            <div className="text-[11px] text-muted-foreground truncate opacity-70 mt-1">{d.file.name}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 pl-0 md:pl-4">
                          <SegmentedControl
                            options={CATEGORIES}
                            value={d.category}
                            onChange={(v) => setDraftCat(d.id, v)}
                            size="sm"
                          />
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
