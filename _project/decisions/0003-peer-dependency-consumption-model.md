---
title: "Peer-dependency consumption model"
status: accepted
updated: 2026-05-01
---

# Peer-dependency consumption model

> **Status:** accepted (2026-05-01)

## Context

Internal `@trembus/*` and common `@rbxts/*` libraries must not be bundled twice into a consuming game — duplicate module instances break singleton state (signals, registries) in the Roblox DataModel.

## Decision

- Shared libraries (`@rbxts/services`, `@rbxts/signal`, internal `@trembus/*`) are **peerDependencies** with semver ranges.
- Internal deps are mirrored as `workspace:*` **devDependencies** so local typecheck/build works inside the workspace.
- Optional integrations are flagged via `peerDependenciesMeta` (e.g. `stats` → `persistent-data`).
- Sibling repos consume the working copy via `link:../roblox-packages-mono/packages/<name>` dependencies against the git-ignored `out/` build.

## Consequences

- Consumers control dependency versions; exactly one copy of each library per game.
- `link:` consumers require the local build to exist (`pnpm build` before consuming).
- Peer-dep style was normalized across all 15 packages in commit `afd7952` (2026-07-18).

## Options considered

- **Direct `dependencies`** — rejected: duplicate instances per package in the consumer's DataModel.
- **Consume published npm versions** — deferred until packages actually publish; `link:` keeps the iteration loop instant.

## Cites

- `external-locations/code/roblox-packages-mono/CLAUDE.md` (Convention #3)
- `external-locations/code/roblox-packages-mono/docs/sops/adding-a-package.md` (step 4)
- Commit `afd7952` "normalize peer-dep style"

## Re-open if

Packages publish to a registry and consumers migrate from `link:` to real versions — the devDependency mirror and the sibling-path coupling both change shape then.
