---
title: "Rojo setup analysis across the development space"
status: completed
updated: 2026-07-26
tags: { last-active: 2026-07-26T04:34, kos: "decisions, soul-steel, roblox-labs, packages-mono, dashboards, studio-mcp" }
---

# Rojo setup analysis across the development space

> **Status:** completed (2026-07-26)

## Goal

Produce a full analysis of the rojo setup across all five wrapped repos — every project file, its
lane (syncback vs code-first), its rojo pin, its tree mappings, and its ignore boundaries — and
surface where the actual on-disk configuration diverges from what the decisions ledger (0008, 0009,
0011 as amended, 0012) and CLAUDE.md assert.

## Success Criteria

- Every `*.project.json` across the five wrapped repos is inventoried with lane, rojo pin, and
  what tree each maps.
- Each syncback project's `syncbackRules` (present / absent / what it ignores) is stated against
  what ADR 0011-as-amended and 0012 require — in particular the pending hub
  `ignoreTrees: ["Workspace/Trembus-Game-Library"]`.
- Divergences between on-disk config and CLAUDE.md's lane table (pins, roles, mapped trees) are
  listed explicitly, each marked drift vs intended.
- The analysis lands as a durable artifact (report entity or ADR amendment), not chat-only prose.

## Source References

- [[0008-roblox-labs-syncback-lane]] · [[0009-soul-steel-universe-syncback]] ·
  [[0011-tgl-package-vs-syncback-boundary]] (as amended) ·
  [[0012-tgl-grand-package-model-and-satellite-naming]]
- `external-locations/code/{roblox-packages-mono,roblox-labs,soul-steel-universe,soul-steel-official,roblox-testing-environment}/`
- `CLAUDE.md` § Wrapped repos & rojo lanes
- Prior engram: [[2026-07-23-rojo-packages-and-syncback-re-evaluation]]

## Decisions

- Session pivoted from a cold rojo-config inventory to a live-probe review of the v16 effects
  fold-in (operator folded staging into the package before the analysis started).
- The fold-in was a **move, not a copy** — crystal-sanctum's staging folder is gone, so
  [[0012-tgl-grand-package-model-and-satellite-naming]] §5's “staging retires after v16” has
  effectively happened; the pending `TGL-Staging` Studio rename is now moot.

## First-Principles Candidates

- Content moved into a package copy keeps its metadata but loses its *folder structure* — the
  attributes survive the move, the hierarchy does not → memory
- A structural reorganization must land *before* the version bump, not after, or consumers
  eat two breaking shape changes for one library release → decision
- When a normalization pass stamps a classifying attribute (`TGL_Domain`), that attribute is the
  recovery key for any later structure loss — sort is scriptable, never hand-guessed → memory

## Outputs

- Live probe of hub place `102596975485791` and crystal-sanctum `139731337909746` (2026-07-25)
- **ADR 0012 §5 executed**: `syncbackRules.ignoreTrees: [“Workspace/Trembus-Game-Library”]` added
  to `hub/default.project.json` in the `soul-steel-universe` repo (repo's first `syncbackRules`).
  Schema confirmed real for rojo 7.7.0 by differential test — a bogus top-level key and a bogus
  `syncbackRules` subkey both fail to deserialize, while `ignoreTrees` builds cleanly.
- **Effects sorted**: the 99 folded effects moved from a flat `Effects` root into 12 theme folders
  keyed off `FX_SourceName` (the V2 authoring themes), one undo entry. Verified: 99/99 found,
  99/99 TGL attributes intact, 0 loose at root, PackageLink unchanged.

- **Effects residue cleaned**: `Effects/00-Legacy` now quarantines the 4 attribute-less legacy
  Models (`Casts`, `HitPart`, `Environment`, `Status`) plus vestigial `Shared` and un-normalized
  `VFXParts`. The 6 light fixtures moved to `Props/Robotic` (3 renamed to break duplicate
  `LightFixtureShort` names); the emptied `Effects/Robotic` folder was destroyed. Nothing deleted
  beyond that one empty folder. Verified safe first: `script_grep` found zero path references to
  any moved item across the hub place.
- **`EffectPlayer` deliberately left at the `Effects` root** — reading it showed it is the family's
  runtime API (consumes the `FX_Mode`/`FX_Duration`/`FX_Emit` contract the v2 pipeline stamps),
  not stray code, so it should ship with the package it drives.

_(the two bullets above were misfiled under Blockers; moved at close-out, 2026-07-26)_

## Blockers

- Rule is **not yet proven to bite**: `places/hub.rbxl` predates the package insert, so the
  dry-run had no TGL tree to exclude. Proof needs a fresh hub export, then
  `rojo syncback hub --input places/hub.rbxl --dry-run --list`.

## Next Action

Publish Package v16 from the hub home copy — the fold-in, theme sort, and residue cleanup are all
staged in the Workspace copy and unpublished. Before publishing, decide whether the
`Props/Robotic` light fixtures get convention names + `TGL_*` attributes (they carry neither).

## Handoff Notes

_(reconstructed at close-out, 2026-07-26)_

- The session's stated goal — a cold inventory of every `*.project.json` across the five repos —
  was **not** delivered; it pivoted on the first exchange into the live v16 fold-in review and
  never came back. The rojo-lane analysis is still owed, and CLAUDE.md's lane table remains
  unverified against on-disk config. Re-open it as its own session if it still matters.
- What *did* land is real and unfinished downstream: `hub/default.project.json` in
  `soul-steel-universe` carries the new `syncbackRules.ignoreTrees` and is **uncommitted**
  (`git status` in that repo shows ` M hub/default.project.json` as of close-out). Committing it
  is the operator's call.
- Ordering still binds: rule → publish v16 → fresh hub export → syncback dry-run. The rule is on
  disk but unproven, so the dry-run after the next export is what actually validates it.
- ADR 0012 §5 is effectively satisfied by events — the fold-in was a move, so crystal-sanctum's
  staging folder is gone and the pending `TGL-Staging` Studio rename is moot. Worth an ADR
  amendment note if 0012 is ever revisited.
- Three First-Principles Candidates above are unharvested (two → memory, one → decision); this
  close-out did not run /end's Capture pass.
