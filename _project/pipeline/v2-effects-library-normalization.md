---
title: "V2 effects library normalization"
status: build
updated: 2026-07-21
links:
  - { rel: references, target: decisions/0009-soul-steel-universe-topology }
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
---

# V2 effects library normalization

> **Status:** build (2026-07-21)

## Context

Crystal Sanctum's `ServerStorage.V2` holds ~100 particle effects across 12 category folders (plus a loose `Hallow Hold Ability` model) — a merge of at least three collections: a letter-graded VFX pack (`A - CANDLELIGHT`), a numbered pack (`05 - LIGHTNING STRIKE [A]`), and homegrown pieces (`SwordBarrageEff`, `Magic Ting2`). The 2026-07-21 census (first serialized by the universe repo's initial syncback) found: every effect is a bare `Part` with emitters in three different layouts (on the Part, on Attachments, once in a nested Folder); zero attributes or tags — burst-vs-loop, duration, and emit counts live only inside emitter properties; four naming dialects plus damage (`1`, `2`, `pOISON`, a duplicated `J - ELECTRIC ORB`); 8 empty placeholder Parts; and a 29-effect "Other" folder proving the taxonomy failed. The operator confirmed the per-effect setup is a recurring point of confusion.

Approved judgment calls: default `TGL_Domain` is `shared` (only obvious cases assigned: Blood → `blood`, holiness → `spirit`); original names preserved as `FX_SourceName`. Fidelity-first constraint: normalization must not alter visuals — emitters stay where they are (relocating a Part-volume emitter to an Attachment changes emission geometry), and root-part appearance is untouched.

## Build plan

1. **Normalize (build)** — script pass, non-destructive alongside V2: wrap each effect in a `Model` named `EFX_PRT_<Name>_BLK` under `ServerStorage.TrembusGameLibrary.Effects.<domain>`; root part becomes the anchored, non-colliding `Handle` (PrimaryPart); stamp `TGL_*` attributes (Category/Sub/Domain/Status/Schema_Version) + runtime contract `FX_Mode` (burst|loop heuristic by category, STRIKE/BURST/POOLING name overrides), `FX_Duration`, per-emitter `FX_Emit`, `FX_SourceName`; tag `TGL`, `TGL_BLK`, `EFX`; all emitters `Enabled=false` in templates; skip empty placeholders; disambiguate the duplicate orb as `…Alt`. Ship `EffectPlayer` ModuleScript (the one way to play: burst → `Emit(FX_Emit)` + auto-cleanup, loop → handle with `:Stop()`) at `TrembusGameLibrary.EffectPlayer`.
2. **Verification gallery (qualify gate for effects)** — generated lab bay, one pedestal + label per effect, fire-on-click through EffectPlayer; tune `FX_Mode`/`FX_Duration`/`FX_Emit` visually; decide the duplicate orb; fix any pascalization casualties.
3. **Retire V2** — after operator sign-off delete `V2` (git history + Steel City backup retain the original); publish + Download a Copy + `rojo syncback crystal-sanctum` records the transformation in the universe repo.
4. **Promote (later, optional)** — export gallery-proven effects as `.rbxm` to the master Assets library (`runtime/roblox/soul-steel/effects/<domain>/`) per the TGL promotion gates; `EffectPlayer`, once proven, is a Luau-lane package candidate per the 0008 promotion ladder.

## Exit criteria

- Every non-placeholder V2 effect exists in `TrembusGameLibrary.Effects.<domain>` with full `TGL_*` + `FX_*` metadata and plays correctly through `EffectPlayer` in the gallery.
- V2 deleted from the live place; the transformation is serialized in the `soul-steel-universe` repo.
- No visual regression: spot-checked effects look identical to their V2 originals.
