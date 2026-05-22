import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Dropzone } from "@/components/primitives/Dropzone";
import { ImageThumbStrip } from "@/components/primitives/ImageThumbStrip";
import { SegmentedControl } from "@/components/primitives/SegmentedControl";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { TagInput } from "./TagInput";
import { CATEGORIES, placeholderImage } from "@/lib/mock/seed";
import { DEFAULT_SIZES, DEFAULT_SECTIONS } from "@/lib/defaults";
import { generateNextTitle } from "@/lib/title-generator";
import type { Category, QueueItem } from "@/store/queue.store";
import { useQueue } from "@/store/queue.store";
import { useArchive } from "@/store/archive.store";
import { useActivity } from "@/store/activity.store";
import { useAuth } from "@/store/auth.store";
import { publishProduct } from "@/lib/upload.service";

interface SectionState {
  title: string;
  text: string;
}

interface SingleUploadFormProps {
  initial?: Partial<QueueItem>;
  mode?: "create" | "edit";
  onSaved?: () => void;
  archiveId?: string;
}

export function SingleUploadForm({ initial, mode = "create", onSaved, archiveId }: SingleUploadFormProps) {
  const navigate = useNavigate();
  const updateArchive = useArchive((s) => s.update);
  const updateInSupabase = useArchive((s) => s.updateInSupabase);
  const updateQueue = useQueue((s) => s.update);
  const log = useActivity((s) => s.log);
  const actor = useAuth((s) => s.user?.name ?? "Система");

  const [images, setImages] = React.useState<string[]>(initial?.images ?? []);
  const [files, setFiles] = React.useState<File[]>([]);
  const [title, setTitle] = React.useState<string>(initial?.title ?? "");
  const [category, setCategory] = React.useState<Category>(initial?.category ?? "luxury");
  const [tags, setTags] = React.useState<string[]>(initial?.tags ?? []);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [progress, setProgress] = React.useState("");

  // Sizes state
  const [sizes, setSizes] = React.useState<string[]>(() => {
    if (initial?.sizes && initial.sizes.length > 0) return initial.sizes;
    return [...DEFAULT_SIZES];
  });

  // 5 sections state
  const [sections, setSections] = React.useState<SectionState[]>(() => {
    if (initial?.section_1_title !== undefined) {
      return [
        { title: initial.section_1_title ?? "", text: initial.section_1_text ?? "" },
        { title: initial.section_2_title ?? "", text: initial.section_2_text ?? "" },
        { title: initial.section_3_title ?? "", text: initial.section_3_text ?? "" },
        { title: initial.section_4_title ?? "", text: initial.section_4_text ?? "" },
        { title: initial.section_5_title ?? "", text: initial.section_5_text ?? "" },
      ];
    }
    return DEFAULT_SECTIONS.map((s) => ({ title: s.title, text: s.text }));
  });

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size],
    );
  };

  const updateSection = (index: number, field: "title" | "text", value: string) => {
    setSections((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  };

  const handleFiles = (incomingFiles: File[]) => {
    const urls = incomingFiles.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
    setFiles((prev) => [...prev, ...incomingFiles]);
  };

  const removeImage = (index: number) => {
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

  /** Build the flat section fields for store / DB */
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
    section_5_text: sections[4].text,
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalImages = images.length > 0 ? images : [placeholderImage(`u-${Date.now()}`)];

    if (mode === "edit" && initial?.id) {
      const patch = {
        title,
        images: finalImages,
        category,
        tags,
        sizes,
        ...sectionFields(),
      };
      if (archiveId) {
        try {
          await updateInSupabase(initial.id, patch);
        } catch {
          // Fallback to local update on DB error
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
      // Auto-generate DRX-XXX title
      setProgress("Генерация названия...");
      let autoTitle: string;
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
          ...sectionFields(),
        },
        files,
        setProgress,
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

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Images */}
      <div className="space-y-3">
        <div className="text-[11px] tracking-wider uppercase text-muted-foreground">Изображения</div>
        <Dropzone variant="single" onFiles={handleFiles} hint="JPG, PNG, WEBP. Можно загрузить несколько фото." />
        <ImageThumbStrip
          images={images}
          onRemove={isSubmitting ? undefined : removeImage}
        />
      </div>

      {/* Title (read-only in edit mode, auto-generated in create mode) */}
      {mode === "edit" && (
        <div>
          <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-2">Название (Title)</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isSubmitting}
            placeholder="DRX-XXX (авто)"
            className="w-full bg-card rounded-[2px] px-4 py-3 text-[14px] leading-relaxed text-foreground outline-none border-0 focus:bg-muted/70 transition-colors"
          />
        </div>
      )}

      {mode === "create" && (
        <div className="flex items-center gap-3 px-4 py-3 bg-card rounded-[2px]">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[13px] text-muted-foreground">
            Название генерируется автоматически (DRX-XXX) при публикации
          </span>
        </div>
      )}

      {/* Category */}
      <div>
        <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-2">Категория</div>
        <SegmentedControl options={CATEGORIES} value={category} onChange={setCategory} />
      </div>

      {/* Sizes selector */}
      <div>
        <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-3">Размеры дисков</div>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_SIZES.map((size) => {
            const isChecked = sizes.includes(size);
            return (
              <label
                key={size}
                className={`
                  inline-flex items-center gap-2 px-3 py-2 rounded-[2px] cursor-pointer
                  transition-all duration-150 select-none text-[13px]
                  ${isChecked
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "bg-card text-muted-foreground border border-transparent hover:bg-muted/70"
                  }
                `}
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleSize(size)}
                  disabled={isSubmitting}
                  className="h-3.5 w-3.5"
                />
                <span className="font-medium">{size}</span>
              </label>
            );
          })}
        </div>
        <div className="mt-2 text-[11px] text-muted-foreground">
          Выбрано: {sizes.length} из {DEFAULT_SIZES.length}
        </div>
      </div>

      {/* 5 Sections (Accordion) */}
      <div>
        <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-3">Разделы описания</div>
        <Accordion type="multiple" className="border border-border rounded-[2px] overflow-hidden">
          {sections.map((section, idx) => (
            <AccordionItem key={idx} value={`section-${idx}`} className="border-b border-border last:border-b-0">
              <AccordionTrigger className="px-4 py-3 text-[13px] font-medium tracking-[0.02em] hover:no-underline hover:bg-muted/40 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                    {idx + 1}
                  </span>
                  <span className="truncate">{section.title || `Раздел ${idx + 1}`}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="space-y-3">
                  <div>
                    <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-1.5">Заголовок</div>
                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) => updateSection(idx, "title", e.target.value)}
                      disabled={isSubmitting}
                      placeholder={`Заголовок раздела ${idx + 1}`}
                      className="w-full bg-muted/50 rounded-[2px] px-3 py-2.5 text-[13px] leading-relaxed text-foreground outline-none border-0 focus:bg-muted transition-colors"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-1.5">Текст</div>
                    <textarea
                      value={section.text}
                      onChange={(e) => updateSection(idx, "text", e.target.value)}
                      disabled={isSubmitting}
                      rows={6}
                      className="w-full bg-muted/50 rounded-[2px] px-3 py-2.5 text-[13px] leading-relaxed text-foreground outline-none border-0 focus:bg-muted transition-colors resize-y"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Tags */}
      <TagInput value={tags} onChange={setTags} />

      {/* Progress */}
      {progress && <div className="text-[13px] text-muted-foreground">{progress}</div>}

      {/* Submit */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 px-7 rounded-[2px] bg-primary text-primary-foreground text-[14px] font-medium tracking-[0.02em] hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Публикация..." : mode === "edit" ? "Сохранить" : "Опубликовать"}
        </button>
      </div>
    </form>
  );
}
