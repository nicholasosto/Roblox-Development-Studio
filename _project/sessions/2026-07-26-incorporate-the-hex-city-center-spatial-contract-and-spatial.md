---
title: "Incorporate the hex city center spatial contract and Spatial lens"
status: completed
updated: 2026-07-26
tags: { last-active: 2026-07-26T12:33, kos: "command-center, decisions, studio-mcp, soul-steel, dashboards" }
---

# Incorporate the hex city center spatial contract and Spatial lens

> **Status:** completed (2026-07-26)

## Goal

Read the measured spatial work Codex built — the `hex-city-center-grid-spec.json` contract and the
`apps/command-center/src/spatial/` lens (~2.7k lines) — understand it end to end, and incorporate
that knowledge where it durably belongs in this planning space rather than only in this chat.

## Success Criteria

- The spec's two-schema structure (dimensional contract + `trembus.spatial-appearance/v1`) and the
  four spatial source modules are each read and summarized by what they own, not by what they contain.
- The invariants the system actually enforces are named from source — what `gridSpec.ts` validates,
  what `geometry.ts` derives, and where the JSON's stated authority is and is not backed by code.
- Any gap between what the spec/lens does and what CLAUDE.md, the workflow entity, or the decisions
  ledger records is stated concretely, with the right home for each named.
- Whatever "incorporate" resolves to is written through tooling (entity edits / CLAUDE.md), not left
  as chat-only findings.

## Source References

- `output/imagegen/hex-city-center-grid-2026-07-25/hex-city-center-grid-spec.json` — the attached copy;
  byte-identical to the canonical `apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json`
- `apps/command-center/src/spatial/` — `gridSpec.ts` (845) · `spatialScene.ts` (1055) ·
  `SpatialGridPanel.tsx` (456) · `geometry.ts` (311) · `assets/spatial-orientation-diagnostic_BLK.svg`
- `_project/workflows/measured-spatial-grid-to-studio-blockout.md` — the process this contract instantiates
- `_project/pipeline/hex-city-center-spatial-lab-rev01.md` — the built whitebox (`Lab - Architecture`,
  place `78520415943353`), status `build`
- Bundle `README.md` + derived SVG/PNG in `output/imagegen/hex-city-center-grid-2026-07-25/`
- Both spec copies and the spatial lens are committed at `dce912f`

## Decisions

- Closed out the dangling `2026-07-26-tools-lens-improvements-with-the-tcl-command-bar` as
  `completed` (approved) rather than resuming it — its work landed and verified; only Handoff
  Notes was unfilled. Its two edits stay uncommitted by the standing commit ritual.
- "Incorporate" resolves to **CLAUDE.md only** — a Spatial contracts section, so the stud/north
  convention, the byte-identity rule, and the lens survive into every future session. Declined
  for now: an appearance-schema ADR, reconciling the workflow entity, and memory topic files.

## First-Principles Candidates

- A validator's strictness should track **blast radius**, not authoring order — here the cosmetic
  `appearance` sub-schema is the only region with unknown-key rejection, id regexes and bounded
  numerics, while the load-bearing dimensional body silently ignores every unrecognized key → decision
- A policy refusal written as `=== true` rejects only the honest value: `"true"`, `1` and `"yes"`
  all sail through. A refusal that guards a stated renderer limitation must type-check, not
  identity-check → memory
- Redundant derived numbers in a contract are safe **only where the loader recomputes them** — this
  spec verifies all ten hex ring dimensions against the apothems and zero of the `approaches`
  restatements, so one document carries both verified and unverified copies of the same fact → memory
- An invariant stated in a workflow entity with no `--check` probe is documentation, not a
  guarantee; every other invariant in this space has an enforcer, byte-identity alone does not → decision
- A review surface that occludes the very junctions it exists to review is worse than none for that
  question — the preview's unbroken sidewalk annulus hides all six approach junctions → none yet
- Three consecutive commits titled "Refactor code structure for improved readability and
  maintainability" made a 13k-line subsystem undiscoverable by `git log` search → memory
- An audit scoped to a **name** silently misses the **class**: every prior syncback audit searched
  for "TGL"/"Trembus-Game-Library" and so missed a linked `SS Game Package` sitting unguarded in
  `lab-architecture` for weeks. Probe for the mechanism (`PackageLink*`), never the instance → memory
- A read-only agent that holds `Bash` is prompt-constrained, not sandbox-constrained — agent
  frontmatter `tools:` takes bare tool names and cannot carry `Bash(cmd:*)` prefixes, so the
  structural half of a read-only guarantee has to come from `permissions.deny` → decision
- Verifying asserted state against on-disk reality across this space's five wrapped repos, six
  checkers and eleven prose-only invariants → routine

## Outputs

- **CLAUDE.md § Spatial contracts** (new, before Wrapped repos) — the stud/north convention, the
  canonical-vs-portable copy rule and its *lack* of an enforcer, the two-schemas-in-one-file
  structure, the inverted strictness gradient, the four modules, and two debugging gotchas.
- **CLAUDE.md hard rule 4** corrected — the ledger range said `0001…0010` while `0011` and `0012`
  are on disk and cited 36 lines later in the same file; now `0001…0012` plus a note that
  `new-entity.mjs` derives the next serial as max+1.
- Closed out `2026-07-26-tools-lens-improvements-with-the-tcl-command-bar` as `completed` with
  reconstructed Handoff Notes.
- A verified read of the whole spatial system: 7 gaps confirmed against source, 1 refuted (a claimed
  three-way disagreement on `pointToPointStuds` — 314.078546 / 314.079 / 314.078 — is correct
  6dp / correct 3dp round / truncation of the same exact value, not a conflict).
- **`apps/command-center/src/spatial/LEVELS-DESIGN-DRAFT.md`** (new, ~1070 lines) — a multi-floor
  `levels[]` extension design, marked proposal-only. Answers "does the spec handle multiple floors?"
  (no — `gridSpec.ts:526` and `:529` hard-reject it) with what it would take. Validator half was
  prototyped outside the repo, compiled under the project's own `tsc --strict`, and its error strings
  re-executed and confirmed before filing; renderer/panel/appearance halves are designed, not executed.
  No file under `src/spatial/` was modified.
- **`.claude/agents/disk-witness.md`** (new) — the space's first custom subagent, and the first
  executor for this entity's own "byte-identity is unenforced" Next Action item. Read-only
  (`Read/Grep/Glob/Bash`, opus), carrying a 3-tier invariant register: six existing checkers to
  *run*, eleven prose-only rules where it is itself the checker, three judgment calls. Chosen from
  the ledger, not taste — doc↔disk reconciliation is 6 of 14 sessions and is the work that keeps
  losing to live work on the main thread. Verified not to dirty the hub: `render-hub`'s
  `FACET_READERS` is `{commands, hooks, workflows, guide}` — there is no `agents` facet, which also
  means the agent is invisible on the Command Center's control-surface petal.
- **`.claude/settings.json` `permissions.deny`** — `external-locations/**` and `.project-system/**`.
  First structural enforcement hard rules 2 and 3 have ever had; `guard.mjs` scopes to `_project/`
  and never saw them.
- **A linked package unguarded for weeks, found and fixed** — `lab-architecture` held a serialized
  `SS Game Package` (`PackageLink.rbxm` + 83 files) with no `syncbackRules`. Fixed in
  `soul-steel-universe` at `6e629c8`, and **proven**: a `--dry-run` syncback now logs
  `Tree ServerStorage/SS Game Package is blocked by project` — the hub's rule has never been proven
  because its place snapshot predates the package insert. All six syncback projects audited; this
  was the only gap.
- Everything above committed across five commits here (`663f976`…`a44f738`) plus `6e629c8` in
  `soul-steel-universe`. This entity's own artifacts — the CLAUDE.md section, LEVELS-DESIGN-DRAFT,
  and the two-floor example — are among them.

## Blockers

- none

## Next Action

Pick up the four findings deliberately left out of scope. Ranked by cost-if-ignored:
`trembus.spatial-appearance/v1` has **no governing ADR** (`/new decision` → would land 0013);
**byte-identity is unenforced** (a `tools/` hash check would match the `--check` convention every
other invariant here follows); `approaches.*` is **never cross-checked** against the hex bands, so a
40-stud approach road validates clean against the 32-stud ring; and the two `=== true` refusals at
`gridSpec.ts:529` and `:764` need type checks.

## Handoff Notes

`disk-witness` exists but is **not dispatchable until a session restart** — agent definitions are
enumerated at session init. Its body was verified in-session via a proxy (a `general-purpose` agent
told to read the file and operate under it); what that does *not* verify is frontmatter
registration — `description` triggering, `tools`, `model`. First real run should re-confirm those.

Its baseline sweep is done and its findings are the actual queue now — 9 confirmed, 4 refuted,
6 not checked. Two are fixed (`lab-architecture` `ignoreTrees`; `CLAUDE.md`'s ADR range). What
remains, ranked:

1. **`soul-steel-official` still names a `ServerStorage.TrembusGameLibrary` folder** that ADR 0012
   never enumerates. It is structurally identical to the projection that *was* renamed `TGL-Preview`.
   Decide one: rename it, **or** amend 0012 to enumerate it as a third satellite. Not both.
2. **`AGENTS.md` is four whole sections behind `CLAUDE.md`** — no Session lifecycle, no Spatial
   contracts, no Wrapped repos & rojo lanes, no TGL. It still says one wrapped repo and decisions
   `0001…0007`. A Codex-lane agent reading it has no syncback/code-first model at all.
3. **Four vendored `.project-system/tools/` files are behind canonical** — canonical is *ahead*, so
   this is a catch-up, not a repair, and hard rule 2 means re-vendor, never edit from this side.
   The vendored `check-consumer-drift.mjs` still registers the deleted `soul-steel` consumer and
   omits this space; `check-port-registry.mjs` was never vendored.
4. `CLAUDE.md`'s TGL paragraph still marks the hub `ignoreTrees` "(pending)" when it is applied and
   working — stale in the safe direction, but it hides that hub was the *only* guarded project,
   which is what made the `lab-architecture` gap hard to see.

Left deliberately undone: the already-serialized `SS Game Package` tree stays in `src/`. Removing
84 files needs the Studio-side link confirmed intact first, which is not observable from disk.

Also unresolved from this entity's original scope: `hex-city-center-2floor.example.json` is now
committed but is **not** loadable — it declares `trembus.spatial-grid/v2` with a `levels[]` block and
would throw in `validateGridSpec`, which reads no schema id at all. Whether the `levels` shape
supersedes the `hex` shape is still undecided, and there is now a v2-shaped file with no v2 reader.
