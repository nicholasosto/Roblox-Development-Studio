---
title: "Soul Steel: Shardhold content and simulation pipeline"
status: design
updated: 2026-07-26
links:
  - { rel: references, target: reports/2026-07-26-soul-steel-shardhold-game-design-document }
  - { rel: references, target: roadmap/soul-steel-shardhold-vertical-slice-roadmap }
---

# Soul Steel: Shardhold content and simulation pipeline

> **Status:** design (2026-07-26)

## Context

Shardhold depends on two systems that can easily drift apart:

1. authored rooms, residents, incidents, expeditions, research, and narrative
   consequences; and
2. the deterministic simulation that decides whether those definitions are
   valid, legible, balanced, and safe across active and offline play.

The dated GDD is the v0.1 design baseline, not executable authority. This
pipeline defines how a proposed design record becomes qualified content without
embedding balance in UI, trusting the client, or requiring a content author to
edit simulation code.

This entity remains in `design` until an owner, repository, schemas, validators,
and a runnable fixture loop exist. Planning happens here; implementation must
occur in the owning repository rather than through `external-locations/`.

### Authority model

| Concern | Proposed authority | Not authoritative |
|---|---|---|
| Product intent and initial scope | dated GDD and UX reports | implementation guesses |
| Milestone order and gates | vertical-slice roadmap | elapsed calendar time |
| Balance values | one versioned balance configuration | UI copy, room records, or scattered constants |
| Content shape | versioned, schema-validated definitions | prose alone |
| Resource and event results | authoritative server simulation | client previews or animation |
| Offline advancement | saved snapshot, trusted server time, configuration version | client clock or continuous absent simulation |
| UX presentation | client view model derived from confirmed state | visual state as proof of persistence |
| Qualification evidence | dated report from a named build/config/device | “felt good” without a reproducible scenario |

### Definition families

All IDs are stable machine identifiers. Display names and copy are localized
fields or keys, never save identifiers.

#### `BalanceConfig`

```text
version
tickSeconds
offlineCapSeconds
resourceCapsByRank
consumptionByResident
constructionTimes
incidentCadence
strainBands
cohesionBands
recoveryRules
```

One configuration version is attached to every simulation run, test fixture,
telemetry session, and save migration result.

#### `RoomDefinition`

```text
id, displayNameKey, family, tier, footprint
workerSlots, specialistSlots, primaryFacets, affinityTags
buildCost, buildDuration, upgradeFrom
resourceInputs, resourceOutputs, storage
adjacencyTags, conflictTags, spreadRules
allowedStates, actions, unlockRequirement
visualStateKeys, contentVersion
```

Room definitions describe capabilities. They do not contain arbitrary
executable callbacks.

#### `ResidentTemplate` and saved `ResidentState`

```text
template:
  id, originTag, affinityTags, facetRanges, traitPool
  aspirationPool, equipmentRules, narrativeTags

saved state:
  residentId, templateId, nameSeed or authoredName
  facets, level, health, fatigue, belonging
  assignment, equipmentIds, giftIds, scarIds
  significantBonds[], historyFlags[], stateVersion
```

Relationships are directed. `significantBonds[]` is hard-capped by balance
configuration so the simulation and UI cannot silently grow an all-to-all
network.

#### `IncidentDefinition`

```text
id, family, severity, contentVersion
prerequisites, exclusions, weight, cooldown
targetSelector, causeExplanation
graceState, decisionClockPolicy, spreadPolicy
stages[]
  promptKey, responses[]
    requirements, previewEffects, authoritativeEffects
    followupTags, chronicleKey
resolutionRules, repetitionTags
```

Every authoritative effect must come from a closed, validated effect taxonomy
such as resource delta, room state, resident state, bond delta, flag, spawn
follow-up, or schedule timer. Content must not inject arbitrary server code.

#### `ExpeditionDefinition`

```text
id, regionId, objectiveKey, contentVersion
durationBand, supplyRules, knownRiskTags
routeNodes[]
  encounterPool, choicePolicy, pausePolicy
rewardTableId, failureTableId, followupTags
```

Encounter definitions use the same closed requirements/effects vocabulary as
incidents. Rewards are granted through an idempotent server transaction keyed
to expedition instance and resolution version.

#### `ResearchDefinition`

```text
id, constellation, cost, prerequisites
unlocks, modifiers, doctrineConflicts
displayCopyKeys, contentVersion
```

Modifiers use named operations from the simulation model. Research copy cannot
promise a bonus the model does not expose.

#### `SimulationSnapshot`

```text
saveVersion, playerProfileId
balanceVersion, contentSetVersion
lastConfirmedServerTime
holdRank, anchorState, doctrineFlags
resourceState, roomInstances, residentStates
incidentInstances, expeditionInstances
researchState, chronicleFlags
pendingTransactions, recoveryState
```

The production schema will be implementation-language specific. This list is a
contract checklist, not a serialized format.

## Build plan

1. **Select owner and scenario boundary**
   - name the owning repository, place/lab, source-of-truth direction, and
     runtime language;
   - choose the smallest M1 fixture: six residents, four rooms, one shortage,
     one incident, one expedition debrief, and one four-hour return;
   - record exclusions so prototype convenience does not silently become
     production architecture.

2. **Freeze schema v0 for the fixture**
   - implement definition schemas for balance, room, resident, incident,
     expedition, research, and snapshot;
   - assign stable IDs and content versions;
   - reject unknown effect operations, dangling references, invalid ranges,
     duplicate IDs, unreachable responses, and unsupported state transitions;
   - generate human-readable validation output that cites the definition and
     field.

3. **Author a golden fixture pack**
   - one Anchor, Resonance Loom, Growery, Wardworks, Workshop, and Gatehouse;
   - six residents with deliberately competing Facet and relationship choices;
   - healthy, falling-Charge, active-breach, expedition-return, and recovery
     snapshots;
   - expected outputs for zero, four, eight, and twenty-four elapsed hours;
   - fixture data is clearly labeled test content, not canon or balance.

4. **Implement the deterministic simulation kernel**
   - consume an explicit prior snapshot, ordered command list, elapsed duration,
     balance version, content set, and random seed;
   - produce a new snapshot plus an explainable event ledger;
   - define stable evaluation order for production, consumption, storage,
     construction, fatigue, Cohesion, Strain, incident scheduling, and
     expeditions;
   - clamp invalid elapsed time and values; never depend on frame rate or client
     locale;
   - make preview calculations call the same rules in a non-committing mode.

5. **Model offline advancement**
   - use trusted server time and the last confirmed save timestamp;
   - cap elapsed time at the configured maximum;
   - stop production at capacity;
   - throttle shortages in the documented failure order;
   - mature incidents into a pending grace state rather than resolving lethal
     or destructive effects;
   - make each offline run replayable from its original inputs.

6. **Bind a server-authoritative command boundary**
   - define commands such as `AssignResident`, `BuildRoom`, `CommitIncident`,
     `DispatchExpedition`, and `RecallExpedition`;
   - validate identity, ownership, expected state version, capacity, cost,
     prerequisites, rate, and idempotency key;
   - return the confirmed delta, explanation ledger, and latest state version;
   - never trust client-provided cost, duration, reward, assignment bonus, or
     elapsed time.

7. **Bind the live UX view model**
   - derive room state, resource trend, reserve time, alerts, assignment
     previews, and action availability from the latest confirmed snapshot;
   - allow presentation-only optimistic feedback while marking the mutation
     pending;
   - reconcile acceptance and restore/re-explain rejection;
   - expose cause chains in plain language rather than duplicating formulas in
     UI code.

8. **Author content through a closed vocabulary**
   - start from a template for each content family;
   - declare prerequisites, player-visible cause, choices, preview effects,
     authoritative effects, cooldown, and callback tags;
   - run schema, reference, reachability, economy, repetition, and copy checks;
   - render a compact content card for human review;
   - add the record to a named content set only after approval.

9. **Run automated simulation suites**
   - golden fixtures reproduce exact expected ledgers;
   - seeded Monte Carlo runs explore assignment, resource, incident, expedition,
     and recovery distributions;
   - long-run tests detect negative resources, reward duplication, incident
     deadlock, unbounded relationship growth, and unrecoverable collapse;
   - migration tests load every retained save version;
   - network tests repeat, reorder, reject, and retry commands.

10. **Run live UX playtests**
    - select one question and one fixture;
    - record build, content set, balance version, device, viewport, and input
      mode;
    - collect task completion, observed path, comprehension, and relevant
      telemetry;
    - do not change the design mid-session unless the build is unusable;
    - classify results as interaction, content, tuning, technical, or
      expectation failures.

11. **Tune through the balance authority**
    - state a hypothesis and the metric or observation it should change;
    - change the smallest relevant configuration field;
    - rerun golden, long-run, and affected UX scenarios;
    - retain prior configuration versions used by saves or evidence;
    - never “fix” a model problem with unexplained UI copy.

12. **Qualify and promote**
    - close all milestone-specific automated and human gates;
    - produce a dated qualification report with failures and carry-forward;
    - separately record Edit/Play QA, save, publish, upload, registry, promotion,
      and commit state;
    - promote content set and configuration version only through the owning
      repository's authorized process.

### Content author checklist

An incident or encounter is incomplete unless it answers:

- Why can it happen now?
- What visible evidence tells the player where and why?
- Which people or rooms are threatened?
- What are the two or three genuinely different responses?
- Which requirements are hard locks and which are probabilistic advantages?
- What will the preview say?
- Which closed authoritative effects execute?
- What relationship, faction, doctrine, or Chronicle callback can occur later?
- How soon may this pattern repeat?
- What happens if the player leaves, disconnects, or never opens it?
- Which fixture and automated check prove it is valid?

### Balance review bands

The first model should report distributions, not only averages:

- time to first shortage and first recovery;
- percent of time each operational resource is stable, falling, or stalled;
- room utilization and resident fatigue by Hold rank;
- incident frequency, severity, response selection, and unresolved duration;
- Cohesion and Strain band occupancy;
- expedition dispatch, extraction, failure, and reward-to-upgrade ratio;
- Fracture Lockdown frequency and median recovery time;
- progress at 15, 30, 60, and 120 active minutes;
- offline gains and stopped-at-capacity time at 1, 4, 8, and 24 hours;
- resident and relationship visibility in incident/expedition results.

No target becomes accepted balance until it is tied to a build, content set,
configuration version, sample, and observed player behavior.

## Exit criteria

- An owning repository, runtime lane, and prototype place/lab are explicitly
  named.
- Schemas validate every definition family and reject unknown effects, dangling
  references, duplicate IDs, and invalid transitions.
- A golden fixture pack covers healthy play, shortage, incident, expedition
  return, collapse, recovery, and bounded absence.
- Identical seed, configuration, content set, commands, and elapsed time produce
  an identical snapshot and event ledger.
- The client cannot grant resources, decide rewards, supply trusted elapsed
  time, or commit stale actions.
- Assignment and build previews use the same model as authoritative
  resolution.
- Offline advancement is capped, storage-aware, replayable, and incapable of
  resolving lethal or save-ending outcomes while absent.
- Duplicate, retried, reordered, and rejected requests cannot duplicate rewards
  or corrupt state.
- Long-run tests find no negative values, unbounded bonds, stuck incidents, or
  unrecoverable default-mode collapse.
- A content author can create and validate one incident and one expedition
  encounter without modifying simulation code.
- Live UX qualification records build, content set, balance version, device,
  input, observed results, surprises, and carry-forward.
- Runtime implementation, Play QA, save, publish, promotion, and commit states
  are reported separately; none is inferred from document completion.
