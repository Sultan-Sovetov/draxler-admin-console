import { create } from "zustand";
import { persist } from "zustand/middleware";
import { makeSeedActivity } from "@/lib/mock/seed";

export interface ActivityEntry {
  id: string;
  actor: string;
  action: string;
  at: number;
}

interface ActivityState {
  entries: ActivityEntry[];
  log: (e: { actor: string; action: string }) => void;
  clear: () => void;
}

export const useActivity = create<ActivityState>()(
  persist(
    (set) => ({
      entries: makeSeedActivity(),
      log: (e) =>
        set((s) => ({
          entries: [
            { id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, at: Date.now(), ...e },
            ...s.entries,
          ].slice(0, 50),
        })),
      clear: () => set({ entries: [] }),
    }),
    { name: "draxler-activity" },
  ),
);
