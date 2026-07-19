---
title: "slotable-items open-taxonomy cutover"
status: build
updated: 2026-07-18
links:
  - { rel: decided-in, target: decisions/0005-open-taxonomy-slotable-items }
---

# slotable-items open-taxonomy cutover

> **Status:** build (2026-07-18)

## Context

ADR [[0005-open-taxonomy-slotable-items]] shipped the open-taxonomy rebuild as `@trembus/slotable-items-dissolved` (`0.2.0-rc.0`) on branch `feat/slotable-items-open-taxonomy`. The platform is in a temporary dual-package state until cutover.

## Build plan

1. Smoke-test the dissolved package in `roblox-testing-environment` (its dedicated `src-slotable` lane).
2. Merge `feat/slotable-items-open-taxonomy` into `main`.
3. Rename the package (directory + `package.json` name) back to `@trembus/slotable-items`; retire the closed-taxonomy implementation.
4. Update consumer `link:` deps and the repo CLAUDE.md package-table rows.
5. Flip entities in this space: [[slotable-items]] → `superseded`; [[slotable-items-dissolved]] → `active` under its restored name.
6. Regenerate the packages registry (`node tools/build-packages-registry.mjs`).

## Exit criteria

- Cutover merged on `main`; package renamed; old implementation removed.
- Both `link:` consumers build green against the renamed package.
- Registry and package entities reflect the supersession (no `rc` badge, no dual-package state).
