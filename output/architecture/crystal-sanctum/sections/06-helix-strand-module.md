---
schema: trembus.architecture-section/v1
design: crystal-sanctum
section_id: helix-strand-module
title: Helix Strand Module
role: detail
status: draft
description: "A repeatable curved inhabited bay supplies floors, facade, structure, services, and connection anchors for all four helix strands."
concept_ref: c2h-double-helix
required_views: [plan, section, axonometric, connection-detail]
dimensions_studs: [56, 72, 48]
elevation_studs: 0
connects_to: [ascendant-double-helix, veiled-double-helix, resonance-bridge-chamber]
material_tokens: [spirit-opaline, spirit-glass, silver-rib, soul-light, veil-violet, gold-admin-trim]
asset_refs: []
---

# Helix Strand Module

One module is provisionally a 15-degree arc bay. It supports four occupied floors plus a service plenum and exterior rib anchors.

## Boundary / State / Relationship / Transition / Order

- **Boundary:** two primary ribs define the bay; facade and floor infill can vary without changing the connection contract.
- **State:** public and veiled variants swap material and room inserts while preserving transforms and clearances.
- **Relationship:** standardized tangential sockets connect neighboring bays; radial sockets accept bridge-chambers and room pods.
- **Transition:** floor plates step or slope by a constant rise across the bay.
- **Order:** structure, circulation, rooms, services, then facade layer from inside to outside.

## Player path and sightlines

Window rhythm and inner-void openings provide frequent orientation. Columns must not create a slalom along the principal circulation line.

## Roblox translation

Prototype with grouped Parts: floor plates, two ribs, inner guard, outer facade frame, window membrane, ceiling/service strip, and named attachments at both arc ends and the radial bridge socket. Pivot belongs at the central-angle datum for deterministic rotation.

## Diagram evidence

- Generated `connection-detail`: [`crystal-sanctum-helix-strand-module-connection-detail.png`](../diagrams/crystal-sanctum-helix-strand-module-connection-detail.png)
- The same sheet includes a conceptual four-floor-band cross-section.
- Remaining required views: `plan`, dedicated `section`, `axonometric`

The record remains `draft`; socket names and dimensions must be proven in the Roblox blockout before this becomes a measured module contract.

## Acceptance checks

- [ ] Adjacent modules join without floor lips, light leaks, or collision seams.
- [ ] Four 14-16 stud floor bands fit within the 72-stud height.
- [ ] Tangential and radial attachment names remain stable across variants.
- [ ] Public and veiled versions share identical bounding boxes and pivots.
- [ ] A primitive-only module can prove traversal before custom meshes exist.
