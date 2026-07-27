---
title: "Multi-level spatial contracts compose level bases with per-surface elevations"
status: proposed
updated: 2026-07-27
---

# Multi-level spatial contracts compose level bases with per-surface elevations

> **Status:** proposed (2026-07-27)

## Context

[[0013-spatial-elevation-is-a-hard-validated-dimensional-sub-schema]] settled elevation as a
hard-validated per-surface table over a single road-surface datum, and named its own reopen trigger:
*"a second spatial contract needs elevations the per-surface table cannot express — sloped ground,
stepped terraces, multi-level structures."*

That trigger was already met when the clause was written. `hex-city-center-2floor.example.json` was
committed in `b0e49d1` as a proposal-only draft, and it is a different contract shape:

- a `levels[]` array replacing the top-level `hex` / `approaches` blocks, each level carrying its own
  apothems, its own approach set, and a `baseElevationStuds` (ground `0`, mezzanine `32`);
- a mezzanine whose core declares `voidApothemStuds: 48` — an annulus, a balcony ring over the plaza
  rather than a solid platform;
- three approaches on the mezzanine (`30, 150, 270`) against the ground level's six;
- `"schema": "trembus.spatial-grid/v2"` on the **dimensional body**, which today carries no schema
  identifier at all — the hazard CLAUDE.md already flags.

So two elevation models now sit in one repository without a stated relationship: the shipped
`trembus.spatial-elevation/v1` (per-surface `topStuds` / `thicknessStuds`, one level) and the draft's
per-level `baseElevationStuds`. The reader rejects the draft — correctly, since it is unimplemented —
and as of 2026-07-27 says so by name rather than failing on a missing `hex` key. What it cannot do is
say how the two models should fit together, because nothing has decided.

## Decision

*(Amended 2026-07-27 by [[0015-converge-the-grid-spec-and-build-manifest-into-one-tiered-pr]]: level
composition below is retained in full — `level.base + within-level offset`, one implicit level at
base 0, no interpenetration. What 0015 changes is what a level *contains*: `regions[]` with declared
precision, not the fixed hex-band vocabulary this decision left alone. The body schema identifier
named here is superseded by `trembus.spatial-contract/v1`.)*

**Compose the two rather than replace either.** A level declares its base; the per-surface table
declares offsets within that level. Absolute Y is `level.baseElevationStuds + surface.topStuds`, and
`elevation.datum: "road-surface"` is read as *that level's* road surface.

1. **`trembus.spatial-elevation/v1` survives unchanged** as the within-level schema. Every rule from
   0013 continues to hold per level: all seven `SPATIAL_SURFACE_TARGETS` required, roads coplanar with
   each other, sidewalks coplanar with each other, monotonic ground → road → sidewalk → core, derived
   values cross-checked at 0.001.
2. **A contract with no `levels` is one implicit level at base 0.** Revision-2 single-level contracts
   stay valid with no edit and render identically. This is the test of whether the composition is
   right, not a convenience: if the shipped contract needed rewriting, the model would be wrong.
3. **The dimensional body gains an optional schema identifier.** Absent means
   `trembus.spatial-grid/v1` — the single-level form that ships today. `trembus.spatial-grid/v2`
   declares the multi-level form and requires `levels[]`. Any other value is rejected by name. Keeping
   it optional is what makes rule 2 true; naming it closes the "two schemas in one file, one of them
   anonymous" hazard without invalidating anything already authored.
4. **Hard validation throughout**, per 0013's dimensional-vs-cosmetic rule. Level bases and level
   geometry are dimensional; a substituted level base is a wrong build one storey off the ground.
5. **Levels may not interpenetrate.** For consecutive levels, the lower level's highest surface must
   sit strictly below the upper level's lowest: `max(base + topStuds) < min(base + bottomStuds)`.
   This is a genuinely new invariant that single-level contracts could not express — in the draft,
   ground tops out at `+2` and the mezzanine's slabs bottom at `+31`, so it passes with 29 studs to
   spare. Nothing else in the contract would catch two storeys occupying the same studs.
6. **The void core is geometry, not elevation.** `voidApothemStuds` turns the core prism into an
   annulus, which `hexRingGeometry` and `hexRingSegments` already build — no new math. It needs only
   its own ordering check, `0 < voidApothem < coreApothem`, alongside the existing apothem chain.
7. **Per-level approach sets already work.** The validator accepts one to six face-aligned angles, and
   `hexRingSegments` cuts only the faces it is given — a single approach yields seven ring segments,
   not twelve. The mezzanine's three approaches need no new capability.

## Consequences

Easier:

- Everything built for revision 2 survives — elevation schema, the gapped ring, the approach extent,
  and all five validation harnesses keep their meaning. The amendment extends rather than invalidates.
- The committed draft becomes implementable against a stated model instead of remaining a sketch.
- The dimensional body finally has a name, so the next reader can tell which form it is holding.

Harder:

- **Three independently versioned schemas in one file** — grid body, elevation, appearance. The
  version-skew surface grows, and 0013's warning that a malformed dimensional block bricks the lens
  now applies per level.
- **The renderer is single-level by construction.** `createWorld` builds one set of layer groups, and
  the panel's layer toggles and selection model assume one core, one ring road, one set of approaches.
  Multi-level means either a level dimension through all of that or a level selector — neither is a
  small change, and this decision does not choose between them.
- A level base is authored in absolute studs while everything inside it is relative, so moving a level
  is one edit but reading a surface's true height is now two lookups.

## Options considered

- **Replace the per-surface table with per-level bases only** — the draft's literal shape. Rejected:
  it loses the curb, the slab thicknesses, and the ground/road/sidewalk/core ordering within a level,
  which is most of what made a whitebox reproducible in the first place.
- **Absolute Y on every surface, no level base** — rejected: a level could not be raised or lowered
  without rewriting every surface in it, and the non-interpenetration check would have no natural
  quantity to compare.
- **Require `schema` on every contract** — rejected: it would invalidate the shipped revision-2
  contract to gain nothing that an optional field with a stated default does not already give.
- **Leave multi-level out of the lens and keep the draft a sketch** — defensible, and it is the status
  quo. Rejected because the draft is committed, the reopen condition is met, and an undecided
  relationship between two elevation models is the kind of ambiguity that gets resolved wrongly by
  whoever next touches it in a hurry.

## Cites

- [[0013-spatial-elevation-is-a-hard-validated-dimensional-sub-schema]] — amended by this decision
- `apps/command-center/src/spatial/hex-city-center-2floor.example.json` — the draft, `b0e49d1`
- `apps/command-center/src/spatial/gridSpec.ts` — `validateSpatialElevation`, and the `levels[]` /
  `schema` refusals added 2026-07-27
- `apps/command-center/src/spatial/geometry.ts` — `hexRingSegments`, which already handles partial
  approach sets and annular cores
- `_project/workflows/measured-spatial-grid-to-studio-blockout.md`

## Re-open if

Something needs elevation that varies *within* a single surface — sloped ground, a ramp, a stair, a
terraced core. The table is flat-per-surface by construction and this amendment does not change that.
It is the likely next ask: the draft puts a mezzanine 32 studs up and declares no way to reach it.
