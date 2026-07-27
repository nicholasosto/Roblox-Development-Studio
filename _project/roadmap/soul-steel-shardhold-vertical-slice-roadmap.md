---
title: "Soul Steel: Shardhold vertical slice roadmap"
status: proposed
updated: 2026-07-26
links:
  - { rel: references, target: reports/2026-07-26-soul-steel-shardhold-game-design-document }
  - { rel: references, target: reports/2026-07-26-soul-steel-shardhold-mobile-live-ux-specification }
---

# Soul Steel: Shardhold vertical slice roadmap

> **Status:** proposed (2026-07-26)

## Context

The working design is intentionally not canon-gated. The immediate question is
whether a Soul Steel refuge-management game can produce an understandable,
emotionally specific loop on Roblox mobile before content, production topology,
or commercial systems make the idea expensive.

The dated GDD and live UX reports define a falsifiable v0.1 baseline. This
roadmap converts that baseline into evidence in the order of greatest risk:

1. Can players read and operate the cutaway?
2. Does the resource and staffing simulation create useful decisions?
3. Do named residents and relationships produce remembered consequences?
4. Does the game remain trustworthy across failure, offline time, save/load,
   and poor connectivity?
5. Can authored content scale without becoming repetitive or opaque?

This is a **proposed** roadmap. It does not authorize edits to a production
place, select a runtime repository, promise a ship date, or promote lore to
canon.

## Plan

### M0 — Design seed and test contract

**State:** complete for document seed; unqualified by play.

**Deliver**

- dated product/systems baseline;
- dated mobile live UX contract;
- content/simulation authoring pipeline;
- playtest workflow;
- explicit MVP counts, exclusions, and success observations.

**Proof**

- Project-System entity validation passes;
- references distinguish design targets from measured facts;
- no runtime, publishing, or canonical claim is implied.

**Do not add**

- formal IP decisions;
- monetization;
- production-place mutation;
- final balance or final art direction.

### M1 — Live UX greybox

**State:** next.

**Question:** Can a first-time player understand the Hold and complete the four
identity-critical interactions?

**Deliver**

- one landscape cutaway with the Anchor, twelve visible sockets, four active
  rooms, and six fixture residents;
- room and resident sheets;
- universal tap/select assignment plus optional drag acceleration;
- a resource shortage, one contained incident, expedition preparation and
  debrief, and a four-hour return summary;
- touch, mouse/keyboard, controller, reduced-motion, connection-pending, and
  rejection states;
- event hooks defined in the UX report.

**Exit gate**

- five testers unfamiliar with the prototype can identify the urgent room
  within ten seconds;
- at least four of five complete assignment, incident response, and expedition
  preparation without facilitator instruction;
- all three input modes complete all critical paths;
- no critical meaning depends on hover, color, sound, or precision drag;
- observed confusion and camera-loss evidence are recorded, not explained away.

**Exclude**

- persistence;
- real economy balance;
- procedural content;
- multiplayer;
- walking inside the Hold.

### M2 — Deterministic simulation spine

**Question:** Does the management model create decisions without runaway
collapse, tapping chores, or hidden math?

**Deliver**

- versioned definitions for rooms, residents, resources, incidents,
  expeditions, research, and balance;
- deterministic time-step simulation for Charge, Provisions, Aegis, storage,
  construction, fatigue, Cohesion, and Reality Strain;
- assignment preview derived from the same rules as committed results;
- incident prerequisites, cooldowns, spread, grace state, and outcome effects;
- bounded offline advancement with a replayable clock;
- headless fixtures for healthy, shortage, incident, collapse, recovery, and
  four/eight/twenty-four-hour absence.

**Exit gate**

- the same seed, configuration version, inputs, and elapsed time produce the
  same result;
- no ordinary absence can resolve lethal or save-ending consequences;
- every deficit reports source, reserve time, consequence, and recovery path;
- one automated run covers at least thirty simulated days without negative
  values, duplicate rewards, stuck incidents, or unrecoverable collapse;
- tuning changes occur through one balance authority.

**Exclude**

- production save migration;
- player economy purchases;
- tactical missions;
- large content volume.

### M3 — Playable vertical slice

**Question:** Does the combined home-and-away loop create a story players want
to continue?

**Deliver**

- one Hold stratum with twelve sockets;
- eight room types, three Hold ranks, and up to eighteen residents;
- five Facets, eight temperament traits, and two significant bonds per
  resident;
- ten minor incidents and one multi-stage breach;
- one expedition region, six mission templates, and about twenty encounter
  cards;
- twelve research unlocks, fifteen to twenty equipment items, one faction
  conflict, and one doctrine choice;
- 90–150 minutes of authored progression followed by a repeatable end state;
- full recovery from Fracture Lockdown.

**Exit gate**

- a new player expands, assigns, handles an incident, dispatches and debriefs an
  expedition, leaves, returns, and recovers from a breach;
- most test players can name two residents and recount one relationship-driven
  consequence after the session;
- at least one doctrine or incident choice creates a visible later callback;
- testers understand why the Shardhold is distinct from the reference game
  without being told.

**Exclude**

- paid systems;
- Seasons;
- permanent death;
- co-op;
- walkable interiors;
- active tactical combat.

### M4 — Roblox mobile, persistence, and security hardening

**Question:** Can the slice preserve truth and readability on real devices,
through disconnects, retries, and version changes?

**Deliver**

- selected owning Roblox repository and place/lab with explicit source
  authority;
- server-authoritative request/result envelopes;
- idempotent construction, expedition reward, and purchase-free economy
  mutations;
- DataStore schema, versioning, migration, retry, session-lock, and recovery
  strategy;
- safe offline clock and capped return calculation;
- supported phone/tablet/controller matrix;
- memory, frame-time, load-time, localization, and UI overflow observations;
- accessibility pass covering text, contrast, focus, reduced motion, and
  non-drag interaction.

**Exit gate**

- save/load, reconnect, retry, duplicate request, stale client, and migration
  tests pass in the chosen environment;
- UI remains operable at every supported reference viewport and input mode;
- degraded network never presents an unconfirmed mutation as durable;
- Play QA evidence is recorded separately from save, publish, and production
  promotion state.

### M5 — Content qualification and ethical economy

**Question:** Can the design sustain repeat play without manipulative pressure
or unaffordable authoring?

**Deliver**

- incident and expedition authoring templates with validation;
- repetition, choice-distribution, resident-visibility, and recovery metrics;
- balanced first-hour and eight-hour-away curves;
- content-cost estimate per incident family and expedition route;
- cosmetic-only commercial hypothesis evaluated after healthy base balance;
- IP-distinctiveness, player-safety, and age-appropriate design review.

**Exit gate**

- no event repeats outside its configured cooldown in test cohorts;
- failure and recovery remain possible without purchase;
- the game does not require notifications, streaks, random paid rewards, paid
  time skips, or purchased revival;
- a content author can create and validate one incident and one expedition
  encounter without changing simulation code.

### M6 — Production decision

**Question:** Is Shardhold worth promoting from a qualified vertical slice into
a production product?

**Inputs**

- interaction evidence from M1;
- simulation and recovery evidence from M2;
- retention-of-story and distinctiveness evidence from M3;
- device, persistence, and security evidence from M4;
- content cost and player-safety evidence from M5.

**Possible outcomes**

- promote with a named owner, budget, production topology, and formal decisions;
- continue incubation against one explicit failed gate;
- shelve while preserving the design reports and qualification evidence.

No date-based launch commitment is made before this gate.

### Cross-milestone gates

- **Canon:** replaceable terminology remains marked until deliberately promoted.
- **Authority:** planning artifacts do not imply runtime, Studio, save, publish,
  upload, registry, or production state.
- **Accessibility:** all identity-critical flows retain non-drag and
  non-hover paths.
- **Safety:** no paid system can be required to escape failure or preserve a
  resident.
- **Scope:** embodied exploration, tactical combat, co-op, and live Seasons
  require separate evidence and authorization.
- **Evidence:** every milestone records what was observed, on which build and
  device, with which fixture/configuration version.

## Open questions

- Which repository and Roblox place or lab should own M1 and M2 without blurring
  code-first and Studio-master lanes?
- Is **Aegis** most understandable as a produced operational resource, or should
  it become a capacity/stability meter?
- Does a socketed vertical Hold preserve enough spatial creativity, or do
  players need freer placement after the first stratum?
- Can directed relationships remain legible at eighteen residents with two
  tracked bonds each?
- Should incident decision clocks stop whenever their overlay is open, or only
  during accessibility/system interruption?
- What degree of expedition interactivity is necessary before authored choice
  cards feel passive?
- Does the player need an embodied Steward/avatar presence in the first slice,
  or is the command-layer identity sufficient?
- Which lore terms survive player comprehension testing without an exposition
  burden?
- What is the minimum distinct visual and mechanical signature needed to avoid
  “licensed reskin” perception?
- Who owns the long-lived GDD if the concept graduates from a cross-cutting
  planning experiment into a Soul Steel product?
