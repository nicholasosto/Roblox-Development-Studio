---
title: "Traversal Testing Utility BLK REV01"
status: build
updated: 2026-07-25
links:
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
---

# Traversal Testing Utility BLK REV01

> **Status:** build (2026-07-25)

## Context

The active `Lab - Architecture` experience needs a faster way to inspect measured environments
without turning a local testing aid into production movement code. The requested first slice
combines hold-to-sprint and opt-in flight with an immediately readable client HUD.

Inspected target before mutation:

- Studio: `Lab - Architecture`
- Place ID: `78520415943353`
- Universe ID: `6679100030`
- Creator ID: `3394700055`
- Required authoring mode: `Edit`
- Owned Studio root: `ReplicatedFirst.TrembusTraversalUtility_BLK`
- Preserved sibling: `ReplicatedFirst.Loading`

`StarterPlayer`, including `StarterPlayerScripts`, is a Rojo `$path` mount in
`soul-steel-universe/lab-architecture/default.project.json`. Studio-only additions there can be
removed by a later reconnect, so this reversible proof uses the currently unmounted
`ReplicatedFirst` service. It is a client-only local testing aid, not authoritative movement or an
anti-cheat boundary.

## Build plan

1. Refuse to build unless Studio is in Edit mode, the inspected Place ID still matches, the
   preserved loading GUI exists, and the owned root does not.
2. Create one `_BLK` folder containing a single LocalScript plus in-place manifest attributes.
3. Bind hold-Left-Shift sprint at explicit priority and consume that key while this utility is
   active so Roblox shift-lock does not also toggle. Do not change the place-wide
   `EnableMouseLockOption`; always restore the character's observed base `WalkSpeed`.
4. Treat two jump requests within 0.35 seconds, with the second request airborne, as flight entry.
   Use `LinearVelocity` and `AlignOrientation`, not deprecated body movers.
5. Generate a native bottom-right HUD at runtime with ready, armed, sprint, boost, flight, and
   unavailable states. No uploaded texture or external UI asset is required.
6. Clean constraints and character-scoped connections on landing, death, and respawn. Keep every
   ContextActionService bind/unbind symmetric.
7. Run disposable Play QA for normal walk, sprint press/release, flight entry, WASD steering,
   ascend, descend, boost, Q landing, death/respawn cleanup, HUD state, and console output.
8. Return to Edit mode and verify the authored root is unchanged. Do not save, publish, upload,
   register, sync back, promote, stage, or commit.

## Exit criteria

- One owned folder and one LocalScript; no Workspace, Lighting, Terrain, existing UI, or loading
  screen mutation.
- Sprint target is 28 studs/second and returns to the observed base speed after Shift release.
- Flight target is 64 studs/second, with 96-stud/second Shift boost; Space ascends, Left Control
  descends, and Q lands.
- Flight uses one runtime Attachment, LinearVelocity, and AlignOrientation on the current
  HumanoidRootPart, all removed on every exit path.
- HUD communicates the active state and control legend without covering Roblox's top-bar controls.
- Character respawn produces one clean utility instance with no ghost binds or constraints.
- Edit audit and disposable Play QA are reported independently.
- `promotion_authorized=false`; save, publish, upload, registry, syncback, promotion, staging, and
  commit remain false.

## Implementation evidence

Completed in the inspected `Lab - Architecture` Studio session:

- Edit build created exactly one owned root,
  `ReplicatedFirst.TrembusTraversalUtility_BLK`, containing one enabled LocalScript. The existing
  `ReplicatedFirst.Loading` sibling, empty `StarterPlayerScripts`, empty `StarterGui`, Workspace,
  Lighting, and Terrain were not changed.
- Runtime created exactly one `PlayerGui.TrembusTraversalHUD_BLK`. The native indicator rendered
  ready, sprint, armed, flight, and boost states with text plus color and a visible control legend.
- Real Left-Shift input changed the observed Humanoid `WalkSpeed` from 16 to 28 and restored 16 on
  release.
- Two distinct jump inputs inside the 0.35-second window entered flight while airborne. The
  current HumanoidRootPart received exactly one owned Attachment, LinearVelocity, and
  AlignOrientation; Humanoid state became `Physics` and `AutoRotate` became false.
- Flight QA passed 64-stud steering, 42-stud vertical rise target, 42-stud descent target with
  safe ground collision, and 96-stud Shift boost. Q removed all three owned constraints, unbound
  all three flight-only actions, restored `AutoRotate`, and restored 16 WalkSpeed.
- Death during flight removed the old character's flight state. Automatic respawn retained
  exactly one HUD, exactly two lifetime action bindings, zero flight bindings, zero owned
  constraints, 16 WalkSpeed, and zero utility audit failures.
- Console output contained only the expected utility transitions and existing shell/telemetry
  messages; no utility warning or error was emitted.
- Stop returned Studio to Edit mode. The authored root still had one descendant and the same
  29,786-character source; `HexCityCenterSpatialLab_REV01` remained present with 465 descendants.

Current gates: Edit build and disposable Play QA are complete. Save, Save to File, publish,
upload, registry, syncback, promotion, staging, and commit remain false.
