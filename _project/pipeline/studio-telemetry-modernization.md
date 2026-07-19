---
title: "studio-telemetry modernization"
status: build
updated: 2026-07-19
links:
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
---

# studio-telemetry modernization

> **Status:** build (2026-07-19)

## Context

The [[studio-telemetry]] plugin was rescued from the soul-steel archive with its 2026-03 shape intact: soul-steel payloads (`Workspace.Zones` / `Workspace.NPCs`) and the legacy `localhost:3001` dashboard endpoint. Meanwhile [[0008-studio-native-lab-lane]] defined an in-place ledger (catalog attributes + GenerationManifests) that today only Claude's MCP scans can read, and the labs audit left CF-2 (a `ui-catalog.json` registry) open. Re-aiming the plugin's channel architecture at the labs turns the ledger into an automatic feed and gives the Tools lens live Studio state.

## Build plan

1. **M0 — Rescue** (done 2026-07-19): source into `packages/studio-telemetry`, rebranded, builds `TrembusStudioTelemetry.rbxm` clean via rbxtsc + rojo.
2. **M1 — Catalog channel + collector** (done 2026-07-19, [[2026-07-19-telemetry-m1-catalog-feed]]): `catalog` channel + `tools/telemetry-collector.mjs` (port 4320) → `previews/dashboards/ui-catalog.json`; command-center Catalog lens at `app/#catalog`; plugin deployed and `SoulSteelStudioPlugin.rbxm` retired. Wire proven end-to-end with real ledger data; the plugin's autonomous 30s feed begins on the next Studio restart.
3. **M2 — Session heartbeat** (done 2026-07-19, [[2026-07-19-telemetry-m2-studio-now-heartbeat]]): `session` channel (5s: place, placeId, mode, uptime, instances) → collector serves `GET /live` (in-memory, CORS) → the Tools lens "Studio now" card polls it at runtime. Design deviation, deliberate: no `labs-live.json` file — a 5s heartbeat would churn a committed file; live state belongs to the live endpoint. Proven from both Studio windows; autonomous once Studio restarts.
4. **M3 — QA channel**: the lab rigs (tile-state / motion / icon labs) emit probe results as QA evidence, attached to the [[ui-component-promotion]] prove step so `State=proven` carries data.
5. **M4 — Retire soul-steel shapes**: generalize or drop the Zones/NPCs payloads (entity channel becomes opt-in), endpoint made configurable via plugin settings.

## Exit criteria

- `ui-catalog.json` is produced by telemetry, not MCP scans, and renders in the command-center.
- The Tools lens shows a live "Studio now" heartbeat when a lab place is open.
- At least one promoted component carries channel-recorded QA evidence.
- No soul-steel-specific payload shapes remain in the plugin.
