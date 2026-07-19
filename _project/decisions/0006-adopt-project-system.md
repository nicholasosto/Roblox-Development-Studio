---
title: "Adopt Project-System for this space"
status: accepted
updated: 2026-07-19
---

# Adopt Project-System for this space

> **Status:** accepted (2026-07-19)

## Context

The monorepo had planning signal without a planning layer: CLAUDE.md and two SOP/overview docs, plus a cited-but-nonexistent "ADR 0005". The previous Roblox-side Project-System consumer (Soul-Steel-Official) de-migrated in its commit `aa4a689`, leaving its drift-check registration pointing at deleted paths and the Roblox domain without a planning space.

## Decision

Found **Roblox-Development-Studio** as a Project-System consumer wrapping `roblox-packages-mono`:

- Vendored framework (`.project-system/` copied verbatim, never edited).
- Standard six kinds plus a `package` domain kind; `lane` tag (`ts`|`luau`) registered.
- Code wrapped via `external-locations/code` → the Roblox-Repositories **parent** (one-level-deep rule, Soul-Steel's surviving pattern).
- ADRs 0001–0005 backfilled with git-grounded dates so existing citations resolve at their numbers.
- Registered in `check-consumer-drift.mjs`, replacing the dead `soul-steel` entry.

## Consequences

- Entities are created only via `new-entity.mjs` / `/new` (guard-enforced); the repo itself stays planning-free.
- The drift check keeps the vendored framework honest against canonical.
- Real-consumer count returns to 3 (asset-studio, astrix-systems, roblox-development-studio) — the documented trigger for re-opening Project-System's decision 0002 toward publishing `@trembus/project-schema`.

## Options considered

- **In-repo planning (`_project/` inside the monorepo)** — rejected: breaks the space-wraps-repo precedent and ships planning artifacts inside a package-platform repo.
- **Revive Soul-Steel-Official as the consumer** — rejected: that space deliberately de-migrated; its scope is a game, not the package platform.

## Cites

- `Project-System/README.md` (adoption recipe)
- [[0005-open-taxonomy-slotable-items]] (the citation this space finally homes)

## Re-open if

The space's scope grows beyond the package platform — split into a new space rather than bloating this one.
