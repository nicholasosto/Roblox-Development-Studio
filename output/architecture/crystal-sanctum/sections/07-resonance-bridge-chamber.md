---
schema: trembus.architecture-section/v1
design: crystal-sanctum
section_id: resonance-bridge-chamber
title: Resonance Bridge Chamber
role: connector
status: draft
description: "Short enclosed bridge-rooms join the two phase-offset strands at controlled intervals and make the double helix socially inhabitable."
concept_ref: c2h-double-helix
required_views: [plan, section, elevation, connection-detail]
dimensions_studs: [72, 32, 28]
elevation_studs: 0
connects_to: [helix-strand-module, ascendant-double-helix, veiled-double-helix, soul-crystal-axis]
material_tokens: [spirit-glass, silver-rib, soul-light, gold-admin-trim]
asset_refs: []
---

# Resonance Bridge Chamber

Bridge length varies with helix phase, but occupied clear width and end-socket rules remain fixed. Bridges are destinations—small councils, pauses, tests, or overlooks—not generic corridors.

## Boundary / State / Relationship / Transition / Order

- **Boundary:** a threshold frame at each end makes leaving one strand and entering the other legible.
- **State:** the floor and inner membrane clarify when both destination sockets are in resonance.
- **Relationship:** each bridge binds paired strand programs and creates a readable rung in the double-helix silhouette.
- **Transition:** enter, pause within the axial view, then choose the opposite strand or return.
- **Order:** structural spine below, occupied chamber at center, light and conductor anchors above.

## Player path and sightlines

The central axis is visible without exposing players to an unguarded fall. The opposite doorway remains in view, and bridge interiors provide passing space for groups.

## Roblox translation

Use a scalable center span between two fixed end caps. Build the static chamber first; any appearing-floor or attunement effect is a later state layer with a solid accessible fallback.

## Diagram evidence

- Generated `connection-detail`: [`crystal-sanctum-helix-strand-module-connection-detail.png`](../diagrams/crystal-sanctum-helix-strand-module-connection-detail.png)
- Remaining required views: `plan`, `section`, `elevation`

The record remains `draft`; the sheet establishes the fixed end-cap and scalable center-span family but not every phase-dependent bridge length.

## Acceptance checks

- [ ] End caps connect to radial strand sockets without manual offsets.
- [ ] Clear width is at least 18 studs and clear height at least 16 studs.
- [ ] The Soul Crystal axis remains visible from the chamber center.
- [ ] Collision remains safe when visual transparency changes.
- [ ] Repeated bridges do not erase the open-air separation between strands.
