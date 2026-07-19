---
title: "One concern per package gate"
status: accepted
updated: 2026-05-01
---

# One concern per package gate

> **Status:** accepted (2026-05-01)

## Context

Package monorepos accrete grab-bag "utils" packages unless there is a gate at creation time. Once a junk-drawer package exists, everything leaks into it.

## Decision

A new package must pass the **one-concern-per-package** proposal gate before scaffolding: state the single concern; if the proposal needs "and", it is two packages. The gate is the first step of the adding-a-package SOP.

The existing grain is the evidence: `timer` (state machine) vs `timer-ui` (ScreenGui display) are separate packages; `slotable-items` and `stats` each own exactly one system.

## Consequences

- More, smaller packages with clear peer-dependency seams ([[0003-peer-dependency-consumption-model]]).
- The gate becomes the first swimlane step of the [[add-a-package]] workflow in this space.
- No `@trembus/utils` exists, by design.

## Options considered

- **Allow a shared utils package** — rejected: it becomes the dumping ground that defeats the package boundaries.

## Cites

- `external-locations/code/roblox-packages-mono/CLAUDE.md` (Convention #1)
- `external-locations/code/roblox-packages-mono/docs/sops/adding-a-package.md` (proposal gate)

## Re-open if

The package count grows to where per-package overhead (configs, builds, versioning) dominates the benefit of separation.
