---
title: "Single pnpm monorepo for @trembus roblox-ts packages"
status: accepted
updated: 2026-05-01
---

# Single pnpm monorepo for @trembus roblox-ts packages

> **Status:** accepted (2026-05-01)

## Context

Fifteen reusable roblox-ts libraries (logging, persistence, stats, inventory, timers, UI, …) needed a single home with one toolchain. The code predates its git history — the init commit `0a5572a` (2026-05-01) is annotated "pre-existing, first git history" — so this decision is backfilled from the structure that was already in place at init.

## Decision

One pnpm workspace (`packages/*`) under the `@trembus` scope. Each package is a standalone roblox-ts library that compiles to Luau (`main: out/init.lua`, `types: out/index.d.ts`, built with `rbxtsc`). Node is Volta-pinned (22.22.0) and the package manager is pinned via `packageManager` (pnpm 10.33.0).

## Consequences

- One `pnpm -r build` in topological order; one lockfile; one shared compiler toolchain (roblox-ts 3.x, TypeScript 5.5.3).
- All packages live in one working copy, which is what makes the sibling `link:` consumption model ([[0003-peer-dependency-consumption-model]]) possible.
- Cross-package refactors (like the slotable-items rebuild) happen in one branch instead of coordinated releases.

## Options considered

- **One repo per package** — rejected: 15× duplicated CI/toolchain config that drifts, and cross-package changes need coordinated releases.
- **Publish-to-npm-first workflow** — rejected for iteration speed; consumers link the working copy instead (see [[0003-peer-dependency-consumption-model]]).

## Cites

- `external-locations/code/roblox-packages-mono/CLAUDE.md` (Stack + Directory Structure)
- Init commit `0a5572a` (2026-05-01)

## Re-open if

Packages need independent release cadences or ownership boundaries that a single workspace can't express.
