---
title: "Ancient Void Ship Arrival Environment"
status: design
updated: 2026-07-22
links:
  - { rel: references, target: workflows/concept-to-studio-architectural-build }
  - { rel: references, target: decisions/0009-soul-steel-universe-topology }
---

# Ancient Void Ship Arrival Environment

> **Status:** design (2026-07-22)

## Context

Soul Steel needs a production-oriented starting environment that immediately reads as an ancient alien spacecraft suspended in an interdimensional Void seam. The first slice must remain compact while exercising current architecture, tileable-material, trim-sheet, porthole, multi-level traversal, and local-lighting capabilities.

The live hub/start place is PlaceId `102596975485791` in universe `6679100030`. Its origin spawn and three direct-child teleport pads form the fixed integration kernel. The teleport-pad Parts must remain direct children of `Workspace.TeleportPads`; the ship is built around them rather than reparenting them.

The selected working direction is **Riftborne Atrium**: a canted, three-layer arrival chamber with a central spawn dais, a teleport flight deck, paired observation catwalks, a small sunken material-test bay, framed portholes, and a forward void oculus. It wins over a linear broken-keel corridor and a fully radial oculus dock because it preserves the current shell, gives the player a clear first read, and provides the most useful test surfaces per part.

This pipeline authorizes a reversible Edit-mode blockout only. The canonical implementation owner is the content-first `soul-steel-universe` repository. Asset promotion, Hub persistence, publish, download, Rojo syncback, and commit remain separate gates.

The runtime-neutral design contract and machine-readable manifest live in `output/architecture/ancient-void-ship-arrival-environment/`.

## Build plan

1. **Authority and shell audit** (done 2026-07-22): confirm the Hub/start place, canonical repository, Architecture Lab staging place, current spawn/pad coordinates, and direct-child pad binding.
2. **Concept comparison and selection** (done 2026-07-22): compare Riftborne Atrium, Broken Keel, and Oculus Dock as structural alternatives; select Riftborne Atrium for the reversible slice.
3. **Design contract and manifest** (done 2026-07-22): lock coordinates, assemblies, material tokens, local-light roles, budgets, preserved paths, asset states, QA views, and cleanup ownership.
4. **Edit-mode blockout** (done 2026-07-22 under explicit approval): built and refined transactionally under one owned root in the open Hub, preserving the existing spawn, teleport pads, global Lighting children, TGL PackageLink, and material-audit rigs. The prototype remains unsaved and unpublished.
5. **Visual, traversal, and cleanup QA** (done 2026-07-22): the first disposable Play pass exposed excessive cyan wash, so local-light intensity was balanced without changing fixture ranges or global Lighting. Avatar navigation then passed the pad approach, upper catwalk, intended ramp route into and out of the sunken bay, arrival dais, and oculus approach at full health. Client/server root audits and the console were clean. Back in Edit mode, owned-root removal/restoration proved the cleanup boundary while seven preserved Workspace roots, all three pads, and global Lighting remained unchanged.
6. **Void visual development** (direction studies done 2026-07-22): generated local interior, panoramic Void, and porthole/material studies. The panorama is not a cubemap. Six-face creation, seam testing, Asset Studio promotion, registration, and upload remain future gated work.
7. **Persistence handoff**: validate first in Lab - Architecture; then explicitly approve Hub install, save/publish, Download a Copy, Rojo dry-run/apply, diff, and commit.

## Exit criteria

- A reversible owned root contains a compact but high-production arrival chamber with at least three spatial layers, angled structure, framed portholes, and clear material-test surfaces.
- Spawn and all three existing teleport pads remain functional, readable, and in their authoritative hierarchy.
- PointLight and SurfaceLight are both used for their correct physical jobs; SpotLight is reserved for hard grazing accents. Total active local lights stay at or below 10, with at most two shadow casters.
- The design is legible from the spawn reveal, teleport deck, upper catwalk, sunken bay, and at least one porthole close-up.
- Ancient-tech tileables, trim-sheet PBR maps, and the new skybox are labeled with their real BLK/BETA/upload/registry state; no placeholder is represented as canonical.
- Edit-mode audit, Play traversal QA, and cleanup pass; global Lighting/Terrain state is unchanged unless a later skybox install explicitly authorizes it.
- Persistence, publish, syncback, commit, TGL republish, and production promotion are evidenced separately rather than inferred from the blockout.
