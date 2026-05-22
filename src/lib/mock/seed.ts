import type { Category } from "@/store/queue.store";
import { DEFAULT_SIZES, DEFAULT_SECTIONS } from "@/lib/defaults";

export const CATEGORIES: { value: Category; label: string }[] = [
  { value: "off-road", label: "Off-Road" },
  { value: "luxury", label: "Luxury" },
  { value: "sport", label: "Sport" },
];

export const CATEGORY_LABEL: Record<Category, string> = {
  "off-road": "Off-Road",
  luxury: "Luxury",
  sport: "Sport",
};

export function placeholderImage(seed: string, w = 800, h = 800): string {
  return `https://picsum.photos/seed/draxler-${seed}/${w}/${h}`;
}

const sampleTags = [
  ["для бмв 7", "ковка", "r21"],
  ["mercedes s-class", "ковка", "r22"],
  ["range rover", "off-road", "r20"],
  ["porsche", "sport", "r21"],
  ["audi", "luxury", "r20"],
  ["g-wagon", "off-road", "r22"],
];

export function makeSeedQueueItems() {
  const now = Date.now();
  const ids = ["a1", "a2", "a3", "a4", "a5", "a6"];
  return ids.map((id, i) => ({
    id: `seed-q-${id}`,
    title: `Кованые диски ${(["luxury", "sport", "off-road"] as Category[])[i % 3].toUpperCase()}`,
    images: [placeholderImage(`q-${id}-1`), placeholderImage(`q-${id}-2`)],
    sizes: DEFAULT_SIZES,
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
    category: (["luxury", "sport", "off-road"] as Category[])[i % 3],
    tags: sampleTags[i % sampleTags.length],
    paused: false,
    scheduledAt: now + i * 25 * 60_000,
  }));
}

export function makeSeedActivity() {
  const now = Date.now();
  return [
    { id: "act-1", actor: "Sultan", action: "загрузил батч (100 шт.)", at: now - 12 * 60_000 },
    { id: "act-2", actor: "Tamirlan", action: "опубликовал диск Luxury", at: now - 38 * 60_000 },
    { id: "act-3", actor: "Sultan", action: "изменил порядок очереди", at: now - 95 * 60_000 },
    { id: "act-4", actor: "Tamirlan", action: "поставил публикацию на паузу", at: now - 4 * 3600_000 },
    { id: "act-5", actor: "Sultan", action: "обновил описание Off-Road", at: now - 8 * 3600_000 },
  ];
}
