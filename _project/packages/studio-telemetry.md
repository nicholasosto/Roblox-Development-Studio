---
title: "@trembus/studio-telemetry"
status: incubating
updated: 2026-07-19
links:
  - { rel: decided-in, target: decisions/0008-studio-native-lab-lane }
tags: { lane: ts }
---

# @trembus/studio-telemetry

> **Status:** incubating (2026-07-19)

## Purpose

Roblox Studio plugin — batched telemetry relay from Studio to a local collector over four channels: console log relay, game-state snapshots (5s), performance metrics — FPS/memory/instance count (2s), and entity data (10s). Rescued 2026-07-19 from the archived `@soul-steel/studio-plugin` (`Archive/Brain-Extracted-Post-Processing/soul-steel-2026/packages/studio-plugin/`), whose source had no live git home.

## Public API

Not a consumable library — the artifact is a Studio plugin model: `pnpm --filter @trembus/studio-telemetry build:plugin` → `TrembusStudioTelemetry.rbxm` (gitignored; `deploy` copies it into `~/Documents/Roblox/Plugins/`). Channels are wired in `src/main.server.ts`; the batched HTTP client (1s flush, bounded queue, pcall-guarded offline) is `src/http/client.ts`.

## Dependencies

Dev-only `@rbxts` toolchain (rbxtsc + rojo). Live dependency data is generated, not transcribed — see the registry (`previews/dashboards/packages.json`).

## Consumers

None as a library, by design. Deployment target: Roblox Studio itself, aimed at the lab experiences ([[0008-studio-native-lab-lane]]). Endpoint is currently the legacy `http://localhost:3001` until the M1 collector lands.

## Notes

Modernization is tracked in [[studio-telemetry-modernization]] — M1 re-aims the plugin at the labs with a `catalog` channel feeding `ui-catalog.json` (audit carry-forward CF-2). All channels degrade gracefully in non-soul-steel places (`FindFirstChild` guards), so the rescued build already runs in the labs. The old `SoulSteelStudioPlugin.rbxm` is still installed in `~/Documents/Roblox/Plugins/` — retire it when this plugin deploys, to avoid a double relay.
