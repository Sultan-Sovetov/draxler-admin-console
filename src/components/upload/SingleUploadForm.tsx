import * as React from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Dropzone } from "@/components/primitives/Dropzone";
import { ImageThumbStrip } from "@/components/primitives/ImageThumbStrip";
import { SegmentedControl } from "@/components/primitives/SegmentedControl";
import { TagInput } from "./TagInput";
import { CATEGORIES, SEO_TEMPLATE, placeholderImage } from "@/lib/mock/seed";
import type { Category, QueueItem } from "@/store/queue.store";
import { useQueue } from "@/store/queue.store";
import { useArchive } from "@/store/archive.store";
import { useActivity } from "@/store/activity.store";
import { useAuth } from "@/store/auth.store";

interface SingleUploadFormProps {
  initial?: Partial<QueueItem>;
  mode?: "create" | "edit";
  onSaved?: () => void;
  archiveId?: string;
}

export function SingleUploadForm({ initial, mode = "create", onSaved, archiveId }: SingleUploadFormProps) {
  const navigate = useNavigate();
  const addBatch = useQueue((s) => s.addBatch);
  const updateArchive = useArchive((s) => s.update);
  const updateQueue = useQueue((s) => s.update);
  const log = useActivity((s) => s.log);
  const actor = useAuth((s) => s.user?.name ?? "Система");

  const [images, setImages] = React.useState<string[]>(initial?.images ?? []);
  const [text, setText] = React.useState<string>(initial?.text ?? SEO_TEMPLATE);
  const [category, setCategory] = React.useState<Category>(initial?.category ?? "luxury");
  const [tags, setTags] = React.useState<string[]>(initial?.tags ?? []);

  const handleFiles = (files: File[]) => {
    const urls = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalImages = images.length > 0 ? images : [placeholderImage(`u-${Date.now()}`)];

    if (mode === "edit" && initial?.id) {
      const patch = { images: finalImages, text, category, tags };
      if (archiveId) updateArchive(initial.id, patch);
      else updateQueue(initial.id, patch);
      log({ actor, action: `обновил карточку диска ${category}` });
      toast.success("Сохранено");
      onSaved?.();
      return;
    }

    addBatch([
      {
        id: `u-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        images: finalImages,
        text,
        category,
        tags,
      },
    ]);
    log({ actor, action: `опубликовал одиночную карточку (${category})` });
    toast.success("Добавлено в очередь");
    navigate({ to: "/queue" });
  };

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="space-y-3">
        <div className="text-[11px] tracking-wider uppercase text-muted-foreground">Изображения</div>
        <Dropzone variant="single" onFiles={handleFiles} hint="JPG, PNG, WEBP. Можно загрузить несколько фото." />
        <ImageThumbStrip
          images={images}
          onRemove={(i) => setImages(images.filter((_, idx) => idx !== i))}
        />
      </div>

      <div>
        <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-2">Категория</div>
        <SegmentedControl options={CATEGORIES} value={category} onChange={setCategory} />
      </div>

      <div>
        <div className="text-[11px] tracking-wider uppercase text-muted-foreground mb-2">Описание (SEO)</div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={7}
          className="w-full bg-card rounded-[2px] px-4 py-3 text-[14px] leading-relaxed text-foreground outline-none border-0 focus:bg-muted/70 transition-colors resize-y"
        />
      </div>

      <TagInput value={tags} onChange={setTags} />

      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="submit"
          className="h-12 px-7 rounded-[2px] bg-primary text-primary-foreground text-[14px] font-medium tracking-[0.02em] hover:bg-primary/90 transition-colors"
        >
          {mode === "edit" ? "Сохранить" : "Опубликовать"}
        </button>
      </div>
    </form>
  );
}
