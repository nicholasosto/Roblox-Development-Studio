---
title: "Soul Steel: Shardhold game design document seed"
status: completed
updated: 2026-07-26
links:
  - { rel: references, target: reports/2026-07-26-soul-steel-shardhold-game-design-document }
  - { rel: references, target: reports/2026-07-26-soul-steel-shardhold-mobile-live-ux-specification }
  - { rel: references, target: roadmap/soul-steel-shardhold-vertical-slice-roadmap }
  - { rel: references, target: pipeline/soul-steel-shardhold-content-and-simulation-pipeline }
  - { rel: references, target: workflows/soul-steel-shardhold-live-ux-playtest-loop }
---

# Soul Steel: Shardhold game design document seed

> **Status:** completed (2026-07-26)

## Goal

Create a realistic, internally consistent Project-System planning pack for a
non-canon-gated Soul Steel refuge-management game inspired by the identity-
critical structure of the original mobile *Fallout Shelter*.

## Success Criteria

- The concept can be explained in one sentence and is mechanically distinct
  from its reference.
- The GDD baseline covers player fantasy, pillars, loops, resources, rooms,
  residents, relationships, incidents, expeditions, progression, failure,
  offline play, multiplayer posture, MVP scope, risks, and provisional tuning.
- The mobile UX baseline covers navigation, screens, input parity, critical
  flows, states, accessibility, telemetry, scenarios, and acceptance criteria.
- A proposed roadmap orders interaction, simulation, content, persistence, and
  production risks.
- A design-stage pipeline defines content schemas, server authority, offline
  simulation, validation, testing, and promotion gates.
- A workflow turns one UX question into reproducible evidence.
- Every `_project` entity is scaffolded through Project-System tooling and the
  full entity graph validates.
- No prototype, Play QA, save, publish, canon, or production claim is implied.

## Source References

- `_project/decisions/0009-soul-steel-universe-topology.md` — existing
  universe/lane context; no topology change was made.
- [Bethesda launch release](https://www.prnewswire.com/news-releases/fallout-shelter-achieves-massive-global-success-debuts-at-1-on-app-store-300104755.html)
  — launch-era build/oversee/protect product identity.
- [Official Fallout Shelter App Store listing](https://apps.apple.com/us/app/fallout-shelter/id991153141)
  — current room, resident, training, defense, and expedition description.
- [Bethesda quest support](https://help.bethesda.net/app/answers/detail/a_id/34926/)
  and [crafting support](https://help.bethesda.net/app/answers/detail/a_id/34931/)
  — evidence that quests and crafting are separable later layers.
- [Bethesda offline support](https://help.bethesda.net/app/answers/detail/a_id/42073/)
  and [Mr. Handy support](https://help.bethesda.net/app/answers/detail/a_id/34989/)
  — evidence for offline access and bounded rather than indefinitely punitive
  collection; exact timing remains a tuning question.
- [Roblox input documentation](https://create.roblox.com/docs/input) and
  [adaptive design guidance](https://create.roblox.com/docs/production/publishing/adaptive-design)
  — cross-input and responsive UX basis.
- [Roblox data stores](https://create.roblox.com/docs/cloud-services/data-stores)
  and [client/server security](https://create.roblox.com/docs/scripting/security/client-server-boundary)
  — persistence and authority basis for later implementation.

## Decisions

- Use the provisional title **Soul Steel: Shardhold** and player role
  **Steward**.
- Borrow the reference game's readable cutaway, named-worker assignment,
  interdependent resources, incidents, expeditions, and asynchronous return
  structure while replacing its protected expression and optional live-service
  layers.
- Differentiate through a Soul Anchor, room Resonance, significant directed
  relationships, doctrine choices, and fail-forward crisis consequences.
- Treat residents as people recruited through rescue, migration, diplomacy,
  and apprenticeship; exclude automated breeding.
- Make routine production enter storage automatically so player attention is
  spent on stewardship decisions.
- Make the campaign solo-authoritative and mobile landscape-first. Walking,
  tactical combat, co-op, and live Seasons follow only after the core loop is
  qualified.
- Make default failure recoverable and offline absence safe.
- Exclude monetization from the vertical slice and reject paid power, time,
  revival, resources, residents, and randomized rewards as current design
  directions.
- Record these as provisional design choices, not formal serial ADRs or canon.

## First-Principles Candidates

- A management cutaway is successful when it acts as spatial information
  architecture, not merely scenery. → candidate home: future UX qualification
  report; no promotion yet.
- In an asynchronous game, safe absence is part of the core trust contract. →
  candidate home: future formal decision if the prototype is promoted.
- Efficiency-versus-personhood becomes gameplay only when assignment previews
  and later consequences expose the human cost. → candidate home: future
  design decision or lore capture; no promotion yet.
- Named people and callbacks are more durable content than a larger count of
  functionally equivalent rooms. → candidate home: future content
  qualification report; no promotion yet.

## Outputs

- `_project/reports/2026-07-26-soul-steel-shardhold-game-design-document.md`
  — dated v0.1 product and systems baseline.
- `_project/reports/2026-07-26-soul-steel-shardhold-mobile-live-ux-specification.md`
  — dated v0.1 interaction and validation baseline.
- `_project/roadmap/soul-steel-shardhold-vertical-slice-roadmap.md` — proposed
  M0–M6 evidence roadmap.
- `_project/pipeline/soul-steel-shardhold-content-and-simulation-pipeline.md` —
  design-stage definition, simulation, validation, and promotion process.
- `_project/workflows/soul-steel-shardhold-live-ux-playtest-loop.md` —
  reproducible one-question playtest loop.
- `previews/dashboards/roblox-development-studio-graph.json` and
  `previews/dashboards/roblox-development-studio-hub.json` — refreshed derived
  Project-System views after entity creation and completion.

## Blockers

- No blocker to using this pack as an exploratory design baseline.
- The owning runtime repository and prototype place/lab are unresolved.
- Whole-IP GDD ownership across Roblox-Development-Studio and the Soul Steel
  product planning space is ambiguous; resolve it before calling this the
  canonical product authority.
- All balance, timing, readability, accessibility, persistence, security, and
  fun claims remain untested.
- Art direction, proper nouns, and domain mappings are provisional.

## Next Action

Build roadmap M1 as a deterministic live UX greybox containing the Anchor, four
rooms, six residents, one Charge shortage, one Wardworks incident, one
expedition preparation/debrief, and one four-hour return summary; test the
assignment path first on touch, mouse/keyboard, and controller.

## Handoff Notes

- Start with `UX-A1` in the playtest workflow: “Can a new player assign a
  resident and explain both the production gain and the home cost?”
- Select the prototype owner before writing runtime code. Do not edit a
  read-through repository under `external-locations/`.
- Keep fixture data explicit and deterministic. The M1 UX test does not need a
  production save or full balance simulation.
- Treat all numbers as hypotheses and retain one balance authority when M2
  begins.
- Preserve the distinction between Edit/Play QA, save, publish, upload,
  registry/promotion, and commit state.
- If the prototype is promoted, resolve product-space ownership and turn the
  accepted safety/authority choices into formal decisions rather than silently
  treating this report as canon.
