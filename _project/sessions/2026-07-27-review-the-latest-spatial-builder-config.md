---
title: "Review the latest spatial builder config"
status: completed
updated: 2026-07-27
tags: { last-active: 2026-07-27T09:49, kos: "command-center, decisions, dashboards, memory" }
---

# Review the latest spatial builder config

> **Status:** completed (2026-07-27)

## Goal

Review the latest spatial builder config — `hex-city-center-grid-spec.json` (rev 2026-07-25, the
only contract in `apps/command-center/src/spatial/fixtures/`) — and say what it actually declares,
where it is internally inconsistent, and what the validator does and does not catch about it.

## Success Criteria

- Every block of the contract is read and characterized: what the hex bands, `approaches`, and the
  nested `trembus.spatial-appearance/v1` block declare, in studs, with the derived dimensions
  independently recomputed rather than taken on trust.
- The four findings the prior session parked are re-checked against the file as it stands today —
  especially whether any `approaches.*` value contradicts the hex bands it is never cross-checked
  against.
- Findings are separated into *contract is wrong* vs *validator is silent* vs *renderer misleads* —
  the three failure modes have different owners and different fixes.
- Anything that turns out to warrant a decision is named as such (the appearance schema still has no
  governing ADR); nothing is renumbered or hand-written into `_project/`.

## Source References

- `apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json` — the contract
  (verified byte-identical to `output/imagegen/hex-city-center-grid-2026-07-25/` today,
  sha256 `2308036867…`)
- `apps/command-center/src/spatial/gridSpec.ts` — load + `validateGridSpec`, the trust boundary
- `apps/command-center/src/spatial/geometry.ts` · `spatialScene.ts` · `SpatialGridPanel.tsx`
- `_project/workflows/measured-spatial-grid-to-studio-blockout.md` — the authoring process
- `_project/pipeline/hex-city-center-spatial-lab-rev01.md` (status `build`)
- Prior engram: [[2026-07-26-incorporate-the-hex-city-center-spatial-contract-and-spatial]]

## Decisions

- The contract is **dimensionally clean** — every declared derived dimension was independently
  recomputed and matches: all five `flatToFlat = 2A`, all five `pointToPoint = 4A/√3`, and all three
  `bandWidth` values as apothem deltas (12 / 32 / 12). `roadCenterline` (108) is the exact midpoint
  of the road band (92→124). No numeric defect found.
- The parked `approaches` finding is a **latent validator gap, not a live defect** — today's block is
  fully consistent with the hex bands (`roadWidth` 32 = the road band's 32; `sidewalkEachSide` 12 =
  both sidewalk bands; `sidewalkToSidewalk` 56 = 32+12+12, and *that* sum is checked). The
  cross-check against the bands is still absent, so the hypothetical 40-stud road would still pass.
  Cheap and preventive, not urgent.
- The two `=== true` sites are **refusal guards**, which is what makes the strict equality wrong:
  `verticalAxisShown` ([gridSpec.ts:529](apps/command-center/src/spatial/gridSpec.ts:529)) and
  `crosswalkPaintHasPhysicalWidth` (:764) reject only the literal boolean. `"true"`, `1`, or any
  truthy non-boolean sails through the guard that exists to stop it.

## First-Principles Candidates

- A contract with no vertical authority cannot round-trip through a 3D tool: Y gets invented twice —
  once as renderer literals, once by hand in Studio — and neither invention flows back. → decision
- Approach-road length is not declared anywhere; it is derived from `view.boundsStuds`, a *framing*
  parameter, via `rayExitDistance` + an arbitrary `totalWidth * 2` overshoot
  ([spatialScene.ts:336](apps/command-center/src/spatial/spatialScene.ts:336)). Reframing the view
  silently resizes the geometry. → decision
- The `appearance` block is a **UV-orientation diagnostic harness, not a look**: three of four
  surfaces carry `maps: {}`, the sole texture is `spatial-orientation-diagnostic` (optional), and the
  fallback colors are debug values (core gold `#D4AF37`, sidewalk cyan `#44DDFF`). Reviewing it as
  art would be reading a test rig as a design. → memory
- `studioImported: true` with `studioSaved: false` at `revision: 1` marks a round-trip that ran and
  taught the contract nothing — the gate ledger records the trip but there is no channel for what the
  trip learned. → decision
- ADR 0013's "Re-open if" clause names multi-level structures as the trigger to revisit the
  per-surface elevation table — and a multi-level draft was already committed in the repo when the
  clause was written. A reopen condition should be checked against what exists, not only imagined.
  → **landed as [[0014-multi-level-spatial-contracts-compose-level-bases-with-per-s]]**
- Two elevation models now coexist unreconciled: the shipped `trembus.spatial-elevation/v1`
  (per-surface `topStuds`/`thicknessStuds`, one level) and the draft's per-level
  `baseElevationStuds`. They compose rather than conflict — a level base plus per-surface offsets
  within it — but nothing has designed that composition. → **landed as 0014** (composition, not
  replacement; the shipped contract is one implicit level at base 0 and needs no edit)
- An amendment is recorded as a *new serial ADR* plus a dated italic parenthetical on the amended
  one — the 0011/0012 pattern. Amendments never renumber or rewrite the original. → memory
- **Two spatial config formats already exist in this space and neither knows about the other.**
  `hex-city-center-grid-spec.json` is exact X/Z geometry, hard-validated, renders in the lens — and
  carries no build, budget, material-candidate, or authority vocabulary at all. `output/architecture/
  ancient-void-ship-arrival-environment/roblox-build-manifest.json` (`schema_version: "0.1"`,
  Codex-generated) carries `builder_contract`, `assemblies`, `material_tokens` with fallback +
  candidate, `budgets`, `qa_views`, `required_checks` and full authority gating — and **no geometry
  whatsoever**: an assembly declares only `id`, `layer_y`, `part_budget`, and prose `jobs`, with one
  `envelope_studs` box for the whole build. It produced 180 baseparts in Studio and the manifest
  records where none of them are. One can be viewed but not built; the other built but not viewed.
  → decision
- The hex contract's vocabulary is **archetype-coupled**, not general: five named hex bands, seven
  fixed `SPATIAL_SURFACE_TARGETS`, radial `approaches`. The build manifest's `assemblies` are already
  an open taxonomy. Neither of the space's other spatial pipelines is hex-shaped — Crystal Sanctum is
  floating volumes around a light column, the Void Ship a canted three-layer chamber. → decision
- The layer toggles should be **derived from declared regions**, not removed or hand-generalized. In
  a general model the Void Ship's toggles would read `arrival-dais / teleport-flight-deck /
  upper-observation-catwalks`, which falls out of the data rather than being a UI decision at all.
  → none yet (follows whichever schema direction is chosen)
- Spatial contract byte-identity (app fixture vs `output/imagegen/` bundle copy) is still verified only
  by hand with `shasum`; it was checked twice this session and CLAUDE.md states outright that nothing
  enforces it. → routine
- The Spatial lens is a trust boundary with **no test runner behind it** — no vitest, no `*.test.ts`,
  nothing in `apps/command-center/package.json` but `dev`/`build`/`preview`/`typecheck`. Verifying
  the new validator meant hand-bundling `gridSpec.ts` with the esbuild inside vite and driving it
  from a throwaway node script. A validator whose only proof is a scratchpad harness will regress the
  first time nobody rebuilds that harness. → routine

## Outputs

- `hex-city-center-grid-spec.json` at **revision 2** — adds the `trembus.spatial-elevation/v1` block
  (per-surface `topStuds`/`thicknessStuds` over a road-surface datum, 1-stud curb, core at +2) and
  `approaches.extentStuds: 256`. Purely additive in X/Z; every revision-1 horizontal dimension is
  byte-for-byte unchanged, so the derived SVG and PNG stay accurate. Both copies rewritten and
  re-verified byte-identical — sha256 `9ee8b3ee9d…`.
- [0013](../decisions/0013-spatial-elevation-is-a-hard-validated-dimensional-sub-schema.md) — the ADR
  the appearance schema never got, settling the dimensional-vs-cosmetic rule that decides which
  sub-schemas may fail soft.
- Bundle README corrected: it asserted "geometry remains revision 1" and "the Roblox `Y` axis is
  intentionally not represented", both false as of this change.
- `gridSpec.ts` now **enforces** revision 2 per ADR 0013 — `validateSpatialElevation` (strict keys,
  all seven `SPATIAL_SURFACE_TARGETS` required, bounded numerics, `checkDeclaredDimension` on both
  derived values) wired in **without** the `try/catch` that makes appearance degrade. Plus two
  structural invariants the ADR implied but did not name: roads must be coplanar with each other and
  sidewalks with each other, or the ring meets the approaches at a step. Approach extent, the two
  start apothems, and a "must clear the outer ring" floor are checked in the dimensional body.
- `checkDeclaredDimension` gained an optional `conflictsWith` message so elevation errors stop
  claiming a conflict with "the apothem geometry"; all existing call sites keep the old default.
- **The renderer now obeys the contract.** `resolveElevation()` in `spatialScene.ts` is the single
  place that decides every Y — reading `spec.elevation` when present and otherwise falling back to
  the old literals, which are now named `ILLUSTRATIVE_SURFACES` instead of being scattered inline.
  Every hardcoded Y in `createWorld` is gone; `gridLineGeometry` takes its Y as a parameter rather
  than burying `-0.06`. Approach length reads `spec.approaches.extent`.
- Annotations are no longer absolute either — they are anchored to the surface they mark
  (`ANNOTATION_LIFT`), so a change of datum cannot leave a grid line floating in mid-air between the
  ground plane and the road. The outer boundary outline moved onto the sidewalk's **top face**; at
  the old literal `0.21` it was drawn partway up the sidewalk's outer wall.
- The panel's callout and slider caption now state which regime is in force — "Measured footprint and
  measured height" with declared elevations, the old "illustrative height" warning without.
- **The outer-sidewalk occlusion is fixed.** `hexRingSegments()` in `geometry.ts` returns the ring as
  CCW quads with a gap cut at each approach, and the renderer extrudes them individually — which also
  produces the cut cross-section at every junction, something a single annulus could not show. The
  junctions, each approach's first 12 studs, and both crosswalk lines are now visible. The inner
  sidewalk and ring road are untouched: nothing crosses them.
- **Both remaining review findings are closed.** `refusedFlag()` replaces the two `=== true`
  comparisons, so a refusal flag now rejects any non-boolean as firmly as the forbidden value —
  `"true"`, `1`, `"yes"`, `[]` and `{}` all slipped past the old guard and no longer do.
- The approach block is cross-checked against the hex at last: lanes must tile their carriageway
  (both the approach road and the ring band — `hex.roadOuterEdge.laneWidthStuds` was previously
  declared and *never read at all*), the approach road must fit the face it is cut through, and the
  full corridor must fit the outer face it departs from. The fit checks moved a failure that only
  surfaced inside the renderer's `try/catch` into validation, where it belongs.
- A compatibility pass against the repo's **second** contract —
  `apps/command-center/src/spatial/hex-city-center-2floor.example.json`, committed in `b0e49d1` as a
  proposal-only draft — found it correctly unsupported but badly diagnosed: it failed with `hex must
  be a JSON object`, reporting a missing key rather than the reason it was missing. `validateGridSpec`
  now detects a `levels[]` body and a declared body `schema` up front and names each.
- [0014](../decisions/0014-multi-level-spatial-contracts-compose-level-bases-with-per-s.md) —
  amends 0013 to cover the multi-level draft **by composition**: `trembus.spatial-elevation/v1`
  becomes the within-level schema, a level adds `baseElevationStuds`, absolute Y is level base +
  surface offset, and a contract with no `levels` is one implicit level at base 0. Adds an optional
  body schema identifier (absent ⇒ `trembus.spatial-grid/v1`, multi-level ⇒ `/v2`) and one genuinely
  new invariant — consecutive levels may not interpenetrate. 0013 carries the dated amendment
  parenthetical per the 0011/0012 pattern.
- [0015](../decisions/0015-converge-the-grid-spec-and-build-manifest-into-one-tiered-pr.md) —
  converges the grid spec and the build manifest into `trembus.spatial-contract/v1`, designed against
  **both** examples at the operator's direction. Open `regions[]` replace the fixed hex vocabulary
  (0005's open-taxonomy precedent); **precision is declared per region** — `exact` carries a real
  footprint, `envelope` carries bounds + jobs + a part budget — and the lens must render the two
  distinguishably, because a viewer that draws a guess like a measurement is worse than no viewer.
  Five shape primitives with `polygon` as the guaranteed escape hatch; the manifest's build half
  (`preserve`, budgets, QA views, authority) transfers whole. Both 0013 and 0014 carry amendment
  parentheticals.

## Blockers

None.

## Next Action

Decide 0015 (`proposed`), since it now gates the rest: it supersedes both existing formats, and every
further change to the grid spec or the manifest is work against a vocabulary it retires. The first
implementation step once accepted is a migration proof rather than a validator — express
hex-city-center and the Void Ship in the converged shape and confirm nothing is lost, because a schema
that cannot say what the two examples already say is not ready to replace them.

Independently and not blocked by it: take revision 2 into Studio. Everything the whitebox previously had to invent — elevations, curb,
approach extent — is now declared, enforced, and rendered, so this is the round-trip that can finally
write something back: `studioSaved` is the first gate that has been reachable since the contract was
authored. 0014 is **proposed, not accepted** — deciding it is not a prerequisite for that trip, and
implementing it before a single level has round-tripped once would be building the second storey
first.

## Handoff Notes

- **Verified running**, not just typechecked: `pnpm --dir apps/command-center build` passes
  (typecheck + vite), and the lens at `#spatial` reloads to `rev 2 · 2026-07-27` with zero console
  errors and `appearance 1/1` still resolving. This mattered because `defaultGridSpecLoad` is an IIFE
  at module import — a malformed fixture would have bricked the tab for the session.
- The validator was exercised against **27 cases** — 6 accept, 20 reject, plus one regression proving
  appearance still degrades soft while elevation fails hard. All pass. The harness is
  `scratchpad/check-elevation.mjs` driving an esbuild bundle of `gridSpec.ts`; **it is disposable and
  will not survive the session** (see the First-Principles candidate on the missing test runner).
  Anyone changing `validateSpatialElevation` should expect to rebuild it.
- The ring-gap geometry was verified by area rather than by eye: the ungapped ring still tiles the
  full hex annulus to within 0.001, and the gapped one removes exactly `6 × 32 × 12 = 2304` studs².
  Point-in-polygon checks confirm each road centerline is clear and the kerb 4 studs beyond the road
  edge is still paved (`scratchpad/check-gaps.mjs`, 21 cases).
- Contract and picture now **agree**. Verified visually, not just numerically: the six approaches
  render at one uniform radius — the 90°/270° pair tangent to the view bound, the four diagonals
  stopping inside it — which is the visible proof that extent replaced the square-clipped fallback.
  A second harness (`scratchpad/check-resolve.mjs`, 18 cases) confirms the declared path returns the
  contract's values *and* that a revision-1 spec reproduces the legacy annotation heights exactly
  (`-0.06`, `-0.035`, `0.19`, `0.20`). It needs `three` stubbed to run outside the browser — see
  `three-stub.js`; `resolveElevation` is pure arithmetic and touches no THREE object.
- `pnpm build` rewrote `previews/app/` (JSON is inlined at build time), so the hashed asset filenames
  turned over — the two deleted `previews/app/assets/*.js` entries in the tree are that, not a loss.
- Everything here is **uncommitted**; the working tree was clean at `b25cc41` when the session opened.
- Browser-pane quirk worth knowing: `computer` clicks on the camera toggle silently did nothing even
  though `elementFromPoint` resolved to the right button — the React handler was fine, the synthetic
  click just never reached it. Driving it with a DOM `.click()` worked. Verify view state through the
  DOM (`aria-pressed`, the status line) rather than trusting a screenshot to reflect a click.
- All four findings this session inherited are closed. **85 checks** now cover the work across four
  scratchpad harnesses (`check-elevation` 27 · `check-resolve` 18 · `check-gaps` 21 · `check-guards`
  19), all green together after the final change. They remain disposable — see the missing-test-runner
  candidate; that is the one debt this session added rather than paid.
- **0014 is ahead of the code in one respect, deliberately.** Its rule 3 accepts
  `trembus.spatial-grid/v1` as an explicit body schema; the shipped validator rejects *any* declared
  `schema`, which was the honest stance while no decision existed. Do not read the refusal as an
  implementation of 0014 — it is `proposed`, and implementing a proposed decision unasked is the
  thing to avoid.
- Deliberately **not** constrained: the approach road width is not forced to equal the ring road band
  width, though both are 32 here. A mismatch produces no discontinuity — the approach road meets the
  ring across the full face whatever its width, and the approach sidewalk meets the cut ring sidewalk
  at `roadWidth/2` regardless of its own width — so equality is a design convention, not a geometric
  necessity, and hard-coding it would reject legitimate future contracts. Only what the geometry
  actually requires is enforced.
