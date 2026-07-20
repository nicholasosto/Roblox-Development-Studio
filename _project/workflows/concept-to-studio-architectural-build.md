---
title: "Concept-to-Studio architectural build"
status: draft
updated: 2026-07-20
links:
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
  - { rel: references, target: workflows/ui-component-promotion }
---

# Concept-to-Studio architectural build

> **Status:** draft (2026-07-20)

## Purpose

Turn a user-authored architectural seed into a reviewed, runtime-neutral, manifest-driven Roblox Studio blockout. Every run keeps three genuinely different visual directions, per-section design records and diagrams, asset provenance, Studio verification evidence, and an explicit owner/promotion gate; concept art and local `BLK` proof never imply a production upload.

## Workflow

<!-- lanes: who acts; kind is one of human, ai, system, tool, neutral.
     steps: each needs a lane + label. Optional: status (done|active|pending|blocked|skipped)
     tints the card; detail shows on the card; note shows in the inspector when the step is
     clicked; to[] lists the next step id(s) ([] marks a terminal step); outputs lists files the
     step writes — "path" or { label, op } with op create|modify|delete (drawer shows +/~/−). -->
```json
{
  "caption": "A seed concept becomes a selected architectural system, constructible Roblox manifest, and verified Edit-mode Studio blockout.",
  "lanes": [
    { "id": "you", "label": "You", "kind": "human" },
    { "id": "together", "label": "You + agents", "kind": "neutral" },
    { "id": "visual", "label": "Visual development", "kind": "ai" },
    { "id": "assets", "label": "Asset + manifest tooling", "kind": "tool" },
    { "id": "studio", "label": "Roblox Studio MCP", "kind": "tool" }
  ],
  "steps": [
    { "id": "seed", "lane": "you", "label": "State the seed concept", "status": "active", "detail": "Intent, fantasy, essential experience, and any non-negotiable image or spatial idea", "note": "The seed may be rough. Do not ask it to solve dimensions, materials, or Roblox implementation yet.", "to": ["refine"] },
    { "id": "refine", "lane": "together", "label": "Refine the design contract", "status": "pending", "detail": "Users, site, scale, parti, rooms, connectors, mood, constraints, and success criteria", "note": "Create one pipeline entity for the run and one canonical creative bundle. Keep the concept runtime-neutral until the owner gate.", "outputs": [{ "label": "_project/pipeline/<design-slug>.md", "op": "create" }, { "label": "Assets/models/<category>/<design-slug>/README.md", "op": "create" }], "to": ["variants"] },
    { "id": "variants", "lane": "visual", "label": "Generate three distinct concepts", "status": "pending", "detail": "A / B / C vary governing parti, mass-to-void relationship, circulation, and structural expression", "note": "They must not be palette swaps. Shared brief constraints remain fixed so the comparison is meaningful.", "outputs": [{ "label": "<design-slug>-concept-a.png", "op": "create" }, { "label": "<design-slug>-concept-b.png", "op": "create" }, { "label": "<design-slug>-concept-c.png", "op": "create" }], "to": ["select"] },
    { "id": "select", "lane": "you", "label": "Select or synthesize a direction", "status": "pending", "detail": "Approve one direction or explicitly combine named features", "note": "Reject returns to refinement. No section diagrams or build manifest are produced before this gate closes.", "to": ["sections", "refine"] },
    { "id": "sections", "lane": "together", "label": "Decompose into unique sections", "status": "pending", "detail": "Site, exterior masses, rooms, connectors, thresholds, service zones, and exceptional details", "note": "Each section receives a frontmatter Markdown record with stable IDs, dimensions in studs, adjacency, materials, asset references, and acceptance checks.", "outputs": [{ "label": "sections/<nn>-<section-slug>.md", "op": "create" }], "to": ["diagrams"] },
    { "id": "diagrams", "lane": "visual", "label": "Draw architectural diagrams", "status": "pending", "detail": "Only the views each section needs: plan, section, elevation, axonometric, circulation, or connection detail", "note": "Use a consistent grid, orientation, player scale, diagram legend, and conceptual-versus-measured label.", "outputs": [{ "label": "diagrams/<design-slug>-<section-slug>-<view>.png", "op": "create" }], "to": ["manifest"] },
    { "id": "manifest", "lane": "assets", "label": "Compile the Roblox build manifest", "status": "pending", "detail": "Stud grid, assemblies, Parts, materials, assets, connectors, lighting, budgets, tags, and build order", "note": "Separate existing registered assets, local-only assets, generated candidates, primitives, and placeholders. Built-in Roblox materials are preferred before custom assets.", "outputs": [{ "label": "roblox-build-manifest.json", "op": "create" }, { "label": "manifest.json", "op": "modify" }], "to": ["owner"] },
    { "id": "owner", "lane": "you", "label": "Choose owner and target place", "status": "pending", "detail": "Project, TGL domain, target experience, staging root, and intended runtime handoff", "note": "Only this gate authorizes project-specific paths or TGL names. Room, corridor, and zone candidates map to LAY_ROM, LAY_COR, and LAY_ZON after ownership is selected.", "to": ["asset-audit"] },
    { "id": "asset-audit", "lane": "assets", "label": "Resolve asset readiness", "status": "pending", "detail": "Exact path, registry state, checksum, TGL name/status, and fallback for every non-primitive dependency", "note": "Support art has no runtime suffix. Runtime candidates default to BLK; BLK is local proof and is not upload-ready.", "to": ["preflight"] },
    { "id": "preflight", "lane": "studio", "label": "Preflight the selected Studio", "status": "pending", "detail": "get state → list Studios → confirm/set active → require Edit DataModel → inspect staging root", "note": "Write a concise GenerationManifest with bundle path/hash, selected concept, BLK status, builder version, and promotion_authorized=false.", "to": ["build"] },
    { "id": "build", "lane": "studio", "label": "Build from the manifest", "status": "pending", "detail": "Deterministic Parts and assemblies first; insert exact assets; generate only scoped missing candidates", "note": "Persist only in Edit mode. Build reversibly under an owned lab root; do not mutate an unrelated place or source lab.", "outputs": [{ "label": "Studio DataModel/<owned-lab-root>/<design-slug>", "op": "create" }], "to": ["verify"] },
    { "id": "verify", "lane": "together", "label": "Verify architecture and playability", "status": "pending", "detail": "Hierarchy, anchoring, collision, traversal, sightlines, scale, materials, missing assets, budgets, and screenshots", "note": "Use Edit audit plus disposable Play-mode checks. A failed check returns to the section, diagram, or manifest that owns the error.", "to": ["persist", "sections", "manifest"] },
    { "id": "persist", "lane": "assets", "label": "Persist proof and evidence", "status": "pending", "detail": "Save place snapshot → syncback dry-run → apply → review diff; manual Save to File for RBXM when required", "note": "Studio MCP can construct and validate the DataModel but does not replace the explicit snapshot/syncback or RBXM export handoff.", "outputs": [{ "label": "roblox-labs/<experience>/src/", "op": "modify" }, { "label": "evidence/", "op": "create" }], "to": ["promotion-gate"] },
    { "id": "promotion-gate", "lane": "you", "label": "Declare the next lifecycle state", "status": "pending", "detail": "Remain prototype/BLK, mark proven, or authorize a separate production promotion", "note": "Creation does not silently promote, upload, publish, or choose a production package.", "to": [] }
  ]
}
```

## Run artifact contract

Each building starts with a scaffolded `pipeline` entity in this planning space and a canonical creative bundle in the selected asset owner. The suggested `architectural-environments` category must be created through Asset Studio if it does not already exist; this workflow does not silently change the Assets library structure.

```text
Assets/models/<category>/<design-slug>/
  README.md
  manifest.json
  <design-slug>-concept-a.png
  <design-slug>-concept-b.png
  <design-slug>-concept-c.png
  sections/
    01-<section-slug>.md
  diagrams/
    <design-slug>-<section-slug>-<view>.png
  roblox-build-manifest.json
  evidence/
  prompts/
```

The project-system pipeline records phase state and decisions. Rich architectural metadata belongs in the creative bundle, not in arbitrary `_project/` frontmatter.

## Section frontmatter contract

Every buildable or experiential section has a stable ID. The body explains intent; frontmatter carries the fields used to join diagrams and manifest records.

```yaml
---
schema: trembus.architecture-section/v1
design: <design-slug>
section_id: <section-slug>
title: <human-readable title>
role: <site|mass|room|connector|threshold|service|detail>
status: <draft|selected|diagrammed|manifested|built|verified>
description: <one-sentence spatial job>
concept_ref: <concept-a|concept-b|concept-c|synthesis>
required_views: [plan, section, axonometric]
dimensions_studs: [x, y, z]
elevation_studs: 0
connects_to: [<section-id>]
material_tokens: [<token>]
asset_refs: [<manifest-asset-id>]
---
```

Required body sections are `Boundary / State / Relationship / Transition / Order`, `Player path and sightlines`, `Roblox translation`, and `Acceptance checks`.

## Roblox build-manifest contract

`roblox-build-manifest.json` is the machine-readable construction source. It records:

- schema version, studs as units, origin, modular grid, selected concept, and bundle hash;
- reusable color/material tokens and environment settings;
- ordered sections and connector clearances;
- exact Part recipes: class, shape, size, local transform, anchoring, collision, material token, tags, and attributes;
- asset references with local path, Roblox registry/upload state, checksum, TGL status, and fallback;
- lights, attachments, constraints, effects, and explicitly scoped interactions;
- part, mesh, texture, transparency, and light budgets;
- Studio target, staging root, builder version, verification results, and `promotion_authorized: false` by default.

## Non-negotiable gates

- Three concepts differ structurally, not cosmetically.
- Human selection precedes section decomposition.
- The owner/place gate precedes TGL naming and Studio mutation.
- Studio writes persist only in Edit mode; Client/Server play clones are verification surfaces.
- Source discovery, exact-path registry confirmation, and upload state remain distinct.
- Supporting concept/diagram art does not use `_BLK` or `_FNL`; runtime assets do.
- New runtime assets start at `BLK`; only the workspace owner declares promotion.
- The manifest is canonical for construction; the Studio `GenerationManifest` is its concise in-place proof ledger.
