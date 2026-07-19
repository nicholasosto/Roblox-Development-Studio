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
2. **M1 — Catalog channel + collector** (closes audit CF-2): new `catalog` channel posting `UIStudio.Catalog` entry attributes, `UIMockups` kit inventory, and `GenerationManifest` values; a small dev-time collector (`tools/telemetry-collector.mjs`, this space) receives and writes `previews/dashboards/ui-catalog.json`; the command-center gains a catalog lens. Deploy decision (retire `SoulSteelStudioPlugin.rbxm`) lands here.
3. **M2 — Session heartbeat**: `session` channel (open place name, session uptime, instance count) → collector writes `labs-live.json` → the Tools lens gains a "Studio now" card.
4. **M3 — QA channel**: the lab rigs (tile-state / motion / icon labs) emit probe results as QA evidence, attached to the [[ui-component-promotion]] prove step so `State=proven` carries data.
5. **M4 — Retire soul-steel shapes**: generalize or drop the Zones/NPCs payloads (entity channel becomes opt-in), endpoint made configurable via plugin settings.

## Exit criteria

- `ui-catalog.json` is produced by telemetry, not MCP scans, and renders in the command-center.
- The Tools lens shows a live "Studio now" heartbeat when a lab place is open.
- At least one promoted component carries channel-recorded QA evidence.
- No soul-steel-specific payload shapes remain in the plugin.
