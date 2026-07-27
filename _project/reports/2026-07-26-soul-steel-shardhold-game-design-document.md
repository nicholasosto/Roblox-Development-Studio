---
title: "Soul Steel: Shardhold game design document"
status: draft
updated: 2026-07-26
---

# Soul Steel: Shardhold game design document

> **Status:** draft (2026-07-26)

## Outcome

**What shipped**

- A dated **v0.1 product and systems baseline** for the working concept **Soul Steel:
  Shardhold**.
- A vertical-slice scope that can be converted into a live UX prototype without
  first resolving final canon, production ownership, or monetization.
- Explicit separation between reference mechanics, original Soul Steel
  expression, provisional tuning targets, and unresolved questions.

**What didn't**

- No executable prototype, balance model, content database, save schema, or
  production-place change was made. See `[CF-GDD-01]` through `[CF-GDD-06]`.
- This report is a dated design snapshot, not the mutable runtime authority.
  Ongoing implementation and qualification are routed through
  `pipeline/soul-steel-shardhold-content-and-simulation-pipeline` and
  `roadmap/soul-steel-shardhold-vertical-slice-roadmap`.

### Working product definition

**Ten-second pitch:** Build a refuge around a wounded Soul Anchor, give strange
people a place in it, and decide what the community becomes when Reality pushes
back.

**Player role:** The player is the **Steward** of the Shardhold. They are not the
strongest fighter or the chosen hero. Their power is to allocate shelter,
attention, labor, supplies, and risk.

**Product shape:** A solo-first, persistent, landscape-oriented Roblox
management game with a readable cutaway refuge, short active decisions, safe
offline progress, and expeditions that bring people and consequences home.

**Emotional promise:** “I am responsible for a place, and every person in it has
history.”

**Working fiction:** A damaged Soul Anchor has created a rare pocket of
stability at a Crossroads between hostile regions. Refugees, constructs,
pilgrims, outcasts, and opportunists gather around it. The Steward grows the
small camp into a functioning Shardhold while deciding whether its people will
repair Reality, exploit its fractures, or invent a third way.

> **Lore posture:** Shardhold, Steward, Soul Anchor, room names, factions, and
> domain mappings are adaptable design language. Nothing here promotes itself
> to canon. The intended tone is cyber-gothic machinery, intimate human cost,
> and the recurring tension between efficiency and personhood.

### Reference boundary

The management grammar takes inspiration from the original mobile
*Fallout Shelter*: a cutaway home, named workers with aptitude-based jobs,
interdependent resources, incidents, asynchronous expeditions, and a
build-return-reinvest rhythm. Bethesda's launch description centered building,
overseeing a community, and protecting it; current official descriptions still
identify rooms, job matching, training, equipment, incidents, and expeditions
as major pillars.

Shardhold deliberately does **not** copy Fallout names, S.P.E.C.I.A.L.,
Vault imagery, dialogue, visual layout, UI styling, room art, lunchboxes,
romance-as-production, or its exact economy. Later *Fallout Shelter* features
such as quests, crafting, pets, advertisements, Seasons, and paid time
acceleration are optional reference layers, not requirements for this concept.

| Reference function | Shardhold expression | Deliberate change |
|---|---|---|
| Readable underground cutaway | Vertical refuge socketed around a Soul Anchor | Irregular strata and resonance replace a rectangular vault fantasy |
| Assign residents by stats | Assign named residents by Facets, traits, bonds, and affinity | A technically optimal worker may be socially dangerous |
| Power, food, and water | Charge, Provisions, and Aegis | Aegis represents containment and protection from Reality rather than thirst |
| Caps and construction | Scrip plus Salvage | Routine trade and physical material remain legible as different constraints |
| Fires, infestations, raids | Mechanical, social, hostile, moral, and opportunity incidents | Choices and relationship consequences matter alongside response speed |
| Wasteland exploration | Authored expedition routes across unstable regions | Small teams, doctrine, branching nodes, and a push-or-extract decision |
| Population thresholds | Hold ranks and Anchor capacity | Growth requires Cohesion and safe infrastructure, not headcount alone |
| Rush production | Overdrive a room or reroute the Anchor | The player sees the failure mode and can mitigate it before committing |
| Breeding as population growth | Rescue, migration, diplomacy, and apprenticeship | Residents enter as people with histories, not population inputs |
| Vault collapse/death | Fracture Lockdown and recovery contract | Default mode fails forward and never deletes the save |

### Audience, platform, and session shape

- **Audience:** players who enjoy base stewardship, character stories,
  collection, decorating, and consequential but understandable planning.
- **Primary platform:** Roblox on phones and tablets in landscape orientation.
- **Secondary inputs:** mouse/keyboard and controller use the same command-layer
  hierarchy; no critical action depends on hover, drag, or long-press.
- **Camera:** management-first 3D cutaway. Embodied walking through the Hold is
  an attractive later layer, not a prerequisite for the management prototype.
- **Quick check-in target:** 3–5 minutes.
- **Standard session target:** 8–15 minutes.
- **Focused crisis session target:** 20–30 minutes.
- **First-session target:** 12–18 minutes, with the basic loop understood in
  the first ten.

All durations, caps, costs, rates, and counts in this document are provisional
**design targets**. They are not measured balance, platform limits, or promises.

### Design pillars

1. **A home readable at a glance.** Rooms, shortages, danger, and resident
   activity are visible in the cutaway before the player opens a spreadsheet.
2. **Residents are people, not production tokens.** Aptitude matters, but so do
   trust, tension, fatigue, aspiration, scars, and who must work together.
3. **Every efficiency has a human cost.** Overdrive, dangerous adjacency, harsh
   rationing, and exploitative doctrine are valid tools whose consequences stay
   visible.
4. **Pressure creates stories, not save deletion.** Failure damages plans,
   relationships, rooms, and regional conditions, then offers a recovery path.
5. **Away time is useful and safe.** Offline progress respects the player's
   time and does not create lethal or destructive incident resolution while
   they are absent.
6. **The world returns home.** Expeditions matter because their people,
   evidence, injuries, recruits, and dilemmas change the Hold.

### Core loops

**Moment-to-moment loop**

1. Read one shortage, opportunity, or threat.
2. Inspect the affected room or resident.
3. Assign, reroute, spend, isolate, or accept risk.
4. Watch the immediate response and understand why it happened.
5. Bank the output or consequence.

**Standard session loop**

1. Review the return summary and pending situations.
2. Rebalance rooms and resident assignments.
3. Build, upgrade, repair, research, or train.
4. Resolve one incident or relationship event.
5. Prepare, dispatch, recall, or debrief an expedition.
6. Set safe priorities for the next absence.

**Long-term loop**

1. Stabilize the current stratum.
2. Increase Anchor capacity and recruit deliberately.
3. Open a new stratum, region, room family, or research constellation.
4. Make a doctrine choice that changes future trade-offs.
5. Survive an escalating fracture crisis.
6. See the Shardhold's visual and social identity reflect those choices.

**Decision-cadence target:** one meaningful assignment, incident, construction,
expedition, or doctrine decision every 60–120 active seconds. Routine production
enters storage automatically; the game should not depend on tapping floating
resource icons.

### The Shardhold

The refuge is a side-on 3D cutaway wrapped around a vertical Soul Anchor. Rooms
occupy authored sockets along an energy spine. This preserves the immediate
readability of a shelter game while giving the space a silhouette and geography
of its own.

Each room has:

- a function, tier, footprint, capacity, and operating state;
- one primary Facet and optional affinity preferences;
- Charge and Aegis demand, storage or output, condition, and local Strain;
- zero to three resident work slots plus an optional specialist slot;
- adjacency tags and a clear explanation of active bonuses or conflicts;
- visual states for idle, productive, boosted, damaged, isolated, and offline.

**Resonance** is the defining spatial mechanic:

- compatible neighboring rooms improve throughput, recovery, storage, or
  incident response;
- unstable combinations unlock unusual recipes, discoveries, and event chains
  while raising local risk;
- Wardworks, bulkheads, and deliberate empty sockets limit incident spread;
- social rooms affect which residents meet and which bonds receive event
  opportunities.

The player may rearrange a room only through an explicit, recoverable planning
mode. Demolition, room replacement, and any action that would strand residents
or destroy stored output require a preview and confirmation.

### Resource and state model

| Layer | Resource or state | Role | Shortage or pressure effect |
|---|---|---|---|
| Operational | **Charge** | Runs production and specialist rooms | Nonessential rooms throttle first; critical rooms show reserve time |
| Operational | **Provisions** | Resident upkeep, recovery, and expedition supply | Productivity and recovery slow before health is threatened |
| Operational | **Aegis** | Wards the Hold against rifts, contamination, and intrusion | Incident probability and spread rise in unprotected strata |
| Construction stock | **Salvage** | Build, repair, upgrade, and craft | Expansion pauses; existing rooms remain usable |
| Knowledge stock | **Insight** | Research and interpretation of expedition evidence | New capabilities wait; it does not decay |
| Soft currency | **Scrip** | Trade, contracts, wages, and routine upgrades | Market actions pause; it is never needed to prevent immediate death |
| Social state | **Cohesion, 0–100** | Trust in the Hold as a community | Low Cohesion creates refusals, disputes, departure risk, and weaker recovery |
| Campaign pressure | **Reality Strain, 0–100** | Accumulated instability and escalation | High Strain alters incidents, routes, prices, and crisis severity |

Soul Shards and Soul Gems, if used, remain scarce authored progression objects:
Shards can unlock major Anchor capabilities; Gems are named equipment,
characters, or story modifiers. Neither should become an interchangeable
premium currency. “Soul Crystal” is reserved from routine economy language
until lore and product ownership decide otherwise.

**Failure ordering:** a resource problem first creates a readable efficiency
loss, then a constrained choice, and only then a resident-threatening crisis.
The player always sees cause, reserve time, and at least one recovery action.

### Residents

Every resident is a persistent named character with:

- portrait, silhouette, name, pronouns, origin, and short history;
- five **Facets**, rated 1–10;
- health, fatigue, belonging, level, current job, and current intent;
- a temperament trait, aspiration, affinity, equipment, gifts, and scars;
- up to three significant directed bonds so relationship simulation stays
  readable at scale.

| Facet | Primary uses |
|---|---|
| **Vigor** | physical work, survival, hauling, frontline defense |
| **Craft** | construction, repair, fabrication, and machinery |
| **Insight** | research, medicine, detection, and interpretation |
| **Resolve** | warding, crisis resistance, recovery, and dangerous rituals |
| **Presence** | leadership, care, diplomacy, trade, and de-escalation |

Relationships are directional:

- **Trust:** −100 to +100.
- **Tension:** 0 to 100.
- **Tags:** mentor, kin, rival, debtor, protected, bound, or authored story tags.

Assignment quality uses more than the highest Facet. A strong room team can
still fail socially; a trusted but less efficient team may withstand a crisis.
The UI must preview both production and human consequences without exposing an
unreadable formula.

Residents arrive through rescue, migration, faction agreements,
apprenticeships, expedition encounters, and authored events. Automated
resident breeding is outside the product fantasy.

### Proposed room families

| Room | Primary purpose | Typical Facet | Design note |
|---|---|---|---|
| Anchor Chamber | capacity, global priorities, campaign control | Resolve / Presence | Unique central room; cannot be demolished |
| Resonance Loom | produces Charge | Craft | Overdrive can cascade along the energy spine |
| Growery and Kitchen | produces Provisions | Vigor / Craft | Visible stock and dietary event hooks |
| Wardworks | produces Aegis and contains spread | Resolve | Placement matters more than raw output |
| Workshop | refines Salvage and repairs equipment | Craft | Later supports authored crafting |
| Infirmary | treats wounds, fatigue, and scars | Insight | Triage creates humane versus efficient choices |
| Archive | produces Insight and decodes evidence | Insight | Turns expedition finds into future options |
| Commons | improves belonging and exposes relationships | Presence | Can resolve or intensify social events |
| Quarters | population capacity and rest | Presence | Privacy versus density is a meaningful upgrade path |
| Gatehouse | expedition staging and Hold defense | Vigor / Resolve | Connects the home and away loops |
| Training Hall | improves one Facet over time | varies | Training consumes opportunity, not only time |
| Exchange / Embassy | trade, recruitment, faction standing | Presence | Later-slice room, not required for first interaction test |

### Incidents and crises

The incident director considers Reality Strain, room condition, adjacency,
prosperity, unresolved tension, staffing, and recent repetition. Incidents are
causally legible; the game should explain why a situation became possible.

Incident families:

- **Mechanical:** Anchor overload, structural fracture, fire, equipment
  seizure, or supply contamination.
- **Social:** feud, panic, theft accusation, refusal, ideological dispute, or a
  resident disappearance.
- **Hostile:** raiders, creatures, infiltrators, restless echoes, or a rift
  breach.
- **Moral:** refugees at the gate, ration triage, dangerous research, an audit,
  or a faction demanding custody of a resident.
- **Opportunity:** travelling artisan, unusual resonance, faction envoy,
  recoverable signal, or unexpected reconciliation.

A standard incident exposes two or three responses drawn from:

- assign one or more residents;
- isolate or sacrifice room output;
- spend a stock resource;
- use equipment, a bond, affinity, or learned doctrine;
- accept a delayed consequence.

**Cadence targets**

- Minor incident: every 6–10 active minutes after onboarding.
- Minor duration: 30–120 seconds.
- Concurrent unresolved limit: two.
- Major crisis: every 60–90 active minutes or three to five sessions.
- Offline behavior: timers may mature, but lethal or destructive resolution
  pauses until the player returns and receives an assessment window.

### Expeditions

Expeditions are small authored journeys whose outcomes alter the Hold.

**Preparation**

- choose an objective and route;
- assign two to four residents;
- equip gear and supplies;
- select a cautious, diplomatic, covert, or forceful doctrine;
- set an extraction threshold or return condition.

**Resolution**

- three to six encounter nodes;
- systemic checks use Facets, equipment, bonds, evidence, doctrine, and world
  conditions;
- two to four consequential player choices per standard expedition;
- quiet travel can resolve asynchronously, while key nodes pause safely;
- the player can press onward, alter the objective, rescue someone, abandon a
  reward, or extract.

**Return**

- debrief explains why each result happened;
- residents return with salvage, Insight, equipment, recruits, injuries,
  relationship change, faction consequences, and story evidence;
- failed expeditions can create recovery missions or regional complications;
- standard mode never sells revival and does not require permanent death.

Early expedition duration targets are 5–15 minutes, growing to 20–60 minutes.
Long offline assignments pause or safely return by roughly 90 minutes. A
successful early run should fund roughly 50–75% of one meaningful upgrade; this
must be measured before adoption.

### Progression and doctrine

The proposed full campaign has eight Hold ranks. The vertical slice uses three.
Ranks unlock capacity, rooms, regions, event pools, research, and more dangerous
forms of existing problems.

Research is grouped into three constellations:

- **Hearth:** care, food, housing, recovery, and Cohesion.
- **Steel:** production, equipment, defense, and automation.
- **Veil:** wards, detection, affinities, and Reality management.

Major milestones offer doctrine choices instead of only larger numbers:

- asylum versus guarded neutrality;
- open exchange versus controlled isolation;
- repair Reality versus exploit its fractures;
- residents as citizens versus residents as assets.

Doctrine changes available actions, resident reactions, faction standing,
visual treatment, and future incident pools. There is no hidden “correct”
ending implied by this baseline.

### Failure and recovery

Default mode uses **recoverable collapse**:

1. Optional rooms throttle or shut down.
2. Work queues stall and residents show concern.
3. Low Cohesion creates refusals, conflict, or departure warnings.
4. Maximum Reality Strain triggers a **Fracture Lockdown**.
5. Lockdown damages rooms, injures or scatters residents, and starts a recovery
   contract.
6. The player rebuilds from a reduced but playable state.

The save is never deleted. No resident dies and no irreplaceable room is
destroyed while the player is offline. A later opt-in **Legacy mode** may add
permanent death, irreversible doctrine, and harsher autosaving, but it is not
part of the vertical slice.

### Offline and return contract

- The server persists a compact simulation snapshot and trusted last-update
  time; it does not continuously run an absent personal Hold.
- On return, the authoritative simulation advances deterministic,
  bounded production and timers up to an initial target cap of eight hours.
- Production stops at storage capacity. Shortages throttle output but do not
  silently cascade into death.
- Mature incidents become pending situations with a readable cause and grace
  window.
- The return summary shows gains, stopped production, completed training,
  expedition state, new risks, and the first recommended action.
- There is no streak loss, mandatory notification schedule, or fear-of-missing-
  out penalty in the vertical slice.

### Multiplayer posture

The campaign is solo-authoritative. Shared ownership, demolition, resident
transfer, and real-time resource authority are outside the MVP because absence,
griefing, and duplication complicate the core promise.

Possible later social layers:

- asynchronous visits and reactions;
- sending a temporary “echo” specialist to a friend's Hold;
- two-to-four-player crisis or expedition sessions;
- host confirmation for irreversible actions;
- separate, non-transferable rewards for guests.

Guests never dismiss residents, demolish rooms, change doctrine, or spend
premium items.

### Vertical-slice content budget

**Target:** 90–150 minutes of authored progression followed by a repeatable
end-state loop.

| Content | Slice target |
|---|---:|
| Hold strata / room sockets | 1 / 12 |
| Room types / tiers | 8 / 3 |
| Maximum residents | 18 |
| Facets / temperament traits | 5 / 8 |
| Significant bonds tracked per resident | 2 |
| Minor incident templates | 10 |
| Multi-stage crises | 1 |
| Expedition regions / mission templates | 1 / 6 |
| Expedition encounter cards | approximately 20 |
| Hold ranks / research unlocks | 3 / 12 |
| Equipment items | 15–20 |
| Faction conflicts / doctrine choices | 1 / 1 |

The slice succeeds when a new player can:

1. expand the refuge without tutorial dependence;
2. recognize at least two residents by personality, not only Facet score;
3. experience a relationship-driven consequence;
4. understand and recover from a breach;
5. bring an expedition team home with a story worth remembering;
6. leave and return without feeling punished for being away.

**Explicitly outside the slice:** multiplayer, walkable interiors, tactical
combat, player trading, permanent death, multiple Holds, automated breeding,
Seasons, advertisements, paid time skips, randomized paid rewards, and a
canonical campaign ending.

### Initial economy and cadence hypotheses

| Variable | Initial target |
|---|---:|
| Starting residents | 6 |
| Starting functional rooms | Anchor plus 4 |
| Starting Scrip / Salvage | 600 / 120 |
| Early room cost | 150–500 Scrip and 20–60 Salvage |
| Early construction time | 20–90 seconds |
| Midgame construction time | 2–8 minutes |
| Late upgrade time | 15–45 minutes |
| Early operational buffer | at least 90 minutes |
| Mature offline cap | approximately 8 hours |
| First incident | by minute 5 |
| First expedition departure | by minute 12–15 |
| Early visible expansion | every 20–30 active minutes |

These values exist to make a prototype falsifiable. They must live in a
central balance configuration rather than being copied into UI or content
records.

### Monetization and player-safety boundary

Monetization is excluded until the refuge loop, persistence, failure recovery,
and economy are demonstrably healthy.

Acceptable later candidates are resident outfit sets, room decoration packs,
whole-Hold visual themes, banners, Steward cosmetics, non-gameplay visual
effects, and an explicitly cosmetic Chronicle.

Do not sell residents, Facet points, operational resources, incident immunity,
instant construction, revival, expedition victory, relationship outcomes,
randomized loot, or pressure relief. The game should not manufacture
frustration that a purchase removes.

### Simulation and authority boundary

- The Roblox server owns resource changes, construction, resident assignment,
  incident resolution, expedition rewards, purchases, and save writes.
- The client owns presentation, selection, previews, local camera state, and
  optimistic feedback that can safely be corrected.
- Every client request is validated against server-known ownership, capacity,
  cost, state transition, rate, and request freshness.
- Offline advancement is deterministic from a saved snapshot and capped
  elapsed time; the client never supplies trusted elapsed time or rewards.
- Content definitions and balance configuration are versioned separately from
  save data. Migrations are explicit and testable.
- This planning space does not select a code owner. Implementation belongs in
  the owning game repository, never through an `external-locations/`
  read-through window.

### Principal risks

| Risk | Early mitigation |
|---|---|
| Clone perception | Lead with Soul Anchor layout, resonance, relationships, doctrines, and fail-forward consequences |
| Simulation opacity | Every modifier exposes source, magnitude, duration, and recovery action |
| Relationship combinatorics | Track only two or three significant directed bonds and use modular event templates |
| Timer grind | Short early timers; active decisions outperform waiting; no manual collection spam |
| Runaway failure | Throttle optional systems first and always expose a recovery contract |
| Content repetition | Prerequisites, variants, cooldowns, callbacks, and authored consequence tags |
| Mobile overload | Alert cap, filters, focus mode, consistent sheets, and progressive disclosure |
| Scope explosion | Prove command-layer refuge play before walking, tactical missions, multiplayer, or Seasons |
| Persistence exploits | Server authority, idempotent rewards, versioned snapshots, and replayable offline tests |
| Lore lock-in | Keep proper nouns and domain mappings replaceable until an owner promotes them |

## Surprises

- **The cutaway is information architecture, not merely art direction.** It
  succeeds only when a player can diagnose the Hold before opening detailed
  panels.
- **People are the durable content.** More rooms create capacity, but
  relationships, scars, loyalties, and expedition callbacks create memory.
- **Safe absence is a core mechanic.** A mobile return loop loses trust if the
  game can catastrophically punish a player who was not present to decide.
- **The strongest differentiation is moral legibility.** Efficiency versus
  personhood belongs in assignment previews and consequences, not only lore
  text.

## Decisions made

- **D1: Use “Soul Steel: Shardhold” as the working title.** It communicates
  shelter and Soul Steel without claiming a final product name.
- **D2: Build a solo-first command-layer management game.** Persistent shared
  ownership and embodied exploration follow only if the home loop proves fun.
- **D3: Make residents named people with directed relationships.** Recruitment
  uses rescue, migration, diplomacy, and apprenticeship; automated breeding is
  excluded.
- **D4: Use fail-forward default failure and safe offline simulation.** The
  standard save survives collapse and no lethal outcome resolves while absent.
- **D5: Automatically store routine production.** Player attention is spent on
  diagnosis and decisions, not tapping resource icons.
- **D6: Keep canon and monetization out of the prototype gate.** Both can be
  evaluated after the interaction and simulation spine is evidence-backed.

These are provisional product choices recorded by this report, not formal
serial decisions.

## Carry-forward

- `[CF-GDD-01]` Select the owning prototype and runtime repository — authority is
  intentionally unresolved in this planning-only pass.
- `[CF-GDD-02]` Build a live UX greybox for the cutaway, assignment, incident,
  and expedition-return flows — interaction risk precedes content volume.
- `[CF-GDD-03]` Implement a deterministic spreadsheet or headless simulation —
  resource and incident cadence must be measured before balance adoption.
- `[CF-GDD-04]` Test whether Aegis reads as a resource or should become a
  Stability meter — both models are plausible until players use them.
- `[CF-GDD-05]` Name and art-test the five Facets and core rooms — current terms
  favor clarity over canon.
- `[CF-GDD-06]` Run an IP-distinctiveness review before public production —
  structural inspiration must not become copied expression.
- `[CF-GDD-07]` Decide whether this planning space or the Soul Steel product
  space owns the long-lived GDD — this snapshot is useful without settling
  whole-IP authority.

## Verification evidence

| Gate | Method | Evidence |
|---|---|---|
| Reference loop is evidence-based | Compare launch and current first-party descriptions | [Bethesda launch release](https://www.prnewswire.com/news-releases/fallout-shelter-achieves-massive-global-success-debuts-at-1-on-app-store-300104755.html), [official App Store listing](https://apps.apple.com/us/app/fallout-shelter/id991153141) |
| Later features are not mistaken for the launch identity | Separate current quest/crafting/live-service layers | [Bethesda quest support](https://help.bethesda.net/app/answers/detail/a_id/34926/), [Bethesda crafting support](https://help.bethesda.net/app/answers/detail/a_id/34931/) |
| Offline behavior is treated as a bounded tuning question | Use official connectivity and collection guidance; do not invent an exact source-game cap | [Bethesda offline support](https://help.bethesda.net/app/answers/detail/a_id/42073/), [Mr. Handy support](https://help.bethesda.net/app/answers/detail/a_id/34989/) |
| Roblox persistence model has an implementation path | Keep persistent data server-side and validate client requests | [Roblox data stores](https://create.roblox.com/docs/cloud-services/data-stores), [Roblox client-server boundary](https://create.roblox.com/docs/scripting/security/client-server-boundary) |
| Scope is falsifiable | Counts, cadence, exclusions, and success observations are stated | “Vertical-slice content budget” and “Initial economy and cadence hypotheses” in this report |
| Runtime proof exists | Playable build and measured sessions | **Not yet performed** |
