export function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
}

export function formatDateTime(ts: number): string {
  return `${formatDate(ts)}, ${formatTime(ts)}`;
}

export function formatCountdown(targetTs: number, nowTs: number = Date.now()): string {
  const diff = Math.max(0, targetTs - nowTs);
  const totalSec = Math.floor(diff / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `через ${h}ч ${m.toString().padStart(2, "0")}м`;
  if (m > 0) return `через ${m}:${s.toString().padStart(2, "0")}`;
  return `через ${s}с`;
}

export function formatRelative(ts: number, nowTs: number = Date.now()): string {
  const diff = Math.max(0, nowTs - ts);
  const m = Math.floor(diff / 60000);
  if (m < 1) return "только что";
  if (m < 60) return `${m} мин назад`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ч назад`;
  const d = Math.floor(h / 24);
  return `${d} дн назад`;
}
