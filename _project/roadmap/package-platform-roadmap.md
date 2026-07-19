---
title: "Package platform roadmap"
status: active
updated: 2026-07-19
---

# Package platform roadmap

> **Status:** active (2026-07-19)

## Context

The package platform now has a planning layer (this space). This roadmap is the ordered spine for its first phase: the founding, the in-flight slotable-items cutover, the packages-explorer dashboard, and the reserved Luau lane.

## Plan

- **M1 — Space founded** (2026-07-19, done): framework vendored, config generated, ADRs 0001–0007 backfilled at their cited numbers, 15 package entities seeded, consumer registered in the drift check.
- **M2 — slotable-items open-taxonomy cutover**: ship the [[slotable-items-cutover]] pipeline; branch `feat/slotable-items-open-taxonomy` merges and the dissolved package renames back to `@trembus/slotable-items`.
- **M3 — Packages-explorer dashboard**: `tools/build-packages-registry.mjs` emits `previews/dashboards/packages.json`; the command-center app (`apps/command-center/`) renders the catalog, dependency graph, and inspector at `previews/app/#packages`.
- **M4 — First Luau package**: triggers the lane scaffold (Wally + Rokit + Selene/StyLua) per [[0007-dual-lane-ts-luau]].

## Open questions

- Publishing readiness: when do `@trembus/*` packages publish to npm, moving consumers off `link:`? (Ties to the re-open clause of [[0003-peer-dependency-consumption-model]].)
- `@trembus/project-schema`: real-consumer count is back at 3 — Project-System's decision 0002 re-opens toward publishing the shared schema package.
