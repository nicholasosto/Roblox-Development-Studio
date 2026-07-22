#!/usr/bin/env node
// ============================================================================
// telemetry-collector.mjs — local Studio-telemetry collector (v1)
// ============================================================================
//
// ZERO-DEPENDENCY Node ESM server (node built-ins only: http, fs, path, url).
// The receiving end of @trembus/studio-telemetry (pipeline
// studio-telemetry-modernization, M1): the Studio plugin POSTs batched
// envelopes here; `catalog` envelopes become the emitted registry
//   previews/dashboards/ui-catalog.json
// — the automatic feed for the decision-0008 in-place ledger (closes the labs
// audit carry-forward CF-2). `session` heartbeats (M2) are kept in memory and
// served live from GET /live — deliberately NOT persisted to a committed file,
// because a 5-second heartbeat would churn git forever; live state belongs to
// the live endpoint, and the Tools lens polls it at runtime. Other channels
// (log/state/metrics/entities) are tallied only.
//
// Endpoints (127.0.0.1:4320 — beside the previews server's 4319, clear of the
// retired soul-steel dashboard's 3001; override with PORT). All responses set
// Access-Control-Allow-Origin: * so the command-center (any local origin) can
// poll /live:
//   GET  /                       health + per-channel tallies
//   GET  /live                   current Studio session heartbeats
//   POST /api/studio-telemetry   telemetry envelope ({channel, timestamp, data})
//
// ui-catalog.json is written atomically (tmp + rename) and only when the
// incoming snapshot differs from that place's stored entry (ignoring stamps),
// so a 30-second catalog poll does not churn the file or its git status.
// Schema v2 keys the registry by place — see the emission section for why.
//
// Usage:
//   node tools/telemetry-collector.mjs        # runs until Ctrl-C
// ============================================================================

import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const PROJECT_ROOT = resolve(dirname(__filename), "..");
const OUT_FILE = join(PROJECT_ROOT, "previews", "dashboards", "ui-catalog.json");

const HOST = "127.0.0.1";
const PORT = Number(process.env.PORT ?? 4320);
const MAX_BODY_BYTES = 1_048_576; // 1 MB — envelopes are small; anything bigger is a bug

const startedAt = Date.now();
const tallies = {}; // channel -> count
let lastCatalogAt = null;

// Studio session heartbeats, keyed by place identity. A session vanishing (Studio closed)
// simply stops beating; /live marks it stale after STALE_SECONDS and drops it after
// PRUNE_SECONDS.
const sessions = new Map();
const STALE_SECONDS = 15;
const PRUNE_SECONDS = 60;

const sessionKey = (data) =>
  typeof data.placeId === "number" && data.placeId !== 0 ? `place:${data.placeId}` : `name:${data.place ?? "?"}`;

function upsertSession(envelope) {
  const data = envelope.data ?? {};
  sessions.set(sessionKey(data), {
    place: typeof data.place === "string" ? data.place : "(unknown place)",
    placeId: typeof data.placeId === "number" ? data.placeId : 0,
    mode: typeof data.mode === "string" ? data.mode : "edit",
    uptimeSeconds: typeof data.uptimeSeconds === "number" ? data.uptimeSeconds : 0,
    instanceCount: typeof data.instanceCount === "number" ? data.instanceCount : 0,
    lastSeenAt: stamp(),
  });
}

function liveSessions() {
  const now = Date.now();
  for (const [key, s] of sessions) {
    if (now - Date.parse(s.lastSeenAt) > PRUNE_SECONDS * 1000) sessions.delete(key);
  }
  return [...sessions.values()].sort((a, b) => a.place.localeCompare(b.place) || a.placeId - b.placeId);
}

const stamp = () => new Date().toISOString();
const log = (msg) => console.log(`[collector ${stamp()}] ${msg}`);

// ── ui-catalog.json emission ──────────────────────────────────────────────
// The registry is KEYED BY PLACE: one entry per Studio place that has ever reported.
// Schema v1 was a single flat slot, which made the file last-writer-wins — opening a
// place with no ledger (the hub, Part Textures) posted an honest empty snapshot that
// silently erased whichever lab had reported before it. Under v2 an empty report
// updates only its own entry and can no longer clobber a sibling place.
const SCHEMA_VERSION = 2;

/** The comparable core of ONE place's ledger — everything except the volatile stamps. */
const comparable = (entry) =>
  JSON.stringify({
    place: entry.place,
    placeId: entry.placeId,
    catalog: entry.catalog,
    kits: entry.kits,
    manifests: entry.manifests,
  });

/**
 * Normalize a catalog payload into a keyed registry entry. `placeId` is the real identity —
 * the plugin sends `game.Name`, which is "Place1" for every published place — so the key
 * falls back to the name only for unsaved places (placeId 0), mirroring `sessionKey`.
 */
function normalizeEntry(data, receivedAt, channelTimestamp) {
  const place = typeof data.place === "string" ? data.place : "(unknown place)";
  const placeId = typeof data.placeId === "number" ? data.placeId : 0;
  return {
    key: sessionKey({ place, placeId }),
    place,
    placeId,
    receivedAt,
    channelTimestamp,
    catalog: Array.isArray(data.catalog) ? data.catalog : [],
    kits: Array.isArray(data.kits) ? data.kits : [],
    manifests: Array.isArray(data.manifests) ? data.manifests : [],
  };
}

/**
 * Read the existing registry. A v1 single-slot file is migrated into the keyed shape rather
 * than discarded, and flagged `needsRewrite` so the migration lands even when the incoming
 * ledger is byte-identical to what v1 held (otherwise the change-only guard would keep the
 * stale schema on disk forever).
 */
function readRegistry() {
  if (!existsSync(OUT_FILE)) return { places: [], needsRewrite: true };
  let prev;
  try {
    prev = JSON.parse(readFileSync(OUT_FILE, "utf8"));
  } catch {
    return { places: [], needsRewrite: true }; // unreadable/corrupt — start clean
  }
  if (Array.isArray(prev?.places)) {
    return { places: prev.places, needsRewrite: prev.schemaVersion !== SCHEMA_VERSION };
  }
  if (typeof prev?.placeId === "number" || typeof prev?.place === "string") {
    const migrated = normalizeEntry(prev, prev.receivedAt ?? stamp(), prev.channelTimestamp ?? null);
    log(`migrating ui-catalog.json v${prev.schemaVersion ?? "?"} → v${SCHEMA_VERSION} (${migrated.key})`);
    return { places: [migrated], needsRewrite: true };
  }
  return { places: [], needsRewrite: true };
}

function writeCatalog(envelope) {
  const next = normalizeEntry(envelope.data ?? {}, stamp(), envelope.timestamp ?? null);
  const { places, needsRewrite } = readRegistry();

  const at = places.findIndex((p) => p.key === next.key);
  const unchanged = at >= 0 && comparable(places[at]) === comparable(next);
  if (unchanged && !needsRewrite) return false; // no churn

  if (at >= 0) {
    // Preserve the stored receivedAt when only the schema is being rewritten, so a migration
    // does not falsely advance every place's "last reported" stamp.
    places[at] = unchanged ? { ...places[at], key: next.key } : next;
  } else {
    places.push(next);
  }
  places.sort((a, b) => a.key.localeCompare(b.key)); // deterministic order → clean diffs

  const doc = {
    generatedBy: "@trembus/studio-telemetry catalog channel via tools/telemetry-collector.mjs",
    schemaVersion: SCHEMA_VERSION,
    places,
  };

  mkdirSync(dirname(OUT_FILE), { recursive: true });
  const tmp = `${OUT_FILE}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(doc, null, 2)}\n`);
  renameSync(tmp, OUT_FILE);
  lastCatalogAt = next.receivedAt;
  log(
    `ui-catalog.json ← ${next.place} (${next.key}): ${next.catalog.length} catalog entries, ` +
      `${next.kits.length} kits, ${next.manifests.length} manifests · ${places.length} place(s) tracked`,
  );
  return true;
}

// ── request handling ──────────────────────────────────────────────────────
function respond(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(json),
    "Access-Control-Allow-Origin": "*",
  });
  res.end(json);
}

const server = createServer((req, res) => {
  if (req.method === "GET" && req.url === "/") {
    respond(res, 200, {
      ok: true,
      name: "rds-telemetry-collector",
      uptimeSeconds: Math.round((Date.now() - startedAt) / 1000),
      tallies,
      lastCatalogAt,
      placesTracked: readRegistry().places.map((p) => ({
        key: p.key,
        placeId: p.placeId,
        receivedAt: p.receivedAt,
        entries: p.catalog?.length ?? 0,
        kits: p.kits?.length ?? 0,
      })),
      liveSessions: liveSessions().length,
      out: "previews/dashboards/ui-catalog.json",
    });
    return;
  }

  if (req.method === "GET" && req.url === "/live") {
    respond(res, 200, {
      ok: true,
      updatedAt: stamp(),
      staleAfterSeconds: STALE_SECONDS,
      sessions: liveSessions(),
    });
    return;
  }

  if (req.method === "POST" && req.url === "/api/studio-telemetry") {
    let size = 0;
    const chunks = [];
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        respond(res, 413, { ok: false, error: "body too large" });
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (res.writableEnded) return;
      let envelope;
      try {
        envelope = JSON.parse(Buffer.concat(chunks).toString("utf8"));
      } catch {
        respond(res, 400, { ok: false, error: "invalid JSON" });
        return;
      }
      const channel = typeof envelope?.channel === "string" ? envelope.channel : "(unknown)";
      tallies[channel] = (tallies[channel] ?? 0) + 1;
      if (channel === "catalog") writeCatalog(envelope);
      if (channel === "session") upsertSession(envelope);
      respond(res, 200, { ok: true });
    });
    return;
  }

  respond(res, 404, { ok: false, error: "not found" });
});

server.listen(PORT, HOST, () => {
  log(`listening on http://${HOST}:${PORT} → ${OUT_FILE}`);
});

process.on("SIGINT", () => {
  log("shutting down");
  server.close(() => process.exit(0));
});
