---
title: "telemetry M2 studio-now heartbeat"
status: completed
updated: 2026-07-19
links:
  - { rel: references, target: pipeline/studio-telemetry-modernization }
---

# telemetry M2 studio-now heartbeat

> **Status:** completed (2026-07-19)

## Goal

Pipeline M2: the `session` heartbeat channel and the Tools lens "Studio now" card — the command center sees which Studio windows are open, live.

## Success Criteria

- Plugin gains a `session` channel (identity + liveness every 5s: place, placeId, mode, uptime, instance count) — **done**
- Collector keeps heartbeats in memory, serves `GET /live` (CORS `*`), stale after 15s, pruned after 60s — **done**
- Tools lens "Studio now" card polls `/live` at runtime and degrades gracefully when the collector is offline — **done**
- End-to-end proven over the real wire from BOTH Studio windows (UI place `75067279879490` @ 55,709 instances; Part Textures `134559055187413` @ 52,369) — **done**, including observed prune of an aged session

## Source References

- [[studio-telemetry-modernization]] M2 · [[2026-07-19-telemetry-m1-catalog-feed]]
- `external-locations/code/roblox-packages-mono/packages/studio-telemetry/src/channels/session.ts`
- `tools/telemetry-collector.mjs` (`/live`) · `apps/command-center/src/live.ts` (the lens's only caller)

## Decisions

- **No `labs-live.json` file** (deviation from the original M2 sketch): a 5-second heartbeat committed to a file would churn git forever; live state is served from the live endpoint and the lens polls at runtime. The static build stays fully functional — collector-offline renders as a quiet note, not an error.
- CORS `Access-Control-Allow-Origin: *` on all collector responses so any local origin (vite dev 5176, previews-static) can poll.
- Session key is placeId (name fallback for unsaved places); `game.Name` proved reliable in the Part Textures window and useless ("Place1") in the UI window — the label helper handles both.

## Outputs

- Mono: `session.ts` channel + `SessionPayload` type + wiring (plugin rebuilt + redeployed, 36 KB).
- Space: collector `/live` + session store, `apps/command-center/src/live.ts`, "Studio now" section in `ToolsPanel.tsx`, CLAUDE.md line. All uncommitted for the user's ritual.

## Blockers

- None.

## Next Action

Restart Studio to make the heartbeat autonomous; then pipeline M3 (QA evidence channel for the promotion workflow).

## Handoff Notes

Heartbeats shown so far were driven via MCP `execute_luau` (one-shots that go stale/pruned by design); the deployed plugin makes them continuous after a Studio restart. Both lab places have HttpEnabled=true (verified). The lens polls every 5s only while the Tools tab is mounted; the fetch has a 2s abort so an offline collector never hangs the UI.
