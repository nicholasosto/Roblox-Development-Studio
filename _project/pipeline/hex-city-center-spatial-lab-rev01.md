---
title: "Hex City Center Spatial Lab REV01"
status: build
updated: 2026-07-25
links:
  - { rel: references, target: workflows/measured-spatial-grid-to-studio-blockout }
---

# Hex City Center Spatial Lab REV01

> **Status:** build (2026-07-25)

## Context

The accepted geometry revision 1 / appearance revision 1 contract is
`apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json`. The user
authorized a reversible visual whitebox in the already-open testing Studio, not a production
import or promotion.

Inspected Studio target before mutation:

- Studio instance: `Lab - Architecture`
- DataModel place name: `Place1`
- Place ID: `78520415943353`
- Universe ID: `6679100030`
- Creator ID: `3394700055`
- Required authoring mode: `Edit`
- Owned root: `Workspace.HexCityCenterSpatialLab_REV01`
- Local design origin `(0, 0)` maps to world `(512, 0, 0)` so the lab does not cover the
  existing spawn or teleport pad.
- Preserved Workspace roots: `Baseplate`, `Camera`, `SpawnLocation`, `TeleportPads`, and
  `Terrain`.

X/Z remains authoritative at one stud per JSON unit with north `-Z`. Y is declared only for
this readability pass: ground `0.00–0.10`, road `-0.02–0.14`, sidewalks `0.00–0.88`, and
core `0.00–1.35` studs above the baseplate datum. These heights are illustrative and do not
revise the X/Z contract.

Appearance uses only native fallback intent: Ground `#0A0D12`, Concrete core `#D4AF37`,
Concrete sidewalks `#44DDFF`, and Asphalt road `#5A6371`. The
`spatial-orientation-diagnostic_BLK.svg` remains viewer-only because no Roblox asset ID,
MaterialVariant, upload, or registry record is authorized.

## Build plan

1. Preflight Edit mode and refuse to overwrite an existing owned root.
2. Build the complete hierarchy unparented from exact JSON coordinates, using triangular
   `WedgePart` prisms rather than CSG, generated meshes, or stretched `MeshPart`s.
3. Audit the staged model, then parent it atomically as
   `Workspace.HexCityCenterSpatialLab_REV01`.
4. Frame and capture perspective plus north-up evidence in Studio.
5. If runtime inspection is useful, enter Play only as disposable QA and confirm the authored
   Edit root is restored unchanged after Stop.
6. Leave save, Save to File, publish, upload, registry, syncback, promotion, and commit gates
   false.

## Exit criteria

- One owned root with 465 descendants and 187 `BasePart`s: one ground `Part`, 12 core
  `WedgePart`s, 72 ring `WedgePart`s, 72 approach `WedgePart`s, and 30 non-physical
  plan-mark `Part`s.
- A top-face `SurfaceGui` draws 258 exact annotation lines for the 4 / 16 / 64-stud grid
  without adding collision geometry or requiring an uploaded texture.
- Core is 160 studs flat-to-flat; ring bands are 12 / 32 / 12 studs; the outer sidewalk is
  272 studs flat-to-flat and 314.078 studs point-to-point.
- Six approaches align to 30 / 90 / 150 / 210 / 270 / 330 degrees and each carries 32 studs
  of road plus 12-stud sidewalks on both sides.
- Every generated `BasePart` is anchored, non-colliding, non-touching, and script-free; no
  `MeshPart`, `PackageLink`, uploaded texture, or global Lighting mutation exists.
- Studio screenshots show readable material separation and the `+X` / `-Z` orientation.
- Play cloning preserves the complete hierarchy and Stop returns the same audited Edit root.
  Runtime visual capture remains a separate open check if the capture surface cannot display
  newly created `BasePart`s.
- `promotion_authorized=false`; no save, publish, upload, registry, syncback, promotion, or
  commit is reported.

## Implementation evidence

Completed in the inspected `Lab - Architecture` Studio session:

- Edit-mode build created `Workspace.HexCityCenterSpatialLab_REV01` at world origin
  `(512, 0, 0)` without replacing any existing root.
- Final Edit audit: 465 descendants, 187 anchored `BasePart`s, 156 `WedgePart`s, 31 ordinary
  `Part`s, 258 grid `Frame`s, three `BillboardGui`s, and three `TextLabel`s.
- Safety audit: zero unanchored/colliding/touching parts, scripts, `MeshPart`s, or
  `PackageLink`s. Existing `Baseplate`, `SpawnLocation`, and `TeleportPads` remain present.
- Perspective and plan captures show the measured layout, native material separation, grid
  cadence, and world-space orientation labels.
- A disposable Play clone reproduced all 465 descendants and 187 parts; client raycasts hit the
  ground, ring road, and sidewalks at their expected Y surfaces. The Studio MCP Play capture did
  not display any newly created `BasePart`, including a disposable 80-stud neon control probe, so
  runtime visual capture is recorded as inconclusive rather than passed.
- Stop returned Studio to Edit mode, removed the disposable control probe, and restored the same
  465-descendant / 187-part authored root.

Current gates: owner/target recorded and reversible Studio whitebox created. Full Play visual QA,
save, Save to File, publish, upload, registry, syncback, promotion, and commit remain false.
