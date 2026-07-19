---
title: "Dual-lane TypeScript and Luau package strategy"
status: accepted
updated: 2026-07-19
links:
  - { rel: references, target: decisions/0002-framework-agnostic-packages }
tags: { lane: luau }
---

# Dual-lane TypeScript and Luau package strategy

> **Status:** accepted (2026-07-19)

## Context

The entire Roblox estate is roblox-ts today: all 15 packages and both consumer repos. A survey (2026-07-19) found **zero** hand-written Luau packages and zero Wally/Selene/StyLua/`.luaurc` footprint anywhere; the only Luau-side tool is Rojo 7.6.1 via Rokit, operating on compiled output. Pure-Luau packages (the Wally ecosystem) are a foreseeable need — but speculative tooling rots.

## Decision

**Plan now, scaffold on first package.** The monorepo is the home for ALL reusable Roblox packages, in two lanes:

- **TS lane** (today): pnpm workspace `packages/*`, rbxtsc, `link:` consumers — unchanged.
- **Luau lane** (reserved): scaffolds only when the first real Luau package passes the [[0004-one-concern-per-package]] gate. Reserved shape: `luau-packages/` beside `packages/`; Wally for dependencies; Rokit-pinned toolchain at the repo root (rojo, wally, selene, stylua); StyLua + Selene configs; `.luaurc` for LSP.
- The `lane` tag (`ts`|`luau`) on package entities is registered now so the graph can express both lanes from day one.

## Consequences

- Zero present cost; the trigger is explicit (roadmap milestone M4).
- TS packages already compile to Luau (`out/`), so a TS package can later be Wally-published without a rewrite.
- [[0002-framework-agnostic-packages]] keeps package APIs portable across lanes.

## Options considered

- **Scaffold the Luau lane now** — rejected: unused toolchain config drifts and rots before first use.
- **Separate Luau repo** — rejected: splits the platform, duplicates conventions and CI, and forks the one-concern gate.

## Cites

- [[0002-framework-agnostic-packages]]
- Sibling repos' `rokit.toml` (Rojo-only today: `soul-steel-official`, `roblox-testing-environment`)

## Re-open if

The first Luau package arrives (this ADR then spawns the concrete lane-scaffold decision), or the Luau need is disproven.
