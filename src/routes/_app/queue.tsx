import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  DndContext,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, Pause, PlayCircle, Zap, Trash2, Send, Pencil } from "lucide-react";
import { PageHeader } from "@/components/primitives/PageHeader";
import { SectionCard } from "@/components/primitives/SectionCard";
import { EmptyState } from "@/components/primitives/EmptyState";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { SingleUploadForm } from "@/components/upload/SingleUploadForm";
import { useQueue, type QueueItem } from "@/store/queue.store";
import { useTicker } from "@/hooks/useTicker";
import { formatTime, formatCountdown } from "@/lib/format";
import { CATEGORY_LABEL } from "@/lib/mock/seed";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/store/auth.store";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export const Route = createFileRoute("/_app/queue")({
  head: () => ({ meta: [{ title: "Очередь публикаций — Draxler" }] }),
  component: QueuePage,
});

function QueuePage() {
  const items = useQueue((s) => s.items);
  const intervalMin = useQueue((s) => s.intervalMin);
  const reorder = useQueue((s) => s.reorder);
  const togglePause = useQueue((s) => s.togglePause);
  const publishNow = useQueue((s) => s.publishNow);
  const processQueue = useQueue((s) => s.processQueue);
  const isProcessing = useQueue((s) => s.isProcessing);
  const remove = useQueue((s) => s.remove);
  const fetchQueue = useQueue((s) => s.fetchQueue);
  const subscribeToChanges = useQueue((s) => s.subscribeToChanges);
  const actor = useAuth((s) => s.user?.name ?? "Система");
  const now = useTicker(1000);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [editing, setEditing] = React.useState<QueueItem | null>(null);

  React.useEffect(() => {
    fetchQueue();
    subscribeToChanges();
  }, [fetchQueue, subscribeToChanges]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const from = items.findIndex((i) => i.id === active.id);
    const to = items.findIndex((i) => i.id === over.id);
    if (from < 0 || to < 0) return;
    reorder(from, to);
    toast.success("Очередь перестроена");
  };

  return (
    <div>
      <PageHeader
        eyebrow="Публикация"
        title="Очередь"
        description={`Перетаскивайте карточки, чтобы изменить порядок. Интервал: ${intervalMin} мин.`}
        actions={
          items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                processQueue(actor);
                toast.success("Обработка очереди запущена");
              }}
              disabled={isProcessing}
              className="h-11 px-5 rounded-[2px] bg-primary text-primary-foreground text-[13px] font-medium inline-flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto justify-center"
            >
              <Send className="w-4 h-4" strokeWidth={1.8} />
              {isProcessing ? "Публикуется..." : "Запустить очередь"}
            </button>
          )
        }
      />

      <SectionCard>
        {items.length === 0 ? (
          <EmptyState
            title="Очередь пуста"
            description="Загрузите карточки через одиночную или пакетную публикацию."
          />
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              <ul className="space-y-3">
                <AnimatePresence initial={false}>
                  {items.map((item, idx) => (
                    <QueueRow
                      key={item.id}
                      item={item}
                      now={now}
                      index={idx}
                      onPause={() => {
                        if (item.status !== "processing") togglePause(item.id);
                      }}
                      onPublish={() => publishNow(item.id, actor)}
                      onRemove={() => {
                        if (item.status === "processing") return;
                        remove(item.id);
                        toast.success("Карточка удалена из очереди");
                      }}
                      onEdit={() => setEditing(item)}
                    />
                  ))}
                </AnimatePresence>
              </ul>
            </SortableContext>
          </DndContext>
        )}
      </SectionCard>

      {/* Edit Sheet */}
      <Sheet open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <SheetContent
          side={isDesktop ? "right" : "bottom"}
          className={
            isDesktop
              ? "w-full sm:max-w-[560px] overflow-y-auto bg-background border-l border-border"
              : "h-[92vh] rounded-t-[12px] overflow-y-auto bg-background border-t border-border"
          }
        >
          <SheetHeader className="text-left">
            <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              Редактирование
            </div>
            <SheetTitle className="text-foreground text-[20px] font-semibold tracking-tight">
              Карточка из очереди
            </SheetTitle>
          </SheetHeader>
          {editing && (
            <div className="mt-6">
              <SingleUploadForm mode="edit" initial={editing} onSaved={() => setEditing(null)} />
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface QueueRowProps {
  item: QueueItem;
  now: number;
  index: number;
  onPause: () => void;
  onPublish: () => void;
  onRemove: () => void;
  onEdit: () => void;
}

function QueueRow({ item, now, index, onPause, onPublish, onRemove, onEdit }: QueueRowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const [swipeX, setSwipeX] = React.useState(0);
  const startX = React.useRef<number | null>(null);

  const onTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (startX.current == null) return;
    const dx = e.touches[0].clientX - startX.current;
    setSwipeX(Math.max(-120, Math.min(120, dx)));
  };
  const onTouchEnd = () => {
    if (swipeX > 80) onPublish();
    else if (swipeX < -80) onPause();
    setSwipeX(0);
    startX.current = null;
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;
  const isProcessing = item.status === "processing";
  const statusText =
    item.status === "processing"
      ? item.progress || "Публикуется..."
      : item.status === "error"
        ? item.error || "Ошибка публикации"
        : item.status === "success"
          ? "Опубликовано"
          : "";

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: 60, transition: { duration: 0.18 } }}
      transition={spring}
      className={cn(
        "relative bg-background rounded-[2px] overflow-hidden",
        isDragging && "shadow-lift z-10",
      )}
    >
      {/* Swipe action backgrounds (mobile) */}
      <div className="absolute inset-y-0 left-0 w-32 bg-[oklch(0.95_0.04_150)] text-[oklch(0.32_0.08_150)] flex items-center justify-start pl-5 text-[12px] font-medium md:hidden">
        Опубликовать
      </div>
      <div className="absolute inset-y-0 right-0 w-32 bg-accent text-accent-foreground flex items-center justify-end pr-5 text-[12px] font-medium md:hidden">
        {item.paused ? "Возобновить" : "Пауза"}
      </div>

      <div
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ transform: `translate3d(${swipeX}px, 0, 0)` }}
        className={cn("relative bg-card transition-transform", item.paused && "opacity-60")}
      >
        <div className="flex items-center gap-3 md:gap-4 px-3 md:px-5 py-3">
          <button
            ref={(el) => {
              if (el) (el as HTMLElement).style.touchAction = "none";
            }}
            {...attributes}
            {...listeners}
            aria-label="Перетащить"
            className="w-8 h-11 md:h-12 inline-flex items-center justify-center text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
          >
            <GripVertical className="w-4 h-4" strokeWidth={1.7} />
          </button>

          <div className="w-14 h-14 md:w-16 md:h-16 rounded-[2px] overflow-hidden bg-muted shrink-0">
            <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-[0.16em] uppercase text-muted-foreground">
                #{(index + 1).toString().padStart(2, "0")}
              </span>
              <span className="text-[11px] tracking-[0.12em] uppercase text-muted-foreground">
                ·
              </span>
              <span className="text-[12px] text-foreground">{CATEGORY_LABEL[item.category]}</span>
            </div>
            <div className="mt-1 text-[13px] font-medium text-foreground truncate">
              {item.title || "Авто (DRX-XXX)"}
            </div>
            <div className="mt-0.5 text-[12px] text-muted-foreground truncate">
              {item.tags.length > 0 ? item.tags.join(" · ") : "Без тегов"}
            </div>
            {statusText && (
              <div
                className={cn(
                  "mt-1 text-[12px] truncate",
                  item.status === "error" ? "text-destructive" : "text-muted-foreground",
                )}
              >
                {statusText}
              </div>
            )}
          </div>

          <div className="hidden md:flex flex-col items-end shrink-0 mr-2">
            <div className="text-[11px] tracking-wider uppercase text-muted-foreground">
              Публикация
            </div>
            <div
              className={cn(
                "mt-1 text-[14px] font-medium tabular-nums",
                item.status === "error" ? "text-destructive" : "text-foreground",
              )}
            >
              {statusText || (item.paused ? "На паузе" : formatTime(item.scheduledAt))}
            </div>
            {!item.paused && !statusText && (
              <div className="text-[11px] text-muted-foreground tabular-nums">
                {formatCountdown(item.scheduledAt, now)}
              </div>
            )}
          </div>

          <div className="flex items-center gap-0.5 md:gap-1 shrink-0">
            <IconBtn label="Редактировать" onClick={onEdit} disabled={isProcessing}>
              <Pencil className="w-4 h-4" strokeWidth={1.7} />
            </IconBtn>
            <IconBtn
              label={item.paused ? "Возобновить" : "Пауза"}
              onClick={onPause}
              disabled={isProcessing}
            >
              {item.paused ? (
                <PlayCircle className="w-4 h-4" strokeWidth={1.7} />
              ) : (
                <Pause className="w-4 h-4" strokeWidth={1.7} />
              )}
            </IconBtn>
            <IconBtn label="Вне очереди" onClick={onPublish} disabled={isProcessing}>
              <Zap className="w-4 h-4" strokeWidth={1.7} />
            </IconBtn>
            <IconBtn label="Удалить" onClick={onRemove} disabled={isProcessing} danger>
              <Trash2 className="w-4 h-4" strokeWidth={1.7} />
            </IconBtn>
          </div>
        </div>

        <div className="md:hidden px-3 pb-2 -mt-1 text-[12px] text-muted-foreground tabular-nums">
          {statusText ||
            (item.paused
              ? "На паузе"
              : `${formatTime(item.scheduledAt)} · ${formatCountdown(item.scheduledAt, now)}`)}
        </div>
      </div>
    </motion.li>
  );
}

function IconBtn({
  children,
  onClick,
  label,
  danger,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
  danger?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className={cn(
        "w-9 h-9 md:w-11 md:h-11 rounded-full inline-flex items-center justify-center transition-colors",
        disabled
          ? "text-muted-foreground/50 cursor-not-allowed"
          : danger
            ? "text-muted-foreground hover:text-destructive hover:bg-muted"
            : "text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      {children}
    </button>
  );
}
