function formatTime(ts) {
  return new Date(ts).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" });
}
function formatDate(ts) {
  return new Date(ts).toLocaleDateString("ru-RU", { day: "2-digit", month: "short" });
}
function formatDateTime(ts) {
  return `${formatDate(ts)}, ${formatTime(ts)}`;
}
function formatCountdown(targetTs, nowTs = Date.now()) {
  const diff = Math.max(0, targetTs - nowTs);
  const totalSec = Math.floor(diff / 1e3);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor(totalSec % 3600 / 60);
  const s = totalSec % 60;
  if (h > 0) return `через ${h}ч ${m.toString().padStart(2, "0")}м`;
  if (m > 0) return `через ${m}:${s.toString().padStart(2, "0")}`;
  return `через ${s}с`;
}
function formatRelative(ts, nowTs = Date.now()) {
  const diff = Math.max(0, nowTs - ts);
  const m = Math.floor(diff / 6e4);
  if (m < 1) return "только что";
  if (m < 60) return `${m} мин назад`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ч назад`;
  const d = Math.floor(h / 24);
  return `${d} дн назад`;
}
export {
  formatCountdown as a,
  formatRelative as b,
  formatDateTime as c,
  formatTime as f
};
