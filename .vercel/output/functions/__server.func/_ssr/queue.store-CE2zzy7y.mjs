import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as cn } from "./motion-BPr3pHv4.mjs";
import { c as create, p as persist } from "../_libs/zustand.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
function PageHeader({ eyebrow, title, description, actions }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-3", children: eyebrow }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-foreground", children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-xl text-[15px] text-muted-foreground", children: description })
    ] }),
    actions && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 shrink-0", children: actions })
  ] });
}
function SectionCard({ tone = "flat", className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "bg-card rounded-[2px] p-6 md:p-8",
        tone === "raised" && "shadow-elevated",
        className
      ),
      ...props
    }
  );
}
function recalcSchedule(items, startAt, intervalMin) {
  let slot = 0;
  const stepMs = intervalMin * 6e4;
  return items.map((item) => {
    if (item.paused) return { ...item, scheduledAt: 0 };
    const next = { ...item, scheduledAt: startAt + slot * stepMs };
    slot += 1;
    return next;
  });
}
const DEFAULT_SIZES = [
  '16"',
  '17"',
  '18"',
  '19"',
  '20"',
  '21"',
  '22"',
  '23"',
  '24"',
  '25"',
  '26"'
];
const DEFAULT_SECTIONS = [
  {
    title: "DESCRIPTION",
    text: `Exclusive Custom Forged Wheels Tailored to Your Vehicle
Any wheel design presented can be custom-made for your car in any size and color configuration. To ensure a 100% perfect fitment before manufacturing begins, we provide precise 3D wheel renderings based on your vehicle's exact dimensions and specifications.
Available Wheel Configurations:
 - Monoblock wheels
 - 2-piece and 3-piece modular wheels
 - Beadlock wheels for drag racing and off-road applications`
  },
  {
    title: "PREMIUM MATERIALS & ENGINEERING SPECIFICATIONS",
    text: `At DRAXLER, we engineer and manufacture premium custom forged wheels with an uncompromising attention to detail.
Aerospace-Grade 6061-T6 Forged Aluminum: Our forged billet blanks are produced using high-pressure forging (up to 12,000 tons). This refines the grain structure, minimizes porosity, and delivers an exceptional strength-to-weight ratio.
Forged Magnesium Option: For hardcore motorsport applications, wheels can be manufactured from ultra-lightweight forged magnesium to significantly reduce unsprung mass and improve track performance.
Any Size & Fitment (15" to 30"): Fully customizable diameters, widths, offsets (ET), center bores (DIA), bolt patterns (PCD), and centerlock setups. We calculate perfect geometry for both staggered and square setups-ranging from OEM-spec to flush, mild, or aggressive fitments.
Maximum Compatibility: Engineered for seamless integration with OEM brake systems and Big Brake Kits (BBK), with precise caliper clearances calculated for every application. Fully compatible with factory OE TPMS sensors and factory lug hardware.
Strict Quality Control & Global Standards: Our manufacturing processes and testing align with leading JWL and VIA compliance benchmarks. Every wheel undergoes rigorous checks for radial/lateral runout, roundness, balance, and finish consistency.`
  },
  {
    title: "CUSTOM DESIGNS & PREMIUM FINISHES (OPTIONS)",
    text: `Every finish undergoes a multi-stage surface preparation process, followed by premium clear-coat or tinted-clear applications for maximum depth and long-term corrosion resistance.
Standard Finishes: Brushed, polished, satin or gloss clear, precision-machined or milled accents, dual-tone, and advanced chrome options (including gold, black, and electroplated chrome).
Exclusive Upgrades (Available at extra cost):
 - Wheel widths above 11.5J
 - Carbon fiber barrels and aerodynamic covers (aero-disc)
 - Titanium lug nuts
 - Weight-saving pocket cut-outs and drilled spokes
 - Floating spinning center caps and custom alloy caps with a milled logo
 - Racing-spec knurled bead seats to prevent tire slippage`
  },
  {
    title: "WARRANTY & CUSTOMER SERVICE",
    text: `LIFETIME Structural Warranty
Guaranteed perfect fitment for your specific vehicle
Excellent wheel balance and absolute roundness guaranteed
Exceptional, personalized after-sales support`
  },
  {
    title: "SECURE PAYMENT & WORLDWIDE SHIPPING",
    text: `Secured Payment Methods:
PayPal (+4.4% fee) | Visa / Mastercard / American Express (via PayPal)
Bank Wire Transfer (SWIFT)
Cryptocurrency (USDT, BTC, ETH)
Alipay / WeChat
Global Shipping Options:
 - Express Delivery: Fast shipping via DHL, UPS, TNT, or FedEx.
 - AIR Shipping (10–15 days): Customs clearance included. Available for the USA,  - UK, Australia, EU countries, and select Asian destinations.
- SEA Shipping (25–45 days): Customs clearance included. Contact us to verify availability for your country.
 - Delivery is available directly to your local international airport or seaport.`
  }
];
const CATEGORY_BASE_NUMBERS = {
  luxury: 116,
  "off-road": 314,
  sport: 213
};
const CATEGORIES = [
  { value: "off-road", label: "Off-Road" },
  { value: "luxury", label: "Luxury" },
  { value: "sport", label: "Sport" }
];
const CATEGORY_LABEL = {
  "off-road": "Off-Road",
  luxury: "Luxury",
  sport: "Sport"
};
function placeholderImage(seed, w = 800, h = 800) {
  return `https://picsum.photos/seed/draxler-${seed}/${w}/${h}`;
}
const sampleTags = [
  ["для бмв 7", "ковка", "r21"],
  ["mercedes s-class", "ковка", "r22"],
  ["range rover", "off-road", "r20"],
  ["porsche", "sport", "r21"],
  ["audi", "luxury", "r20"],
  ["g-wagon", "off-road", "r22"]
];
function makeSeedQueueItems() {
  const now = Date.now();
  const ids = ["a1", "a2", "a3", "a4", "a5", "a6"];
  return ids.map((id, i) => ({
    id: `seed-q-${id}`,
    title: `Кованые диски ${["luxury", "sport", "off-road"][i % 3].toUpperCase()}`,
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
    category: ["luxury", "sport", "off-road"][i % 3],
    tags: sampleTags[i % sampleTags.length],
    paused: false,
    scheduledAt: now + i * 25 * 6e4
  }));
}
function makeSeedActivity() {
  const now = Date.now();
  return [
    { id: "act-1", actor: "Sultan", action: "загрузил батч (100 шт.)", at: now - 12 * 6e4 },
    { id: "act-2", actor: "Tamirlan", action: "опубликовал диск Luxury", at: now - 38 * 6e4 },
    { id: "act-3", actor: "Sultan", action: "изменил порядок очереди", at: now - 95 * 6e4 },
    { id: "act-4", actor: "Tamirlan", action: "поставил публикацию на паузу", at: now - 4 * 36e5 },
    { id: "act-5", actor: "Sultan", action: "обновил описание Off-Road", at: now - 8 * 36e5 }
  ];
}
const supabaseUrl = "https://grtwkchomekmkriggdbr.supabase.co";
const supabaseKey = "sb_publishable_E3P181YKzn4ILKVA4d3KeQ_R2OCj6Q0";
const supabase = createClient(supabaseUrl, supabaseKey);
function mapProductToArchiveItem(product, imageUrls) {
  let tags = [];
  try {
    const parsed = JSON.parse(product.parameters || "{}");
    tags = parsed.tags ?? [];
  } catch {
  }
  return {
    id: `archive-${product.id}`,
    productId: product.id,
    title: product.title,
    images: imageUrls.length > 0 ? imageUrls : [],
    sizes: product.sizes ?? [],
    section_1_title: product.section_1_title ?? "",
    section_1_text: product.section_1_text ?? "",
    section_2_title: product.section_2_title ?? "",
    section_2_text: product.section_2_text ?? "",
    section_3_title: product.section_3_title ?? "",
    section_3_text: product.section_3_text ?? "",
    section_4_title: product.section_4_title ?? "",
    section_4_text: product.section_4_text ?? "",
    section_5_title: product.section_5_title ?? "",
    section_5_text: product.section_5_text ?? "",
    category: product.type ?? "luxury",
    tags,
    paused: false,
    scheduledAt: 0,
    status: "success",
    progress: "Опубликовано",
    publishedAt: new Date(product.created_at).getTime()
  };
}
const useArchive = create()(
  persist(
    (set, get) => ({
      items: [],
      filters: { query: "" },
      isLoading: false,
      hasFetched: false,
      add: (item) => set((s) => ({ items: [item, ...s.items] })),
      update: (id, patch) => set((s) => ({ items: s.items.map((i) => i.id === id ? { ...i, ...patch } : i) })),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setFilter: (patch) => set((s) => ({ filters: { ...s.filters, ...patch } })),
      clearFilters: () => set({ filters: { query: "" } }),
      fetchFromSupabase: async () => {
        set({ isLoading: true });
        try {
          const { data: products, error: productsError } = await supabase.from("products").select("*").order("created_at", { ascending: false });
          if (productsError) {
            console.error("Failed to fetch products:", productsError.message);
            set({ isLoading: false, hasFetched: true });
            return;
          }
          if (!products || products.length === 0) {
            set({ items: [], isLoading: false, hasFetched: true });
            return;
          }
          const productIds = products.map((p) => p.id);
          const { data: images } = await supabase.from("product_images").select("product_id, image_url").in("product_id", productIds);
          const imageMap = /* @__PURE__ */ new Map();
          if (images) {
            for (const img of images) {
              const existing = imageMap.get(img.product_id) ?? [];
              existing.push(img.image_url);
              imageMap.set(img.product_id, existing);
            }
          }
          const archiveItems = products.map(
            (p) => mapProductToArchiveItem(p, imageMap.get(p.id) ?? [])
          );
          set({ items: archiveItems, isLoading: false, hasFetched: true });
        } catch (error) {
          console.error("Archive fetch error:", error);
          set({ isLoading: false, hasFetched: true });
        }
      },
      updateInSupabase: async (id, patch) => {
        const item = get().items.find((i) => i.id === id);
        if (!item?.productId) {
          get().update(id, patch);
          return;
        }
        const dbPatch = {};
        if (patch.title !== void 0) dbPatch.title = patch.title;
        if (patch.category !== void 0) dbPatch.type = patch.category;
        if (patch.sizes !== void 0) dbPatch.sizes = patch.sizes;
        if (patch.tags !== void 0) dbPatch.parameters = JSON.stringify({ tags: patch.tags });
        if (patch.section_1_title !== void 0) dbPatch.section_1_title = patch.section_1_title;
        if (patch.section_1_text !== void 0) dbPatch.section_1_text = patch.section_1_text;
        if (patch.section_2_title !== void 0) dbPatch.section_2_title = patch.section_2_title;
        if (patch.section_2_text !== void 0) dbPatch.section_2_text = patch.section_2_text;
        if (patch.section_3_title !== void 0) dbPatch.section_3_title = patch.section_3_title;
        if (patch.section_3_text !== void 0) dbPatch.section_3_text = patch.section_3_text;
        if (patch.section_4_title !== void 0) dbPatch.section_4_title = patch.section_4_title;
        if (patch.section_4_text !== void 0) dbPatch.section_4_text = patch.section_4_text;
        if (patch.section_5_title !== void 0) dbPatch.section_5_title = patch.section_5_title;
        if (patch.section_5_text !== void 0) dbPatch.section_5_text = patch.section_5_text;
        if (Object.keys(dbPatch).length > 0) {
          const { error } = await supabase.from("products").update(dbPatch).eq("id", item.productId);
          if (error) {
            throw new Error(error.message);
          }
        }
        get().update(id, patch);
      }
    }),
    { name: "draxler-archive" }
  )
);
const useActivity = create()(
  persist(
    (set) => ({
      entries: makeSeedActivity(),
      log: (e) => set((s) => ({
        entries: [
          { id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, at: Date.now(), ...e },
          ...s.entries
        ].slice(0, 50)
      })),
      clear: () => set({ entries: [] })
    }),
    { name: "draxler-activity" }
  )
);
async function publishProduct(input, files, onProgress) {
  onProgress?.("Создание записи в БД...");
  const { files: _, ...dbPayload } = input;
  const { data: product, error: insertError } = await supabase.from("products").insert(dbPayload).select().single();
  if (insertError) throw new Error(`Ошибка создания продукта: ${insertError.message}`);
  if (!product) throw new Error("Продукт не создан");
  const productId = product.id;
  if (files.length > 0) {
    onProgress?.("Загрузка изображений...");
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Draxler");
      const cloudName = "dooefod1w";
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(`Ошибка загрузки фото в Cloudinary: ${errorData.error?.message || res.statusText}`);
      }
      const data = await res.json();
      const imageRecord = {
        product_id: productId,
        image_url: data.secure_url
      };
      const { error: dbError } = await supabase.from("product_images").insert(imageRecord);
      if (dbError) throw new Error(`Ошибка сохранения ссылки изображения: ${dbError.message}`);
    }
  }
  onProgress?.("Готово!");
  return product;
}
function toProductInsert(item) {
  return {
    title: item.title,
    type: item.category,
    parameters: JSON.stringify({ tags: item.tags }),
    sizes: item.sizes,
    section_1_title: item.section_1_title,
    section_1_text: item.section_1_text,
    section_2_title: item.section_2_title,
    section_2_text: item.section_2_text,
    section_3_title: item.section_3_title,
    section_3_text: item.section_3_text,
    section_4_title: item.section_4_title,
    section_4_text: item.section_4_text,
    section_5_title: item.section_5_title,
    section_5_text: item.section_5_text
  };
}
async function generateNextTitle(category) {
  const { data, error } = await supabase.from("products").select("title").eq("type", category).order("created_at", { ascending: false }).limit(1).maybeSingle();
  let lastNumber = CATEGORY_BASE_NUMBERS[category];
  if (!error && data?.title) {
    const match = data.title.match(/DRX-(\d+)/i);
    if (match) {
      lastNumber = parseInt(match[1], 10);
    }
  }
  return `DRX-${lastNumber + 1}`;
}
function reseed(items, startAt, intervalMin) {
  return recalcSchedule(items, startAt, intervalMin);
}
const useQueue = create()(
  persist(
    (set, get) => ({
      items: makeSeedQueueItems(),
      intervalMin: 25,
      startAt: Date.now() + 12 * 6e4,
      isProcessing: false,
      addBatch: (drafts) => {
        const { items, startAt, intervalMin } = get();
        const nextItems = [
          ...items,
          ...drafts.map((d) => ({ ...d, paused: d.paused ?? false, scheduledAt: 0 }))
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
        const next = items.map((i) => i.id === id ? { ...i, paused: !i.paused } : i);
        set({ items: reseed(next, startAt, intervalMin) });
      },
      publishNow: async (id, actor = "Система") => {
        const { items, startAt, intervalMin, update, remove } = get();
        const target = items.find((i) => i.id === id);
        if (!target || target.status === "uploading") return;
        update(id, { status: "uploading", error: void 0, progress: "Генерация названия..." });
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
            files: void 0
          });
          remove(id);
          useActivity.getState().log({ actor, action: `опубликовал карточку ${finalTitle} (${target.category})` });
        } catch (error) {
          const msg = error instanceof Error ? error.message : "Неизвестная ошибка";
          update(id, { status: "error", error: msg, progress: void 0 });
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
        const next = items.map((i) => i.id === id ? { ...i, ...patch } : i);
        set({ items: reseed(next, startAt, intervalMin) });
      }
    }),
    {
      name: "draxler-queue",
      partialize: (state) => ({
        ...state,
        items: state.items.map((i) => ({ ...i, files: void 0, status: void 0, progress: void 0, error: void 0 }))
      })
    }
  )
);
export {
  CATEGORY_LABEL as C,
  DEFAULT_SECTIONS as D,
  PageHeader as P,
  SectionCard as S,
  useArchive as a,
  useActivity as b,
  CATEGORIES as c,
  DEFAULT_SIZES as d,
  publishProduct as e,
  generateNextTitle as g,
  placeholderImage as p,
  useQueue as u
};
