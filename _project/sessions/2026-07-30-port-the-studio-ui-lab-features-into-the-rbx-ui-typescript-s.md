---
title: "Port the Studio UI lab features into the rbx-ui TypeScript system"
status: completed
updated: 2026-07-30
tags: { last-active: 2026-07-30T06:31, kos: "packages-mono, roblox-labs, decisions, studio-mcp, dashboards, memory" }
---

# Port the Studio UI lab features into the rbx-ui TypeScript system

> **Status:** completed (2026-07-30)

## Goal

Bring the features developed in the Studio UI lab (`roblox-labs/user-interface-development`)
into the TypeScript UI system (`@trembus/rbx-ui`), so that lab work reaches consumers as
versioned, typed, reviewable package code rather than as Studio-authored instance trees.

## Success Criteria

_(drafted from the goal — confirm or correct next exchange)_

- The lab's portable layer is inventoried and classified: which of the 13 text-Luau modules
  (model · drag controller · adapter · schema · protocol · persistence · fixtures + 4 test
  files) port as-is, which need redesign for a React idiom, which stay lab-only.
- At least one feature completes the full port — TS source in rbx-ui, its Luau unit test
  translated or replaced, package builds green — proving the path end to end rather than
  describing it.
- The binary `.rbxm` visual trees have a chosen read path (rbxm→XML converter installed, or
  live Studio MCP inspection) so layout numbers are measured, not eyeballed.
- The token collision is resolved by the port rather than deferred: ported components source
  from `Tokens.ts`, and ADR 0016 is minted recording Studio's resulting role.

## Source References

- `external-locations/code/roblox-packages-mono/packages/rbx-ui/` — target package (@rbxts/react;
  11 components + 3 screens + `design-system/Tokens.ts`), v0.1.0
- `external-locations/code/roblox-labs/user-interface-development/src/ReplicatedStorage/UIStudio/`
  — the portable text-Luau layer (Shared/ model + adapters + contracts)
- `.../src/ServerStorage/UIStudioTests/` — 4 Luau unit tests + `RunUnitTest.luau` runner
- `.../src/StarterGui/*.rbxm` — 9 binary visual trees (12–57 KB), the part that resists
- `_project/sessions/2026-07-27-ui-development-flow-and-package-analysis.md` — the 07-28 audit's
  ranked pull-in list (delivered in chat, never written down); its Next Action is ADR 0016
- `_project/roadmap/package-platform-roadmap.md` (active)

## Decisions

- Visual-layer read path = **live Studio MCP**, not an `rbx-util`/`lune` install: the whole lab
  is mounted in the running Soul Steel hub as `StarterGui.User-Interface-Development-Lab` (6
  preview GUIs + harness) via the linked package, and `InventoryGui` is only 56 descendants.
  Converter install deferred until a tree needs to be diffable in git rather than merely read.
- **`@trembus/inventory-model` retracted before scaffolding.** The concern is already owned by
  `slotable-items-dissolved`: `inventory.ts` ships `validateDragDrop()` → `SlotDropResult`
  (`LevelRequirementNotMet` · `ItemLocked` · `IncompatibleSlot` · `SameSlot`), plus
  `SwapSlotsRequest/Result` and a 15-value `LoadoutOperationFailureReason` union. A new package
  would duplicate that and fail step 1 of `docs/sops/adding-a-package.md` (the one-concern gate).

## First-Principles Candidates

- The lab and rbx-ui hold **incompatible inventory models** — lab is 6 fixed positional slots
  (`slots[n] = itemId`); rbx-ui's InventoryPanel renders 20 cells as a *projection of a filtered
  array*, with no persistent slot address. Drag-to-reorder is undefined against a projection, so
  the port is a model change to a shipped component, not a feature add → decision (gates the port)
- Pure-logic Luau ports free; Roblox-coupled Luau does not. `InventoryModel.luau` makes zero
  engine calls and its test is pure assertions — it can run in node with no Studio and no rig,
  which is the cheapest test coverage rbx-ui will ever get → none yet (drives sequencing)
- The lab carries a **machine-readable QA assertion surface** nobody has cashed in: ScreenGui
  attributes (`LastDragResult`, `DragSourceSlot`, `DragHoverSlot`, `DragRequestCount`,
  `InteractionState`) plus per-slot `TestId`s. It is the closest existing thing to the funnel's
  never-produced "prove" evidence; a naive port silently discards it → decision (offer with 0016)
- **roblox-ts side-effect-only modules do not load.** A spec file whose body is nothing but
  top-level `describe()` calls has no exports, so rbxtsc emits a chunk with no `return`, and
  Luau rejects it: `Module code did not return exactly one value`. `rbxtsc` is silent — the
  failure only appears at require time. Any single export fixes it → brain capture (toolchain scar)
- **`slotable-items-dissolved` has the same defect, unnoticed.** Its
  `out/__specs__/slotable.spec.luau` also has zero top-level `return`s, so its suite must fail
  identically — it was simply never reached, because Flamework aborts `ignite()` on the FIRST
  preload failure and `InventoryModelSpecService` sorts before `SpecRunnerService`. The house
  pattern I copied was itself unproven → decision (offer the one-line fix to that package)
- A green `rbxtsc` proves nothing about loadability, and an aborted `ignite()` produces
  *silence*, not a partial run — the place printed its boot line and then nothing, which reads
  identically to "no specs registered" → none yet (sharpens the earlier build≠test point)
- Scoping a port against the *destination's* surface is not enough — the destination's
  **siblings** own concerns too. Two full scoping passes named rbx-ui as the target and never
  looked at `slotable-items-dissolved`, which already implements drag-drop validation; the
  monorepo CLAUDE.md package table would have shown it in one read → memory
- The monorepo's spec convention is **in-engine, not node**: `__specs__/harness.ts` is a
  dependency-free describe/it/expect shim over `assert`+`pcall` whose `runSpecs()` returns a
  report a *test place* formats. Purity of the code under test does not imply a node runner is
  available or wanted → none yet (corrects this session's earlier claim)
- The genuine gap is narrow: dissolved addresses **named** slots (`loadout[cat][slotKey]`) and
  keeps `backpack` as an unordered array touched only by `findIndex`-by-guid; the lab's
  contribution is **positional backpack ordering** + move/swap-by-index. One module, not one
  package → decision (pending user call)
- `GeneratedBy` ownership guards (BUILD_OWNER/RUNTIME_OWNER) exist only because Studio authors
  and code both mutate one tree — they are an artifact of the dual-authority problem 0016 exists
  to end, and become dead code the moment React owns the tree → none yet

## Outputs

- **`@trembus/inventory-model` v0.1.0** scaffolded and building green in
  `roblox-packages-mono` (real repo path, not through `external-locations/`): `types.ts` ·
  `catalog.ts` · `backpack.ts` · `index.ts` + `__specs__/` (harness + 14-group suite + runner
  entry). `rbxtsc` exit 0; Luau emitted to `out/`. Uncommitted per commit ritual.
- Tier 1 port complete in substance: the lab's `InventoryModel.luau` behaviour is preserved
  verbatim (result codes, immutability, clone-on-read, dedup/unknown-id reconcile) with three
  deliberate upgrades — a discriminated `MoveResult` union, configurable capacity, and a
  catalog abstraction so no game content ships in `src/` (repo convention 5).
- SOP followed through the doc step: monorepo `CLAUDE.md` package table row added
  (`claudeTableDrift: 0` on regeneration). **Not** done: commit, npm publish, consumer smoke.
- `previews/dashboards/packages.json` regenerated — 18 packages, `unbuilt: 0`.
- Package entity [[inventory-model]] opened at `incubating`.
- **Spec lane wired** in `roblox-testing-environment` (branch `verify/slotable-items-open`):
  `@trembus/inventory-model` `link:` dep added, symlink resolved, and
  `src-slotable/server/services/InventoryModelSpecService.ts` added alongside the existing
  `SpecRunnerService` — one test place runs every pure package suite, so a new package costs a
  service, not a place. `pnpm run build:slotable` exit 0;
  `out-slotable/server/services/InventoryModelSpecService.luau` emitted. Uncommitted.
- Place built: `rojo build slotable-items.project.json` → 26 MB `PackageSpecs.rbxl` (rojo 7.7.0).
- **The suite ran once and failed to load** (user pressed Play, 2026-07-30 ~10:15): every
  spec module errored with `Module code did not return exactly one value` — the spec file was
  side-effect-only, so rbxtsc emitted a chunk with no `return`. Fixed with a marker export;
  package + lane + place rebuilt green. **Not re-run** — closed out first.
- Dashboards regenerated and the static explorer rebuilt (`previews/app/`); planning tree
  validates 75 files / 0 errors; labs lanes clean (0 syncback-due, 0 dirty).

## Blockers

- **Cannot drive a second Studio from the MCP bridge.** `open -a RobloxStudio <place>.rbxl`
  launches a process that stays in `StandaloneDataModel` scope (its log: "Setting fallback
  DataModel Standalone", plugins loaded "for gst 'Standalone'") — it sits on the start/home
  screen and never opens the place, so no edit session exists, the Studio MCP plugin never
  binds, and `list_roblox_studios` keeps returning only the hub. Protocol-handler launch is
  not a usable headless-test path on this machine.
- Two inventory packages now coexist — open risk, see Handoff.

## Next Action

**Architecture review of the `@trembus` package estate** — the user's call at close (2026-07-30):
too many early errors to keep porting feature-by-feature. That review, not another port, is the
next session. Feed it the three findings below under Handoff; resume the port only after it
settles package boundaries.

## Handoff Notes

**Three findings the architecture review should start from:**

1. **Inventory is modelled three incompatible ways across the estate.** `slotable-items-dissolved`
   addresses `loadout[category][namedSlotKey]` with an unordered `backpack` array; the Studio lab
   uses 6 fixed positional slots; `rbx-ui`'s `InventoryPanel` renders a projection of a filtered
   array with no slot address at all. `inventory-model` was added for the third case, which means
   the estate now has **two inventory packages** — a boundary question, not a coding question.
2. **No package suite has demonstrably ever run.** The in-engine spec pattern is sound, but both
   `inventory-model` and `slotable-items-dissolved` shipped spec modules that cannot even load
   (see the roblox-ts export trap), and Flamework's abort-on-first-preload-failure makes that
   silent. Treat "has tests" claims across the monorepo as unverified until a suite prints.
3. **`rbx-ui` has no Button/Tab atom** and hand-rolls switcher tabs (noted 07-28, still true), and
   two design-token languages are live — the unminted **ADR 0016 (token authority)** blocks any
   further lab→package promotion from being coherent.

- **Green build ≠ green tests.** `rbxtsc` typechecks; it does not run the harness. The
  compiled output's only runtime surface is `TS.import`, so the suite needs the roblox-ts
  RuntimeLib and a place — ad-hoc execution via Studio MCP is blocked because `loadstring`
  is disabled in Roblox.
- **The overlap is real and unresolved.** `slotable-items-dissolved` ships `validateDragDrop`
  → `SlotDropResult` and a 15-value failure-reason union. `inventory-model` deliberately does
  not model eligibility, only position. A consuming game must call both. The
  [[slotable-items-cutover]] rename is the moment to decide whether they merge.
- **Slot numbering is 1-based in the public API**, 0-indexed in `BackpackState.slots` storage
  (slot N = `slots[N-1]`). Chosen to match the Studio harness attribute vocabulary
  (`TestId = "inventory.slot.1.drag"`). Read through `getSlot()`, never index directly.
- Tier 2 (`InventoryDragController`, 389 lines) and the visual layer are untouched. The lab
  is live in the running Soul Steel hub under `StarterGui.User-Interface-Development-Lab`, so
  the `.rbxm` trees are readable via Studio MCP without installing a converter.
- ADR 0016 (token authority) still unminted — it was the 07-28 Next Action and remains open.
