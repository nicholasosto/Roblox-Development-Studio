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
// incoming snapshot differs from what's on disk (ignoring stamps), so a
// 30-second catalog poll does not churn the file or its git status.
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
/** The comparable core of a payload — everything except the volatile stamps. */
const comparable = (payload) =>
  JSON.stringify({
    place: payload.place,
    placeId: payload.placeId,
    catalog: payload.catalog,
    kits: payload.kits,
    manifests: payload.manifests,
  });

function writeCatalog(envelope) {
  const data = envelope.data ?? {};
  const next = {
    generatedBy: "@trembus/studio-telemetry catalog channel via tools/telemetry-collector.mjs",
    schemaVersion: 1,
    receivedAt: stamp(),
    channelTimestamp: envelope.timestamp ?? null,
    place: typeof data.place === "string" ? data.place : "(unknown place)",
    placeId: typeof data.placeId === "number" ? data.placeId : 0,
    catalog: Array.isArray(data.catalog) ? data.catalog : [],
    kits: Array.isArray(data.kits) ? data.kits : [],
    manifests: Array.isArray(data.manifests) ? data.manifests : [],
  };

  if (existsSync(OUT_FILE)) {
    try {
      const prev = JSON.parse(readFileSync(OUT_FILE, "utf8"));
      if (comparable(prev) === comparable(next)) return false; // unchanged — no churn
    } catch {
      // unreadable/corrupt previous file — overwrite it
    }
  }

  mkdirSync(dirname(OUT_FILE), { recursive: true });
  const tmp = `${OUT_FILE}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(next, null, 2)}\n`);
  renameSync(tmp, OUT_FILE);
  lastCatalogAt = next.receivedAt;
  log(
    `ui-catalog.json ← ${next.place}: ${next.catalog.length} catalog entries, ` +
      `${next.kits.length} kits, ${next.manifests.length} manifests`,
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
