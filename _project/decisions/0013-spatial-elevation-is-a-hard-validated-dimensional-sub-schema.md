---
title: "Spatial elevation is a hard-validated dimensional sub-schema"
status: accepted
updated: 2026-07-27
---

# Spatial elevation is a hard-validated dimensional sub-schema

> **Status:** accepted (2026-07-27) — implemented and shipped; amended by 0014 and 0015

## Context

The measured-spatial pipeline authors a layout as one X/Z contract with **no authoritative Y**, then
hands it to a gated Studio whitebox. That worked as far as the whitebox and then stopped: the
hex-city-center contract sat at `revision: 1` with `studioImported: true` and `studioSaved: false`,
a round-trip that ran and taught the contract nothing.

The reason is that two quantities a builder needs were never declared, so each was invented
independently and neither could flow back:

- **Elevation.** Every Y in `spatialScene.ts` is a hardcoded literal (core `1.35`, sidewalks `0.88`,
  roads `-0.02`→`0.14`), and the "Illustrative Y" slider is `group.scale.y`. Those are normalized
  presentation values, not buildable heights. Studio therefore got its elevations by hand.
- **Approach extent.** Approach length was computed as `rayExitDistance(...) + totalWidth * 2` — a
  function of `view.boundsStuds`, a *framing* parameter — then clipped to the square view. The six
  approaches were consequently **unequal**: ~408 studs at the 30° faces, 368 at 90°, all terminating
  on a square rather than at a uniform radius. Reframing the view silently resized the geometry.

A precedent already exists for a nested versioned sub-schema: `trembus.spatial-appearance/v1`. But
appearance fails **soft** — geometry still renders, theme colours substitute, and the panel shows an
`appearanceWarning` badge. Whether elevation should inherit that behaviour is the question this
decision settles. (Appearance's own version policy still lives only in a bundle README and has no
ADR; that gap is noted below, not closed here.)

## Decision

*(Amended 2026-07-27 by [[0014-multi-level-spatial-contracts-compose-level-bases-with-per-s]]: the
"Re-open if" condition below was already met when this was written — `hex-city-center-2floor.example.json`
was committed in `b0e49d1` before it. Nothing here is retracted; 0014 makes this the **within-level**
schema and adds a per-level `baseElevationStuds` it composes with, so absolute Y is
`level base + surface offset` and `datum: "road-surface"` reads as that level's road surface. A
contract with no `levels` is one implicit level at base 0, so everything below applies unchanged to
what ships today.)*

*(Further amended 2026-07-27 by [[0015-converge-the-grid-spec-and-build-manifest-into-one-tiered-pr]]:
the **rule** below survives untouched — elevation is dimensional, fails hard, and has no honest
fallback — but its **container** does not. A fixed seven-role table cannot describe an open region
set, so elevation moves onto the region as `baseStuds` + `thicknessStuds`, and the coplanarity and
monotonicity checks become per-`group` rather than per-hardcoded-role.)*

Declare elevation as `trembus.spatial-elevation/v1`, a nested versioned block in the same file,
carrying a per-surface height table keyed by the existing `SPATIAL_SURFACE_TARGETS` vocabulary —
and validate it **hard**, unlike appearance.

The rule the two sub-schemas divide on is **dimensional vs cosmetic**, which is the split the
contract already enforces everywhere else: the grid body hard-rejects any declared derived dimension
that disagrees with the apothems by more than 0.001, while the cosmetic block is allowed to degrade.
A substituted colour yields a wrong-looking review. A substituted elevation yields a wrong *build* —
silently, and only discovered in Studio, which is exactly the failure this pipeline exists to
prevent. Soft failure is safe only where the fallback is honest, and there is no honest fallback
elevation.

Consequences of that rule, as applied:

- Elevation is optional. A contract without the block is still valid and still renders — the
  renderer keeps its illustrative literals. Absence is not failure.
- If the block is **present**, it is validated strictly: known keys only, every surface id drawn from
  `SPATIAL_SURFACE_TARGETS`, finite bounded numbers, positive thicknesses, and declared derived
  values (`curbHeightStuds`, `coreRiseAboveSidewalkStuds`) cross-checked with the existing
  `checkDeclaredDimension` at the same 0.001 tolerance.
- A version bump discards the block the way an appearance bump does, but **must not** fall through
  to illustrative literals as though elevations had never been declared. An unreadable elevation
  block is a hard load error.
- `coordinateSystem.verticalAxisShown` stays `false` and the `verticalAxisShown === true` refusal
  stays. It guards the *plan view* — whether the 2D reference drawing carries a vertical axis. A
  per-surface height table is not plan geometry, and the SVG and PNG are unaffected.

Approach extent is declared alongside it as `approaches.extentStuds`, a radial distance from the
origin, in the dimensional body proper (not the new sub-schema) — it is an X/Z quantity and belongs
with the other X/Z quantities.

## Consequences

Easier:

- A whitebox is reproducible from the contract instead of re-derived by hand, which is what makes
  `studioSaved` reachable and gives the Studio trip something to write back to.
- The six approaches become equal-length and view-independent; reframing no longer resizes geometry.
- The dimensional/cosmetic rule now has one stated home, so the next sub-schema has a precedent to
  argue from rather than a coin flip.

Harder:

- A second hard-validated region means a malformed elevation block bricks the lens for the session —
  `defaultGridSpecLoad` is an IIFE evaluated at module import. That is the correct trade for a
  dimensional contract, but it widens an existing sharp edge.
- Elevation and appearance now version independently of geometry and of each other: three revision
  numbers in one file.
- The renderer must eventually consume declared elevations rather than its literals, or the contract
  and the picture drift apart — a drift nothing currently detects.

## Options considered

- **Fail soft, mirroring appearance** — rejected as the whole point. A theme colour substituting for
  a missing texture is honest; an invented elevation substituting for a rejected one is a wrong build
  that looks correct until Studio.
- **Put elevations in the dimensional body, no sub-schema** — simpler, and defensible since elevation
  *is* dimensional. Rejected because the body carries no schema identifier at all (only `revision`),
  so the block would gain no independent version and every downstream reader would have to infer its
  presence. The sub-schema buys explicit versioning at the cost of one nesting level.
- **Full 3D geometry in the contract** — rejected outright. It would make the 2D plan non-authoritative,
  invalidate the SVG/PNG as review surfaces, and require CSG the geometry layer deliberately avoids.
  The per-surface height table is the smallest thing that makes a whitebox reproducible.
- **Leave elevation to Studio, record it back afterward** — rejected: it inverts the pipeline's
  direction. The contract is authored first and reviewed before Studio; a Studio-first elevation makes
  the contract a transcript rather than an authority.

## Cites

- `apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json` — revision 2
- [gridSpec.ts:529](apps/command-center/src/spatial/gridSpec.ts:529) — the `verticalAxisShown` refusal
- [spatialScene.ts:336](apps/command-center/src/spatial/spatialScene.ts:336) — extent derived from view bounds
- `_project/workflows/measured-spatial-grid-to-studio-blockout.md`
- `_project/pipeline/hex-city-center-spatial-lab-rev01.md`
- [0005](0005-open-taxonomy-slotable-items.md) — the prior open-taxonomy precedent for versioned vocabularies

## Re-open if

A second spatial contract needs elevations the per-surface table cannot express — sloped ground,
stepped terraces, multi-level structures, or anything where one surface role needs more than a single
top and thickness. That is the point where a height table stops being sufficient and the 3D question
genuinely returns.

*(Multi-level was answered by [[0014-multi-level-spatial-contracts-compose-level-bases-with-per-s]]
on 2026-07-27 — by composition, not by replacing the table. What remains live here is variation
**within** one surface: sloped ground, ramps, stairs, terraced cores. 0014 carries that forward as
its own reopen condition.)*
