# Generation Specs

Runtime: built-in image generation through the Trembus raster workflow.

Preset: `raster-default`

Delivery: opaque PNG underlays, wide 16:9 requested in prompt, no in-image typography. Exact labels and planning overlays were added afterward as accessible vector/HTML annotations.

No Finder/xattr metadata was applied because the set is preview-only and not routed into the shared asset library.

## World atlas underlay

```text
Use case: infographic-diagram
Asset type: wide production map underlay for a Soul Steel world atlas
Primary request: a text-free, strictly top-down orthographic cyber-gothic world map with one central hub and exactly five radial domain spokes, designed for precise labels to be overlaid later
Scene/background: a dark engraved metal-and-vellum cartographic plate, restrained wear, thin luminous circuitry, subtle Void fractures only at the outer boundary
Subject: central warm sandstone fortified circular Crossroads settlement; exactly five isolated branching terrain corridors radiating from it with NO cross-connections: (1) crimson wetland flowing into bone-white wastes then a black-red corrupted swamp; (2) grey-green blight plain descending into bioluminescent fungal caverns then bone-tree rot gardens; (3) blue-white ethereal highlands descending through a crystal cave sanctum then rising to floating islands; (4) matte-steel forge citadel descending into automated mines then opening into a precise chrome grid city; (5) scarred mixed-energy shattered fields leading to a hidden neutral sanctuary
Style/medium: premium dark fantasy game cartography; cyber-gothic; religious ornament applied to industrial machinery; etched contour lines, architectural plan marks, readable terrain silhouettes; polished raster illustration
Composition/framing: wide 16:9 plate, hub centered, five spokes evenly separated, generous clear areas around every zone for later typography, strong hierarchy from hub to outer zones
Lighting/mood: measured, solemn, restrained; warm amber at the hub, domain colors localized, cool cyan route accents
Constraints: exactly five spokes; the hub is the only junction; no sixth Void domain; no extra settlements; no people; no characters; no letters, words, numerals, symbols pretending to be text, logos, trademarks, or watermark
Avoid: parchment-fantasy whimsy, bright saturation, generic medieval kingdoms, photoreal satellite terrain, clutter, decorative text, gore, toy-like Roblox styling
```

## Crossroads underlay (v1 source)

```text
Use case: stylized-concept
Asset type: wide top-down game environment map underlay for a Crossroads hub drill-down
Primary request: a text-free, highly legible orthographic plan of the Soul Steel Crossroads, a fortified neutral settlement built where exactly five domain paths converge
Scene/background: warm sandstone settlement on dark neutral ground, old pre-Sundering masonry, utilitarian timber market stalls, iron lanterns with steady amber light; surrounding terrain begins to change gradually outside each gate
Subject: one large circular Central Plaza at the exact center; a monumental Soul Anchor shrine in the plaza; Remnant Hall on the inner ring; a practical vendor market ring; blacksmith/workshop edge; old defensive wall; exactly five broad radial gate aprons leading outward to biome previews
Style/medium: premium cyber-gothic game cartography and architectural blocking plan, dark fantasy with industrial ritual details, top-down illustrated map, modelable Roblox-scale geometry, clean readable routes
Composition/framing: wide 16:9, settlement dominates the canvas, circular concentric layout, exact five-way radial structure with lived-in stall variation, ample clear ground near landmarks for later labels and sub-map boxes
Constraints: exactly five gates and five outgoing paths; central plaza remains open and readable; no characters; no combat; no letters, words, numerals, pseudo-text, logos, trademarks, or watermark
Avoid: generic medieval village, bright fantasy market, whimsical style, dense roofs that hide walkable areas, dramatic perspective, gore, toy-like Roblox styling
```

Correction applied after inspection:

```text
Remove the extra vertical gate and outgoing road at 12 o'clock, close that opening with the same old sandstone defensive wall, continue the market ring through that sector, and preserve exactly the five other gates.
```

## Crossroads v2 hex, fracture, and transport-pad edit

The v1 image above was used as the edit input. The built-in image editor
preserved its 1672×941 dimensions.

```text
Use case: precise-object-edit
Asset type: Soul Steel top-down environment blocking-map base for game level design
Primary request: Precisely revise the supplied Crossroads map into a strong six-sided hexagonal fortress while preserving its identity, top-down composition, scale, materials, and five canonical travel spokes.

Geometry and circulation:
- Rebuild the circular outer wall, market ring, inner defensive ring, and central plaza into a clearly readable concentric hexagonal plan with six straight faces and beveled corners; it should look modelable from modular Roblox environment pieces, not like a perfect abstract symbol.
- Preserve exactly five and only five broad outbound gate roads: upper-left, upper-right, lower-right, bottom, and lower-left. Each must remain visibly open and connect into the center.
- The sixth face is the north/top face. It must not be another road, gate, portal, or domain spoke.

Transport landing pad:
- Replace the closed top market-wall segment with a large elevated hexagonal landing apron integrated into the fortress wall.
- Put one compact bus-style passenger/cargo spaceship on the pad: an elongated armored shuttle with a broad cabin, small cockpit, side portholes, landing struts, rear thrusters, a lowered passenger/cargo ramp, nested dark-metal armor, cyan edge lighting, and one restrained violet energy core.
- The ship and pad are civic transport infrastructure, not a warship, portal, or sixth route. Connect the pad inward to the market ring by a short controlled ramp/checkpoint only.
- Include landing chevrons, docking pylons, service conduits, and a readable safety perimeter through shape/material contrast, but no written words, numbers, symbols, logos, or UI labels.

Void-fractured terrain:
- Significantly increase the cracked and missing terrain outside the fortress on all sides: branching black fissures, lifted/broken plates, small abyssal gaps, and several larger fracture fields.
- Use restrained cyan and violet light deep inside the fissures, with dark vapor and subtle spatial distortion. Let a few hairline fractures creep beneath outer-wall foundations while keeping the inhabited inner hexagon stable, traversable, warm, and readable.
- Preserve the five surrounding domain color regions and weave the cracks through them as shared Sundering scars.

Invariants:
- Preserve the near-orthographic overhead camera, wide 16:9 framing, amber lantern light, weathered sandstone/brass/iron construction, dense cyber-gothic market detail, central anchor monument, five domain-adjacent environmental color zones, and premium painterly 3D map-concept finish.
- Keep the center clear and the five roads legible for submap planning.
- No characters, labels, title, watermark, or compass rose.

Avoid: circular fortress silhouette; six outbound roads; sixth domain gate; oversized battleship; modern Earth bus styling; neon overload; blue wash; obscured road connections; isometric camera drift; cropped outer terrain.
```

## Crossroads v3 single-commons simplification

The v2 detailed hex image was used as the edit input. The built-in image editor
preserved its 1672×941 dimensions.

```text
Use case: precise-object-edit
Asset type: Soul Steel top-down environment blocking-map base for Roblox level design
Primary request: Simplify the supplied hexagonal Crossroads map so the entire inhabited interior reads as one open inner area, with a cooler palette, crisp large sections, and far less painterly/grainy building clutter.

Interior simplification:
- Keep the main outer hexagonal fortress wall, but remove every nested inner wall, concentric market wall, ring corridor, fenced wedge, and secondary courtyard inside it.
- From the outer wall inward, create exactly one broad, uninterrupted hexagonal civic commons. It is one traversable floor plane with no enclosed sub-rings.
- Preserve the Soul Anchor monument at the exact center, but make it compact and surround it with generous clear space.
- Reduce tiny houses, tents, roofs, stalls, crates, and decorative clutter by roughly 80 percent. Replace them with only five or six large, low-profile, clean modular service blocks against the inside edge of the outer wall.
- Keep the center and all five gate approaches open. The service blocks should read as deliberate massing for Remnant Hall, market/forge, embassy/services, and utilities—not as dozens of grainy houses.

Defined sections without extra rooms:
- Divide the single open commons visually into six large, crisp floor sectors using broad material changes, straight expansion joints, inset metal bands, low curbs, and subtle desaturated accent lighting.
- Do not divide the sectors with walls or dense buildings.
- Five sectors align clearly with the five outbound gate roads. The sixth north sector aligns only with the transport-pad checkpoint.
- Make every gate corridor wide, straight, visually distinct, readable at thumbnail scale, and modelable from simple Roblox parts.

Palette and rendering:
- Make the hub much less brown. Use cool ash-grey flagstone, pale bone stone, desaturated blue-grey concrete, charcoal basalt, blackened iron, and brushed steel as the dominant materials.
- Keep warm amber only as sparse fixture light and small navigation accents. Retain restrained cyan edge light and a small violet energy accent on the shuttle.
- Shift from painterly fantasy-map rendering to a clean, sharp, production-friendly top-down 3D environment blockout/concept render: crisp edges, smooth large material fields, restrained wear, even lighting, clear silhouettes, and low visual noise.
- Remove grain, stippling, muddy microtexture, overly ornate masonry, dense roof patterns, and impressionistic detail.

Invariants:
- Preserve the near-orthographic overhead camera, wide 16:9 crop, six-sided outer fortress, and exactly five outbound gate roads at upper-left, upper-right, lower-right, bottom, and lower-left.
- Preserve the north elevated bus-style passenger/cargo spaceship landing pad, compact armored shuttle, portholes, lowered ramp, docking pylons, and short inward checkpoint connection. The pad is not a sixth outbound road.
- Preserve the surrounding five domain-adjacent terrain color regions and the cyan/violet Void-cracked perimeter outside the walls.
- Preserve broad readability for later map labels.
- No characters, text, numerals, logos, UI labels, watermark, or compass.

Avoid: multiple inner rings; circular inner plaza walls; dense settlements; tiny grainy houses; rows of tents; brown-dominant palette; painterly noise; high-frequency rubble everywhere; six outbound roads; a sixth domain gate; removing the shuttle; covering the Void fractures; isometric camera drift; cropped roads.
```

## Steel City / Grid District underlay

```text
Use case: stylized-concept
Asset type: wide top-down game environment map underlay for a Steel City / Grid District drill-down
Primary request: a text-free orthographic plan of the Grid District inside Steel City, with a single readable progression route from the district entrance through three escalating precincts to the Central Processor
Scene/background: cyber-gothic technocratic city in matte steel, chrome, concrete, rain-dark service alleys, precise blue-white civic lighting, sparse orange forge sparks; the city is mathematically ordered but its edge contains a tolerated noir shadow economy
Subject: at the lower-left edge, a clearly identifiable Grid Entrance and compact Roguex contraband depot with loading bay, S-curving conveyor lane, catwalks and vault; beyond it a broad Outer Grid of modular boulevards and security-grid corridors; at center a massive multi-level Transit Hub where rail lines converge; at the far upper-right a monumental circular Central Processor complex with concentric data conduits and a clean boss-chamber silhouette; peripheral Bazaar stalls, Maintenance Tunnel access points, Signal Towers and a Scrap Heap are present but do not obscure the main route
Style/medium: premium cyber-gothic game cartography, top-down architectural illustration, industrial realism, religious ornament applied to secular machinery, modelable Roblox-scale modular forms
Composition/framing: wide 16:9, one strong diagonal progression from entrance to processor, three precincts visually distinct, generous clear areas for later labels, grid and transit lines readable at a glance
Constraints: no people or characters; no letters, words, numerals, pseudo-text, logos, trademarks, or watermark; do not make the whole district a chaotic cyberpunk slum; keep the Central Processor circular and the main route unambiguous
Avoid: neon overload, bright toy-like sci-fi, dense roof clutter hiding traversal, dramatic perspective, floating buildings, medieval streets, gore
```
