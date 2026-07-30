---
title: "inventory-model"
status: incubating
updated: 2026-07-30
tags: { lane: ts }
---

# inventory-model

> **Status:** incubating (2026-07-30)

## Purpose

Positional backpack state — ordered slots addressed by **1-based slot number**, with
catalog-driven reconcile of untrusted storage and pure move/swap transactions. Ported from
the Studio UI lab's `InventoryModel.luau` (`roblox-labs/user-interface-development`), the
first feature to travel lab → package rather than lab → place.

## Public API

Facts live in the generated registry (`previews/dashboards/packages.json`). Planning-relevant
shape only: `createBackpack` · `reconcile` · `move` · `applyMove` · `getSlot` · `isValidSlot` ·
`occupiedSlots` · `createCatalog` / `createPermissiveCatalog`, plus `runInventoryModelSpecs`
re-exported from the package root so a test place can run the suite the way it runs
`slotable-items`'.

## Dependencies

None at runtime — zero deps by design, spec harness included (a per-package copy of the
`slotable-items` harness rather than a shared one).

## Consumers

None yet. Intended first consumer is the rbx-ui inventory surface once it becomes
slot-addressed; `roblox-testing-environment` is the natural home for the spec-running place.

## Notes

- **Scope boundary, deliberate and contested.** This package owns *position*.
  [[slotable-items-dissolved]] already owns named equipment slots, categories, level gates,
  item locking, and `validateDragDrop`. The overlap was surfaced before scaffolding and the
  separate-package route was chosen anyway (user call, 2026-07-30) over folding positional
  ordering into that package as a `backpack-order` module. Two inventory packages now coexist;
  reconciling them is open work, and the [[slotable-items-cutover]] rename is the natural
  moment to revisit it.
- **Result codes are a compatibility surface**, not an implementation detail: `INVENTORY_MOVED`
  · `INVENTORY_SWAPPED` · `SAME_SLOT` · `SOURCE_EMPTY` · `STALE_SOURCE_ITEM` ·
  `INVALID_SOURCE_SLOT` · `INVALID_TARGET_SLOT` are written to `ScreenGui.LastDragResult` by
  the Studio lab and asserted on by its harness. Add, never rename.
- **Specs are written but have never executed.** The suite compiles; running it needs a test
  place (the house pattern — `roblox-testing-environment`'s `SpecRunnerService` + Play).
  Green `rbxtsc` is a typecheck, not a pass.
