---
title: "Soul Steel: Shardhold mobile live UX specification"
status: draft
updated: 2026-07-26
links:
  - { rel: references, target: reports/2026-07-26-soul-steel-shardhold-game-design-document }
---

# Soul Steel: Shardhold mobile live UX specification

> **Status:** draft (2026-07-26)

## Outcome

**What shipped**

- A dated **v0.1 mobile live UX contract** for the Shardhold vertical slice.
- A landscape-first information architecture, interaction model, state model,
  flow set, accessibility baseline, telemetry plan, and prototype acceptance
  criteria.
- Explicit alternatives for drag, hover, and precision input so the management
  loop can be played by touch, mouse/keyboard, or controller.

**What didn't**

- No screen was implemented, connected to a live server, or tested on a Roblox
  device. See `[CF-UX-01]` through `[CF-UX-06]`.
- Visual style, final copy, animation timings, art assets, and pixel-perfect
  layout are deliberately outside this interaction-first baseline.
- This report is a dated snapshot. Iteration is governed by
  `workflow/soul-steel-shardhold-live-ux-playtest-loop`.

### UX objective

A new player should be able to look at the Hold, identify what needs attention,
select a room or resident, understand the proposed consequence of an action,
and act without learning a desktop strategy-game toolbar.

The cutaway is the primary dashboard. Detailed panels answer one question at a
time; they do not replace the world with menus.

### Device and viewport posture

- **Primary orientation:** landscape phone and tablet.
- **Reference canvas:** responsive layout tested first at 1280 × 720 logical
  pixels, then at narrow landscape and tablet aspect ratios.
- **Safe areas:** all persistent bars and confirmation controls respect Roblox
  inset and device cutouts.
- **Touch target target:** 48 × 48 logical pixels where practical; never below
  Roblox's validated implementation minimum.
- **Text:** body copy remains readable without relying on device zoom; user text
  scaling and localization expansion must not hide confirm/cancel actions.
- **Performance:** opening a sheet, selecting a room, or changing focus should
  feel immediate even while the server confirms the action.

The game detects the active input mode and changes prompts, focus treatment,
and interaction hints without changing the underlying screen hierarchy.

### Main-screen information hierarchy

```text
┌──────────────────────────────────────────────────────────────────────┐
│ Hold Rank  Charge  Provisions  Aegis  Salvage  Cohesion  Strain  ⚙ │
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│                    PAN / ZOOM CUTAWAY HOLD                           │
│        [room] [room]         SOUL ANCHOR        [room] [alert]       │
│                residents, work, damage, and route traces             │
│                                                                      │
├──────────────────────────────────────────────────────────────────────┤
│ Objective / pending situation             Roster  Build  Expeditions │
└──────────────────────────────────────────────────────────────────────┘
                 contextual inspector rises from the bottom
```

**Persistent top bar**

- Hold rank and capacity.
- Charge, Provisions, and Aegis with current value, capacity, trend, and
  estimated reserve time when falling.
- Salvage as the construction stock.
- Cohesion and Reality Strain as visually distinct states, not collectible
  currencies.
- A single alert entry point and settings.

Scrip and Insight can remain inside relevant sheets on a phone unless a current
decision depends on them. Tablet and desktop may expose them without shrinking
the primary states.

**Persistent bottom rail**

- one current objective or highest-priority pending situation;
- Roster;
- Build;
- Expeditions;
- an optional Chronicle entry after onboarding.

The rail contains nouns and destinations, not every possible command. Room and
resident actions appear only after selection.

### Cutaway navigation

- One-finger drag pans; pinch changes zoom.
- Mouse drag or middle-drag pans; wheel changes zoom.
- Controller uses the left stick to pan and shoulder controls to zoom.
- A visible **Reset view** control always returns to the Anchor and a usable
  zoom.
- Tapping empty space clears selection; Back closes the current layer before it
  exits the experience.
- Room labels appear at medium zoom; resident names appear only when selected or
  filtered.
- Alerts pulse once and then settle into a persistent badge. Nothing critical
  continuously flashes.
- Selecting an alert frames its room and opens a compact situation strip; the
  camera never takes control without a skip or return control.

At the most zoomed-out level, each room must still communicate:

- operating, idle, damaged, isolated, or constructing;
- staffed versus understaffed;
- one critical shortage or alert;
- storage-ready state only when that information affects a decision.

### Navigation and overlay model

The UX uses four depth levels:

1. **Hold view** — cutaway plus persistent bars.
2. **Context sheet** — room, resident, assignment, or build details; the Hold
   remains visible behind it.
3. **Task surface** — roster, expedition loadout, research, Chronicle, or a
   multi-step incident.
4. **Blocking confirmation** — only for irreversible, destructive, paid, or
   high-consequence actions.

Only one context sheet and one task surface may be active. Opening a new peer
replaces the old one. Back behavior is predictable: confirmation → task surface
→ context sheet → Hold view.

### Screen inventory and contract

| Surface | Primary question | Required content | Primary actions |
|---|---|---|---|
| Hold overview | What needs attention now? | Cutaway, resource trends, alerts, objective | select, pan, zoom, open destination |
| Room sheet | What is this room doing and why? | state, workers, output/demand, storage, modifiers, condition | assign, reprioritize, overdrive, repair, upgrade |
| Resident sheet | Who is this person and what do they need? | Facets, job, health, fatigue, belonging, bonds, aspiration, equipment | assign, equip, treat, train, follow |
| Roster | Who best fits this task? | searchable/filterable cards with current intent and assignment preview | select, compare, assign |
| Build catalog | What can fit here and what changes? | categories, locked reason, cost, time, demand, adjacency preview | preview, rotate if applicable, build |
| Assignment tray | What changes if I move this resident? | origin/destination, output delta, fatigue, relationship and incident warnings | confirm, choose another, cancel |
| Situation overlay | What happened, why, and when must I decide? | cause, threatened rooms/people, time state, response options, projected cost | inspect, assign response, commit |
| Expedition map | Where can a team go and why? | routes, duration, risk, objective, known rewards/evidence | inspect route, prepare team |
| Expedition loadout | Is this team ready? | members, supplies, gear, doctrine, extraction threshold, warnings | dispatch, save loadout, cancel |
| Return debrief | What happened and what changed at home? | node timeline, causes, gains, injuries, bonds, follow-ups | inspect, accept, choose follow-up |
| Research | What future capability am I choosing? | three constellations, prerequisites, cost, doctrine interaction | inspect, commit |
| Chronicle / objectives | What story and goal am I carrying? | current objective, recent consequences, named people, unresolved hooks | track, inspect source |
| Settings / accessibility | How should this experience behave? | input, text, motion, audio, contrast, privacy | change and preview |

Standalone resident, item, incident, and doctrine detail opens in a focused
sheet or modal first. A deliberate **Go to room**, **Go to person**, or
**Open Chronicle entry** action can then move the camera or navigation context.

### Interaction contract

Every action follows:

1. **Select** a visible object or destination.
2. **Understand** current state and the proposed delta.
3. **Commit** if the action is safe and reversible.
4. **Confirm** only if it is destructive, irreversible, paid, or unusually
   consequential.
5. **Observe** immediate local feedback.
6. **Reconcile** with the authoritative server result.

Rules:

- Drag-and-drop resident assignment is optional acceleration, never the only
  path. Tap resident → Assign → tap room is the universal fallback.
- Long-press may reveal extra context but never performs or unlocks a critical
  action.
- Hover may enrich desktop tooltips but never carries unique information.
- A disabled control states the missing requirement beside it.
- Costs, duration, displaced work, and predicted output change appear before
  confirmation.
- Destructive actions have confirmation and, where technically safe, a brief
  undo window.
- Network-pending actions show a local pending state and prevent duplicate
  submission.
- Rejection restores the prior state and explains the changed constraint in
  plain language.

### Interaction budgets

| Task | Target |
|---|---:|
| Inspect a room from Hold view | 1 tap / select |
| Understand a primary production deficit | within 2 seconds |
| Open the deficit's cause and recovery action | at most 2 taps |
| Assign a resident from an open room sheet | at most 3 deliberate actions |
| Recall an expedition from its status card | at most 3 deliberate actions plus confirmation |
| Frame the threatened room after an incident appears | within 2 seconds |
| Reset a lost camera | 1 visible action |
| Close back to Hold view from a task surface | predictable Back sequence, never more than 2 layers |

These are prototype targets. Instrumentation determines whether they are useful.

### Critical flow A: first ten minutes

1. Start centered on the damaged Anchor with four rooms and six residents.
2. A Steward voice/text prompt asks the player to restore Charge.
3. The affected room is framed; the player selects it.
4. The room sheet explains that staffing improves output.
5. The roster opens prefiltered, but at least two residents are visible so the
   choice does not feel automatic.
6. Assignment preview shows output, fatigue, and one affinity reason.
7. Charge recovers and a neighboring room visibly resumes.
8. The player builds one Wardworks socket with a placement preview.
9. A low-stakes incident tests selecting a response team.
10. The Gatehouse opens and the player prepares the first short expedition.

The tutorial uses real screens and can be skipped. After a skip, a compact
objective remains; tutorial-only controls do not exist.

### Critical flow B: diagnose and repair a shortage

1. The top-bar resource changes from stable to falling and shows reserve time.
2. Selecting it filters the cutaway to producers, consumers, and disabled
   rooms.
3. The largest cause is named in plain language.
4. The player opens the relevant room and sees three recovery options:
   reassign, reprioritize, or spend/repair.
5. Assignment preview shows the new forecast.
6. After server confirmation, the trend and affected rooms update together.

No generic red warning should exist without a cause and next action.

### Critical flow C: respond to an incident

1. A contained banner names the event, location, severity, and decision state.
2. Selecting it frames the location and pauses only the incident's decision
   clock, not the entire Hold simulation.
3. The overlay explains the causal factors and threatened people/rooms.
4. Two or three responses expose requirements and projected consequences.
5. Selecting a response opens a prefiltered resident or resource picker if
   needed.
6. Commit creates a pending state; resolution shows immediate action in the
   cutaway.
7. Outcome names the people affected and creates a Chronicle callback.

### Critical flow D: prepare and return an expedition

1. The route card shows objective, duration, known risks, and useful Facets.
2. The loadout screen compares team coverage without reducing residents to one
   “power” number.
3. Removing a critical Hold worker previews the home impact.
4. Doctrine and extraction threshold are explicit.
5. Dispatch confirmation summarizes team, duration, supplies, and home cost.
6. Key encounter nodes create a safe-return notification inside the game; no
   push notification is required.
7. Debrief presents a causal timeline before a reward shower.
8. The player can inspect an injured resident, new recruit, or evidence object
   before accepting all results.

### Critical flow E: leave and return

1. Before exit, the player may open **Away forecast** to see storage time,
   expected completions, and current risks.
2. On return, one summary separates **gained**, **completed**, **stopped**, and
   **needs attention**.
3. The game frames at most one recommended first action.
4. Pending situations wait for assessment; none resolve lethally on arrival.
5. Closing the summary restores normal control and leaves all information
   accessible from the Chronicle.

### State and feedback matrix

| State | World treatment | Sheet treatment | Action behavior |
|---|---|---|---|
| Loading initial save | Static refuge silhouette and progress text | no interactive sheet | input disabled except cancel/retry when valid |
| Live / stable | normal room animation | current values and trends | direct reversible actions |
| Warning | one icon plus restrained color/pattern | cause, reserve time, recovery actions | safe actions remain available |
| Critical | localized pulse and framed threat | severity, threatened targets, grace state | explicit commit for risky response |
| Client request pending | affected control and object show pending | expected change retained | duplicate submit blocked |
| Server accepted | local confirmation and updated authoritative values | reasoned delta | next valid action enabled |
| Server rejected | restore prior state | plain-language cause and refresh | retry only after current data loads |
| Connection degraded | persistent non-blocking banner | last confirmed time | local inspection allowed; mutations queued only if proven safe, otherwise blocked |
| Save conflict / migration | Hold view remains read-only | recovery explanation and support code | no speculative merge on client |
| Empty roster/filter | unchanged Hold | reason and clear-filter action | no dead-end empty panel |
| Content unavailable | stable fallback card | version mismatch explanation | retry or return; no purchase prompt |

### Assignment UX

Resident cards in assignment context show only:

- name and portrait;
- relevant Facet and affinity;
- current job and the cost of leaving it;
- fatigue or treatment restriction;
- one relationship warning when material;
- predicted room output band, not false precision.

A **Why this result?** disclosure reveals the contributing modifiers. The
default sort is “recommended for this room,” but the player can sort by Facet,
fatigue, current job, affinity, or name.

Assignments that split a strong bond, place rivals together, remove the only
critical worker, or push fatigue beyond a threshold receive a visible warning.
They are not automatically forbidden unless a hard rule is violated.

### Build UX

- Selecting an empty socket opens the catalog already filtered to valid
  footprints.
- Locked rooms remain visible only when their requirement teaches a reachable
  goal; distant content stays folded.
- Placement preview shows cost, time, Charge/Aegis demand, adjacency effects,
  displaced residents, and any blocked route.
- Valid, risky, and invalid placement use icon, pattern, copy, and color
  redundancy.
- Construction state shows finish time and what can be done while waiting.
- There is no paid speed-up control in the vertical slice.

### Alert policy

Alerts have four severities:

1. **Informational:** completion or opportunity; stored in Chronicle.
2. **Attention:** efficiency loss with no immediate harm.
3. **Urgent:** active incident with a grace state.
4. **Critical:** major crisis or integrity risk requiring explicit assessment.

At most one critical banner and three visible secondary alerts compete for
attention. Lower-priority events aggregate. Audio, haptic, motion, icon,
pattern, and text are never the sole signal.

### Accessibility and input

- Icons always pair with labels or accessible descriptions for consequential
  meaning.
- Resource and severity states use color plus shape, pattern, position, or copy.
- Reduced-motion mode removes camera sweeps, shaking, repeated pulses, and
  parallax while preserving state transitions.
- Text scales without hiding primary actions; scroll regions communicate their
  extent.
- Controller focus is visible, ordered, and restored to the invoking control
  after a sheet closes.
- Touch users can complete every flow without precision dragging.
- Keyboard users receive stable shortcuts only after the matching visible
  action is learned.
- Critical timers pause while a system-level interruption or blocking
  accessibility surface is open when technically possible.
- Voice chat, rapid tapping, reaction time, and sound are not required to play
  the solo vertical slice.

### Copy rules

- Name the state first: “Charge falling.”
- Name the cause next: “The damaged Loom is producing 8 less per minute.”
- Offer an action: “Repair the Loom or pause the Workshop.”
- Avoid fictional terminology when a plain operational label is needed.
- Use lore terms in names and flavor, then give their gameplay meaning.
- Never shame a player for absence, failure, accessibility settings, or
  choosing the safer response.

### Telemetry plan

Telemetry records interactions and simulation outcomes, not private text or
unnecessary identity data.

| Event or measure | Product question |
|---|---|
| `onboarding_step_started/completed/skipped` | Where does the first loop become unclear? |
| `time_to_first_room_inspect` | Is the cutaway inviting and readable? |
| `time_to_first_assignment` | Can players discover the staffing loop? |
| `assignment_preview_opened/committed/cancelled` | Are previews useful or frightening? |
| assignment corrected within 30 seconds | Did the player understand the consequence? |
| resource detail opened from top bar | Does a warning lead to diagnosis? |
| `camera_reset_used` and repeated pan reversal | Are players becoming spatially lost? |
| build catalog opened/abandoned/committed | Is placement or cost blocking intent? |
| incident shown/framed/response committed/resolved | Can players locate and understand danger? |
| expedition prepared/dispatch cancelled/recalled | Does home-away cost read before departure? |
| return summary item inspected | Which consequences matter to players? |
| collapse entered/recovery started/recovered | Is failure legible and recoverable? |
| session length and return interval bands | Does the cadence match actual play? |

Event payloads include schema version, session-relative timestamp, input mode,
screen or object type, content definition ID, and outcome category. They exclude
free-form player text and raw device identifiers.

### Live UX prototype scenarios

The first interactive surface needs one small deterministic Hold, not the full
game:

1. **Assignment:** six residents, four rooms, two plausible worker choices.
2. **Shortage:** a damaged Loom creates falling Charge and disables a Workshop.
3. **Incident:** a Wardworks breach offers repair, isolate, or resident-response
   options.
4. **Expedition:** choose two residents, see the home cost, dispatch, and view a
   predetermined debrief.
5. **Return:** advance the test clock four hours and show bounded production,
   stopped storage, and a pending situation.

The scenarios can use fixture data. Server authority and persistence become
mandatory before the slice is called playable, not before the navigation
hypothesis is tested.

### Prototype acceptance criteria

- Five of five critical flows can be completed by touch, mouse/keyboard, and
  controller without input-specific dead ends.
- A first-time tester can identify the most urgent room and explain why within
  ten seconds in the shortage scenario.
- A tester can assign a resident without instruction and accurately describe
  the production and home-cost preview.
- A tester can find the threatened room within two seconds after choosing the
  incident alert.
- The player can always recover the camera in one visible action.
- Every resource deficit exposes cause, consequence, and at least one next
  action.
- Every destructive or irreversible action has a confirmation; ordinary
  reversible actions do not create confirmation fatigue.
- Reduced-motion mode and readable controller focus cover all five scenarios.
- No screen depends on hover, precision drag, color, sound, or lore knowledge.
- Network rejection and degraded-connection states preserve truth and prevent
  duplicate mutation.
- Telemetry can reconstruct the chosen path without recording sensitive or
  free-form information.

## Surprises

- **The top bar is a diagnostic interface, not a scoreboard.** A current number
  without trend, reserve time, cause, and next action does not support
  stewardship.
- **Drag-and-drop is an accelerator, not an interaction contract.** The tap-
  select-assign path protects touch, controller, accessibility, and small-screen
  use simultaneously.
- **The world can carry more information than another dashboard.** Room state,
  staffing, and localized incidents belong in the cutaway; panels explain and
  act on them.
- **Return UX is part of failure design.** Separating gained, stopped, and needs
  attention prevents offline progress from feeling like an accusation.

## Decisions made

- **D1: Landscape-first cutaway is the home surface.** It gives rooms enough
  width to remain legible and preserves the shelter fantasy.
- **D2: Use progressive sheets instead of a permanent desktop toolbar.** The
  selected object determines the available actions.
- **D3: Preserve a universal tap/select assignment path.** Drag, hover, and
  shortcuts remain optional acceleration.
- **D4: Treat resource indicators as explanations.** Values, trends, reserve
  time, cause, and recovery route stay connected.
- **D5: Limit visible alert competition.** Situation severity, aggregation, and
  a stable Chronicle protect player attention.
- **D6: Instrument questions, not vanity counts.** Each initial event maps to a
  specific uncertainty in the interaction or simulation model.

These are provisional UX choices, not formal serial decisions.

## Carry-forward

- `[CF-UX-01]` Build the five-scenario clickable/live prototype — no interaction
  target has been observed yet.
- `[CF-UX-02]` Select reference phones, tablets, controller, and localization
  stress strings — viewport coverage needs a concrete test matrix.
- `[CF-UX-03]` Produce a low-fidelity room, resident, and alert visual language —
  this pass specifies semantics, not art.
- `[CF-UX-04]` Validate exact touch targets, text sizes, safe areas, and platform
  UI behavior in Roblox Studio and on devices — current figures are targets.
- `[CF-UX-05]` Define the server request/result envelopes before connecting live
  mutations — optimistic UI must not invent authority.
- `[CF-UX-06]` Set telemetry retention, consent, sampling, and environment
  separation before collecting player data.

## Verification evidence

| Gate | Method | Evidence |
|---|---|---|
| Multi-input posture has a platform basis | Use Roblox input model and adaptive design guidance | [Roblox input](https://create.roblox.com/docs/input), [Roblox adaptive design](https://create.roblox.com/docs/production/publishing/adaptive-design) |
| Critical interactions have non-drag paths | Static flow review | Interaction contract and flows A–E in this report |
| Every shortage is actionable | Static state-and-copy review | Critical flow B, state matrix, and copy rules |
| Prototype is measurable | Map each uncertainty to an event or observation | Telemetry plan and prototype acceptance criteria |
| Touch, controller, reduced motion, device fit | Real-device and Roblox client test | **Not yet performed** |
| Network truth and persistence | Client/server integration test | **Not yet performed** |
