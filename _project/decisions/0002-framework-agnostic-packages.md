---
title: "Packages are framework-agnostic (no Flamework imports)"
status: accepted
updated: 2026-05-01
---

# Packages are framework-agnostic (no Flamework imports)

> **Status:** accepted (2026-05-01)

## Context

Consuming games differ in architecture: `soul-steel-official` uses Flamework DI; other consumers (and any future Luau consumer) do not. A package that imports Flamework forces that framework onto every consumer.

## Decision

Packages export plain classes and functions with **no Flamework imports** in package source. Consumers that use DI wrap the exported classes in their own `@Service`/`@Controller` declarations.

Recorded honestly: the adding-a-package SOP retains a *conditional* Flamework step for legacy packages (e.g. `rig-spawner`'s history). The rule governs new packages; documented exceptions are exceptions, not precedent.

## Consequences

- Maximum consumer reach — including the reserved Luau lane ([[0007-dual-lane-ts-luau]]), since a plain-class API survives the TS→Luau boundary.
- DI wiring is the consumer's job, so each game owns its own lifecycle/injection decisions.
- Packages stay unit-testable without a framework harness.

## Options considered

- **Flamework-native packages** — rejected: couples every consumer to Flamework's decorators, reflection, and build step.

## Cites

- `external-locations/code/roblox-packages-mono/CLAUDE.md` (Convention #2)
- `external-locations/code/roblox-packages-mono/docs/sops/adding-a-package.md` (Flamework variant)

## Re-open if

A package's core value *is* the DI integration itself (at which point it should be an explicitly Flamework-scoped package, not a rule change).
