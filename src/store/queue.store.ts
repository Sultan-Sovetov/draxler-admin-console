import { create } from "zustand";
import { persist } from "zustand/middleware";
import { recalcSchedule } from "@/lib/schedule";
import { makeSeedQueueItems } from "@/lib/mock/seed";
import { useArchive } from "./archive.store";
import { useActivity } from "./activity.store";

export type Category = "off-road" | "luxury" | "sport";

export interface QueueItem {
  id: string;
  images: string[];
  text: string;
  category: Category;
  tags: string[];
  paused: boolean;
  scheduledAt: number;
}

export type QueueDraft = Omit<QueueItem, "scheduledAt" | "paused"> & { paused?: boolean };

interface QueueState {
  items: QueueItem[];
  intervalMin: number;
  startAt: number;
  addBatch: (drafts: QueueDraft[]) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
  togglePause: (id: string) => void;
  publishNow: (id: string, actor?: string) => void;
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
      publishNow: (id, actor = "Система") => {
        const { items, startAt, intervalMin } = get();
        const target = items.find((i) => i.id === id);
        if (!target) return;
        const next = items.filter((i) => i.id !== id);
        set({ items: reseed(next, startAt, intervalMin) });
        useArchive.getState().add({ ...target, publishedAt: Date.now() });
        useActivity.getState().log({ actor, action: `опубликовал вне очереди диск ${target.category}` });
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
    { name: "draxler-queue" },
  ),
);
