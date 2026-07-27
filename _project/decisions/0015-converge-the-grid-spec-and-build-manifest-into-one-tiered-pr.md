---
title: "Converge the grid spec and build manifest into one tiered-precision spatial contract"
status: accepted
updated: 2026-07-27
---

# Converge the grid spec and build manifest into one tiered-precision spatial contract

> **Status:** accepted (2026-07-27) — conditional on the implementation sequence in §8

## Context

This planning space already holds **two** machine-readable spatial config formats, built for the same
job, that do not know about each other:

| | `hex-city-center-grid-spec.json` | `roblox-build-manifest.json` |
|---|---|---|
| X/Z geometry | exact, hard-validated | **none** — one `envelope_studs` box |
| Y | per-surface, validated (0013) | `layer_y` per assembly |
| Loads in the 3D lens | yes | no |
| Build intent | none | `jobs`, `builder_contract`, transaction order |
| Material tokens | viewer-only appearance | fallback **+ candidate asset with state** |
| Budgets · QA views · checks | none | yes |
| Authority / gates | 12 booleans | full, incl. cleanup proof and `preserve` |
| Archetype coupling | **hard-coded hex city** | none — open `assemblies` |

One can be viewed but not built; the other built but not viewed. The Void Ship manifest drove 180
baseparts into Studio and records where **none** of them are — an assembly declares only `id`,
`layer_y`, `part_budget`, and prose `jobs`.

Two further facts force the question now rather than later:

- **The grid spec's vocabulary is the artifact, not just its UI.** Five named hex bands, seven fixed
  `SPATIAL_SURFACE_TARGETS`, radial `approaches` — a hex-city-center contract wearing the name of a
  general one. The lens's six layer toggles are the visible symptom of that, added because there was
  one example. The build manifest's `assemblies` are already the open taxonomy the grid spec lacks.
- **Nothing else in the space is that shape.** Crystal Sanctum is "a family of inhabited masses held
  in phase around an uninterrupted column of light" across three vertical masses; the Void Ship is a
  canted three-layer chamber with catwalks and a sunken bay. Neither can be said in hex bands.

[[0014-multi-level-spatial-contracts-compose-level-bases-with-per-s]] answered how levels stack. It
did not answer what a level may contain, and answered it implicitly as "hex bands" by leaving the
vocabulary alone.

## Decision

**One contract, `trembus.spatial-contract/v1`, superseding both formats — with precision declared per
region rather than fixed for the document.**

### 1 · Regions replace the fixed role vocabulary

A level contains `regions[]`. A region has an open `id`, an optional `group` (what the lens toggles
on), a `surface` binding, and a `precision`. The seven `SPATIAL_SURFACE_TARGETS` and the five named
hex bands stop being schema and become *ids a particular contract happens to use*, following the
open-taxonomy precedent of [[0005-open-taxonomy-slotable-items]].

### 2 · Precision is declared, never inferred

Every region declares `precision: "exact" | "envelope"`.

- **`exact`** — carries a real footprint and elevation. Deterministic, diffable, and rendered as
  solid truth.
- **`envelope`** — carries a bounding volume, `jobs`, and a `partBudget`. The builder decides the
  detail; two builds legitimately differ.

The tier is required, because a reader must always know whether what it is showing is measured or
placeholder. **The lens must render the two distinguishably** — solid for `exact`, translucent for
`envelope`. A viewer that draws a guess like a measurement is worse than no viewer, and this is the
same honesty rule 0013 applied to soft-failing appearance.

Author `exact` for anything a player walks, drives, or collides with, and for anything a second build
must reproduce; `envelope` for dressing, ribs, vignettes, and mass-modelling.

**The contract reports its own precision ratio, and the lens displays it.** `envelope` is cheaper to
author than `exact`, which is a standing incentive for a document to drift toward envelopes while
still calling itself a contract. Discipline is a weak guard against a real incentive, so the split is
made visible instead of policed — the same move `promotionGates` and the `appearanceWarning` badge
already make here. A mostly-envelope document is legitimate; a mostly-envelope document that reads as
measured is not, and a visible "9 of 24 regions exact" makes the difference impossible to miss in
review.

### 3 · Shape primitives, with polygon as the guaranteed escape hatch

`hex` (apothem + orientation) · `hexAnnulus` (inner/outer apothem, optional gaps) · `rect`
(width/depth + rotation) · `corridor` (centreline + width) · `polygon` (explicit X/Z vertices).

`polygon` guarantees expressibility; the named primitives buy semantics and derived checks. The
existing geometry layer already implements the first four — `hexRingSegments` even cuts the annulus
gaps — so this is largely re-labelling, not new mathematics.

### 4 · Elevation moves onto the region

0013's per-role elevation table becomes per-region `baseStuds` + `thicknessStuds`, composed with the
level base from 0014: absolute Y is `level.base + region.base`.

**0013's rule survives; its container does not.** Elevation is still dimensional, still hard-validated,
still has no honest fallback. What changes is that a fixed seven-role map cannot describe an open
region set, so the same guarantee is carried on the region itself. The coplanarity and monotonicity
checks become per-`group` rather than per-hardcoded-role.

### 5 · Surfaces adopt the manifest's honesty about assets

The manifest's `fallback_material` + `fallback_color` + `candidate` beats the appearance block, because
it states that a token is a placeholder pointing at a candidate that may not be uploaded. Converged: a
`surfaces` table of open ids, each with viewer preview values, Roblox material intent, and an optional
`candidate` carrying an explicit state string. Regions bind by id.

### 6 · The build half comes over whole

`builderContract` (owned root, transaction order, cleanup scope, refuse-Play), `preserve`, `budgets`,
`qaViews`, `requiredChecks`, and the authority/gate block transfer from the manifest essentially
unchanged. They are already general and already earned.

### 7 · Strictness map, extending 0013's dimensional-vs-cosmetic rule

| Block | Fails |
|---|---|
| exact geometry · elevation · levels | **hard** — dimensional |
| `preserve` | **hard** — it is a safety boundary around existing scene content |
| `budgets` · authority gates | **hard** — caps and authorisations must not degrade |
| envelope bounds | **hard** — it is still a declared volume |
| `surfaces` preview / appearance | soft, with a warning badge (0013's precedent) |
| `jobs`, prose, notes | unvalidated guidance |

`preserve` is the one addition worth stating outright: it is the only block whose failure could damage
something that already exists, so it may never degrade quietly.

### 8 · Implementation sequence, and why it is part of the decision

Accepted on the explicit condition that it is built in this order:

1. **Migration proof** — express hex-city-center *and* the Void Ship in the converged shape and
   confirm nothing either one says today is lost. A schema that cannot restate the two examples it was
   generalised from is not ready to replace them.
2. **One Studio round-trip that closes `studioSaved`** on a contract with `exact` regions.
3. **Only then, the general validator.**

The reason this is a clause rather than a plan: **the two halves reach this decision with unequal
evidence.** The envelope-and-intent half is proven — the Void Ship manifest drove 180 baseparts into
Studio, passed Play QA on five routes, and demonstrated its cleanup boundary. The exact half has never
completed a loop; hex-city-center reached an Edit-mode whitebox and stopped, `studioSaved` still false.
Both stop at persistence, but only one has produced a real build.

So this decision makes precision the prestige tier partly on theory, and step 2 is what pays that
debt. Building breadth before the loop is proven is precisely how the hex vocabulary became an
artifact in the first place — generalising from a single unvalidated example. Doing it again, one
level up, would be the more expensive version of the same mistake.

## Consequences

Easier:

- One document answers "what is it" and "how is it built", so the Studio round-trip has something to
  write back into rather than a manifest that forgets its own geometry.
- The lens generalises for free: toggles derive from `group`, so the Void Ship reads
  `arrival-dais / teleport-flight-deck / upper-observation-catwalks` with no UI decision at all.
- Crystal Sanctum and the Void Ship become expressible without pretending to be hex bands, and their
  existing prose sections survive as documents a region points at.
- Authoring cost scales with what matters: a mass-model is envelopes, a traversal surface is exact.

Harder:

- **One schema serving two masters risks being mediocre at both.** The mitigation is that precision is
  per region, so the document never has to choose globally, and the visible precision ratio (§2) keeps
  a drift toward envelopes from passing as measurement. What neither mitigation buys is *judgement*
  about which regions deserve exactness — that stays a review question.
- Today's implemented elevation code is **transitional**: 0013 shipped a per-role table on 2026-07-27
  and §4 moves elevation onto the region, so `validateSpatialElevation` will be rewritten within days
  of being written. Its harnesses mostly survive as intent; the container does not.
- A general validator is a different kind of complexity from today's: shape dispatch and per-group
  invariants instead of one known band order. Today's ~900 lines validate a single archetype
  thoroughly; breadth will cost depth unless the primitives keep their derived checks.
- **The hex-specific cross-checks must survive as properties of the `hex` primitive** — `flatToFlat =
  2A`, `pointToPoint = 4A/√3`, band widths as apothem deltas. Losing them to generalisation would
  trade a proven guarantee for flexibility nothing has asked for.
- Three formats exist during migration: two legacy and one converged.

## Options considered

- **Keep both formats, add a cross-reference field** — rejected: the split *is* the problem. A
  contract that cannot be viewed and a view that cannot be built stay wrong when they link to
  each other.
- **Adopt the build manifest as master and give its assemblies geometry** — genuinely tempting, since
  it is already archetype-neutral and already carries the build vocabulary. Rejected because it is
  `schema_version: "0.1"` with no validator, so this path rebuilds from scratch everything
  `validateGridSpec` already proves.
- **Generalise the grid spec only, leave the manifest for Studio** — the smaller step, and it keeps
  the lens working throughout. Rejected as generalising from one example again, which is the mistake
  that produced the toggles.
- **Exact geometry everywhere** — rejected on authoring cost: Crystal Sanctum's floating volumes would
  need full manual dimensioning before anything renders at all.
- **Envelope and intent everywhere** — rejected because two builds from one document would not match,
  and the lens could only ever show blocks.

## Cites

- [[0013-spatial-elevation-is-a-hard-validated-dimensional-sub-schema]] — the strictness rule this extends
- [[0014-multi-level-spatial-contracts-compose-level-bases-with-per-s]] — level composition, retained
- [[0005-open-taxonomy-slotable-items]] — the open-taxonomy precedent for region ids
- `apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json` — the exact half
- `output/architecture/ancient-void-ship-arrival-environment/roblox-build-manifest.json` — the build half
- `output/architecture/crystal-sanctum/sections/` — fourteen prose sections a region set must carry
- `_project/workflows/measured-spatial-grid-to-studio-blockout.md` · `concept-to-studio-architectural-build.md`

## Re-open if

A region needs geometry no primitive can express *even as a polygon*. Every primitive here describes a
**planar footprint with a thickness**; a curved hull, a doubly-curved shell, terrain, or an imported
mesh is approximated by that model, not described by it. The Void Ship is literally a ship, and
Crystal Sanctum's masses are "held in phase" rather than stacked — the first contract that needs a
genuinely curved surface reopens this, and the answer is more likely a mesh-reference region than a
richer primitive set.
