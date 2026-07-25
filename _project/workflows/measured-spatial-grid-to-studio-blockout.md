---
title: "Measured spatial grid to Studio blockout"
status: active
updated: 2026-07-25
links:
  - { rel: references, target: workflows/concept-to-studio-architectural-build }
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
---

# Measured spatial grid to Studio blockout

> **Status:** active (2026-07-25)

## Purpose

Turn a proposed environment layout into one measured X/Z JSON contract, inspect that same
contract as a dimensioned 2D reference and a Command Center 3D spatial preview, and hand it to a
reversible Roblox Studio whitebox only after an explicit owner and target-place gate.

The JSON is the dimensional authority: one renderer unit equals one Roblox stud, north is `-Z`,
and boundaries, roads, sidewalks, and approaches are derived from declared measurements rather
than sampled from concept art. Renderer height is illustrative until a later build manifest
declares authoritative Y dimensions. Making this workflow active records the process in the
project space; it does not silently import, save, publish, upload, register, sync back, promote, or
commit a particular grid.

The first recorded implementation is the Hex City Center geometry revision 1 contract at
`apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json`, with a byte-identical
portable copy and derived reference images in `output/imagegen/hex-city-center-grid-2026-07-25/`.
Its project entity, owner/target record, and reversible Studio whitebox gates are true. Full Play
visual QA, save, publish, upload, registry, syncback, promotion, and commit gates remain false.

## Workflow

<!-- lanes: who acts; kind is one of human, ai, system, tool, neutral.
     steps: each needs a lane + label. Optional: status (done|active|pending|blocked|skipped)
     tints the card; detail shows on the card; note shows in the inspector when the step is
     clicked; to[] lists the next step id(s) ([] marks a terminal step); outputs lists files the
     step writes — "path" or { label, op } with op create|modify|delete (drawer shows +/~/−). -->
```json
{
  "caption": "A proposed layout becomes a validated stud-scale X/Z contract, reviewable 2D and 3D evidence, and an explicitly gated Studio whitebox.",
  "lanes": [
    { "id": "you", "label": "You", "kind": "human" },
    { "id": "together", "label": "You + agents", "kind": "neutral" },
    { "id": "agent", "label": "Spatial design agent", "kind": "ai" },
    { "id": "renderer", "label": "Grid + renderer tooling", "kind": "tool" },
    { "id": "project", "label": "Project System", "kind": "system" },
    { "id": "studio", "label": "Roblox Studio", "kind": "tool" }
  ],
  "steps": [
    {
      "id": "brief",
      "lane": "you",
      "label": "State the spatial intent",
      "detail": "Name the layout, player-scale goal, known dimensions, orientation, and what must remain conceptual",
      "note": "A visual reference may guide composition, but its pixels are never dimensional authority.",
      "to": ["spec"]
    },
    {
      "id": "spec",
      "lane": "agent",
      "label": "Author the measured X/Z contract",
      "detail": "Stud units, bounds, origin, north, grid cadence, geometric bands, approaches, annotations, and promotion gates",
      "note": "Use one machine-readable JSON source. Start every persistence and promotion gate false.",
      "outputs": [
        { "label": "<design-bundle>/<design-slug>-grid-spec.json", "op": "create" }
      ],
      "to": ["validate"]
    },
    {
      "id": "validate",
      "lane": "renderer",
      "label": "Validate schema, dimensions, and copies",
      "detail": "Require X/Z, north -Z, finite bounded geometry, consistent derived widths, aligned approaches, zero-width paint, and byte-identical portable JSON copies",
      "note": "Reject invalid input atomically so the last valid scene remains visible. A failed contract returns to authoring.",
      "to": ["reference", "spec"]
    },
    {
      "id": "reference",
      "lane": "agent",
      "label": "Render the measured 2D reference",
      "detail": "Grid, dimensions, legend, origin, compass, roads, sidewalks, and explicit measured-draft labeling",
      "outputs": [
        { "label": "<design-bundle>/<design-slug>-measured.svg", "op": "create" },
        { "label": "<design-bundle>/<design-slug>-measured.png", "op": "create" }
      ],
      "to": ["spatial"]
    },
    {
      "id": "spatial",
      "lane": "renderer",
      "label": "Inspect the same JSON in Spatial",
      "detail": "Perspective and orthographic top views, layer switches, unit readouts, geometry picking, and illustrative Y control",
      "note": "The Command Center loads local JSON for review; local loads are ephemeral and do not mutate Studio or project records.",
      "to": ["review"]
    },
    {
      "id": "review",
      "lane": "together",
      "label": "Review scale and circulation",
      "detail": "Confirm footprint, band widths, approach alignment, player scale, sightlines, and whether the contract answers the design question",
      "note": "Requesting changes returns to the JSON contract, not to manual edits of a derived image or 3D scene.",
      "to": ["revise", "record"]
    },
    {
      "id": "revise",
      "lane": "agent",
      "label": "Revise the authoritative JSON",
      "outputs": [
        { "label": "<design-bundle>/<design-slug>-grid-spec.json", "op": "modify" }
      ],
      "to": ["validate"]
    },
    {
      "id": "record",
      "lane": "project",
      "label": "Record the accepted measured draft",
      "detail": "Link the source bundle, verification evidence, authority statement, and still-open promotion gates",
      "note": "Create or update project entities only through Project System tooling. Any portable JSON copy must match the canonical contract byte for byte; refresh the generated graph, hub, and static Command Center afterward.",
      "outputs": [
        { "label": "<design-bundle>/README.md", "op": "modify" }
      ],
      "to": ["owner"]
    },
    {
      "id": "owner",
      "lane": "you",
      "label": "Choose owner, target place, and next state",
      "detail": "Keep the grid as measured design evidence, or authorize a named reversible Studio whitebox",
      "note": "No target project, TGL domain, place, or production path is inferred from the geometry alone.",
      "to": ["hold", "pipeline"]
    },
    {
      "id": "hold",
      "lane": "project",
      "label": "Retain measured-draft evidence",
      "detail": "The contract remains available for review without Studio mutation",
      "to": []
    },
    {
      "id": "pipeline",
      "lane": "project",
      "label": "Scaffold the owned build pipeline",
      "detail": "Use new-entity tooling; record target place, owned root, authoritative files, exit criteria, and promotion_authorized=false",
      "outputs": [
        { "label": "_project/pipeline/<design-slug>.md", "op": "create" }
      ],
      "to": ["studio"]
    },
    {
      "id": "studio",
      "lane": "studio",
      "label": "Build the reversible whitebox",
      "detail": "Construct measured Parts under a uniquely named owned root in Edit mode; use Play only for disposable traversal QA",
      "note": "Y dimensions become authoritative only when declared in the build manifest or pipeline. Do not save or publish without a separate authorization.",
      "outputs": [
        { "label": "Studio DataModel/<owned-root>/<design-slug>", "op": "create" }
      ],
      "to": ["verify"]
    },
    {
      "id": "verify",
      "lane": "together",
      "label": "Verify geometry and playability",
      "detail": "Measure hierarchy, footprint, anchoring, collision, traversal, sightlines, performance, and screenshots against the JSON contract",
      "to": ["promotion"]
    },
    {
      "id": "promotion",
      "lane": "you",
      "label": "Declare the next lifecycle state",
      "detail": "Remain a prototype, revise the contract, or separately authorize save, publish, upload, registry, syncback, and commit gates",
      "note": "Each gate is independent; completing this workflow never closes an unperformed gate.",
      "to": []
    }
  ]
}
```
