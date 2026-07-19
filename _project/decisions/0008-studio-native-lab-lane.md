---
title: "Studio-native lab lane"
status: accepted
updated: 2026-07-19
links:
  - { rel: references, target: decisions/0007-dual-lane-ts-luau }
---

# Studio-native lab lane

> **Status:** accepted (2026-07-19)

## Context

Codex and Claude, both driving Roblox Studio over MCP, have built substantial native work in two experiences. **User Interface Development** holds six mockup kits in `ReplicatedStorage.UIMockups` (MiniMap, CharacterPanel, TexturedUIReferenceKit + SliceSpec variant, IconSubtypeTestLab, AnimatedIconEffectsLab, GameplayTileStateLab) with StarterGui preview copies, a working InventoryGui wired to a production-grade Luau harness (versioned protocol, rate limiting, revision-conflict concurrency, DataStore-with-fallback persistence), and a `UIStudio.Catalog` attribute-based component registry that is designed but empty. **Part Textures** holds three script-free instance labs (texture galleries at calibrated 2/4/8/12-stud scales, an A/B comparison twin, wall-assembly bays with lighting rigs, weather cells, and camera presets). Generated kits already carry `GenerationManifest` values speaking the TGL asset conventions (`BLK` status, "No FNL promotion or upload authorized").

All of it lives only in two place files: no version control, no review, no inventory outside Studio, and no defined path from prototype to reusable package. [[0007-dual-lane-ts-luau]] reserved a Luau lane awaiting a first real package; `rbx-ui` is the TS production lane. Full inventory: [[2026-07-19-studio-labs-audit]].

## Decision

**The Studio-native lane is the design-and-proving lane; promotion is how work leaves it.**

1. **Home** — labs live in a new `roblox-labs` repo (one Rojo project per experience; Rokit-pinned Rojo 7.7.0, the first release with `rojo syncback`; syncback after Studio sessions), wrapped read-only here via `external-locations/`. Labs are experiences, not packages — they stay out of `roblox-packages-mono`.
2. **In-place ledger (contract v1)** — every `UIStudio.Catalog` entry carries attributes `Component`, `State ∈ prototype|proven|promoted`, `SourceGuiPath`, `Variants`, `GeneratedBy`, `HarnessVersion`; every generated kit carries a `GenerationManifest` (TGL status, asset paths, slice/tile specs, promotion authorization). Both agents write this ledger as they generate.
3. **Visibility** — a generated registry `previews/dashboards/ui-catalog.json`, built from an MCP scan of the places and rendered by the command-center beside `packages.json`.
4. **Promotion** — prototype (lab, manifest required) → cataloged (attributes complete, master in `UIMockups`) → proven (passed the lab rigs, exported to `roblox-labs`) → productized: an `rbx-ui` React component (TS lane) or an instance-template + Luau-controller package in the monorepo — the first of which triggers the M4 lane scaffold per [[0007-dual-lane-ts-luau]]. Steps in [[ui-component-promotion]].
5. **Assets** — textures/icons promote `BLK → FNL` per the TGL conventions; Open Cloud upload happens only at FNL, and the resulting `rbxassetid` is recorded back into the manifest.

## Consequences

- Easier: lab work gains history and review; the planning space sees live inventory; the M4 trigger has a concrete watchlist item ([[ui-studio-harness]]); Codex/Claude coordination has a written contract instead of folklore.
- Harder: syncback discipline is required after every Studio session, and catalog attributes must be maintained — a stale ledger makes the registry lie.

## Options considered

- **Labs inside roblox-packages-mono** — rejected: labs are experiences, not one-concern packages; parking them in the mono blurs its shape.
- **Place-files-only (status quo)** — rejected: no history, review, or inventory; the empty catalog shows promotion never starts on its own.
- **Migrate UI work into rbx-ui now** — rejected: forfeits the native lane's iteration speed and engine access; productization belongs at the end of promotion, not the start.

## Cites

- [[0007-dual-lane-ts-luau]]
- [[0002-framework-agnostic-packages]]
- [[0004-one-concern-per-package]]
- [[2026-07-19-studio-labs-audit]]

## Re-open if

Rojo syncback proves unreliable for these places; the catalog ledger drifts unmaintained; or lab volume outgrows a single repo.
