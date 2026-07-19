---
title: "Open-taxonomy rebuild of slotable-items"
status: accepted
updated: 2026-07-18
links:
  - { rel: references, target: decisions/0004-one-concern-per-package }
---

# Open-taxonomy rebuild of slotable-items

> **Status:** accepted (2026-07-18)

## Context

`@trembus/slotable-items` hard-codes its item-category taxonomy. Adding a category or item kind means editing the package itself — every game's inventory needs fork the platform. This violates the open/closed grain the rest of the platform follows.

*This ADR was cited by number ("ADR 0005") in the repo's CLAUDE.md and in `slotable-items-dissolved`'s package description before it was ever written down. This entry backfills it at its cited number.*

## Decision

Rebuild as `@trembus/slotable-items-dissolved` with a **runtime open taxonomy**:

- A **Slot Category Registry** (`registerSlotCategory`, warn-on-override, reverse index).
- An **Item-Kind Registry** — a consumer registers a new item kind with its own factory, catalog validator, and modifier contribution with zero package edits.
- Every pre-revamp export name is preserved; new registry APIs are additive.
- Developed on branch `feat/slotable-items-open-taxonomy` (commit `edb3b56`, version `0.2.0-rc.0`). At cutover the package renames back to `@trembus/slotable-items`.

## Consequences

- Consumers register categories and kinds instead of forking the package.
- Temporary dual-package state until cutover — tracked by the [[slotable-items-cutover]] pipeline and the `supersedes` edge between the two package entities.
- The "consumers-cast idiom" (registry stores kinds base-typed; callers get full typing at registration) becomes a documented pattern.

## Options considered

- **Patch new categories into the existing package** — rejected: still a closed enum; every addition is breaking churn.
- **Leave the taxonomy closed** — rejected: forks were already the observed failure mode.

## Cites

- `external-locations/code/roblox-packages-mono/packages/slotable-items-dissolved/`
- Repo CLAUDE.md package table ("Open-taxonomy rebuild (ADR 0005)")
- Commit `edb3b56` (2026-07-18)

## Re-open if

The cutover surfaces a capability the open registry cannot express (e.g. cross-kind invariants that need compile-time closure).
