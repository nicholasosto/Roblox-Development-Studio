# Hex City Center Roblox Unit Grid

Measured draft and reference implementation for the active project workflow
[`measured-spatial-grid-to-studio-blockout`](../../../_project/workflows/measured-spatial-grid-to-studio-blockout.md).
The process is now an official project-space planning artifact and has an isolated reversible
Studio whitebox; the grid remains measured-draft evidence rather than a saved, published, or
promoted runtime asset.

## Dimensional authority

- `apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json` is the sole
  machine-readable geometry authority.
- `hex-city-center-grid-spec.json` is a byte-identical portable copy of that contract.
- `hex-city-center-grid-measured-draft.svg` is a dimensioned vector view derived from the JSON.
- `hex-city-center-grid-measured-draft.png` is the convenient visual export derived from the SVG.
- The separately generated concept raster is palette/composition reference only. Do not measure its pixels.
- The optional `trembus.spatial-appearance/v1` block is viewer intent, independently versioned
  from geometry. Its bundled `_BLK` orientation diagnostic and Roblox material names do not prove
  uploaded assets, MaterialVariants, Studio application, or promotion.

## Current measured dimensions

The geometry remains revision 1. Appearance revision 1 adds a 16-stud viewer-only orientation
diagnostic to road top faces; it does not change dimensions or the derived REV 01 imagery.

| Element | Roblox studs |
| --- | ---: |
| Civic/buildable core | 160 flat-to-flat |
| Inner sidewalk | 12 edge-normal width |
| Two-way ring road | 32 total; 16 per lane |
| Outer sidewalk | 12 edge-normal width |
| Overall hex | 272 flat-to-flat; 314.079 point-to-point |
| Each approach | 32 road + 12 sidewalk per side |
| Drafting grid | 4 minor; 16 major; 64 super |
| Visible plan window | 512 × 512 |

The plan is centered at world origin. Image right is `+X`, image down is `+Z`, and north is `-Z`. The Roblox `Y` axis is intentionally not represented.

The geometry uses regular-hex apothems, so sidewalk and road widths are true perpendicular offsets from each edge. White boundary strokes, lane paint, and crosswalk paint are annotations and add no physical width.

## Current authority gates

This bundle is represented by the active `_project/` workflow above. The exact owner/place target
has been recorded and an Edit-mode whitebox now exists at
`Workspace.HexCityCenterSpatialLab_REV01` in the inspected Studio session.

The authored root passed Edit visual and structural audits. A disposable Play clone reproduced
the complete hierarchy and raycast surfaces, but the Studio MCP Play capture failed to display
both the lab parts and a newly created neon control part. Full Play visual QA therefore remains
open.

The place has not been saved, saved to file, published, uploaded, registered, synced back,
promoted, or committed. Each remains a separate action and authorization boundary.
