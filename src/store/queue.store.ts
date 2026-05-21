import { create } from "zustand";
import { persist } from "zustand/middleware";
import { recalcSchedule } from "@/lib/schedule";
import { makeSeedQueueItems } from "@/lib/mock/seed";
import { useArchive } from "./archive.store";
import { useActivity } from "./activity.store";
import { publishProduct, toProductInsert } from "@/lib/upload.service";
import { generateNextTitle } from "@/lib/title-generator";

export type Category = "off-road" | "luxury" | "sport";

export type PublishStatus = "idle" | "uploading" | "error" | "success";

export interface QueueItem {
  id: string;
  title: string;
  images: string[];
  sizes: string[];
  section_1_title: string;
  section_1_text: string;
  section_2_title: string;
  section_2_text: string;
  section_3_title: string;
  section_3_text: string;
  section_4_title: string;
  section_4_text: string;
  section_5_title: string;
  section_5_text: string;
  category: Category;
  tags: string[];
  paused: boolean;
  scheduledAt: number;
  files?: File[];
  status?: PublishStatus;
  progress?: string;
  error?: string;
}

export type QueueDraft = Omit<QueueItem, "scheduledAt" | "paused"> & { paused?: boolean };

interface QueueState {
  items: QueueItem[];
  intervalMin: number;
  startAt: number;
  isProcessing: boolean;
  addBatch: (drafts: QueueDraft[]) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
  togglePause: (id: string) => void;
  publishNow: (id: string, actor?: string) => Promise<void>;
  processQueue: (actor?: string) => Promise<void>;
  setInterval: (m: number) => void;
  remove: (id: string) => void;
  update: (id: string, patch: Partial<QueueItem>) => void;
}

function reseed(items: QueueItem[], startAt: number, intervalMin: number): QueueItem[] {
  return recalcSchedule(items, startAt, intervalMin);
}

export const useQueue = create<QueueState>()(
  persist(
    (set, get) => ({
      items: makeSeedQueueItems(),
      intervalMin: 25,
      startAt: Date.now() + 12 * 60_000,
      isProcessing: false,
      addBatch: (drafts) => {
        const { items, startAt, intervalMin } = get();
        const nextItems = [
          ...items,
          ...drafts.map((d) => ({ ...d, paused: d.paused ?? false, scheduledAt: 0 })),
        ];
        set({ items: reseed(nextItems, startAt, intervalMin) });
      },
      reorder: (fromIndex, toIndex) => {
        const { items, startAt, intervalMin } = get();
        const next = items.slice();
        const [moved] = next.splice(fromIndex, 1);
        next.splice(toIndex, 0, moved);
        set({ items: reseed(next, startAt, intervalMin) });
      },
      togglePause: (id) => {
        const { items, startAt, intervalMin } = get();
        const next = items.map((i) => (i.id === id ? { ...i, paused: !i.paused } : i));
        set({ items: reseed(next, startAt, intervalMin) });
      },
      publishNow: async (id, actor = "Система") => {
        const { items, startAt, intervalMin, update, remove } = get();
        const target = items.find((i) => i.id === id);
        if (!target || target.status === "uploading") return;

        update(id, { status: "uploading", error: undefined, progress: "Генерация названия..." });

        try {
          let finalTitle = target.title;
          if (!finalTitle) {
            try {
              finalTitle = await generateNextTitle(target.category);
            } catch {
              finalTitle = `DRX-${Date.now().toString().slice(-4)}`;
            }
          }

          const productData = { ...target, title: finalTitle };
          const payload = toProductInsert(productData);
          const files = target.files || [];

          const product = await publishProduct(payload, files, (msg) => {
            update(id, { progress: msg });
          });

          useArchive.getState().add({
            ...productData,
            productId: product.id,
            publishedAt: Date.now(),
            status: "success",
            progress: "Опубликовано",
            files: undefined,
          });

          remove(id);
          useActivity.getState().log({ actor, action: `опубликовал карточку ${finalTitle} (${target.category})` });
        } catch (error) {
          const msg = error instanceof Error ? error.message : "Неизвестная ошибка";
          update(id, { status: "error", error: msg, progress: undefined });
          throw error;
        }
      },
      processQueue: async (actor = "Система") => {
        if (get().isProcessing) return;
        set({ isProcessing: true });
        
        try {
          const now = Date.now();
          const items = get().items;
          const dueItems = items.filter(
            (i) => !i.paused && i.scheduledAt <= now && i.status !== "uploading" && i.status !== "error"
          );

          for (const item of dueItems) {
            await get().publishNow(item.id, actor);
          }
        } finally {
          set({ isProcessing: false });
        }
      },
      setInterval: (m) => {
        const { items, startAt } = get();
        const intervalMin = Math.max(1, Math.min(720, m));
        set({ intervalMin, items: reseed(items, startAt, intervalMin) });
      },
      remove: (id) => {
        const { items, startAt, intervalMin } = get();
        set({ items: reseed(items.filter((i) => i.id !== id), startAt, intervalMin) });
      },
      update: (id, patch) => {
        const { items, startAt, intervalMin } = get();
        const next = items.map((i) => (i.id === id ? { ...i, ...patch } : i));
        set({ items: reseed(next, startAt, intervalMin) });
      },
    }),
    {
      name: "draxler-queue",
      partialize: (state) => ({
        ...state,
        items: state.items.map((i) => ({ ...i, files: undefined, status: undefined, progress: undefined, error: undefined })),
      }),
    },
  ),
);
