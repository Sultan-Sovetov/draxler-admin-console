import type { Category } from "@/store/queue.store";

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

export const SEO_TEMPLATE = `Премиальный кованый диск ручной работы.
Идеален для премиум-сегмента.
Размер: R20 / R21 / R22
Доступен под заказ. Срок: 4–6 недель.
Свяжитесь с нами для подбора под ваш авто.`;

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
    images: [placeholderImage(`q-${id}-1`), placeholderImage(`q-${id}-2`)],
    text: SEO_TEMPLATE,
    category: (["luxury", "sport", "off-road"] as Category[])[i % 3],
    tags: sampleTags[i % sampleTags.length],
    paused: false,
    scheduledAt: now + i * 25 * 60_000,
  }));
}

export function makeSeedArchive() {
  const now = Date.now();
  return Array.from({ length: 18 }).map((_, i) => ({
    id: `seed-arc-${i}`,
    images: [placeholderImage(`arc-${i}-1`), placeholderImage(`arc-${i}-2`)],
    text: SEO_TEMPLATE,
    category: (["luxury", "sport", "off-road"] as Category[])[i % 3],
    tags: sampleTags[i % sampleTags.length],
    paused: false,
    scheduledAt: now - (i + 1) * 3600_000,
    publishedAt: now - (i + 1) * 3600_000,
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
