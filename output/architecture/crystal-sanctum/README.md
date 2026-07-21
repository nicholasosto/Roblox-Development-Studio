# Crystal Sanctum draft architectural bundle

Runtime-neutral section decomposition for the selected **C2H — Double Helix / As Above, So Below** direction.

This is a planning bundle, not the canonical Asset Studio owner and not a Roblox runtime asset. Stable `section_id` values should survive later migration. The selected visual reference is `../../imagegen/crystal-sanctum/crystal-sanctum-concept-c2h-double-helix-as-above-so-below.png`.

## Coordinate and measurement contract

- Origin `[0, 0, 0]` is the center of the equatorial oculus.
- `Y` is vertical; positive `Y` is the public Ascendant half and negative `Y` is the concealed Veiled half.
- `X` and `Z` form the equatorial plane. Arrival approaches from negative `Z`.
- `dimensions_studs` are provisional axis-aligned design envelopes, not measured construction drawings.
- A Roblox avatar is treated as roughly 6 studs tall. Typical occupied floors use 14-16 studs floor-to-floor.
- The full current landmark envelope is approximately 1,320 studs tall and 720 studs wide at the isle hinge.

## Material tokens

| Token | Design intent |
| --- | --- |
| `isle-stone` | Cold pale natural stone of the oldest Floating Isle |
| `spirit-opaline` | Opaque-to-translucent soul-resonant crystal body |
| `spirit-glass` | Clear pale crystal membrane for windows and barriers |
| `silver-rib` | Slender structural/conductor frame |
| `soul-light` | Cold cyan field light and visible current |
| `garden-living` | Restrained living planting and healing terraces |
| `gold-admin-trim` | Sparse Conclave administrative and tithe-route coding |
| `veil-violet` | Colder crystal used below the equator |
| `void-shadow` | Deep blue-violet recess and occlusion treatment |

## Section index

| ID | Role | Design job |
| --- | --- | --- |
| `ethereal-isle-site` | site | Establish the oldest Floating Isle, approaches, and skyline envelope |
| `equatorial-oculus` | mass | Form the civic hinge and open center between above and below |
| `pilgrim-threshold` | threshold | Receive public arrivals and reveal the complete axis |
| `ascendant-double-helix` | mass | Carry public, ceremonial, healing, and governmental programs upward |
| `veiled-double-helix` | mass | Mirror the upper capacity for administration, archives, and restricted work |
| `helix-strand-module` | detail | Define the repeatable inhabited curved segment used by all four strands |
| `resonance-bridge-chamber` | connector | Join paired strands at controlled phase intervals |
| `soul-crystal-axis` | detail | Anchor the resonance field and uninterrupted sacred void |
| `choir-of-confluence` | room | Hold mass ceremony and the Festival of the Veil |
| `gardens-of-still-air` | room | Provide healing, contemplation, and social relief |
| `hall-of-accord` | room | Seat diplomacy and Conclave governance |
| `archive-of-echoes` | room | Store knowledge in vibration-encoded crystal |
| `veiled-administration` | service | Run tuning, logistics, and restricted institutional records |
| `root-of-silence` | threshold | Terminate the descent and transfer toward the mountain-bound Sanctum/Maw route |

## Diagram contract

Five blueprint sheets were generated and visually inspected on 2026-07-20: three foundational system sheets and two room-scale studies. They are conceptual raster references, not measured CAD drawings or production Roblox assets. Section metadata and numeric records remain authoritative wherever illustrative geometry is simplified.

| Sheet | View and coverage | Resolution | SHA-256 |
| --- | --- | --- | --- |
| [`crystal-sanctum-master-vertical-section.png`](diagrams/crystal-sanctum-master-vertical-section.png) | Mirrored vertical section; `ascendant-double-helix`, `veiled-double-helix`, `equatorial-oculus`, and `soul-crystal-axis` | 1672 x 941 | `fcc7b95553db21eeb418d1ca51e2e377c8e2d33aae7fb1e0861e5f214640bba6` |
| [`crystal-sanctum-equatorial-oculus-plan.png`](diagrams/crystal-sanctum-equatorial-oculus-plan.png) | Equatorial plan; `equatorial-oculus`, cardinal courts, and four strand entries | 1672 x 941 | `099c6a6af56eea366b219f695e62a4ca0a763200d3a090dca3a6ce4730335a40` |
| [`crystal-sanctum-helix-strand-module-connection-detail.png`](diagrams/crystal-sanctum-helix-strand-module-connection-detail.png) | Exploded module and bridge connection detail; `helix-strand-module` and `resonance-bridge-chamber` | 1672 x 941 | `9376609e288acf8db77468d7c508e0346e23e94fe87557421507ecd837d637fc` |
| [`crystal-sanctum-choir-of-confluence-room-blueprint.png`](diagrams/crystal-sanctum-choir-of-confluence-room-blueprint.png) | Room plan, longitudinal section, and construction detail; `choir-of-confluence` | 1672 x 941 | `9cc68088d7f8c346b68d7cb9842afb8e1f313ab055cecf76b50e65e638fbb9ed` |
| [`crystal-sanctum-diplomacy-court-blueprint.png`](diagrams/crystal-sanctum-diplomacy-court-blueprint.png) | North-court plan, transverse section, and local circulation; supporting detail for `equatorial-oculus` | 1672 x 941 | `7265a3d09f904450d36838023116a78f8c59511e43d22841e40449700428e04f` |

### Operator approvals

- **2026-07-20:** the Choir of Confluence room design and Diplomacy Court subspace design were approved. This locks their spatial intent, circulation hierarchy, principal dimensions, and visual identity for subsequent diagram and manifest work. The approval does not reclassify either conceptual sheet as measured construction evidence or a production Roblox asset.

Future filenames should follow `crystal-sanctum-<section-id>-<view>.png` where one sheet belongs to one section. Shared master sheets may use a descriptive multi-section name. Every future view should use the common origin and 10-stud grid, with north arrow, avatar scale, material legend, and dimensions included where applicable. Every sheet must be labeled `conceptual` or `measured`.

These five sheets satisfy only the named partial view coverage. All 14 section records remain `draft` until their complete `required_views` sets are generated and checked against one another.
