---
title: "TGL package vs syncback boundary"
status: accepted
updated: 2026-07-23
---

# TGL package vs syncback boundary

> **Status:** accepted (2026-07-23)

## Context

`Trembus-Game-Library` (TGL) is a **Roblox Package** — an asset-id-backed, Roblox-maintained,
versioned instance library (currently v15, v16 pending), edited live in Studio. Its contents now
land inside places that are recorded by the **syncback** lane, and that collides with how Roblox
Packages work:

- **Syncback flattens the package.** `crystal-sanctum/src/ServerStorage/TrembusGameLibrary/`
  currently holds `EffectPlayer.luau` plus ~100 loose `EFX_PRT_*_BLK.rbxm` effect models, with
  **zero `PackageLink`/`packageId` metadata anywhere in either syncback repo**. Rojo has a
  documented history of stripping `PackageLink` on sync (rojo#222). So every
  `rojo syncback crystal-sanctum` re-serializes the package's guts as plain instances and drops
  the package boundary.
- **Editing a package copy disables AutoUpdate** until it is republished — and the operator edits
  TGL live in Studio. Combined with flattening, the published asset (v15/v16) and the git-recorded
  copy drift silently.
- **The name is overloaded across lanes.** `ServerStorage/TrembusGameLibrary` means the *effects*
  library in `soul-steel-universe/crystal-sanctum` (syncback) but a *Props/Rigs* library mapped
  from `roblox-testing-environment/assets/library/` (code-first, git-as-master). Two repos, two
  lanes, one namespace, no single owner of the package's composition.

Neither syncback loop README mentions TGL, `syncbackRules`, or `PackageLink`; nothing today
protects the package boundary. This is the "re-evaluate our syncbacks now that we have TGL"
question.

## Decision

*(Accepted 2026-07-23. First concrete step: add the `syncbackRules` block to
`crystal-sanctum/default.project.json` in the `soul-steel-universe` repo — done in the repo itself,
never through the `external-locations/` read-through window — then remove the already-flattened
`src/ServerStorage/TrembusGameLibrary/` subtree on the next syncback.)*

*(Amended 2026-07-24 by [[0012-tgl-grand-package-model-and-satellite-naming]]: a live probe found
the linked package copy lives in the hub's `Workspace`, and crystal-sanctum's folder is un-linked
staging built by the normalization pass — not the package. The first concrete step re-aims at
`hub/default.project.json` with `ignoreTrees: ["Workspace/Trembus-Game-Library"]`;
crystal-sanctum's staging stays syncback-recorded until v16 folds it in, and is renamed
`TGL-Staging` per 0012 §3.)*

**Treat the published TGL package asset as the source of truth, and protect it out of syncback.**

1. Add `syncbackRules` with `ignoreTrees: ["ServerStorage/TrembusGameLibrary"]` to every place
   project that hosts TGL (`crystal-sanctum` today; any future host place). Syncback then records
   the *place* without re-flattening the package or stripping its `PackageLink`.
2. Author TGL as a package (edit in Studio → **Publish Package** to its asset id, v15 → v16);
   consume it in places by insert with an intact `PackageLink` + AutoUpdate.
3. Promote gallery-proven effects to the master Assets library
   (`runtime/roblox/soul-steel/effects/<domain>/*.rbxm`) per the v2-effects pipeline step 4 — the
   durable, place-independent record of the contents.
4. Resolve the namespace overload separately: decide whether TGL is one package spanning
   effects + props + rigs, or the `roblox-testing-environment` folder is renamed so only one
   library owns the `TrembusGameLibrary` name.

## Consequences

- **Easier:** live Studio edits stop silently disabling AutoUpdate; syncback diffs on
  `crystal-sanctum` stop churning ~100 `.rbxm` files on every loop; the package version (v15/v16)
  becomes the single authority for TGL's contents.
- **Harder / cost:** the `ServerStorage/TrembusGameLibrary` subtree leaves `crystal-sanctum`'s git
  record (that is the point — an ignored tree is not serialized). The record of TGL's *contents*
  moves to (a) the published package asset and (b) the master Assets-library `.rbxm` exports; the
  universe repo no longer carries them. The one-time v2-normalization serialization in
  `soul-steel-universe@2c8cf68` remains in history as the transformation record.
- Any place that already syncback'd TGL flat must have that subtree removed from `src/` when the
  ignore rule lands, or the stale copy lingers.

## Options considered

- **git-as-master for TGL (abandon the package)** — keep the flattened `crystal-sanctum`
  serialization as canonical, stop treating TGL as a Roblox Package, rebuild/insert from the
  `.rbxm` files. Rejected: the operator maintains TGL as a versioned Roblox Package with an asset
  id and edits it live; this throws away AutoUpdate/versioning and forces manual re-insert into
  every consuming place.
- **Dual-record, no rule (status quo)** — let the package and the flattened syncback copy coexist
  unmanaged. Rejected: this *is* today's drift — every syncback re-flattens and strips
  `PackageLink`, live edits disable AutoUpdate, and the two `TrembusGameLibrary` namespaces diverge
  with no owner.
- **`ignoreProperties: ["PackageLink"]` only** — narrower rule that keeps the subtree in git but
  preserves the link property. Rejected: syncback would still serialize (and re-diff) all ~100
  models, and a package copy's contents are not meant to be hand-edited in git; the boundary, not
  just the property, is what needs protecting.

## Cites

- [[0008-studio-native-lab-lane]], [[0009-soul-steel-universe-topology]] (the syncback lanes)
- pipeline [[v2-effects-library-normalization]] (built TGL's effects half; step 4 = promotion)
- `soul-steel-universe/crystal-sanctum/src/ServerStorage/TrembusGameLibrary/` (flattened, no PackageLink)
- `roblox-testing-environment/default.project.json` (the Props/Rigs `TrembusGameLibrary` mapping)
- rojo#222 (PackageLink stripped on sync); Rojo 7.7 `syncbackRules` (`ignoreTrees`/`ignoreProperties`)
- session [[2026-07-22-current-status-report]] Decisions (packaging-vs-workbench analysis)

## Re-open if

TGL stops being a Roblox Package (moved to a Wally/Luau-lane package, tripping the 0007 M4 gate),
or a future rojo release preserves `PackageLink` through syncback (making `ignoreTrees` unnecessary),
or the effects/props/rigs namespaces are split into separate packages.
