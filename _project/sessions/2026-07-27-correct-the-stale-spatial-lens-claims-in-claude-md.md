---
title: "Correct the stale Spatial-lens claims in CLAUDE.md"
status: completed
updated: 2026-07-27
tags: { last-active: 2026-07-27T10:13, kos: "command-center, decisions, dashboards, memory" }
---

# Correct the stale Spatial-lens claims in CLAUDE.md

> **Status:** completed (2026-07-27)

## Goal

Bring the `## Spatial contracts (the Spatial lens)` section of the root `CLAUDE.md` back into
agreement with the code as it stands after the 2026-07-27 spatial work — every claim re-verified
against source, not against the prior session's account of it — so the next session is not sent
chasing bugs that were already fixed.

## Success Criteria

- Each of the four claims flagged stale is checked against the actual source file and either
  rewritten or (if the check refutes the flag) left alone with the refutation stated.
- Each of the four claims flagged still-true is independently re-verified before being preserved —
  including that no ADR governs the *appearance* schema, which 0013 does not cover.
- The section names 0013 / 0014 / 0015, with 0015 described as `proposed` and the converged
  `trembus.spatial-contract/v1` schema described as not yet existing.
- The opening sentence distinguishes the still-2D plan view from the now-real declared elevations.
- `AGENTS.md` is checked for a Spatial section before any parity edit is assumed owed.
- Hub contract re-rendered and the Command Center rebuilt afterwards; both left uncommitted.

## Source References

- `CLAUDE.md` — the file under repair, `## Spatial contracts (the Spatial lens)`
- `apps/command-center/src/spatial/spatialScene.ts` — `resolveElevation`, `ILLUSTRATIVE_SURFACES`
- `apps/command-center/src/spatial/geometry.ts` — `hexRingSegments`
- `apps/command-center/src/spatial/gridSpec.ts` — `validateGridSpec`, the trust boundary
- `apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json` — revision 2
- Decisions [[0013]] (elevation, hard-validated) · [[0014]] (multi-level, amends 0013) ·
  [[0015]] (converged tiered-precision contract, **proposed**)
- Prior engram: [[2026-07-27-review-the-latest-spatial-builder-config]] — the session whose work
  made these claims stale

## Decisions

- All four flagged-stale claims were **re-verified against source before rewriting**, not taken from
  the brief. All four checks agreed with the brief; none was refuted.
- The four flagged still-true claims were re-verified too, and all four held — including the
  byte-identity gap (no checker exists in `tools/`, `src/`, or `.claude/hooks/`; both copies hash
  `9ee8b3ee9d…` today) and "no ADR governs the appearance schema" (0013 *cites* appearance as the
  contrasting precedent and classifies it as cosmetic, but sets no version policy for it).
- **Correction to the brief**: it framed only 0015 as `proposed`. On disk **all three of 0013 / 0014
  / 0015 are `status: proposed`.** The section now says so, and distinguishes 0013 — proposed but
  already enforced in `gridSpec.ts` — from 0015, whose converged schema does not exist at all.
- `AGENTS.md` confirmed to have no Spatial section (headings: Hard rules · Kinds · Dashboards ·
  Related; zero matches for spatial/elevation/grid-spec). No parity edit owed, as the brief expected.
- The old "Two schemas in one file" bullet became "Three schemas in one file, two failure modes" —
  elevation is a third schema and the hard/soft split is the thing worth leading with.
- The fixed sidewalk-occlusion gotcha was deleted rather than reworded; the surviving IIFE gotcha
  demoted from "Two gotchas" to "One gotcha".
- **0015 flipped `proposed` → `accepted` mid-session** (file mtime 10:10:55, after the verification
  read at ~10:07 that saw `proposed`). Caught in the /end drift pass, not by the original read. The
  ADR bullet was rewritten to state both statuses accurately; the load-bearing half of the sentence —
  that the converged `trembus.spatial-contract/v1` **does not exist** and nothing reads or writes it —
  was true under either status and is unchanged.

## First-Principles Candidates

- A doc claim that names a specific code mechanism ("every Y is a hardcoded literal") is a dated
  assertion about an implementation, and rots the moment that implementation changes — the durable
  form states the *invariant* ("`resolveElevation()` is the single place every Y is decided"), which
  survives the next refactor of what it resolves from. → memory
- An ADR at `status: proposed` may still be fully enforced in code; proposed-vs-accepted tracks
  ratification, not implementation, so neither can be inferred from the other. Docs that cite an ADR
  should say which of the two they mean. → decision (a convention for how CLAUDE.md cites ADRs)
- The `_project/` ADR status field and the code that implements it have no link in either direction —
  nothing flags an accepted-but-unimplemented ADR or an implemented-but-unratified one. → memory
  (written: `adr-status-independent-of-implementation`)
- A long-lived doc-repair pass should re-read its evidence at close, not only at start: a status this
  session read at 10:07 was different by 10:11, and only the /end sweep caught it. → routine
- The spatial byte-identity rule has no checker and is verified only by a hand-run `shasum -a 256` of
  two paths — a periodic report comparing the app fixture to every `output/imagegen/<bundle>/` copy
  would catch a divergence without anyone remembering to look. → routine

## Outputs

- `CLAUDE.md` — `## Spatial contracts (the Spatial lens)` rewritten. Four false claims corrected
  (hardcoded Y · sidewalk occlusion · no approach cross-checks · ignores unknown keys), the opening
  sentence re-scoped so the still-2D plan view and the now-real declared elevations are both stated,
  a `Decisions` bullet added pointing at 0013 / 0014 / 0015 with their true `proposed` status, and
  the deliberate non-enforcement (approach road width ≠ ring band width) recorded as a convention.
  Four still-true claims preserved verbatim in substance.
- `previews/dashboards/roblox-development-studio-{graph,hub}.json` re-rendered — 68 entities,
  42 edges, 0 errors.
- `previews/app/` rebuilt (`tsc --noEmit` clean; new `index-HbJt78vs.js`,
  `SpatialGridPanel-BUG9Rw_F.js`). Everything left uncommitted.

## Blockers

- None. Every claim in scope was verifiable from source in this space; nothing needed a Studio
  session, a wrapped repo, or a decision from anyone else.

## Next Action

Commit the space — the working tree carries this session's `CLAUDE.md` repair on top of the prior
session's spatial code, the three new ADRs, and both regenerated dashboard contracts. Suggested split
in the /end checklist; the commit is Nicholas's call, not the session's.

## Handoff Notes

- The Spatial section of `CLAUDE.md` is accurate as of 2026-07-27 and was written against source, not
  against the prior session's summary. If you find it wrong again, the likely cause is code moving
  under it — re-verify with the file/symbol pointers the section itself names.
- **`AGENTS.md` hard rule 4 is stale and was left alone deliberately** — it claims decisions
  `0001…0007` exist when the ledger runs to `0015`. `CLAUDE.md`'s copy of the same rule was already
  stale at `0001…0012` and is now stale too. Neither was in this session's scope (Spatial section
  only), and the two files disagree with each other as well as with disk. Fixing both is a
  self-contained follow-up; see the /end conflicts pass.
- Untouched on purpose: the byte-identity rule stays unenforced (both copies hash `9ee8b3ee9d…`
  today), the appearance schema still has no governing ADR, and `defaultGridSpecLoad` is still an
  import-time IIFE. These are current, not oversights.
- 0015 is `accepted` but unbuilt — do not write docs, or code, as though
  `trembus.spatial-contract/v1` exists. Its §8 names the implementation sequence that would change
  that.
