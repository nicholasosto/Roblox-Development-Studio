// The live Studio feed — unlike every other data module, this one has NO build-time JSON: session
// heartbeats are ephemeral by design (a 5s beat committed to a file would churn git forever), so
// the collector keeps them in memory and serves GET /live, and the Tools lens polls it at
// runtime. This module is the ONLY caller of that endpoint; the lens derives its whole "Studio
// now" view from the typed helpers here.
//
// Degradation contract: the static build must stay fully functional with the collector down —
// fetchLive() resolves to { up: false } instead of throwing, and the lens renders an offline note.

export interface LiveSession {
  place: string;
  placeId: number;
  mode: string;
  uptimeSeconds: number;
  instanceCount: number;
  lastSeenAt: string;
}
export interface LiveFeed {
  up: boolean;
  updatedAt?: string;
  staleAfterSeconds: number;
  sessions: LiveSession[];
}

// The collector's fixed local address (tools/telemetry-collector.mjs). Configurability is
// pipeline M4, alongside the plugin's endpoint setting.
export const LIVE_URL = 'http://127.0.0.1:4320/live';
export const LIVE_POLL_MS = 5_000;

const OFFLINE: LiveFeed = { up: false, staleAfterSeconds: 15, sessions: [] };

/** Poll the collector once; never throws — collector-down is a normal state, not an error. */
export async function fetchLive(): Promise<LiveFeed> {
  try {
    const controller = new AbortController();
    const t = window.setTimeout(() => controller.abort(), 2_000);
    const res = await fetch(LIVE_URL, { signal: controller.signal });
    window.clearTimeout(t);
    if (!res.ok) return OFFLINE;
    const body = (await res.json()) as Partial<LiveFeed>;
    return {
      up: true,
      updatedAt: body.updatedAt,
      staleAfterSeconds: body.staleAfterSeconds ?? 15,
      sessions: Array.isArray(body.sessions) ? body.sessions : [],
    };
  } catch {
    return OFFLINE;
  }
}

/** A session is fresh while its last heartbeat is within the collector's stale window. */
export const isFresh = (s: LiveSession, staleAfterSeconds: number): boolean =>
  Date.now() - Date.parse(s.lastSeenAt) <= staleAfterSeconds * 1000;

/** "1m 05s" style uptime. */
export const fmtUptime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, '0')}s` : `${s}s`;
};

/** Display identity: the place name unless Studio gave the useless "Place1". */
export const sessionLabel = (s: LiveSession): string =>
  s.place && s.place !== 'Place1' ? s.place : s.placeId ? `place ${s.placeId}` : '(unsaved place)';
