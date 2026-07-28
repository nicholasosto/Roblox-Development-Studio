---
title: "UI development flow and package analysis"
status: completed
updated: 2026-07-28
tags: { last-active: 2026-07-28T08:00, kos: "packages-mono, dashboards, roblox-labs, memory, studio-mcp" }
---

# UI development flow and package analysis

> **Status:** completed (2026-07-28)

## Goal

Map the UI development flow end-to-end across the platform (authoring in the @trembus packages →
labs/testing-environment exercise → TGL distribution → ui-catalog telemetry) and analyze the
current package set, so the flow's gaps and the packages' state are named and prioritized.

## Success Criteria

_(drafted from the goal — confirm or correct next exchange)_

- The UI development flow is documented as a concrete path with named touchpoints (which repo,
  which lane, which dashboard) and its friction points / gaps called out.
- Package analysis rests on a fresh registry: `packages.json` regenerated (or `--check` clean),
  and the @trembus set assessed — versions, dep edges, consumers, staleness.
- A prioritized next-actions list exists (engram Outputs/Next Action), with any formal decision
  candidates offered rather than silently improvised.

## Source References

- `previews/dashboards/packages.json` + `tools/build-packages-registry.mjs` (factual registry)
- `previews/dashboards/ui-catalog.json` + `tools/telemetry-collector.mjs` (M1/M2 telemetry)
- `external-locations/code/roblox-packages-mono/` — the @trembus package monorepo
- `external-locations/code/roblox-labs/` — `user-interface-development` lab (syncback lane)
- `external-locations/code/roblox-testing-environment/` — TrembusUITesting harness
- `_project/roadmap/package-platform-roadmap.md` (status: active)

## Decisions

- Foundational UI lands **consumer-side in `roblox-testing-environment`** (code-first lane),
  not in rbx-ui: App shell + screen switcher over the three rbx-ui screens, fed by local
  fixtures per the package's own mock-data rule (user-directed, this session).
- Legacy `SlotableItemsTestService` **excluded from that repo's main build** (tsconfig
  exclude, comment points at [[slotable-items-cutover]]) — it targets the pre-cutover Tower
  taxonomy and no longer compiles against the linked package; restoring it is cutover work.
- The rojo 7.7.0/7.6.1 split is **not intentional** (user correction, 2026-07-28): the claim
  was minted by [[2026-07-23-rojo-packages-and-syncback-re-evaluation]] and never ratified by
  any ADR. CLAUDE.md rewritten to historical-not-intentional, the 07-23 engram annotated,
  [[rojo-syncback-run-in-repo]] memory softened. Converging every lane on one rojo is now an
  open option (would also retire the plugin-mismatch trap).
- **Convergence executed** (user-directed): both code-first rokit pins and the global rokit
  (incl. the `rojo77` alias) → **7.7.0**, which is the latest release; both code-first
  projects build-verified under it; serve restarted on 7.7.0; `RojoManagedPlugin.rbxm`
  refreshed to match. Plugin policy going forward: keep the managed plugin, re-run
  `rojo plugin install` at every pin bump (marketplace matches only while pins sit at latest).

## First-Principles Candidates

- Every unmet exit criterion of the UI flow converges on the prove seam — the QA rigs have
  passed nothing, so telemetry M3 (QA evidence channel) is the single unlock for the whole
  downstream funnel → none yet (drives Next Action)
- `ui-catalog.json` labels places by runtime `game.Name` ("Place1"/"Place2") — the collector
  needs a placeId→friendly-name map, per [[game-name-not-place-identifier]] → none yet (small
  collector change)
- Two design-token languages are now live — rbx-ui's Tactical Futurism tokens vs the lab's
  graphite-cyan `Token_*` attributes (MiniMap adds a third, field-surveyor); token authority
  needs settling before promotions multiply the split → decision (offered)
- The UI lab now travels as a linked Roblox Package (observed installed in the hub's
  StarterGui) — lab content reaches places TGL-style, and every such installation creates a
  new syncback ignore boundary per [[soul-steel-universe-topology]] → memory
- Excluding a source from rbxtsc leaves its stale compiled artifact in `out/` — incremental
  builds don't clean orphans, so the dead service would still load in Studio; delete the
  orphan when excluding → brain capture (toolchain scar)
- rbx-ui has no Button atom — the shell hand-rolled switcher tabs, the same pattern
  InventoryPanel hand-rolls internally; a Button/Tab atom is a natural next component → none
  yet (rbx-ui backlog)
- The marketplace Rojo Studio plugin auto-updates past the pinned 7.6.1 lanes and its
  protocol-mismatch handler crashes cryptically; version-matched `rojo plugin install` from
  the pinned repo is the stable setup, and syncback lanes never need the Studio plugin at
  all → memory (recorded in [[rojo-syncback-run-in-repo]])
- Rojo releases can outpace the converged pins, and the auto-updating marketplace Studio
  plugin re-breaks silently when they do — a periodic release-vs-pins check is recurring,
  self-contained, and report-shaped → routine
- Plugin/vault architecture mapped: the roblox-dev plugin's source repo
  (`Repositories/Vault-Repositories/roblox-dev`) and its installed marketplace copy are
  byte-identical, and BOTH symlink `brain/` → `Knowledge-Architectures/graphs/roblox-brain`
  (one KA git repo holds all 8 brains) — so re-uploads can't clobber vault knowledge, but a
  re-install must be checked to preserve the symlink rather than materializing a detached
  copy → memory

## Outputs

- UI development flow map delivered in-chat (widget + prose): 9-stage funnel — prototype (6
  kits) → catalog (3 components) → telemetry (M1/M2 live) → prove (0 proven) → syncback →
  BLK→FNL (untraveled) → lane choice → productize (none through-flow) → consume (2 games) —
  statuses grounded in the registry, ui-catalog, lab tree, and workflow entity; friction points
  named and prioritized
- Live-session UI audit vs rbx-ui/timer-ui (active Studio = Soul Steel hub, placeId
  102596975485791): ranked pull-in list (inventory drag trio, tile-state contract,
  reduced-motion util, paged CharacterPanel + EquipmentSlot, MiniMap shell, ScreenNavigator,
  Icon atom post-FNL) + stay-out list with reasons, delivered in chat; flagged the new hub
  `StarterGui.User-Interface-Development-Lab` PackageLink as an unguarded syncback boundary
  (task chip spawned for the universe repo)
- Foundational UI shell live in `roblox-testing-environment` (built green, exit 0):
  `src/client/App.tsx` (HUD base layer + Inventory/Character overlays, top-center switcher,
  H/I/C keybinds, Logger-wired callbacks) + `src/client/ui-fixtures.ts` (typed mock data);
  legacy slotable service excluded from build + its stale out/ orphan deleted; uncommitted
  per commit ritual
- Rojo estate converged on 7.7.0: 4/4 repo pins + global rokit aligned, TrembusUITesting
  serve live under 7.7.0, managed Studio plugin refreshed; CLAUDE.md lanes section,
  [[rojo-syncback-run-in-repo]], and the MEMORY.md index updated; rokit edits uncommitted
  per ritual. **User-confirmed live in Studio** (2026-07-28 ~05:44): plugin connected, shell
  mounted and running — the foundational UI is real, end to end

## Blockers

- none

## Next Action

Mint the token-authority ADR (`/new decision` — one canonical token set for rbx-ui vs the
lab's graphite-cyan `Token_*` language), then start the inventory drag trio's prove pass in
the QA rigs — the funnel's first full traversal.

## Handoff Notes

- **Foundational UI shell** is live and user-confirmed in Studio: `App.tsx` + `ui-fixtures.ts`
  in `roblox-testing-environment` (committed at close; that repo has **no remote** — local
  git only). The serve ran as this session's background process — restart with
  `npm run serve` (resolves rojo 7.7.0 now).
- **tsconfig exclusion**: `SlotableItemsTestService.ts` is excluded from that repo's main
  build (pre-cutover Tower taxonomy vs the moved package); restoring it is
  [[slotable-items-cutover]] consumer-migration work. Its stale `out/` orphan was deleted —
  rbxtsc doesn't clean orphans (brain-capture candidate).
- **Rojo estate converged**: 7.7.0 (= latest release) across all four repo pins + global
  rokit; Studio uses the managed plugin — re-run `rojo plugin install` at every pin bump.
  A release-vs-pins watch is queued in First-Principles as a `routine` candidate for /reflect.
- **Hub syncback boundary** for the UI-lab package landed via the spawned task session
  (`59265fa` in `soul-steel-universe`); dry-run proof caveats live in
  [[proving-ignoretrees-boundaries]].
- **Unstarted half of the goal**: the full 17-package registry health pass (the session did a
  UI-scoped deep dive instead, user-directed).
- **Offered, not executed**: the token-authority ADR; `/roblox-dev:capture` for the two scars
  (rbxtsc exclude-orphan · rojo 7.7 msgpack protocol); the testing-env CLAUDE.md structure
  correction (claims extracted `src/shared/components/`); `/reflect` (13 closed engrams,
  no bridge review yet).
