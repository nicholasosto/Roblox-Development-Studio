---
title: "Soul Steel: Shardhold live UX playtest loop"
status: draft
updated: 2026-07-26
links:
  - { rel: references, target: reports/2026-07-26-soul-steel-shardhold-mobile-live-ux-specification }
  - { rel: references, target: pipeline/soul-steel-shardhold-content-and-simulation-pipeline }
---

# Soul Steel: Shardhold live UX playtest loop

> **Status:** draft (2026-07-26)

## Purpose

Turn one uncertain Shardhold interaction into reproducible evidence and a
bounded design decision.

This workflow is intentionally narrower than “play the game and give
feedback.” Each loop selects one question, binds it to a known scenario and
build, tests the relevant inputs and degraded states, observes players without
coaching, classifies the result, and updates the dated design baseline or
carry-forward. It does not treat a prototype, Play session, save, publish, or
production promotion as interchangeable proof.

## Workflow

<!-- lanes: who acts; kind is one of human, ai, system, tool, neutral.
     steps: each needs a lane + label. Optional: status (done|active|pending|blocked|skipped)
     tints the card; detail shows on the card; note shows in the inspector when the step is
     clicked; to[] lists the next step id(s) ([] marks a terminal step); outputs lists files the
     step writes — "path" or { label, op } with op create|modify|delete (drawer shows +/~/−). -->
```json
{
  "caption": "One Shardhold UX uncertainty becomes reproducible evidence and an explicit next decision.",
  "lanes": [
    { "id": "design", "label": "Designer", "kind": "human" },
    { "id": "prototype", "label": "UX Prototype", "kind": "tool" },
    { "id": "simulation", "label": "Simulation and Server", "kind": "system" },
    { "id": "player", "label": "Player or QA", "kind": "human" },
    { "id": "planning", "label": "Project System", "kind": "tool" }
  ],
  "steps": [
    {
      "id": "question",
      "lane": "design",
      "label": "Choose one falsifiable question",
      "status": "done",
      "detail": "Name the behavior, target player, and observable pass or fail condition.",
      "note": "Examples: Can a new player locate the threatened room in two seconds? Can a controller user assign a resident without coaching?",
      "to": ["scenario"]
    },
    {
      "id": "scenario",
      "lane": "design",
      "label": "Bind a deterministic scenario",
      "status": "done",
      "detail": "Select fixture, build, content set, balance version, device, viewport, and input.",
      "outputs": [
        {
          "label": "_project/reports/2026-07-26-soul-steel-shardhold-mobile-live-ux-specification.md",
          "op": "modify"
        }
      ],
      "to": ["instrument"]
    },
    {
      "id": "instrument",
      "lane": "prototype",
      "label": "Instrument only the question",
      "status": "pending",
      "detail": "Capture the path and result without recording unnecessary identity or free-form text.",
      "note": "Event names and payloads are versioned. A measure must map to a stated product question.",
      "to": ["seed"]
    },
    {
      "id": "seed",
      "lane": "simulation",
      "label": "Load known state and expected ledger",
      "status": "pending",
      "detail": "Use a deterministic fixture and confirm the server result before inviting a tester.",
      "to": ["input_qa"]
    },
    {
      "id": "input_qa",
      "lane": "prototype",
      "label": "Check input and degraded states",
      "status": "pending",
      "detail": "Verify touch, mouse or keyboard, controller, reduced motion, pending, rejection, and Back behavior in scope.",
      "note": "A broken required input path blocks the session. Cosmetic incompleteness does not.",
      "to": ["observe"]
    },
    {
      "id": "observe",
      "lane": "player",
      "label": "Attempt the task without coaching",
      "status": "pending",
      "detail": "Think aloud only if the study calls for it; the facilitator records behavior before interpretation.",
      "to": ["capture"]
    },
    {
      "id": "capture",
      "lane": "design",
      "label": "Capture evidence and comprehension",
      "status": "pending",
      "detail": "Record completion, path, time band, wrong turns, explanation in the player's words, and notable surprise.",
      "to": ["classify"]
    },
    {
      "id": "classify",
      "lane": "design",
      "label": "Classify the failure or success",
      "status": "pending",
      "detail": "Choose interaction, content, tuning, technical, expectation, or no-action-yet.",
      "note": "Do not repair a simulation problem with copy or a comprehension problem with more rewards.",
      "to": ["decide"]
    },
    {
      "id": "decide",
      "lane": "planning",
      "label": "Choose accept, revise, or shelve",
      "status": "pending",
      "detail": "Tie the decision to observed evidence and keep unresolved questions explicit.",
      "outputs": [
        {
          "label": "_project/reports/2026-07-26-soul-steel-shardhold-mobile-live-ux-specification.md",
          "op": "modify"
        },
        {
          "label": "_project/roadmap/soul-steel-shardhold-vertical-slice-roadmap.md",
          "op": "modify"
        }
      ],
      "to": ["revise", "qualify"]
    },
    {
      "id": "revise",
      "lane": "prototype",
      "label": "Change the smallest relevant variable",
      "status": "pending",
      "detail": "Revise interaction, content, tuning, or implementation according to the classification.",
      "note": "Start a new loop with a new build or configuration identifier; never overwrite the evidence context.",
      "to": ["scenario"]
    },
    {
      "id": "qualify",
      "lane": "planning",
      "label": "Record qualified result and handoff",
      "status": "pending",
      "detail": "Preserve build context, observations, surprises, limits, and the next concrete question.",
      "outputs": [
        {
          "label": "_project/reports/<date>-soul-steel-shardhold-ux-qualification.md",
          "op": "create"
        }
      ],
      "to": []
    }
  ]
}
```

### Study card

Every loop begins with a small card:

```text
Question:
Player and prior knowledge:
Scenario / fixture:
Build / commit:
Content set / balance version:
Device / viewport / input:
Expected behavior:
Observable pass condition:
Known exclusions:
Data collected:
Facilitator intervention rule:
```

### Default scenario set

| ID | Scenario | Primary question |
|---|---|---|
| `UX-A1` | Six residents and one understaffed Loom | Can the player inspect and assign while understanding the home cost? |
| `UX-S1` | Falling Charge disables the Workshop | Can the player find cause, reserve time, and a recovery action? |
| `UX-I1` | Wardworks breach in a visible stratum | Can the player locate the threat and compare responses? |
| `UX-E1` | Two-person expedition preparation and fixed debrief | Does the player understand team coverage and what leaves the Hold? |
| `UX-R1` | Four-hour return with full storage and a pending incident | Does the return summary feel useful and non-punitive? |
| `UX-N1` | Mutation accepted late, rejected, duplicated, or disconnected | Does the interface preserve authoritative truth? |

### Observation rules

- Record the player's action before the facilitator's interpretation.
- Ask “What do you think will happen?” before commitment when consequence
  comprehension is the question.
- Do not teach terminology that the interface is meant to explain.
- Do not silently repair fixture state during a run.
- Mark facilitator intervention; the task no longer counts as unassisted.
- Separate a player preference from inability to find, understand, or execute.
- Preserve negative evidence and abandoned paths.
- Stop the run for distress, inaccessible input, corrupted state, or any
  purchase-like prompt not authorized by the scenario.

### Result classes

| Class | Meaning | Usual next owner |
|---|---|---|
| Interaction | The player could not find or operate the intended control | UX |
| Content | The scenario, choices, or copy did not create the intended meaning | design / narrative |
| Tuning | The rules were understood but costs, cadence, or severity produced the wrong pressure | simulation / balance |
| Technical | State, input, performance, network, or persistence behaved incorrectly | engineering |
| Expectation | The product promise led the player to expect a different system | product design |
| Qualified | The condition held in the tested context | Project System evidence |
| No action yet | Evidence is insufficient or contradictory | next study |

### Closeout

A loop is complete only when:

- the question and context are reproducible;
- raw observation and interpretation are distinguishable;
- result class and confidence are stated;
- accepted behavior, revision hypothesis, or shelving reason is explicit;
- affected report, pipeline, or roadmap carry-forward is updated;
- prototype, Play QA, save, publish, promotion, and commit state are reported
  separately;
- the next loop asks one concrete question.
