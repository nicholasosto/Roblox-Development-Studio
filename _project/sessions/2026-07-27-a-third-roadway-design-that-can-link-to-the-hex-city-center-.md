---
title: "A third roadway design that can link to the hex city center visually"
status: blocked
updated: 2026-07-27
tags: { last-active: 2026-07-27T15:10, kos: "command-center, dashboards" }
---

# A third roadway design that can link to the hex city center visually

> **Status:** blocked (2026-07-27)

## Goal

Design a third roadway type for the hex city center — beyond the two the contract already
declares (the ring road band and the six-approach corridor family) — that links to the hex
city center *visually*: it must render in the Spatial lens as geometrically continuous with
the existing hex spec, not as a disconnected sketch.

## Success Criteria

_(drafted from the goal — confirm or correct next exchange)_

- The third roadway's form is chosen and named (e.g. outer connector, boulevard, inter-district
  arterial) with its relationship to the existing ring + approaches stated in studs.
- A measured X/Z contract draft exists for it — either an extension block of
  `hex-city-center-grid-spec.json` or its own spec — and passes `validateGridSpec` (or its
  validation gap is explicitly recorded if it needs shapes the validator doesn't know).
- The design renders in the Spatial lens visibly connected to the hex city center geometry.
- Where it bends or extends the schema, the decision trail is touched (0013/0014/0015 cited or
  a new ADR offered) rather than silently improvised.

## Source References

- `apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json` — canonical hex
  contract, revision 2 (ring band + 6-approach family are the two existing roadway designs)
- `output/imagegen/hex-city-center-grid-2026-07-25/` — portable bundle (byte-identity rule)
- `_project/pipeline/hex-city-center-spatial-lab-rev01.md` — the hex city build pipeline (status: build)
- `_project/workflows/measured-spatial-grid-to-studio-blockout.md` — the contract→whitebox process
- `_project/decisions/0013…0015` — elevation hard-fail · multi-level (proposed) · converged contract (accepted, unbuilt)
- `apps/command-center/src/spatial/` — `gridSpec.ts` (trust boundary) · `geometry.ts` · `spatialScene.ts`

## Decisions

- Third roadway = a **square center district** attached at the hex's north or south approach;
  "attach" means alignment convention only — the square's through-road centered on the shared
  approach axis, same width as the hex approach corridor — no schema linkage mechanism (user,
  this session).

## First-Principles Candidates

- District-to-district attachment is an alignment convention (shared axis + matched
  cross-section), not a schema mechanism → decision (fold into the square-body ADR when it opens)

## Outputs

- This engram only — orientation + design framing; **no spec was authored** (halted before
  drafting). The matching numbers from hex rev 2 are recorded in Handoff Notes so resumption
  starts from facts, not re-derivation.

## Blockers

- Waiting on the parallel Claude design session (claude.ai) finishing the UI design — its
  interface direction feeds this layout work; resume after it lands.

## Next Action

When the UI-design session's output lands: author the square-center grid-spec draft with the
matched corridor cross-section (centered N–S road, 32 road + 12/12 sidewalks), copy the hex
elevation surfaces for a flush seam, and take the hex-only-body render gap to a schema decision
(`/new decision`) before extending the lens.

## Handoff Notes

_(closed early at user request — parked pending the external UI design session, 2026-07-27)_

- **Matching numbers (hex spec rev 2, the authority):** approach road width **32** studs
  (2 × 16 lanes), sidewalk **12** each side, sidewalk-to-sidewalk **56**, crosswalk depth 12
  (paint only, no physical width). North/south approaches exist: normals at **90° / 270°** from
  +X in the X/Z plane (north = −Z). Approaches run to extent 256 radial from origin; road
  starts at apothem 124, sidewalk at 136.
- **Elevation for a flush seam:** datum `road-surface`; road top 0 / thickness 1, sidewalks
  top 1 / thickness 2, curb 1 — copy these into the square spec's `trembus.spatial-elevation/v1`
  block.
- **The render gap:** `validateGridSpec` requires the `hex` body, so a square-body spec will
  not load; precedent `hex-city-center-2floor.example.json` lists in the registry as
  `loadable: false` ("multi-level levels[] body is not implemented") — a square draft would
  list the same way, present-but-unopenable. No ADR governs multi-shape bodies; 0013's
  dimensional-hard rule applies to whatever validator lands.
- **Open design choices (never put to the user):** square size (one candidate: outer apothem
  136 so the square's 272 side matches the hex outer flat-to-flat); N–S road only vs. also
  E–W; crosswalks where the road meets the square edges.
- Success criteria in this file were drafted from the goal and **never confirmed** — re-confirm
  on resume.
