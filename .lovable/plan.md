
# Draxler — Admin Panel Frontend Plan

Frontend-only build on the existing TanStack Start + Tailwind v4 + shadcn stack. No backend, no Lovable Cloud. All data is mock state in the browser (Zustand + localStorage persistence).

---

## 1. Art Direction (codified in `src/styles.css`)

Override the existing tokens with a strict editorial light palette (oklch equivalents of the requested hex):

- `--background`: pure white (`oklch(1 0 0)`) — `#FFFFFF`
- `--card` / containers: `oklch(0.985 0 0)` — `#FAFAFA`
- `--muted`: `oklch(0.965 0 0)` — `#F5F5F5`
- `--foreground`: `oklch(0.18 0 0)` — `#1A1A1A`
- `--muted-foreground`: `oklch(0.52 0 0)` — `#737373`
- `--primary`: `oklch(0.18 0 0)` (deep charcoal, used for solid CTAs)
- `--accent`: brushed-sand `oklch(0.92 0.012 75)` for active states
- `--border`: `oklch(0.94 0 0)` — used sparingly; whitespace separates first
- `--radius`: `2px` (sharp editorial corners)
- `--shadow-elevated`: `0 4px 20px rgba(0,0,0,0.03)`
- `--shadow-lift`: `0 6px 24px rgba(0,0,0,0.05)` (hover lift)

Typography: Inter via `@fontsource-variable/inter`. Tracking `-0.011em` on display, `-0.005em` on body. Headline scale: 48 / 32 / 24 / 18 / 15 / 13. Single H1 per route.

No dark mode. No gradients. No glassmorphism. Borders only when whitespace is insufficient.

Motion: a single `motion.ts` config with spring `{ stiffness: 320, damping: 32, mass: 0.6 }` and duration tokens `fast: 180ms`, `base: 240ms`, `slow: 320ms`. Use `framer-motion` (already a common dep — install if missing).

All copy in Russian.

---

## 2. Folder Structure

```text
src/
  routes/
    __root.tsx                  # shell + providers (QueryClient, Toaster, AuthGate)
    login.tsx                   # /login (public)
    _app.tsx                    # pathless layout, redirects to /login if not authed
    _app/index.tsx              # /  -> Dashboard
    _app/upload.tsx             # /upload (Single)
    _app/batch.tsx              # /batch (Batch Upload)
    _app/queue.tsx              # /queue
    _app/archive.tsx            # /archive
  components/
    layout/
      AppShell.tsx              # desktop sidebar + mobile bottom nav
      Sidebar.tsx
      BottomNav.tsx
      TopBar.tsx
    ui/                         # existing shadcn primitives (reuse + restyle)
    primitives/
      PageHeader.tsx
      SectionCard.tsx           # off-white container, no border
      StatCard.tsx
      Chip.tsx                  # removable tag chip
      SegmentedControl.tsx      # iOS-style category toggle
      Dropzone.tsx              # single + multi variants
      ImageThumbStrip.tsx
      FloatingLabelInput.tsx
      TimelineItem.tsx
      Skeleton.tsx              # shape-matched skeletons
      EmptyState.tsx
      Toast.tsx                 # bottom-center sonner config
    dashboard/
      QueueStatusWidget.tsx
      DistributionDonut.tsx
      ActivityFeed.tsx
    upload/
      SingleUploadForm.tsx
      SeoEditor.tsx
      TagInput.tsx
    batch/
      BatchDropzone.tsx
      IntervalConfigurator.tsx
      BatchItemRow.tsx          # virtualized row
      VirtualBatchList.tsx      # @tanstack/react-virtual
    queue/
      QueueList.tsx             # dnd-kit sortable
      QueueCard.tsx
      QueueCardActions.tsx      # Пауза / Вне очереди
    archive/
      ArchiveGrid.tsx
      ArchiveFilters.tsx
      EditDrawer.tsx            # right slide-over
  store/
    auth.store.ts
    queue.store.ts
    archive.store.ts
    activity.store.ts
    settings.store.ts           # interval, category prefs
  lib/
    mock/
      seed.ts                   # generates demo disks
      images.ts                 # placeholder image URLs
    schedule.ts                 # recalcSchedule(items, startAt, intervalMin)
    motion.ts
    format.ts                   # ru-RU date/time + duration
    cn.ts
  hooks/
    useMediaQuery.ts
    useSwipe.ts                 # swipe-right/left on queue cards
    useAuthGuard.ts
```

Routing uses TanStack file-based convention; `_app.tsx` is the authed layout with `<Outlet />`. `/login` is public.

---

## 3. State Management — Zustand

Chosen for: minimal boilerplate, fine-grained selectors (avoids re-rendering 100+ queue rows), trivial localStorage persistence, no provider tree.

### `auth.store.ts`
```ts
type AuthState = {
  user: { name: 'Tamirlan' | 'Sultan' } | null
  login: (login: string, password: string) => boolean
  logout: () => void
}
```
Hardcoded credentials map `{ Tamirlan: 'admin', Sultan: 'admin' }`. Persisted.

### `queue.store.ts` (the complex one)
```ts
type Category = 'off-road' | 'luxury' | 'sport'
type QueueItem = {
  id: string
  images: string[]            // object URLs (mock)
  text: string                // SEO description
  category: Category
  tags: string[]
  paused: boolean
  scheduledAt: number         // epoch ms, derived
}
type QueueState = {
  items: QueueItem[]
  intervalMin: number         // default 25
  startAt: number             // anchor for recalculation
  addBatch: (drafts: Omit<QueueItem,'scheduledAt'|'paused'>[]) => void
  reorder: (fromId: string, toIndex: number) => void
  togglePause: (id: string) => void
  publishNow: (id: string) => void   // moves to archive, removes from queue
  setInterval: (m: number) => void
  remove: (id: string) => void
}
```
`scheduledAt` is **always derived** by `recalcSchedule()` after every mutation — never stored independently. This guarantees DnD reorder = instant timeline update.

`recalcSchedule(items, startAt, intervalMin)`:
- Walks items in order, skipping `paused` (paused items keep their position but display "На паузе" instead of a time, and don't consume a slot).
- Returns new array with refreshed `scheduledAt = startAt + slotIndex * intervalMin * 60_000`.

Cross-store action `publishNow(id)`: pops item, calls `archive.add()` and `activity.log()`.

### `archive.store.ts`
```ts
type ArchiveItem = QueueItem & { publishedAt: number }
type ArchiveState = {
  items: ArchiveItem[]
  filters: { category?: Category; query: string; tag?: string }
  add: (i: ArchiveItem) => void
  update: (id: string, patch: Partial<ArchiveItem>) => void
  setFilter: (patch: Partial<ArchiveState['filters']>) => void
}
```

### `activity.store.ts`
Ring buffer (last 50 events). Each entry: `{ id, actor, action, target, at }`.

All four stores wrapped with `persist` middleware (localStorage). Image File objects are stored as object URLs only for the session; the seed file rehydrates with placeholder URLs from `picsum.photos` so demo state survives reloads.

A single `useTicker(1000)` hook in `QueueList` and `QueueStatusWidget` re-renders once per second to update countdown displays — no per-item interval.

---

## 4. Component Breakdown (key specs)

**`SectionCard`** — `bg-[--card] rounded-[2px] p-8 md:p-10` no border. Optional `tone="raised"` adds `shadow-[--shadow-elevated]`.

**`SegmentedControl`** — props `{ options: {value,label}[], value, onChange }`. Pill track `bg-[--muted] p-1 rounded-full`, active thumb is white with `shadow-[--shadow-elevated]` and animates with `layoutId` between options. Min height 44px.

**`Chip`** — `inline-flex items-center gap-2 px-3 h-8 rounded-full bg-[--muted] text-[13px]` with an ✕ icon button (44×44 hit area via padding, 16px visual).

**`Dropzone`** — variants `single | batch`. Dashed `border-[1.5px] border-dashed border-[--border]`, on `dragover` switches to `bg-[--accent]/40`. Batch variant accepts up to 500 files, shows count + total size; single shows horizontal `ImageThumbStrip` with remove ✕.

**`FloatingLabelInput`** — label translates from `top-1/2` to `top-2 text-[11px]` on focus/filled; underline only, no full border.

**`QueueCard`** — `<motion.div layout>` with drag handle (left), thumbnail (64×64), title/category/tags (middle), countdown + actions (right). Mobile: full-width row, swipe-right reveals green "Опубликовать" action, swipe-left reveals amber "Пауза" — both via `useSwipe` translating the card and snapping back with spring.

**`EditDrawer`** — shadcn `Sheet` on `side="right"`, width `min(560px, 100vw)`. On mobile, becomes bottom sheet (`side="bottom"` + `h-[92vh] rounded-t-[12px]`). Reuses `SingleUploadForm` with `mode="edit"`.

**`Toast`** — sonner positioned `bottom-center`, white card, charcoal text, `shadow-[--shadow-elevated]`, icon left, 3.5s.

**Skeletons** — one per content shape: `QueueCardSkeleton`, `StatCardSkeleton`, `ArchiveTileSkeleton`. No spinners anywhere.

---

## 5. Layout & Mobile UX

`AppShell` uses `useMediaQuery('(min-width: 1024px)')`:
- **Desktop:** fixed left sidebar 240px (logo, 5 nav items, user pill at bottom). Content max-width 1280px, generous `px-10 py-12`.
- **Tablet (768–1024):** collapsed icon sidebar (72px) + tooltips.
- **Mobile (<768):** top bar (logo + page title) + bottom nav with 5 icons (Главная, Загрузка, Пакет, Очередь, Архив), each tab 44×44 minimum, active state shows a 2px charcoal underline above the icon and the label in `--foreground`.

Grid breakpoints:
- Archive: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6`.
- Dashboard stats: `grid-cols-1 md:grid-cols-3 gap-4`.
- Tables → mobile cards: `BatchItemRow` renders as a row ≥md and as a stacked card <md.

---

## 6. UX Flows

### A. Login → Dashboard
1. User lands on `/login` (auto-redirected from `/` if `auth.user` is null).
2. Centered card, two floating-label inputs, charcoal `Войти` button (44px tall).
3. On submit: `auth.login()` checks against hardcoded map. Failure → bottom-center toast "Неверный логин или пароль" + subtle 200ms shake on the card.
4. Success → `framer-motion` opacity fade (240ms) on the card, then `navigate({ to: '/' })`. AuthGate in `_app.tsx` allows entry.

### B. Batch Upload Flow
1. User opens `/batch`. Sees `BatchDropzone` + `IntervalConfigurator` (default 25, helper "Интервал между публикациями (в минутах)").
2. User drops N files. Frontend:
   - Creates object URLs synchronously.
   - Maps to `Draft[]` with `crypto.randomUUID()` ids, default `category: 'luxury'`, empty tags, SEO text from a Russian template constant.
   - Pushes drafts into a local `useState` (not the queue yet) and renders them in a **virtualized list** (`@tanstack/react-virtual`, row height 96).
3. User can per-row edit category (segmented), tags (chips), or remove. Bulk actions bar appears at top when ≥1 selected ("Назначить категорию", "Удалить").
4. User clicks `Отправить в очередь`. Action calls `queue.addBatch(drafts)` which appends and runs `recalcSchedule`. Toast: "Добавлено N дисков в очередь". Navigates to `/queue`.

### C. DnD Queue Recalculation
1. `/queue` renders `QueueList` (dnd-kit `<SortableContext>` + `verticalListSortingStrategy`).
2. On `dragStart`: card sets `opacity-60 scale-[0.99]` via motion variant; surrounding rows shift with `layout` animation.
3. On `dragOver`: dnd-kit reorders the items array in transient state; the visible `scheduledAt` for every row updates **on the same frame** because times are computed via a selector `useQueue(s => recalcSchedule(s.items, s.startAt, s.intervalMin))`, not stored.
4. On `dragEnd`: `queue.reorder(fromId, toIndex)` commits to the store; persistence writes to localStorage.
5. Per-card actions:
   - `Пауза` toggles `paused`; row dims to 50%, time chip becomes "На паузе"; recalculation skips it.
   - `Вне очереди` calls `queue.publishNow(id)` → optimistic removal with `<AnimatePresence>` exit (slide-right + fade), entry pushed to archive + activity feed, toast "Опубликовано вне очереди".

### D. Archive Edit
1. Click tile → `EditDrawer` slides in from right (mobile: up from bottom).
2. Form pre-filled from `archive.items[id]`. Save → `archive.update()` + toast "Сохранено". Drawer closes.

---

## 7. Dependencies to add

- `framer-motion` — animations & layout transitions
- `zustand` — state
- `@dnd-kit/core` + `@dnd-kit/sortable` — queue DnD
- `@tanstack/react-virtual` — batch virtualization
- `sonner` — toasts (shadcn already wraps it)
- `@fontsource-variable/inter` — typography

No backend libs, no Supabase, no auth providers.

---

## 8. Out of scope (explicit)

- No real file uploads, no API calls, no persistence beyond localStorage.
- No real publishing — `publishNow` and scheduled times are simulated only.
- No role/permissions system beyond the two hardcoded users.
- No analytics, no i18n toggle (Russian only).

---

## 9. Build order

1. Tokens + typography + `AppShell` (desktop sidebar + mobile bottom nav) + `/login` with mock auth.
2. Primitives (`SectionCard`, `SegmentedControl`, `Chip`, `Dropzone`, `FloatingLabelInput`, `Skeleton`, `Toast` config).
3. Stores + seed data + `recalcSchedule` with unit-style sanity check in `lib/schedule.ts`.
4. Dashboard (widgets read from stores).
5. Single Upload form (foundation for Edit Drawer).
6. Batch Upload (virtualized list + interval).
7. Queue (dnd-kit + per-second ticker + swipe gestures on mobile).
8. Archive (grid + filters + Edit Drawer reusing Single Upload form).
9. Pass: skeletons, empty states, motion polish, mobile QA at 375 / 414 / 768.
