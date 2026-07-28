---
title: "UI development flow and package analysis"
status: active
updated: 2026-07-27
tags: { last-active: 2026-07-27T16:13, kos: "packages-mono, dashboards, roblox-labs, memory" }
---

# UI development flow and package analysis

> **Status:** active (2026-07-27)

## Goal

Map the UI development flow end-to-end across the platform (authoring in the @trembus packages →
labs/testing-environment exercise → TGL distribution → ui-catalog telemetry) and analyze the
current package set, so the flow's gaps and the packages' state are named and prioritized.

## Success Criteria

_(drafted from the goal — confirm or correct next exchange)_

- The UI development flow is documented as a concrete path with named touchpoints (which repo,
  which lane, which dashboard) and its friction points / gaps called out.
- Package analysis rests on a fresh registry: `packages.json` regenerated (or `--check` clean),
  and the @trembus set assessed — versions, dep edges, consumers, staleness.
- A prioritized next-actions list exists (engram Outputs/Next Action), with any formal decision
  candidates offered rather than silently improvised.

## Source References

- `previews/dashboards/packages.json` + `tools/build-packages-registry.mjs` (factual registry)
- `previews/dashboards/ui-catalog.json` + `tools/telemetry-collector.mjs` (M1/M2 telemetry)
- `external-locations/code/roblox-packages-mono/` — the @trembus package monorepo
- `external-locations/code/roblox-labs/` — `user-interface-development` lab (syncback lane)
- `external-locations/code/roblox-testing-environment/` — TrembusUITesting harness
- `_project/roadmap/package-platform-roadmap.md` (status: active)

## Decisions

- <decision made this session>

## First-Principles Candidates

- Every unmet exit criterion of the UI flow converges on the prove seam — the QA rigs have
  passed nothing, so telemetry M3 (QA evidence channel) is the single unlock for the whole
  downstream funnel → none yet (drives Next Action)
- `ui-catalog.json` labels places by runtime `game.Name` ("Place1"/"Place2") — the collector
  needs a placeId→friendly-name map, per [[game-name-not-place-identifier]] → none yet (small
  collector change)

## Outputs

- UI development flow map delivered in-chat (widget + prose): 9-stage funnel — prototype (6
  kits) → catalog (3 components) → telemetry (M1/M2 live) → prove (0 proven) → syncback →
  BLK→FNL (untraveled) → lane choice → productize (none through-flow) → consume (2 games) —
  statuses grounded in the registry, ui-catalog, lab tree, and workflow entity; friction points
  named and prioritized

## Blockers

- <blocker, or “none”>

## Next Action

<the single next concrete action>

## Handoff Notes

<what the next session needs to know>
