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
3. Bind hold-Shift sprint without stealing the key from lower-priority systems; always restore the
   character's observed base `WalkSpeed`.
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
