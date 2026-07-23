---
title: "Trim sheet PBR audit and correction"
status: completed
updated: 2026-07-22
tags: { last-active: 2026-07-22T19:27, kos: "studio-mcp, blender-mcp, asset-studio, roblox-brain, memory" }
---

# Trim sheet PBR audit and correction

> **Status:** completed (2026-07-22)

## Goal

Audit the Codex-generated `ancient-alien-architecture` trim sheet PBR map set for correctness,
and land whatever correction the audit justifies.

## Success Criteria

- Every defect claim is backed by a measurement against the map files, not a visual impression
- The corrected set is validated inside Roblox Studio under real place lighting, not only in an offline renderer
- The `_BLK` originals survive the correction
- The audit is reusable — a future sheet can be checked without redoing the analysis by hand

## Source References

- `Asset-Studio/output/imagegen/ancient-alien-architecture-trim-sheet/` — `_BLK` originals, `trim-sheet-layout.md`, `prototype-map-manifest.json`
- Roblox trim-sheet guidance: `create.roblox.com/docs/tutorials/curriculums/environmental-art/develop-polished-assets`
- `SurfaceAppearance` reference: `create.roblox.com/docs/art/modeling/surface-appearance`
- Blender scratch build: `Assets/source/blender/Texture-Development/Ancient Alien Architecture Trim Sheet 01.blend` (rig built, **unsaved**)
- Studio: "Soul Steel" instance, `Workspace.TrimSheetCompare` at y=300

## Decisions

- **Keep Codex's artwork, fix its material data.** A from-scratch Blender rebuild (76-piece high-poly → Cycles normal + AO bake, wrapped ±1 tile so the bake saw its own neighbours) passed every technical gate but lost on art quality — plainer forms, no surface story. Replacement rejected in favour of correction
- Corrected set ships as `_ALPHA` **alongside** the untouched `_BLK`, never as an overwrite: `output/imagegen/` is gitignored, so the originals are not recoverable from version control
- Row boundaries re-cut to the measured art transitions (331/517/596/793/927 → snapped to 336/512/592/800/928/976) rather than re-stamping the art to the written contract — the art is the expensive artifact
- Status advanced `_BLK` → `_ALPHA` rather than bumping to a `-02` suffix: the `01` in these filenames is the sheet number, not a revision
- Round 02 goes back to Codex scoped to the **single failing gate** (roughness variation), not as a general "improve this" pass
- **Round 02 accepted.** Codex's `_BETA` passes 11/11: per-row roughness spread went 14–27 → 50–70 levels (9% → 24% of scale) with row means essentially unmoved, and the new variation distributes across broad/mid/fine spatial bands rather than being one noise layer. It changed *only* the roughness map — colour, normal, metalness and emissive are byte-identical to `_ALPHA`, exactly as scoped

## First-Principles Candidates

- For a metal, base colour *is* reflectance — anything below ~sRGB 130 renders as absence rather than as a dark material; the prototype sat at 36 and read as a black void at every camera angle → decision
- A contract written *after* the art it describes will drift from it: the audit found no art transition within 40px of two claimed row boundaries, so those rows did not exist in the artwork at all → decision
- A generated asset needs a machine-checkable acceptance gate, or review stays subjective and defects survive a human pass → decision
- Dark albedo combined with high metalness makes appearance almost entirely view-dependent, so inconsistent rows come apart under camera motion instead of merely looking dark — the user spotted this as "flicker" before the cause was known → none yet
- Default part `Color` tints a `MaterialVariant` ColorMap down by a third, and fresh uploads flicker while streaming → **saved to memory this session** ([[materialvariant-tint-and-stream]])
- Roughness is only legible under a **small, hard light source**; a large soft dome (a Roblox daytime sky) hides roughness variation almost completely. Round 02's work was invisible in the place it was reviewed in, and obvious under a point source — so an asset's review lighting must match the lighting it will ship into, or improvements get judged as no-ops → memory / decision
- A passing numeric gate that the reviewer cannot see is a communication failure, not a false positive — the gate should say where in the pipeline its effect becomes visible → none yet

## Outputs

- **Audit of the `_BLK` set — five defects, each measured against the map files, not eyeballed:**
  metal reflectance at 36 sRGB (needs 130–240); albedo median 32 with 93% below sRGB 50; baked AO
  at corr −0.47…−0.71 against a cavity proxy; row boundaries 75px / 69px / 20px off the artwork;
  roughness variation at 9% of scale
- **`_ALPHA` corrected set** in `Asset-Studio/output/imagegen/ancient-alien-architecture-trim-sheet/pbr-prototype/`
  — colour · normal · roughness · metalness · emissive, plus `alpha-map-manifest.json`. The `_BLK`
  originals are untouched; that folder is gitignored, so they exist nowhere else
- **`audit-trim-sheet.py`** — 11 numeric gates covering normal convention, reflectance physicality,
  albedo floor, baked shading, band alignment, roughness detail, metalness binarity, X tiling, mip
  alignment and resolution. Scores: `_BLK` 6/11 · `_ALPHA` 10/11 · `_BETA` 11/11
- **`revision-brief-02.md`** — scoped hand-off for Codex round 02. It came back passing 11/11 having
  changed *only* the roughness map (all four other maps byte-identical), spread 9% → 24% of scale
- **Blender comparison rig**, saved in `Ancient Alien Architecture Trim Sheet 01.blend`: 76-piece
  high-poly, Cycles normal + AO bakes with ±1-tile wrapped neighbours, panels A–F, two lighting setups
- **Studio validation rig**: `Workspace.TrimSheetCompare` (3 panels) + 3 `MaterialVariant`s, 12 uploaded
  texture assets. Confirmed the audit's conclusions in the engine under the place's own lighting
- **Memory updated** — [[materialvariant-tint-and-stream]] now carries three Studio evaluation traps

## Blockers

- none

## Next Action

Decide whether this sheet ships under hard lighting or open sky — that single fact determines whether
round 02's roughness work is worth keeping, and it is the only open question left on the asset. Then
promote `_BETA` and tear down the Studio rig.

## Handoff Notes

- **Tear down before saving the hub place.** `Workspace.TrimSheetCompare` and the three
  `TrimCompare_*` MaterialVariants are unsaved Edit-mode state in the Soul Steel place — save it as-is
  and the test panels ship with it:
  `workspace.TrimSheetCompare:Destroy() for _,n in {"A","E","D"} do local v = game:GetService("MaterialService"):FindFirstChild("TrimCompare_"..n) if v then v:Destroy() end end`
- 12 texture assets were uploaded to the account for the comparison and are archivable once done.
  The `_ALPHA` four are recorded in `alpha-map-manifest.json` under `roblox_asset_ids`
- The Blender file is saved; `HighPoly` / `HighPolyWrap` are render-hidden but still present, so a
  re-bake needs no rebuild
- **Carried over untouched from [[2026-07-22-current-status-report]]:** publish `Trembus-Game-Library`
  v16 (rig remediation still unpublished at v15), save the hub place, run the soul-steel syncback when
  labs-status flags it. Today went elsewhere; labs-status is currently 0 syncback-due / 0 dirty
- Contracts regenerated and the static bundle rebuilt at close; the **commit was proposed, not made**
- This work maps to no pipeline entity. If trim sheets become a recurring lane — the audit script
  suggests they might — that pipeline does not exist yet
