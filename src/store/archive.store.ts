import { create } from "zustand";
import { persist } from "zustand/middleware";
import { makeSeedArchive } from "@/lib/mock/seed";
import type { Category, QueueItem } from "./queue.store";

export interface ArchiveItem extends QueueItem {
  publishedAt: number;
}

interface ArchiveFilters {
  category?: Category;
  query: string;
  tag?: string;
}

interface ArchiveState {
  items: ArchiveItem[];
  filters: ArchiveFilters;
  add: (item: ArchiveItem) => void;
  update: (id: string, patch: Partial<ArchiveItem>) => void;
  remove: (id: string) => void;
  setFilter: (patch: Partial<ArchiveFilters>) => void;
  clearFilters: () => void;
}

export const useArchive = create<ArchiveState>()(
  persist(
    (set) => ({
      items: makeSeedArchive(),
      filters: { query: "" },
      add: (item) => set((s) => ({ items: [item, ...s.items] })),
      update: (id, patch) =>
        set((s) => ({ items: s.items.map((i) => (i.id === id ? { ...i, ...patch } : i)) })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setFilter: (patch) => set((s) => ({ filters: { ...s.filters, ...patch } })),
      clearFilters: () => set({ filters: { query: "" } }),
    }),
    { name: "draxler-archive" },
  ),
);
