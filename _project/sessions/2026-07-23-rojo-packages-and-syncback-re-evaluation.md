---
title: "Rojo, packages, and syncback re-evaluation"
status: completed
updated: 2026-07-23
tags: { last-active: 2026-07-23T15:38, kos: "packages-mono, roblox-labs, soul-steel, dashboards, decisions" }
---

# Rojo, packages, and syncback re-evaluation

> **Status:** completed (2026-07-23)

## Goal

Re-evaluate the rojo + `@trembus` package setup now that `Trembus-Game-Library` (TGL) is established:
audit every repo behind `external-locations/code/`, confirm each syncback lane still matches how TGL
is actually built and published, and reconcile documentation that has diverged from repo reality.

## Success Criteria

- Every `external-locations/code/` repo is inventoried with its lane (syncback · code-first · read-through),
  rojo version pin, and project files — and is either documented in `CLAUDE.md` or flagged as a gap
- TGL's role as a **Roblox Package** (asset-id, Roblox-maintained, edited live in Studio, versioned
  v15→v16) is pinned down against the syncback lanes — specifically whether syncback strips its
  `PackageLink` (rojo#222) and how that constrains the soul-steel-universe loop where it lands
- Divergent documentation is enumerated as a concrete list with a recommended reconciliation per item
  (e.g. undocumented `roblox-testing-environment`; rojo 7.7.0 vs 7.6.1 pin drift across lanes)
- The re-evaluation lands as recorded outcomes — `CLAUDE.md` edits and/or ADR candidate(s) — or an
  explicit deferred next action

## Source References

- `CLAUDE.md` (the divergence baseline) · `previews/dashboards/{packages,labs-status}.json`
- `external-locations/code/` → roblox-packages-mono, roblox-labs, soul-steel-universe,
  soul-steel-official, roblox-testing-environment (symlinks into `~/Master-Managed/Repositories/Gaming/`)
- decisions [[0007-dual-lane-ts-luau]], [[0008-studio-native-lab-lane]], [[0009-soul-steel-universe-topology]]
- previous engram: [[2026-07-22-current-status-report]] (carried Next Action = publish TGL v16)

## Decisions

- Documentation reconciled in `CLAUDE.md`: intro now names all **5** wrapped repos; new
  **Wrapped repos & rojo lanes** table (lane · rojo pin · role); the 7.7.0/7.6.1 split documented as
  intentional (syncback needs 7.7); TGL documented as a Roblox Package; `packages.json` line corrected
  to say it scans the mono **+ soul-steel-official + roblox-testing-environment**
- TGL is a **Roblox Package** (asset id, v15/v16, edited live in Studio) — not an `@trembus` npm
  package; absent from `packages.json` by design. Its contents are fragmented across two repos under
  the `ServerStorage/TrembusGameLibrary` namespace (effects → universe/crystal-sanctum; props+rigs →
  testing-env)
- ADR [[0011-tgl-package-vs-syncback-boundary]] **ratified (`accepted` 2026-07-23)**: protect TGL out
  of syncback via `syncbackRules.ignoreTrees`, treat the package asset as source of truth. Namespace
  overload (effects vs props/rigs) **deferred** to 0011 §4 follow-up. First repo step: add
  `syncbackRules` to `crystal-sanctum/default.project.json` in the `soul-steel-universe` repo

## First-Principles Candidates

- A Roblox Package edited live in Studio and recorded by syncback silently loses its `PackageLink`
  (rojo#222) and AutoUpdate; the package boundary must be excluded from syncback or the two records
  diverge → decision [[0011-tgl-package-vs-syncback-boundary]]
- One instance namespace owned by two repos in opposite rojo lanes has no single owner of the
  package's composition → decision (0011 follow-up §4)
- A generated registry silently spanning more repos than its docs claim makes "the monorepo" a lie at
  the doc layer → landed in CLAUDE.md this session
- Rojo version drift across lanes is a feature, not a bug, when the lanes need different capabilities
  (7.7 syncback vs 7.6.1 serve) — but only once documented as intentional → landed in CLAUDE.md
- A periodic check that CLAUDE.md's wrapped-repo table still matches the actual `external-locations/code/*`
  symlink set would catch a newly-wrapped repo before it drifts undocumented (as roblox-testing-environment did) → routine

## Outputs

- `CLAUDE.md` — intro repo count fixed; new "Wrapped repos & rojo lanes" section (5-repo table +
  rojo-pin split + TGL note); `packages.json` scan scope corrected
- `_project/decisions/0011-tgl-package-vs-syncback-boundary.md` (`proposed`)
- Rojo/package/syncback divergence audit (this session's analysis)

## Blockers

- none

## Next Action

Add `syncbackRules.ignoreTrees: [“ServerStorage/TrembusGameLibrary”]` to
`crystal-sanctum/default.project.json` **in the `soul-steel-universe` repo** (in the repo itself,
never through the `external-locations/` window), then drop the already-flattened
`src/ServerStorage/TrembusGameLibrary/` subtree on the next syncback — the first execution of accepted
ADR [[0011-tgl-package-vs-syncback-boundary]].

## Handoff Notes

- ADR [[0011-tgl-package-vs-syncback-boundary]] is **accepted**; its first repo step (crystal-sanctum
  `syncbackRules`) is unstarted and is the Next Action. Do it inside the soul-steel-universe repo.
- The `ServerStorage/TrembusGameLibrary` **namespace overload** (effects in universe vs Props/Rigs in
  `roblox-testing-environment`) is **deferred** to ADR 0011 §4 — pick it up when TGL's composition is
  next touched.
- Uncommitted at close (commit ritual — left for Nicholas): `CLAUDE.md`, ADR 0011, this engram, and the
  regenerated `previews/` hub contracts + command-center bundle. Suggested split: (1) docs + ADR +
  engram, (2) regenerated previews.
- Once the crystal-sanctum `syncbackRules` change lands, the auto-memory `soul-steel-universe-topology`
  line “V2 VFX library entered version control here” goes stale — update it then.
