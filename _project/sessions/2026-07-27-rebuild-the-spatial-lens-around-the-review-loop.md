---
title: "Rebuild the spatial lens around the review loop"
status: completed
updated: 2026-07-27
tags: { last-active: 2026-07-27T11:27, kos: "command-center, decisions, dashboards" }
---

# Rebuild the spatial lens around the review loop

> **Status:** completed (2026-07-27)

## Goal

Re-aim the Spatial lens at the loop the operator actually described — visualise a spec quickly,
comment on refinement areas, see the improvements, and reopen saved specs — rather than at the
dimensional-precision thesis the 2026-07-27 morning session built on inference.

## Success Criteria

- The **build manifest loads in the lens**. `output/architecture/ancient-void-ship-arrival-environment/
  roblox-build-manifest.json` renders as envelope regions from its `assemblies` + `coordinate_contract`.
  This is the literal blocker the operator named: *"I couldn't tell if the geometry matched as I
  couldn't load it to the viewer."*
- **A malformed spec renders what it can** and badges the rest, instead of refusing. Includes killing
  the import-time IIFE in `defaultGridSpecLoad` so a bad fixture cannot brick the tab for a session.
- **Specs are discoverable** — `tools/build-spec-registry.mjs` emits `previews/dashboards/
  spatial-specs.json` listing every spec of either format, and the lens offers them.
- Layer toggles derive from **declared groups**, so the Void Ship reads `arrival-dais /
  teleport-flight-deck / upper-observation-catwalks` with no hardcoded layer list.
- ADR 0013 is amended to **scope** its hard-fail rule to the build boundary rather than reverse it,
  and 0015's §8 sequence is re-ordered to put viewability ahead of the migration proof.

## Source References

- Interview artifact (round 1 + 2, scorecard, build order):
  `https://claude.ai/code/artifact/b064ad2d-9332-45f3-94f2-8635faca088f`
- `output/architecture/ancient-void-ship-arrival-environment/roblox-build-manifest.json` — the format
  that must become viewable; `assemblies[]` carry `id`, `layer_y`, `part_budget`, `jobs` only
- `apps/command-center/src/spatial/` — `gridSpec.ts` (trust boundary) · `spatialScene.ts`
  (`resolveElevation`) · `geometry.ts` (`hexRingSegments`) · `SpatialGridPanel.tsx`
- `tools/build-packages-registry.mjs` · `tools/build-labs-status.mjs` — the registry pattern to copy
- `_project/pipeline/hex-city-center-spatial-lab-rev01.md` — the precedent that every spatial build
  already has a pipeline entity, which is why no `spec` kind is needed
- Decisions [[0013]] (to be scoped) · [[0014]] · [[0015]] (precision half demoted, regions half upheld)
- Prior engram: [[2026-07-27-review-the-latest-spatial-builder-config]]

## Decisions

- **The precision thesis broke on contact with the operator.** The morning's work assumed a
  dimensionally exact contract was the centre of this pipeline. It isn't — the viewer is, and
  precision is one optional property of what it shows.
- **A failing spec renders what it can** and badges the rest. This scopes 0013 rather than reversing
  it: its reasoning ("a substituted elevation is a wrong build") holds at a *build* boundary, and the
  lens is not building — so hard-fail belongs there, not at load.
- **Annotations go in a sidecar**, keeping the contract geometry-only while letting review notes diff
  in git and be handed to Codex.
- **No `spec` entity kind.** A generated registry instead — the `package` entity states the rule
  outright ("live dependency data is generated, not transcribed"), and every spatial build already has
  a pipeline entity carrying its contract path, Studio target, and authorization scope.
- **Build order: viewable → findable → reviewable.** Manifest loading first, because it is the literal
  blocker named, and because a registry listing both formats forces the format-agnostic path anyway.

## First-Principles Candidates

- A whole session of work was aimed by inference rather than by asking. The interview took twenty
  minutes and inverted the priority stack — determinism and strictness demoted, annotation and a spec
  library revealed as absent entirely. → memory
- The strongest disconfirming evidence was sitting in the repo the whole time: the build manifest had
  *already* produced a real Studio build with passing QA, from a document with no geometry in it. An
  artifact that shipped without the feature is the cheapest test of whether the feature is needed.
  → memory
- 0015's two halves had very different evidence behind them and were accepted as one decision. Open
  regions were validated by the operator's actual blocker; tiered precision by a preference; the
  determinism argument by nothing at all. A decision bundling independently-supported claims should
  say which claim rests on what. → decision
- Interview → published artifact → selectable answers is now the requested pattern for complex
  topics; the artifact doubles as the durable record when no session is open. → memory

## Outputs

- **The Void Ship is viewable.** `apps/command-center/src/spatial/buildManifest.ts` — a second
  reader for `roblox-build-manifest.json`, degrading rather than refusing per the interview: it
  returns a model plus a `warnings[]` list instead of throwing on anything short of "this is not a
  manifest". The Void Ship parses to 7 assemblies across 6 layers, envelope 74×38×76, 11 preserve
  paths, 2/7 gates authorized, and one honest warning that it declares `forward_axis` and no north.
- `spatialScene.ts` — `SpatialModel = GridSpec | ManifestModel` with `createWorld` dispatching to
  `createGridWorld` or the new `createManifestWorld`. **Layers, not assemblies, are the unit drawn**:
  the manifest gives no X/Z for anything, so two assemblies sharing `layer_y` share the only
  footprint the document states. Drawing them apart would invent geometry.
- Camera framing generalized — `extentOf` and a vertical `centerOf`, since a grid spec is flat and a
  manifest is a stack. Manifests also load at Y×1: their heights are real studs, and the exaggeration
  slider exists for grid specs whose elevations are ~2 studs against a 512-stud plan.
- Panel metrics are per-format (envelope / layers / assemblies / vertical span / part budget), the
  file picker accepts either format via `parseSpatialDocument`, and two layer toggles were added.
- **The spec registry.** `tools/build-spec-registry.mjs` → `previews/dashboards/spatial-specs.json`,
  matching the `build-packages-registry.mjs` conventions (`--print-json`, `--check`, atomic write,
  date-insensitive diff, sorted output). Scans both formats across four roots. **No `spec` entity
  kind**, per 0015 — planning state stays in the pipeline entities and this carries only facts.
- Two derived fields earn their place: `loadable` (with a `reason`), so the multi-level draft lists
  as present-but-unopenable rather than silently missing; and **spec/copy byte-identity** — a
  document naming an `authority.canonicalSpec` other than itself is folded into that canonical as a
  copy with a sha256 `matches` flag. That is the invariant CLAUDE.md says nothing enforces. It still
  is not enforced; it is now *reported*, which closes the automation candidate the previous session
  filed.
- `apps/command-center/src/spatial/specRegistry.ts` — the sole reader, mirroring `src/packages.ts`.
  Facts come from the static registry import; spec **contents** come from an `import.meta.glob`, so
  opening a saved spec is a parse rather than a fetch and behaves identically in `vite dev` and the
  static `previews/app/` bundle. Globbing rather than embedding keeps a spec edit to one diff.
- The lens now shows a **Saved specs** row: "3 found · 2 this lens can open · registry, not a file
  picker", one button per loadable spec, and a warning line if any copy has drifted.
- CLAUDE.md's Dashboards section documents the new generator.

## Blockers

None.

## Next Action

Sidecar annotations — the third of the four capabilities the interview surfaced, and the only one
still entirely missing. Comment pins tied to a region (grid spec) or a layer (manifest), written to a
companion file next to the spec so they diff in git and can be handed to Codex. Region ids are open
now, so the design has to survive a rename: anchor by id and record the id it was written against.

## Handoff Notes

- **Verified in the browser, not just typechecked.** The manifest was loaded through the real file
  input (a `File` built from a `/@fs/` fetch, then a native `change` event), and clicking a plate
  returns `Layer y=26 · hull-ribs-and-crown · 30 parts budgeted · canted silhouette; ceiling
  occlusion; surface-light carriers`. That prose is the review value the format carries and the grid
  spec has no equivalent of.
- **Hex regression checked**: Reset restores the bundled draft at `rev 2`, Y back to ×4, its five
  measured metrics intact. All five validator harnesses still pass (27 · 18 · 21 · 19 · 6).
- Two framing bugs found only by looking: the camera started **inside** the envelope, because the
  multipliers assume geometry fills about half the declared view while a manifest fills it entirely
  (fixed with a `pull` factor), and `centerOf` targeted y=0 while the stack sits at −6…+26. Neither
  would have surfaced from types or unit checks.
- **Top view of a manifest is nearly useless by construction** — full-footprint plates stacked on one
  axis show as a single plate from above. Perspective is the meaningful view for this format. Worth
  either defaulting manifests to perspective or saying so in the UI.
- Not done, deliberately: the manifest's `material_tokens`, `preserve`, `budgets`, and `qa_views` are
  parsed but not surfaced anywhere in the panel. The gates *are* wired through `promotionGates`.
- `computer` clicks still silently miss React controls **and** the canvas; both selection and the
  camera toggle had to be driven with DOM events. See [[browser-pane-verification]].
- **The registry's glob path was wrong in a way types could not catch.** `../fixtures/*.json` from
  `src/spatial/` resolves to `src/fixtures/` — a directory that does not exist — so the glob matched
  nothing, typechecked clean, built clean, and simply produced one fewer button. Only opening the
  page revealed it. Any `import.meta.glob` deserves a runtime count assertion.
- Registry regeneration is **not** wired into the vite dev plugin the way `build-packages-registry`
  and `build-labs-status` are. Editing a spec will not refresh `spatial-specs.json` on its own —
  re-run the generator. Adding the watcher is a small, obvious follow-up.
- Verified end to end in the browser: both specs listed, opening the Void Ship from the registry
  swaps the scene with no file picker, and switching back to the hex spec restores Y×4, its five
  measured metrics, and `appearance 1/1`. All five validator harnesses still pass; `--check` reports
  in sync.
- _(reconstructed at close-out, 2026-07-27)_ One success criterion did not land: the ADR edits —
  0013 scoped to the build boundary, 0015 §8 re-ordered for viewability — were never made; 0013's
  only amendment notes are 0014/0015's from the morning session. Carried into the follow-on review
  session.
