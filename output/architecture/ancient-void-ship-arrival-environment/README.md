# Ancient Void Ship Arrival Environment

Runtime-neutral design contract for the selected **Riftborne Atrium** direction. This bundle is planning evidence, not a published Roblox place, canonical asset registration, or lore-canon declaration.

## Thesis

**A quiet ancient machine holding one survivable bubble inside the Void.** The player awakens on a low arrival dais. Three teleport apertures sit one sightline ahead, while sloped ribs, partial decks, and framed portholes imply a vessel much larger than the playable room. The Void has structure but no ordinary horizon: distant scale is deliberately unreadable, with sparse cyan seams and violet fractures rather than a conventional starfield.

High production value comes from silhouette, layered depth, controlled lighting, and disciplined material contrast—not room count or prop density.

## Authority map

| Concern | Authority / state |
| --- | --- |
| Planning and manifest | This RDS bundle |
| Canonical game owner | `soul-steel-universe` (Studio-master, content-first) |
| Reversible staging target | Lab - Architecture, PlaceId `78520415943353` |
| Final starting-place target | Soul Steel Hub, PlaceId `102596975485791`, GameId `6679100030` |
| Live inspected session | Hub in Edit mode |
| Build authorization | Explicitly approved 2026-07-22 for `Workspace.SoulSteelVoidArrivalLab` in the open Hub, Edit mode only |
| Persistence / publish / syncback | Not implied; each remains a separate gate |
| Lore status | Speculative environmental prototype; no alien origin or spacecraft canon is asserted |

## Structural comparison

| Direction | Governing geometry | Strength | Cost / risk |
| --- | --- | --- | --- |
| **A — Riftborne Atrium (selected)** | Canted nave around the existing spawn and three-pad fan; paired upper wings and one sunken test bay | Best first-spawn read, clean pad integration, varied test surfaces in a compact envelope | Must keep side portholes and catwalks from visually crowding the center |
| B — Broken Keel | Asymmetric bent corridor with staggered decks along one damaged hull axis | Strongest drifting-vessel story and angular traversal | Weak fit to the current three-pad fan; less readable as a hub |
| C — Oculus Dock | Radial chamber around a large central void lens with three pad bays | Most alien and iconic in plan | Higher part count and less economical for a first slice |

Direction A is the constraint-driven reversible working selection. B and C remain useful expansion families, not discarded surface variants. Direction A now exists as a live, unsaved, reversible Hub prototype; it is not a persisted or published selection.

## Coordinate contract

- Origin `[0, 0, 0]` remains the current SpawnLocation center.
- Negative `Z` points toward the three teleport pads and aft threshold.
- Positive `Z` points toward the forward void oculus.
- `Y = 0` is the arrival/teleport deck datum.
- Design envelope: approximately `74 × 38 × 76` studs (`X × Y × Z`).
- Avatar reference: approximately 6 studs tall.

```text
TOP / PLAN (not measured art)

                    AFT  -Z
        [porthole]  [three teleport apertures]  [porthole]
        +-----------+----+----+-----------+
        | upper L   | flight  |   upper R |
        | catwalk   | deck    |   catwalk |
        |     ramp \|         |/ ramp     |
        |           [arrival dais]        |
        | material bay        | systems   |
        +--------[forward void oculus]----+
                    FORE  +Z
```

## Spatial layers

1. **Arrival / teleport deck (`Y 0`)** — spawn dais at origin, clear 8-stud walking lanes, and the three existing pads framed as apertures without reparenting them.
2. **Observation catwalks (`Y +10`)** — paired side wings reached by short primitive ramps, creating elevated viewpoints, cross-room silhouettes, and underside-lighting opportunities.
3. **Sunken material bay (`Y -6`)** — one small, open test alcove with a safe ramp, neutral material coupons, and hard grazing-light evaluation. It is deliberately not a second gameplay room.
4. **Hull crown (`Y +24` to `+32`)** — sloped ceiling plates, structural ribs, service spine, and light panels; mostly silhouette and occlusion rather than traversable floor.

## Architectural kit

- Primitive Parts and WedgeParts for scalable deck, ramp, wall, rib, and panel blockout.
- No non-uniform resizing of imported MeshParts; natural-size meshes must be repositioned or omitted.
- Side hull is assembled as plinth, vertical bays, and crown so portholes are actual openings rather than decals on a solid wall.
- Each porthole uses a glass membrane, segmented metallic frame, recessed reveal, and an exterior void vignette.
- Angles concentrate at ribs, ramps, bulkhead returns, and ceiling plates. Player floors stay legible and traversal-safe.
- Teleport pads and SpawnLocation remain outside the owned generated root and at their current authoritative paths.

## Lighting contract

| Role | Class | Count cap | Intent |
| --- | --- | ---: | --- |
| Ceiling / underside panels | SurfaceLight | 4 | Broad readable deck light and soft porthole spill; parent directly to BaseParts |
| Local machine cores | PointLight on Attachment | 4 | Small cyan practical pools at arrival and porthole/service nodes |
| Material grazers | SpotLight on Attachment | 2 | Hard low-angle reveals for roughness/normal response; the only shadow casters |

Total active local-light cap is **10**. Only the two hero SpotLights cast shadows. Brightness controls intensity; Range controls coverage. Neon/emissive trim feeds Bloom but does not count as environmental illumination and therefore never replaces these fixtures.

The current global `Sky`, `Atmosphere`, `Bloom`, and `SunRays` children are preserved during the blockout. SunRays should be disabled or removed only in a later explicitly authorized Void-lighting install; the blockout proves local lighting without changing global state.

## Transactional Studio install contract

The approved Edit-mode builder used the established two-root swap pattern rather than constructing directly into the final root:

1. Assert `RunService:IsRunning() == false` and verify the current PlaceId.
2. Refuse to replace any `Workspace.SoulSteelVoidArrivalLab` or `Workspace.SoulSteelVoidArrivalLab_Building` object that is not a `Model` carrying `GeneratedBy = "Codex"` and the matching `DesignId`.
3. Construct the complete candidate under `SoulSteelVoidArrivalLab_Building` with `BuildStatus = "Building"`.
4. Audit hierarchy, budgets, pad clearance, material tokens, and light parenting before changing the visible final root.
5. Remove only the previously owned final root, rename the candidate to `SoulSteelVoidArrivalLab`, set `BuildStatus = "Ready"`, and record a ChangeHistoryService waypoint.
6. Cleanup may remove the owned final and partial-build roots only. Because the prototype does not mutate global Lighting, Terrain, SpawnLocation, or TeleportPads, no speculative restoration writes are required.

The root contains only five owned folders: `Architecture`, `MaterialSurfaces`, `LightingRigs`, `VoidVignettes`, and `CameraPresets`. Camera presets are named `SpawnReveal`, `PadChamber`, `UpperCatwalk`, `MaterialBay`, `PortholeCloseup`, and `VoidOculus`; they are inert CFrame values for review rather than runtime camera scripts.

## Material and asset truth

| Candidate | Intended use | Current truth |
| --- | --- | --- |
| `ancient-tech-exterior-wall-{plinth,field,crown}-01_BLK.png` | Hull wall hierarchy | Canonical Assets, 1024², BLK, color-only, no upload-ledger row |
| `ancient-tech-{road,sidewalk,plaza}-01_BLK.png` | Deck, catwalk, dais | Canonical Assets, 1024², BLK, color-only, no upload-ledger row |
| Ancient-alien trim-sheet PBR prototype | Apertures, conduits, portal/porthole trim | Asset-Studio ignored BETA staging, 11/11 map audit, Studio-tested, not canonical or uploaded |
| Existing `soul-steel-01` skybox | Temporary global fallback only | Uploaded/checksum verified, but contains a gothic castle and red moon and is unsuitable for clean porthole views |
| Void panorama direction study | Color, scale, and negative-space reference | Generated locally; not a cubemap, not seam-tested, not registered, not uploaded |
| Proposed `soul-steel-interdimensional-void-01` cubemap | Final object-free Void exterior | Six faces not generated, not registered, not uploaded |

Until upload/registration exists, the Studio blockout uses named fallback materials and attributes that preserve the intended material token. It must not embed fragile in-memory EditableImage content as if durable.

## Live Edit-mode blockout evidence

The explicitly authorized prototype is currently present at `Workspace.SoulSteelVoidArrivalLab` in Soul Steel Hub PlaceId `102596975485791`. It remains unsaved and unpublished.

- 180 generated BaseParts, 0 MeshParts, 0 scripts, and 0 particle emitters.
- 4 SurfaceLights parented to carrier BaseParts, 4 PointLights parented to Attachments, and 2 SpotLights parented to Attachments.
- Exactly the two material-grazing SpotLights cast shadows.
- `Workspace.SpawnLocation` and all three direct-child `Workspace.TeleportPads` parts retain their original paths and transforms.
- Global `Lighting` properties and its existing `Sky`, `Atmosphere`, `Bloom`, and `SunRays` children were not changed.
- The open-rail refinement pass widened sightlines, expanded practical-light coverage, clarified porthole glass, and kept the prototype at the 180-part cap.
- A disposable Play pass exposed excessive cyan wash. The final `03-runtime-exposure-balance` pass retained fixture ranges and roles while lowering SurfaceLight brightness to `0.38`, PointLight brightness to `0.60–0.70`, and SpotLight brightness to `2.8`.

## Play and cleanup QA

The runtime test was disposable and made no scene mutations. Client and server both saw the complete 180-part, 10-light root with no scripts or particle emitters. Character navigation passed the arrival-to-pad approach, upper catwalk, intended multi-waypoint ramp descent into the material bay, ramp exit, arrival dais, and forward oculus approach; avatar health remained 100. The console contained only the Hub's normal shell and local telemetry boot notices, with no prototype error.

After returning to Edit mode, the owned root was removed, the preserved Workspace roots, all three teleport pads, and the global Lighting signature were checked, and the audited root clone was restored. The restored root retained `BuildStatus = Ready`, the final visual pass, 180 BaseParts, 10 correctly parented lights, and zero scripts, MeshParts, or particle emitters.

The pre-existing `Workspace.AncientAlienPortalMaterialLab` was deliberately preserved. Its audit signage and fixtures remain visible in some Hub review views and are not part of this prototype's owned hierarchy.

## Generated visual studies

The three local studies are documented in `output/imagegen/ancient-void-ship-arrival-environment/README.md`:

- `riftborne-atrium-interior-study.png` — overall spatial and lighting language.
- `interdimensional-void-panorama-study.png` — panoramic Void direction only; not a cubemap.
- `ancient-voidcraft-porthole-material-study.png` — aperture depth, hull layering, and grazing-light reference.

They are noncanonical design references. No image was uploaded, registered, installed in Studio, or promoted.

## Proposed skybox production brief

Canonical candidate path:

`Assets/textures/skybox/soul-steel-interdimensional-void-01/{up,dn,lf,rt,ft,bk}_BLK.png`

Requirements:

- Six seamless cube faces with edge continuity and no face-specific landmark that breaks at seams.
- No normal horizon, planet, castle, ship, typography, or dominant moon.
- Near-black blue-violet field with very sparse cold-cyan Veil seams and a few low-frequency translucent fractures.
- Ambiguous distance: some structures should read as either microscopic cracks or impossibly large filaments.
- Dark enough to preserve interior silhouettes and glass reflections; no baked bloom around every feature.
- Review as a stitched cubemap in Studio before any `_FNL`, upload, or ledger action.

## Review views and acceptance checks

1. **Spawn reveal** — all three pads and the aft threshold are immediately readable without the player seeing an empty baseplate.
2. **Pad chamber** — every pad keeps its trigger clearance and direct-child hierarchy.
3. **Upper catwalk** — the room gains a second scale read without becoming a maze.
4. **Sunken material bay** — ramp is traversable and hard grazing light reveals roughness/normal differences.
5. **Porthole close-up** — frame, glass, recess, and exterior depth read as a hull opening.
6. **Void oculus** — no conventional skyline/horizon; exterior supports the interior rather than becoming the focal clutter.
7. **Performance** — at most 180 generated BaseParts, 10 active local lights, 2 shadow casters, 0 particle emitters, and 0 scripts in the prototype root.
8. **Cleanup** — deleting the owned root restores the pre-build scene; global Lighting, Terrain, TGL, SpawnLocation, TeleportPads, and material-audit rigs remain unchanged.

## Persistence handoff

The current evidence stops at an explicitly approved, unsaved Hub Edit-mode blockout plus local image studies. Any persistence handoff remains: approve save/publish → save or publish → Download a Copy → Rojo syncback dry-run/apply → diff → commit. No earlier step proves a later one.
