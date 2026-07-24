---
title: "TGL flow and structure — nail the concepts"
status: completed
updated: 2026-07-24
tags: { last-active: 2026-07-24T09:28, kos: "decisions, soul-steel, dashboards, studio-mcp, memory" }
---

# TGL flow and structure — nail the concepts

> **Status:** completed (2026-07-24)

## Goal

Nail down the concept model for TGL (Trembus-Game-Library, the Roblox Package) — its structure
(composition, granularity, namespace ownership) and its flow (how content is authored, enters the
package, gets recorded, and is consumed) — *before* executing any mechanics (ADR 0011 step 1 is
deliberately queued behind this). Part of the larger goal: finalizing the Roblox Studio
development pathway.

## Success Criteria

- The composition/granularity question (ADR [[0011-tgl-package-vs-syncback-boundary]] §4 namespace
  overload) has an answer — recorded as a decision entity or an explicit, reasoned deferral
- The authoring flow per content type (Studio-born effects vs file-born props/rigs) is agreed and
  written down, including where the package's home copy lives
- The canonical record per surface (package asset · master Assets exports · syncback repos ·
  testing-env projection) is named, with no surface left ambiguous
- Outcomes recorded via tooling (decision entity and/or engram Decisions), validate stays 0 errors

## Source References

- decisions [[0011-tgl-package-vs-syncback-boundary]] (accepted; §4 deferred) · [[0008-studio-native-lab-lane]] · [[0009-soul-steel-universe-topology]]
- engrams [[2026-07-23-rojo-packages-and-syncback-re-evaluation]] (handoff) · [[2026-07-22-current-status-report]] ("package the outputs, not the workbench")
- pipeline [[v2-effects-library-normalization]] (steps 2–4 pending: tuning walk, retire V2, promote)
- `soul-steel-universe/crystal-sanctum/src/ServerStorage/TrembusGameLibrary/` (effects half, flattened)
- `roblox-testing-environment/default.project.json` (Props/Rigs projection of the TGL namespace)
- `~/Master-Managed/Assets/runtime/roblox/TGL-backup/TrembusGameLibrary.rbxm` (whole-package export)

## Decisions

- Operator deleted the hub's ServerStorage backup copy of TGL to reduce confusion — the published
  asset's version history is the backup; live probe confirms hub ServerStorage is now empty
- **Grand package blessed** (Q2a): TGL is *one* package — the Roblox-side distribution of the
  master Assets library; a version bump is a library release → ADR
  [[0012-tgl-grand-package-model-and-satellite-naming]] (accepted this session)
- **Satellite rename chosen and half-executed** (Q2c): `TGL-Preview` applied in
  `roblox-testing-environment/default.project.json` (only reference in the repo); `TGL-Staging`
  queued as a Studio rename for the next crystal-sanctum session (0012 §3)
- ADR [[0011-tgl-package-vs-syncback-boundary]] §1 **re-aimed** via amendment note: the ignore
  rule targets the hub (`Workspace/Trembus-Game-Library`), not crystal-sanctum's staging, which
  stays syncback-recorded until the v16 fold-in
- `CLAUDE.md` TGL paragraph reconciled to the grand-package model (asset id, hub home copy,
  satellite names, re-aimed boundary)
- **2b answered**: `00-Subpackages` = the **incubation shelf** — dynamic test/sandbox packages
  under conceptual development. `Part-Texture-Testing-Lab` = materials/textures/Studio-MCP
  building-design environment; `User-Interface-Development-Lab` is the UI counterpart, living in
  `StarterGui` because it is UI-based. `Beamaract` identity still unconfirmed → 0012 open items
  updated

## First-Principles Candidates

- The live TGL package copy (hub `Workspace.Trembus-Game-Library`, PackageLink intact,
  `rbxassetid://119571962868471`, v15) already spans six content families + a `00-Subpackages`
  folder of nested packages — the docs' "effects half / props-rigs half" model described staging
  areas and projections, not the package → decision (0012 candidate)
- A package-boundary ignore rule must target where a *linked* copy actually lives (hub:
  `Workspace/Trembus-Game-Library`), not where flattened staging landed — ADR 0011 step 1 as
  written aims at crystal-sanctum's staging folder, and the hub's next syncback would flatten all
  ~7k package instances unprotected → decision (0011 amendment)
- Hyphenated `Trembus-Game-Library` (the package) vs un-hyphenated `TrembusGameLibrary`
  (staging/projections) is an accidental namespace pun — same words, different instances — inviting
  exactly the confusion the operator just deleted a backup over → decision
- Crystal-sanctum's `ServerStorage.TrembusGameLibrary` was script-built by the normalization pass
  (un-hyphenated name, no insert from the asset), so it is almost certainly a plain staging folder
  and never was the package copy — syncback's PackageLink-stripping made the two
  indistinguishable in git → decision (verify live when crystal-sanctum is next open)

## Outputs

- ADR [[0012-tgl-grand-package-model-and-satellite-naming]] (accepted): grand package blessed,
  subpackage + incubation-shelf rule, satellite naming, named flow stations, 0011 §1 re-aim
- ADR [[0011-tgl-package-vs-syncback-boundary]] amendment note — ignore boundary re-aimed at the hub
- `roblox-testing-environment/default.project.json`: projection renamed `TGL-Preview` (committed)
- `CLAUDE.md` TGL paragraph reconciled (asset id, hub home copy, satellite names, boundary)
- Live-probe census: hub `102596975485791` hosts the package home copy
  (`rbxassetid://119571962868471`, v15, six families, ~7k instances, `00-Subpackages` = incubation shelf)
- Regenerated hub/graph + labs-status contracts and command-center bundle; auto-memory
  `game-name-not-place-identifier` amended with the Edit-mode nuance

## Blockers

- none

## Next Action

Add `syncbackRules.ignoreTrees: ["Workspace/Trembus-Game-Library"]` to `hub/default.project.json`
**in the `soul-steel-universe` repo** (in the repo itself, never through the `external-locations/`
window) — required before any hub publish→syncback loop. The hub currently carries the unpublished
ServerStorage-backup deletion, deliberately waiting on that order (rule → publish → syncback).

## Handoff Notes

- Satellite rename is half-done: `TGL-Preview` landed git-side; `TGL-Staging` is a Studio rename
  next time crystal-sanctum is open. Staging stays syncback-recorded until v16 folds it in (0012 §5).
- v16 = fold the 99 staged effects into the package copy + Publish Package — sequence it after the
  v2 step-2 tuning walk; [[v2-effects-library-normalization]] steps 2–3 remain pending.
- Open from 0012: (b) `Beamaract` identity (presumed incubating sandbox), (c) the promotion gate
  (master Assets `effects/<domain>/` exports); the Q3 home-copy question revisits after v2 step 2.
- Committed at close: planning docs+ledger, planning previews, and the testing-env rename
  (slotable-items WIP in that repo left untouched).
