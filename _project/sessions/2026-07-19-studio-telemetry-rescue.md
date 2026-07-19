---
title: "studio-telemetry rescue"
status: completed
updated: 2026-07-19
links:
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
---

# studio-telemetry rescue

> **Status:** completed (2026-07-19)

## Goal

Rescue the archived Soul Steel Studio telemetry plugin into the monorepo as `@trembus/studio-telemetry` and open the modernization pipeline aimed at lab telemetry.

## Success Criteria

- Source copied from the archive, rebranded, zero soul-steel references — **done**
- Builds clean: `pnpm --filter @trembus/studio-telemetry build:plugin` → `TrembusStudioTelemetry.rbxm` (33,928 bytes) — **done**
- Mono CLAUDE.md "Current Packages" table row added — **done**
- Entities: [[studio-telemetry]] (incubating, `lane: ts`) + [[studio-telemetry-modernization]] (build) — **done**
- Registry shows 16 packages; dashboards + app rebuilt — **done this session**

## Source References

- Archive: `Archive/Brain-Extracted-Post-Processing/soul-steel-2026/packages/studio-plugin/`
- [[0008-studio-native-lab-lane]] · [[studio-telemetry-modernization]] · the add-a-package workflow
- Concept note: `Knowledge-Architectures/graphs/artificial-brain/Concepts/Studio Telemetry Plugin.md` (2026-03-21 architecture writeup)

## Decisions

- Home is the monorepo TS lane (`packages/studio-telemetry`) — reusable beyond labs; plugin `.rbxm` artifacts stay gitignored (root `*.rbxm` rule).
- Faithful rescue first; all generalization deferred to the pipeline milestones.
- **Not deployed** to `~/Documents/Roblox/Plugins/` yet — the old `SoulSteelStudioPlugin.rbxm` is still installed there, and deploying both would double-relay; the deploy/retire swap is an M1 decision.
- The workflow's consumer-link smoke step doesn't apply to a plugin package; the `build:plugin` artifact is the smoke test (deviation noted here deliberately).

## Outputs

- Mono: `packages/studio-telemetry/` (8 source files + include/ + project + manifest), CLAUDE.md table row — left uncommitted for the user's commit ritual.
- Planning space: [[studio-telemetry]], [[studio-telemetry-modernization]], this session; registry/hub/app regenerated.

## Blockers

- None.

## Next Action

Pipeline M1: build the `catalog` channel + `tools/telemetry-collector.mjs`, closing audit carry-forward CF-2.

## Handoff Notes

The plugin's channels all `FindFirstChild`-guard their soul-steel shapes, so the rescued build already runs harmlessly in lab places — it just posts to a dead endpoint until the M1 collector exists. Endpoint constants live in `src/http/client.ts` (`BASE_URL = http://localhost:3001`). Port 3001 may collide with other local tooling — pick the collector port deliberately at M1.
