# Soul Steel Crossroads — Curriculum Audit, Blockout, and Trim Plan

Date: 2026-07-24  
Status: local Edit-mode prototype; Play QA passed; not saved, published, uploaded, synced, or promoted

## Outcome

The open local copy of Roblox's **Environmental Art — Assemble an Asset Library** tutorial was inspected as a production reference, and its modular construction grammar was tested by building a reversible Soul Steel Crossroads blockout under:

`Workspace.SoulSteelCrossroadsCurriculumLab`

The result is a single open hexagonal commons with five traversable outbound routes, a centered north bus-ship landing pad, six visually defined sectors, perimeter gates, service modules, angular void fractures, and continuous simple collision shells. Every route and the landing pad passed an out-and-back Play traversal test with player health remaining at 100.

The original tutorial palette was left unchanged. The prototype remains selected and framed in the active Studio session.

## Session and authority boundary

| Item | Observed state |
| --- | --- |
| Active Studio session | `Environmental-Art-Assemble-an-Asset-Library.rbxl` |
| Local place identity | `game.PlaceId = 0`, `game.GameId = 0`, creator ID `0` |
| Intended source experience | Roblox tutorial experience `14447787049` |
| Tutorial evidence | Palette hierarchy, curriculum asset names, module dimensions, shared maps, and MaterialVariants |
| Owned mutation boundary | `Workspace.SoulSteelCrossroadsCurriculumLab` only |
| Original palette | `Workspace.Environment Art Curriculum Palette`, unchanged |
| Persistence and promotion | No save, publish, upload, syncback, registry update, or asset promotion |

Because the open file is a local copy with place ID `0`, this audit treats the supplied Roblox experience as its intended origin rather than claiming that the active session itself has an online identity.

## What the tutorial provides

### Library inventory

The tutorial palette contained 455 descendants:

| Class | Count | Role |
| --- | ---: | --- |
| `MeshPart` | 167 | Authored modular geometry and props |
| `SurfaceAppearance` | 134 | Shared PBR maps on UV-authored meshes |
| `Model` | 79 | Reusable module and prop assemblies |
| `Part` | 22 | Simple geometry, helpers, and collision-friendly forms |
| `MaterialVariant` | 15 | Broad reusable material fields |
| `Folder` | 11 | Palette organization |

The direct palette sections were `ExteriorPalette`, `InteriorPalette`, `PropsPalette`, `RocksPalette`, `VFXPalette`, `MaterialsPalette`, `Roblox Sign`, and `FloatingIsland`, plus empty foliage and lighting-fixture placeholders.

The 15 MaterialVariants included board-formed, ribbed, tie-hole, and tiled concrete; metal panels; glossy tiles; multiple moss families; plaster; and a default grid.

### Modular measurements and assembly grammar

The library exposes a strong grid contract rather than a collection of unrelated art pieces:

- Interior wall modules are 5 studs deep and 16 studs high, with 5-, 10-, and 15-stud widths.
- Exterior trim modules include 10-, 20-, and 40-stud lengths.
- A floor ramp occupies a 14-by-6-by-20-stud envelope.
- The 96-Part Greybox is overwhelmingly built on 5-stud increments.
- Wall modules separate wall, ceiling, floor, and crown geometry, allowing detail density to change without rebuilding the whole structure.
- Logical pivots sit at useful lower edges or corners, which makes snapping and rotation predictable.
- Detailed MeshParts are reused at authored scale; length changes come from choosing another module rather than non-uniformly stretching one.

The door is the notable functional exception: it contains the tutorial's only Script plus constraints and welds. It was intentionally not cloned into the Crossroads test.

### Materials, textures, and trim sheets

The tutorial demonstrates three distinct surface systems:

1. **MaterialVariants for broad fields.** Floors, walls, terrain, and large forms receive repeatable material identity without requiring uniquely UV-authored geometry.
2. **SurfaceAppearance for authored mesh detail.** The architectural MeshParts use UVs to address a shared texture atlas or trim sheet. The inspected core architecture shared the same color, normal, roughness, and metalness asset maps.
3. **Geometry and lighting for readable accents.** Recesses, caps, edge shapes, and sparse luminous details carry silhouette and hierarchy; the texture is not asked to manufacture the entire form.

No traditional `Texture` or `Decal` instances were found in the palette. That supports the important production distinction: a Part Texture can tile an entire image, but it cannot select one trim-sheet strip. Selecting a strip requires authored UVs on a MeshPart, with the sheet applied through SurfaceAppearance.

The current Roblox documentation supports the same separation:

- [Assemble an Asset Library](https://create.roblox.com/docs/tutorials/curriculums/environmental-art/assemble-an-asset-library)
- [Develop Polished Assets](https://create.roblox.com/docs/tutorials/curriculums/environmental-art/develop-polished-assets)
- [SurfaceAppearance](https://create.roblox.com/docs/art/modeling/surface-appearance)
- [Pivot tools](https://create.roblox.com/docs/studio/pivot-tools)

## What transfers well to Soul Steel

My assessment is that the curriculum is more useful as a **production grammar** than as a direct aesthetic source.

What transfers:

- a stable 5-stud modular grid;
- 10-, 20-, and 40-stud module families;
- separate broad material, trim, detail, and collision layers;
- exact-scale reuse of authored MeshParts;
- predictable pivots;
- shared PBR sheets across an entire kit;
- packages or nested packages once the kit is genuinely reusable;
- simple invisible collision geometry beneath visually rich modules.

What should not transfer directly:

- its moss-and-concrete art direction;
- its density of incidental set dressing;
- its particular doors and gameplay scripts;
- reliance on detailed visual meshes for traversal collision.

For Soul Steel, the broad forms should remain cool, sparse, angular, and void-adjacent. Cyan should identify routes, interfaces, and powered edges; violet should remain a rarer focal or liminal signal. The trim sheet should reinforce section boundaries and machinery, not become wallpaper.

## Crossroads blockout

### Spatial organization

The latest map concept was interpreted as one readable inner area:

- one open, stepped hexagonal commons;
- five 25-stud-wide routes: northeast, southeast, south, southwest, and northwest;
- one centered north bus-ship pad, distinct from the five world routes;
- six material-defined sectors rather than a brown or painterly ground treatment;
- six gates with at least 12.5 studs of head clearance;
- angular void plates and fracture lines outside the safe construction;
- two small landing-pad service modules;
- no internal maze or subdivided inner rooms.

Reference image:

[Crossroads blocking map v2 — hex, void cracks, and bus pad](/Users/nicholasosto/Master-Managed/Project-Spaces/Roblox-Development/Roblox-Development-Studio/output/imagegen/soul-steel-map-atlas-2026-07-24/03-soul-steel-crossroads-blocking-map-v2-hex-void-bus-pad.png)

### Construction summary

| Element | Implementation |
| --- | --- |
| Commons floor | 143 modular 10-stud tiles |
| Sector definition | Six cool grey, cyan-grey, and violet-grey tutorial MaterialVariants |
| Routes | Five runs built from exact-scale 20-stud curriculum modules plus curbs |
| Bus-ship pad | 70-by-100-stud north platform, 30-stud entry, guide stripes, beacons, and clearance ghost |
| Curriculum visual clones | 12 exterior trim modules, 6 rocks, and 2 crates |
| Collision | 14 invisible continuous simple Part shells |
| Total prototype geometry | 385 BaseParts, including 28 MeshParts |
| Scripts under owned root | 0 |
| Bounds | Approximately 376.9 by 25.7 by 376.9 studs |

All 385 BaseParts are anchored. The curriculum MeshParts were retained at authored scale and used as non-colliding visual detail.

### Canon boundary

The geometry is a lore-informed prototype, not a canonical map assignment. Route destinations are deliberately unassigned.

There is one visible tension to resolve: the map reference uses the north face for the bus-ship pad, while current Crossroads lore places the Blight Wastes north of the Crossroads. The cleanest reconciliation is to let the northwest route bend north beyond the immediate sightline, preserving both the centered pad composition and the larger northward topology. This should receive a lore review before route signage or destination-specific decoration is authored.

## Play QA and what it taught us

The first traversal exposed exactly the kind of issue the curriculum's layered construction is meant to prevent:

1. The player fell through a seam between adjacent visual modules on the northeast route.
2. Continuous simple collision shells were added beneath the visual modules.
3. A landing-pad return test then exposed two tilted collision shells caused by an incorrect orientation target.
4. Both shells were rebuilt world-up, and the entire owned root was audited for orientation.

Final Play QA:

| Test | Result |
| --- | --- |
| Northeast route out and back | Pass |
| Southeast route out and back | Pass |
| South route out and back | Pass |
| Southwest route out and back | Pass |
| Northwest route out and back | Pass |
| North bus pad to far stripes and back | Pass |
| Player health | 100 throughout |
| Prototype console errors | 0 |
| Static downward floor-ray checks | No holes on all six faces |
| 10-stud-wide clearance probes | No blockers |

Studio was returned to Edit mode after QA.

The practical lesson is strong: visual trim meshes and detailed floor modules should be free to optimize appearance, while continuous simple Parts own traversal collision.

## Custom trim-sheet readiness

### Vertical robotic trim sheet

Source:

[ancient-tech-vert-trim-01_BLK.png](/Users/nicholasosto/Master-Managed/Assets/textures/tileable/robotic/ancient-tech-vert-trim-01_BLK.png)

Measured contract:

[ancient-tech-vert-trim-01_BLK.trembus.md](/Users/nicholasosto/Master-Managed/Assets/textures/tileable/robotic/ancient-tech-vert-trim-01_BLK.trembus.md)

The sheet is 1024 by 1024 and repeats vertically. Its measured horizontal address ranges are:

| Strip | U range |
| --- | --- |
| Panel A | 0.010–0.220 |
| Light plate | 0.243–0.320 |
| Clamp | 0.348–0.463 |
| Circuit trace | 0.469–0.615 |
| Cyan conduit | 0.625–0.728 |
| Ribbed strip | 0.734–0.815 |
| Panel B | 0.818–0.988 |

This is currently a `_BLK`, albedo-only source. Matching normal, roughness, and metalness maps are absent at the master path, so it is appropriate for local UV and composition tests but not a final material promotion.

### Ancient-alien architecture PBR prototype

Layout contract:

[trim-sheet-layout.md](/Users/nicholasosto/Master-Managed/Project-Spaces/Asset-Studio/generation/runs/ancient-alien-architecture-trim-sheet/trim-sheet-layout.md)

Corrected revision:

[revision-brief-02.md](/Users/nicholasosto/Master-Managed/Project-Spaces/Asset-Studio/generation/runs/ancient-alien-architecture-trim-sheet/revision-brief-02.md)

BETA manifest:

[beta-map-manifest.json](/Users/nicholasosto/Master-Managed/Project-Spaces/Asset-Studio/generation/runs/ancient-alien-architecture-trim-sheet/pbr-prototype/beta-map-manifest.json)

The BETA set contains color, OpenGL normal, roughness, metalness, and emissive maps at 1024 by 1024. Corrected vertical bands are:

| Pixel band | Intended use |
| --- | --- |
| 0–336 | Obsidian anchor field |
| 336–512 | Stepped obsidian cap |
| 512–592 | Recessed groove |
| 592–800 | Iridium petal |
| 800–928 | Polished contact rail |
| 928–976 | Cyan conduit |
| 976–1024 | Black gasket |

The generated BETA maps are prototype evidence, not final assets. They are not registry-confirmed or uploaded. Previously observed ALPHA IDs also do not appear in the canonical upload registry or master asset-ID ledgers, so they should not be treated as available production assets.

## Trim placement plan

The broad surface and the trim should have separate jobs:

| Crossroads region | Broad field | Proposed trim carrier | Trim selection | Collision owner |
| --- | --- | --- | --- | --- |
| Commons wall field | MaterialVariant | Optional flat UV panel | Architecture anchor field | Simple Part shell |
| Wall crown | MaterialVariant | 5/10/20-stud crown MeshPart | Stepped obsidian cap | Wall shell |
| Gate jamb | MaterialVariant | Vertical jamb MeshPart | Panel, light-plate, or clamp U strips | Gate Part |
| Gate crown | MaterialVariant | Crown MeshPart | Cap plus recessed groove | Gate Part |
| Route curb | MaterialVariant | 10/20-stud curb skin | Groove or contact rail | Continuous route shell |
| Landing-pad rim | Metal-panel MaterialVariant | Rim MeshPart | Contact rail plus cyan conduit | Pad shell |
| Service-block rib | Plaster/metal field | Vertical rib MeshPart | Trace, conduit, or ribbed U strip | Service-block Part |
| Service-block crown | MaterialVariant | Crown MeshPart | Cap or contact rail | Service-block Part |

Rules for the first trim pass:

- Keep at least 4 pixels of padding inside each trim boundary.
- Author UVs in Blender; do not try to crop a trim strip with a Part Texture or Decal.
- Use white receiving MeshParts so the source color is not unintentionally multiplied.
- Treat emissive maps as masks and tint cyan at the material instance where supported.
- Preserve simple Part collision shells and set visual trim carriers non-colliding.
- Use exact 5-, 10-, and 20-stud carrier modules with deliberate lower-edge or corner pivots.
- Never non-uniformly stretch detailed carriers.
- Apply trim only to hierarchy-bearing surfaces: gate edges, route curbs, pad rails, crowns, service ribs, and a few powered interfaces.
- Keep the center floor visually quiet enough for traversal, gathering, and later gameplay readability.

The candidate mapping is also attached in Studio under:

`Workspace.SoulSteelCrossroadsCurriculumLab.TrimSheetCandidateIndex`

## Recommended next gated pass

1. Author a small carrier kit in Blender: gate jamb, gate crown, route curb, pad rim, and service rib.
2. Give each carrier a logical 5-stud-grid pivot and UV it to one measured trim region.
3. Export GLB and import into an isolated Studio material lab.
4. Apply local prototype maps and inspect seam padding, texel density, normal direction, roughness response, and cyan readability in Edit and Play.
5. Bring only the successful carrier modules into the owned Crossroads root, keeping collision on the existing simple shells.
6. After visual acceptance, run the separate upload, registry, `_FNL`, package, save, and publish gates with explicit authorization.

This sequence tests the real trim-sheet delivery path without implying that a local image, Studio import, or prototype map is already a canonical asset.

## Final prototype state

- `BuildStatus = "PlayQAPassed_TrimPlanAttached"`
- `PlayQA = "PASS: five routes plus north pad out-and-back; health 100; no prototype console errors"`
- `OriginalPaletteUntouched = true`
- `TrimSheetStatus = "CandidateSurfacesOnly_NotApplied"`
- `NoPublish = true`
- `NoUpload = true`
- `NoSync = true`
- `SavedByCodex = false`
- `PublishedByCodex = false`
- `UploadedByCodex = false`
- `SyncedByCodex = false`
