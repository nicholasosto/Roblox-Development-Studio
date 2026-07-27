---
title: "Review the void ship and hex city specs in the Spatial lens"
status: completed
updated: 2026-07-27
tags: { last-active: 2026-07-27T12:59, kos: "command-center, dashboards, decisions, memory" }
---

# Review the void ship and hex city specs in the Spatial lens

> **Status:** completed (2026-07-27)

## Goal

Open both registered specs — the hex city center grid spec and the Void Ship build manifest — in
the Command Center's Spatial lens, judge whether what renders is trustworthy and review-ready, and
produce a prioritized next-steps list for the spatial system.

## Success Criteria

- Both specs opened in the lens through the shipped path (bundled default + Saved specs registry),
  with screenshots as evidence.
- A per-spec verdict: rendered geometry/metrics consistent with the contract, anomalies named or
  explicitly none.
- A prioritized, evidence-grounded next-steps list for the system, reconciled against the carried
  gaps (sidecar annotations, the unmade ADR 0013/0015 edits, registry watcher, manifest view
  defaults).

## Source References

- `apps/command-center/src/spatial/fixtures/hex-city-center-grid-spec.json` (rev 2, bundled default)
- `output/architecture/ancient-void-ship-arrival-environment/roblox-build-manifest.json`
- `previews/dashboards/spatial-specs.json` — the registry the Saved specs row reads
- Prior engram: [[2026-07-27-rebuild-the-spatial-lens-around-the-review-loop]] (closed at this
  session's open; carried its unmet ADR criterion here)

## Decisions

- **Option 1 chosen for the void ship's "stacked flat boxes" question**: accept the envelope
  diagram as correct rendering and invest in the text — surface the hidden manifest fields and
  build the sidecar annotations loop. Option 2 (per-assembly footprints, the regions half of 0015)
  deferred to the ship's next real design iteration.
- **Annotations are a sidecar with string anchors** (`document` · `region:<key>` · `assembly:<id>`
  · `layer:y:<n>`), soft-fail per 0013's cosmetic rule, exact-schema-string discard like the
  appearance block. An unresolvable anchor lists as orphaned, never dropped — that is how notes
  survive the open region/assembly vocabularies.
- **Export is a download** — the lens keeps its "persists nothing" honesty; committing the sidecar
  beside the spec stays a human act.
- **The registry carries counts, never note text** (`annotations: {notes, open, orphaned}`), and a
  sidecar beside a portable copy is warned about and ignored — annotate the canonical.

## First-Principles Candidates

- Reading the DOM in the same synchronous block as a dispatched synthetic event sees pre-render
  state (React batches); a false "click didn't register" nearly became a wrong fix. Await a tick
  before asserting. → memory (added to [[browser-pane-verification]])
- A registry that lists artifacts and a glob that inlines them is a join that can silently break;
  the lens now warns when the registry claims a sidecar the build never inlined — the runtime
  count assertion the previous session's glob bug asked for. → none yet (implemented)
- The annotations schema is the third sidecar-ish schema with no governing ADR (elevation has
  0013; appearance and annotations have none). One ADR could own "nested/sidecar schema policy:
  exact-match, hard-vs-soft by dimensional-vs-cosmetic". → decision (offered, not yet minted)

## Outputs

- Hex city center reviewed in the shipped `previews/app/` bundle, perspective + orthographic top:
  six approaches cut the outer ring cleanly, inner sidewalk continuous, metric tiles match the
  contract, appearance 1/1, no vertical axis in plan. **Passes** — no anomalies.
- Void Ship reviewed via the Saved specs registry path: envelope 74×38×76 renders as 6 layer
  plates + wireframe bounds, span −6→+26, camera framing correct, honest appearance fallback.
  **Geometry passes; manifest-mode UI copy does not** — four findings recorded in the session
  report (hardcoded hex layer toggles live in manifest mode; "declares no elevations" warning
  contradicts the real vertical-span tile; camera mode persists so top view shows one featureless
  plate; grid-spec button labels leak into manifest mode).
- `defaultGridSpecLoad` verified in code: still an import-time IIFE but try/catch-wrapped with a
  `SpatialUnavailable` fallback — CLAUDE.md's "bricks the lens" gotcha was stale (now fixed).
- Registry `--check`: in sync.
- **Option 1 built and browser-verified end to end.** New `annotations.ts` (schema
  `trembus.spatial-annotations/v1`, soft reader, anchor vocabulary, serializer);
  `buildManifest.ts` now parses `material_tokens` (with RGB→swatch colors) and `qa_views`;
  `SpatialGridPanel.tsx` gained a manifest-only **Build intent** section (7 tokens · budget caps ·
  6 QA views · 11 preserve paths for the void ship) and a both-formats **Review notes** section:
  bundled-sidecar load via a second registry glob, click-geometry-to-aim-the-anchor compose,
  resolve/reopen/remove, orphan badges, unexported-changes dirty badge, sidecar file input, and
  export-as-download. Notes stash per spec across swaps within the session.
- Scene selection now carries a structured `anchor` (+ plate assembly ids); grid regions derive
  from select keys.
- `build-spec-registry.mjs` reports sidecar facts + `annotated`/`openNotes` counts; copy-adjacent
  sidecars warn and drop. Saved-specs buttons badge note counts.
- Seeded the void ship's real sidecar with 3 true review notes from this session's findings
  (orientation mapping · void-vignettes temporariness · porthole-bays budget concentration).
- Verified in the shipped bundle: sidecar loads (3 notes, labels resolve), plate click re-aims the
  compose anchor, add/resolve/stash round-trip, crafted bad sidecar degrades with named warnings +
  orphan badge, export intercepted and payload checked (schema, targetSpec, trailing newline).
  Zero console errors. Typecheck + build green; registry `--check` in sync after regen.
- CLAUDE.md updated: annotations bullet, registry line, lens module list, IIFE gotcha corrected.

## Blockers

- none

## Next Action

Decide governance for the annotations schema (offered `/new decision`: one ADR owning
nested/sidecar schema policy — exact-match, hard-vs-soft by dimensional-vs-cosmetic), then fold
the manifest-mode truthfulness pass (hardcoded layer toggles · elevation copy contradiction ·
camera default · wrong-format labels) as the next lens change.

## Handoff Notes

- The annotations loop is live in the shipped bundle and committed (`0c57cf1` feature, `29a94b2`
  regen, `581ee99` docs). `annotations.ts` owns the schema, anchors, and serializer; sidecars are
  `<spec>.annotations.json` beside the canonical only — one beside a copy is warned and ignored.
- **Still open, in order:** the manifest-mode truthfulness pass (hardcoded hex layer toggles live
  in manifest mode · the "declares no elevations" warning contradicts the vertical-span tile ·
  camera mode persists across format switch so manifests can open to a useless top view ·
  grid-spec button labels leak into manifest mode), then the sidecar-schema ADR (appearance and
  annotations both ungoverned), then the vite-dev registry watcher — editing a spec or sidecar
  still needs a manual `node tools/build-spec-registry.mjs` + app rebuild.
- Verification craft for this app lives in [[browser-pane-verification]] — synthetic events work
  but DOM reads must await a tick, controlled inputs need native setters, file inputs accept a
  constructed File via DataTransfer.
- The void ship's three seeded notes are review claims to be acted on (orientation mapping ·
  void-vignettes temporariness · porthole-bays budget), not decoration — resolve them in the lens
  and re-export when addressed.
