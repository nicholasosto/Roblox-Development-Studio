---
title: "telemetry M1 catalog feed"
status: completed
updated: 2026-07-19
links:
  - { rel: references, target: pipeline/studio-telemetry-modernization }
---

# telemetry M1 catalog feed

> **Status:** completed (2026-07-19)

## Goal

Pipeline M1: the `catalog` channel + local collector, turning the decision-0008 in-place ledger into the automatic `ui-catalog.json` feed (closes audit CF-2's plumbing).

## Success Criteria

- Plugin gains a `catalog` channel (ledger snapshot on load + 30s poll) — **done**
- `tools/telemetry-collector.mjs` on `127.0.0.1:4320` writes `previews/dashboards/ui-catalog.json` atomically, change-only — **done**
- End-to-end proven over the real wire: Studio → HTTP POST → collector → JSON with real ledger data (3 entries, 6 kits, 1 manifest, placeId `75067279879490`) — **done** (driven via MCP `execute_luau`, the same code path the plugin runs)
- Command-center gains the Catalog lens (`app/#catalog`) — **done**
- Deploy decision executed: `TrembusStudioTelemetry.rbxm` deployed; `SoulSteelStudioPlugin.rbxm` retired (renamed `.retired` in `~/Documents/Roblox/Plugins/`; byte-identical copy remains in the soul-steel archive) — **done**

## Source References

- [[studio-telemetry-modernization]] M1 · [[0008-studio-native-lab-lane]] · [[2026-07-19-studio-labs-audit]] `[CF-2]`
- `external-locations/code/roblox-packages-mono/packages/studio-telemetry/src/channels/catalog.ts`
- `tools/telemetry-collector.mjs` · `previews/dashboards/ui-catalog.json`

## Decisions

- Collector port **4320** — beside the previews server's 4319, deliberately clear of the retired soul-steel dashboard's 3001.
- Dropped the legacy `/api/studio-logs` mirror while touching the endpoint (its dashboard no longer exists; endpoint work is M1 scope).
- `CatalogPayload` carries `placeId` — `game.Name` returns "Place1" in Edit mode, so the numeric id is the stable identity.
- Renamed the deploy script to `deploy:plugin` — bare `deploy` collides with pnpm's built-in deploy command and silently doesn't run the package script.
- Collector writes change-only (stamp-insensitive compare) so the 30s poll never churns git status.

## Outputs

- Mono: `catalog.ts` channel, `messages.ts` catalog types, client endpoint → 4320, main wiring, script rename — uncommitted for the user's ritual.
- Space: `tools/telemetry-collector.mjs`, `previews/dashboards/ui-catalog.json` (real data), `catalog.ts` + `CatalogPanel.tsx` + App tab + landing lens + CLAUDE.md line — uncommitted likewise.

## Blockers

- None.

## Next Action

Restart Studio (either window) so the deployed plugin loads and the feed runs autonomously — then pipeline M2 (session heartbeat → `labs-live.json` → Tools "Studio now" card).

## Handoff Notes

The collector must be running (`node tools/telemetry-collector.mjs`) for the feed to land; it's safe to leave up — bounded memory, change-only writes. The plugin loads on Studio start; until a restart, catalog posts only happen when driven manually (MCP `execute_luau`). `ui-catalog.json` shows all three catalog entries with `templates: 0` — that's `[CF-3]` (fill the registry templates) made visible on the dashboard, plus one agent-invented state (`interactive-prototype`) the lens renders via its open vocabulary. HttpEnabled was already true in the UI place; check it in other lab places before expecting posts.
