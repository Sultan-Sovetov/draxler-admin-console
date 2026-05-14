export interface SchedulableItem {
  id: string;
  paused: boolean;
  scheduledAt: number;
}

/**
 * Recompute scheduledAt for each item based on its current order and the
 * publishing interval. Paused items keep their position but get scheduledAt = 0
 * (rendered as "На паузе") and do not consume a time slot.
 */
export function recalcSchedule<T extends SchedulableItem>(
  items: T[],
  startAt: number,
  intervalMin: number,
): T[] {
  let slot = 0;
  const stepMs = intervalMin * 60_000;
  return items.map((item) => {
    if (item.paused) return { ...item, scheduledAt: 0 };
    const next = { ...item, scheduledAt: startAt + slot * stepMs };
    slot += 1;
    return next;
  });
}
