import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { useVirtualizer } from "@tanstack/react-virtual";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Trash2, Send, Plus, X } from "lucide-react";
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
import { uploadImageToCloudinary } from "@/lib/upload.service";

export const Route = createFileRoute("/_app/batch")({
  head: () => ({ meta: [{ title: "Пакетная загрузка — Draxler" }] }),
  component: BatchPage,
});

interface Draft {
  id: string;
  title: string;
  category: Category;
  thumbs: string[];
  files: File[];
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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleInitialFiles = (files: File[]) => {
    // Create one Draft per file by default to preserve the old drag-and-drop behavior,
    // but now users can add more files to each Draft later.
    const next: Draft[] = files.map((f) => ({
      id: `d-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: "",
      thumbs: [URL.createObjectURL(f)],
      files: [f],
      category: defaultCat,
    }));
    setDrafts((prev) => [...prev, ...next]);
    toast.success(`Добавлено ${files.length} изображений`);
  };

  const removeDraft = (id: string) => setDrafts((prev) => prev.filter((d) => d.id !== id));

  const setDraftCat = (id: string, cat: Category) =>
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, category: cat } : d)));

  const setDraftTitle = (id: string, title: string) =>
    setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, title } : d)));

  const addFilesToDraft = (id: string, newFiles: File[]) => {
    setDrafts((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const thumbs = [...d.thumbs, ...newFiles.map((f) => URL.createObjectURL(f))];
        return { ...d, thumbs, files: [...d.files, ...newFiles] };
      }),
    );
  };

  const removeThumbFromDraft = (id: string, thumbIndex: number) => {
    setDrafts((prev) =>
      prev.map((d) => {
        if (d.id !== id) return d;
        const newThumbs = d.thumbs.filter((_, idx) => idx !== thumbIndex);
        const newFiles = d.files.filter((_, idx) => idx !== thumbIndex);
        if (newThumbs.length === 0) return d; // Prevent removing the last image entirely here
        return { ...d, thumbs: newThumbs, files: newFiles };
      }),
    );
  };

  const sendToQueue = async () => {
    if (drafts.length === 0) return;
    setIsSubmitting(true);

    toast.info("Загрузка файлов в облако...");

    try {
      const finalPayloads = [];

      for (const d of drafts) {
        // First, upload all files in this draft to Cloudinary sequentially (or Promise.all)
        const uploadedUrls = await Promise.all(d.files.map((f) => uploadImageToCloudinary(f)));

        finalPayloads.push({
          id: d.id,
          title: d.title,
          images: uploadedUrls, // Send Cloudinary URLs directly!
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
        });
      }

      // Add to store (which now inserts into Supabase queue table)
      await addBatch(finalPayloads);

      log({ actor, action: `загрузил батч (${drafts.length} шт.)` });
      toast.success(`Добавлено ${drafts.length} в очередь`);
      setDrafts([]);
      navigate({ to: "/queue" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Ошибка при загрузке");
    } finally {
      setIsSubmitting(false);
    }
  };

  const parentRef = React.useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: drafts.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 140, // Increased size to fit multiple thumbnails
    overscan: 8,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: dur.base, ease: easeOut }}
      className="pb-10"
    >
      <PageHeader
        eyebrow="Контент"
        title="Пакетная загрузка"
        description="Загрузите до 500 изображений. Добавляйте несколько фотографий к одной карточке."
        actions={
          drafts.length > 0 && (
            <button
              type="button"
              onClick={sendToQueue}
              disabled={isSubmitting}
              className="h-11 px-5 rounded-[2px] bg-primary text-primary-foreground text-[13px] font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              <Send className="w-4 h-4" strokeWidth={1.8} />
              {isSubmitting ? "Загрузка..." : `Отправить в очередь (${drafts.length})`}
            </button>
          )
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mb-6">
        <SectionCard>
          <Dropzone variant="batch" onFiles={handleInitialFiles} />
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="text-[11px] tracking-wider uppercase text-muted-foreground">
              Категория по умолчанию
            </div>
            <SegmentedControl
              options={CATEGORIES}
              value={defaultCat}
              onChange={setDefaultCat}
              size="sm"
            />
          </div>
        </SectionCard>
        <IntervalConfigurator value={intervalMin} onChange={setInterval} />
      </div>

      <SectionCard>
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              Загружено
            </div>
            <div className="mt-1 text-[18px] font-semibold text-foreground">
              {drafts.length} карточек
            </div>
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
          <div ref={parentRef} className="h-[600px] overflow-auto">
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
                      <div className="flex flex-col gap-3 pr-2 border-b border-border py-4 h-full">
                        <div className="flex flex-col md:flex-row md:items-start gap-4 flex-1">
                          {/* Image Gallery */}
                          <div className="flex flex-wrap items-center gap-2 max-w-[320px]">
                            {d.thumbs.map((thumb, idx) => (
                              <div
                                key={idx}
                                className="w-14 h-14 rounded-[2px] overflow-hidden bg-muted shrink-0 relative group"
                              >
                                <img src={thumb} alt="" className="w-full h-full object-cover" />
                                {d.thumbs.length > 1 && (
                                  <button
                                    onClick={() => removeThumbFromDraft(d.id, idx)}
                                    className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                            ))}
                            {/* Option to add more files to this draft */}
                            <label className="w-14 h-14 rounded-[2px] border border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
                              <Plus className="w-5 h-5" />
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  if (e.target.files)
                                    addFilesToDraft(d.id, Array.from(e.target.files));
                                }}
                              />
                            </label>
                          </div>

                          <div className="min-w-0 flex-1 md:mt-2">
                            <input
                              type="text"
                              value={d.title}
                              onChange={(e) => setDraftTitle(d.id, e.target.value)}
                              placeholder={`Карточка #${row.index + 1}`}
                              className="w-full bg-transparent text-[13px] text-foreground border-b border-transparent focus:border-border/50 outline-none pb-1 transition-colors font-medium"
                            />
                            <div className="text-[11px] text-muted-foreground truncate opacity-70 mt-1">
                              {d.files.length} фото
                            </div>
                          </div>

                          <div className="flex items-center gap-4 pl-0 md:pl-4 md:mt-2 shrink-0">
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
                              className="w-10 h-10 rounded-full text-muted-foreground hover:text-destructive hover:bg-muted inline-flex items-center justify-center transition-colors"
                            >
                              <Trash2 className="w-4 h-4" strokeWidth={1.7} />
                            </button>
                          </div>
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
