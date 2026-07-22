---
title: "Current status report"
status: completed
updated: 2026-07-22
tags: { last-active: 2026-07-22T14:10, kos: "dashboards, decisions, telemetry, command-center, packages-mono, roblox-labs, asset-studio, two-path-adr, trembus-game-library, rig-remediation" }
---

# Current status report

> **Status:** completed (2026-07-22)

## Goal

Produce a current status report across the space — where every in-flight pipeline stands, what the roadmap owes, and what work is actually next — then act on whatever the report surfaces as the top item.

## Success Criteria

- Each of the four pipelines has a stated stage and its next concrete step
- The roadmap's open milestones (M2/M4) and open questions are reconciled against real repo state, not stale dashboard JSON
- Owed housekeeping is named explicitly (hub.json drift; crystal-sanctum syncback-due carried over from 2026-07-21)
- The user picks the next item and it either lands or is recorded with a clear next action

## Source References

- `_project/pipeline/*.md`, `_project/roadmap/package-platform-roadmap.md`
- previous engram: [[2026-07-21-start-command-and-session-lifecycle]] (Next Action = upstream generalization checklist)
- `previews/dashboards/` (packages, labs-status, ui-catalog) — regenerate before trusting

## Decisions

- Empty Catalog lens diagnosed as three stacked causes, not one: (a) the collector was not running — nothing on 4320, and the plugin's `HttpService.PostAsync` sits inside a bare `pcall`, so every failed post was silently swallowed; (b) `ui-catalog.json` is single-slot and last-writer-wins across places, so the hub's honestly-empty snapshot (2026-07-20T17:35) clobbered User Interface Development's good ledger from 12:30 the same day and was then committed in `a321f53`; (c) the app inlines the JSON at build time, so a fresh write still needs a rebuild
- User Interface Development stays a **platform lab** in `roblox-labs` — not a place in the Soul Steel universe. [[0009-soul-steel-universe-topology]] §2 already names it explicitly as universe-agnostic, and it is tracked + in-sync in `roblox-labs` today (488 KB snapshot, 43 rbxm). No new decision needed; the question is answered by the existing ADR
- Clobber fixed by keying `ui-catalog.json` by placeId (schema v2): the registry is now a `places[]` array, one entry per reporting place, each with its own `receivedAt` and change-detection. Migration from v1 is automatic and forced (`needsRewrite`) — without that flag the change-only guard would have kept the stale schema on disk forever, since the first v2 post is byte-identical to what v1 held
- Empty places are kept and shown honestly rather than filtered out, but sorted last, so opening the hub adds a row instead of taking the lens away from the lab in use. Place names come from a `PLACE_NAMES` map in `catalog.ts` sourced from [[0009-soul-steel-universe-topology]] — unlisted places render as their bare id rather than guessing
- PlaceId map recovered from the `ui-catalog.json` git history (the plugin sends `game.Name`, which is `"Place1"` for every place — only `placeId` identifies the source): UI Development `75067279879490`, Part Textures `134559055187413`, hub `102596975485791`

- Roblox Packages explored as a distribution lane for the two platform labs (`User-Interface-Development-Lab` 105222295119876, `Part-Texture-Testing-Lab` 103713217612662, both created 2026-07-22, creator TrembusTech). Recommendation: **package the outputs, not the workbench** — the labs stay syncback-managed authoring surfaces per [[0008-studio-native-lab-lane]]; individual proven kits become packages to serve the ladder's `promoted` tier. Not yet decided; ADR candidate
- Two verified platform facts drive that: (a) modifying a package copy permanently disables its `AutoUpdate` until republished — a lab is an authoring surface, so packaging the lab inverts what Packages are for; (b) Rojo has a documented history of stripping `PackageLink` on sync (rojo#222; the separate diff-crash rojo#841 is fixed before the pinned 7.7.0). Rojo 7.7 `syncbackRules` (`ignoreTrees`/`ignorePaths`/`ignoreProperties`) is the mitigation, at the cost of those subtrees leaving git — the labs' `default.project.json` files declare no `syncbackRules` today
- Roblox Packages do NOT trip the reserved-Luau-lane gate ([[0007-dual-lane-ts-luau]] M4): they are instance content, not a Wally/Rokit package

## First-Principles Candidates

- A single-slot generated artifact fed by a multi-source push channel is silently last-writer-wins; the feed must be keyed by source (placeId) or it lies whenever the wrong source reports last → **landed this session as ui-catalog schema v2**; still worth an ADR if the pattern recurs for another emitted contract
- A distribution mechanism that disables itself on modification belongs on outputs, never on the surface where authoring happens → decision
- Adopting cloud-versioned assets puts state where `git` and the repo-probing dashboards cannot see it; any such lane needs its own staleness probe or it becomes a second source of truth → decision
- A schema migration guarded by change-only writes never fires — the migrated content is byte-identical to what it replaces, so the migration needs its own force flag → memory
- A telemetry sender whose only error path is a bare `pcall` makes "collector down" and "nothing to report" indistinguishable at every downstream layer → decision
- `game.Name` is not a place identifier in Studio (it is `"Place1"` for published places); only `game.PlaceId` distinguishes → memory
- A generated artifact that can be clobbered into an empty state should never be committed without a source check — `a321f53` baked the wipe into git → none yet

## Outputs

- Catalog lens restored and verified live: 3 entries (inventory.panel · inventory.slot · inventory.drag-ghost), 6 kits, 1 manifest, from placeId 75067279879490
- `tools/telemetry-collector.mjs` — ui-catalog schema v2: `normalizeEntry`/`readRegistry`/per-place `comparable`, forced-rewrite migration, deterministic key sort, `placesTracked` added to `GET /`
- `apps/command-center/src/catalog.ts` — reads v2 and still degrades a v1 file to one place; exports `places`/`defaultPlaceKey`/`latestReceivedAt` + the `PLACE_NAMES` resolver
- `apps/command-center/src/CatalogPanel.tsx` — place picker (`Select`), per-place header, honest "no ledger" callout; `styles/app.css` gained `.cc-catalog-picker`
- `apps/command-center/src/tools/WorkbenchRunbook.tsx` — moved off the removed `receivedAt` to `latestReceivedAt` (max across places, caught by `tsc`)
- `CLAUDE.md` — collector line records the v2 keying
- Live regression evidence: 3 Studio windows open, all three places reporting; the hub's and Place 134559055187413's empty snapshots left UI Development's ledger intact. 14 catalog envelopes → 3 writes, then 90+s of no file churn

## Blockers

- none

## Next Action

Publish `Trembus-Game-Library` v16 (the rig remediation sits unpublished at v15), save the hub
place, then run the soul-steel-universe syncback loop when labs-status flags it.

## Handoff Notes

- Everything from this session is committed and pushed (afternoon close): telemetry v2 `8f062fb`,
  Catalog lens `1fd31c4`, this entity `715fe8d`, contracts + bundle `39bb7b8`. The collector is
  running again — live heartbeat verified at the 14:10 close.
- The two-path question this session surfaced is now **ADR 0012 in Asset-Studio**
  (`decisions/0012-two-path-asset-delivery…`, status `proposed`, awaiting ratification). Its
  appendix carries the executed rig remediation — 16/16 conformant, `Mechanisms` typo fixed,
  settled SUB codes (no CRE rigs exist).
- Remaining queue: `vfx` medium card (Asset-Studio), spatial bays for the three sub-package labs,
  ADR 0012 ratification, `_FNL` promotions (everything is `_BLK`), and the "package the outputs,
  not the workbench" ADR candidate recorded in Decisions above.
