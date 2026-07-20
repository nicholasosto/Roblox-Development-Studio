// Relative-time presentation — a shared helper module like ./clipboard (one small,
// side-effect-free concern). Absolute stamps stay in ./labs' fmtWhen; every visible relative
// stamp carries the absolute in a title attr at the call site, so switching to these loses
// no precision. Callers that re-render on their own clock (a poll, a tick hook) pass `now`
// explicitly so all stamps in one render agree.

/** Age in ms (now − iso). null when absent or unparseable — callers skip, never guess. */
export const agoMs = (iso?: string, now = Date.now()): number | null => {
  if (!iso) return null;
  const t = Date.parse(iso);
  return Number.isNaN(t) ? null : now - t;
};

const MINUTE = 60_000;
const HOUR = 3_600_000;
const DAY = 86_400_000;

/**
 * "just now" / "23s ago" / "21m ago" / "21h ago" / "3d ago". ≥30d falls back to the absolute
 * medium date (relative loses meaning at that range); unparseable → the raw string (mirror of
 * fmtWhen); absent → em dash. Negative deltas (future stamps / clock skew) clamp to "just now".
 */
export const fmtAgo = (iso?: string, now = Date.now()): string => {
  if (!iso) return '—';
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  const delta = now - t;
  if (delta < 10_000) return 'just now';
  if (delta < MINUTE) return `${Math.floor(delta / 1000)}s ago`;
  if (delta < HOUR) return `${Math.floor(delta / MINUTE)}m ago`;
  if (delta < DAY) return `${Math.floor(delta / HOUR)}h ago`;
  if (delta < 30 * DAY) return `${Math.floor(delta / DAY)}d ago`;
  return new Date(t).toLocaleDateString(undefined, { dateStyle: 'medium' });
};

/** "8:11:42 AM" — time-of-day with seconds, for the live "as of" stamp (always today). */
export const fmtClock = (iso?: string): string => {
  if (!iso) return '—';
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return iso;
  return new Date(t).toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  });
};
