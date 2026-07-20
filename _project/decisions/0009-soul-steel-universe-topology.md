---
title: "Soul Steel universe topology"
status: accepted
updated: 2026-07-20
links:
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
  - { rel: references, target: decisions/0007-dual-lane-ts-luau }
---

# Soul Steel universe topology

> **Status:** accepted (2026-07-20)

## Context

Soul Steel is becoming a real multi-place game, and the platform boundaries force topology decisions: DataStores, MemoryStores, MessagingService, and free teleporting are **universe-scoped**, so any teleport- or persistence-dependent feature must live inside one experience. On 2026-07-20 the hub place was wiped clean of tower-defense-era content (preserved in a backup place) and published. The universe (gameId `6679100030`) now holds five places: **Soul Steel** `102596975485791` (start place, "the hub"), **Steel City** `82362521847286` (frozen backup carrying the tower-defense sub-game content), **Crystal Sanctum** `139731337909746` (landmark build, [[crystal-sanctum]] pipeline), **Lab - Architecture** `78520415943353`, and **Lab - Emergent Behavior** `90536127244624`.

Meanwhile the code side already has one lane: `soul-steel-official` (package `@trembus/steel-city`) is a roblox-ts + Flamework repo consuming the monorepo via `link:`, deployed code-first (`rojo serve`) — the opposite direction from the [[0008-studio-native-lab-lane]] syncback flow. The two directions must not share a serialization path.

## Decision

**One universe for the game; two lab tiers; one repo per lane.**

1. **Topology** — Soul Steel is the game universe. The hub is the start place; Crystal Sanctum is its own place (own streaming budget and publish cadence); Steel City stays frozen as backup. Places split on streaming budget, publish cadence, and acceptable loading boundaries — never per-feature. Teleport-dependent features live in-universe only.
2. **Two-tier labs** — platform labs (universe-agnostic engine/UI concerns: Part Textures, User Interface Development) remain separate experiences in `roblox-labs` per [[0008-studio-native-lab-lane]]. Game labs (need Soul Steel context: Emergent Behavior, Architecture) are places **inside** the universe; Lab - Architecture is the reversible Edit-mode staging root for architectural builds.
3. **One repo per lane** — code-first sub-games keep their own repos with git as master (`soul-steel-official` ↔ Steel City). Content-first places get the new `soul-steel-universe` repo (hub, crystal-sanctum, lab-architecture, lab-emergent-behavior): Rokit-pinned Rojo 7.7, Studio as master, publish → Save to File As → `rojo syncback` → commit, exactly the 0008 loop. The universe shell does not enter `roblox-labs` (scoped to lab experiences) nor `roblox-packages-mono` (experiences are not packages).
4. **Conventions** — game-lab code touches only `Lab_`-prefixed DataStore names; labs are stripped or teleport-gated before the universe ever goes public; every place boots standalone (a `GetJoinData` fallback provides a debug spawn/loadout) so sub-places playtest solo — real teleports are verified in the published client, never in Studio.

## Consequences

- Easier: persistence continuity and teleport flows are testable in the real universe (profiles cross places for free); world content gains history and review through syncback; the Crystal Sanctum pipeline's target-place and staging-root gates have concrete answers; the Tools lens can probe all sync lanes uniformly.
- Harder: two flows (code-first vs content-first) must never blur — a syncback project must not serialize compiled TS output, and a code-first place must not be edited Studio-master; the per-place ritual (publish + save + syncback) is more discipline than one place demanded; game labs share production DataStores until the `Lab_` convention and pre-launch gating are enforced.

## Options considered

- **Single-place universe** — rejected: no teleport testing, one streaming/publish budget for everything, and the landmark build would hostage the hub's cadence.
- **Separate experiences per concern** — rejected: universe-scoped walls (DataStores, reserved servers, trusted teleport data) make cross-experience gameplay second-class.
- **Grow `soul-steel-official` into the universe repo** — rejected: it is a one-concern sub-game repo ([[0004-one-concern-per-package]] ethos); mixing a code-first tree with syncback-managed content blurs both flows.
- **Universe shell inside `roblox-labs`** — rejected: [[0008-studio-native-lab-lane]] deliberately scoped that repo to lab experiences; a production universe is not a lab.

## Cites

- [[0008-studio-native-lab-lane]]
- [[0007-dual-lane-ts-luau]]
- [[0004-one-concern-per-package]]
- [[crystal-sanctum]]

## Re-open if

Rojo syncback proves unreliable for the universe's content places; sub-game count makes one-repo-per-lane sprawl; Steel City is resurrected as an active place (its frozen-backup role and repo mapping would need redefinition); or the labs cannot be cleanly gated before public launch.
