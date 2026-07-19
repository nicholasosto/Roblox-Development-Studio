---
title: "Studio labs audit"
status: complete
updated: 2026-07-19
links:
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
---

# Studio labs audit

> **Status:** complete (2026-07-19)

## Outcome

**What shipped**

- Full MCP audit of **"User Interface Development"**: six mockup kits in `ReplicatedStorage.UIMockups` (MiniMap with ViewportFrame + WorldModel + compass/waypoints; CharacterPanel dossier with stats/vitals/equipment tabs; TexturedUIReferenceKit + SliceSpec variant for 9-slice/tile/atlas calibration; IconSubtypeTestLab with 8 subtypes, pixel rulers, tint/state/fallback probes; AnimatedIconEffectsLab with 4 motion techniques incl. reduced-motion; GameplayTileStateLab with 12 enumerated states + precedence probes) plus StarterGui preview copies; a working InventoryGui + drag ghost wired to the harness; the UIStudio harness itself (Protocol v1 with op allowlist and payload caps, 30-req/5s rate limit, revision-conflict optimistic concurrency, ProfileSchema reconcile, PersistenceStore with DataStore→memory fallback, per-player diagnostics attributes, BindToClose flush).
- Full MCP audit of **"Part Textures"**: three script-free labs — PartTextureTestLab (wall/floor/ceiling/roof galleries at 02/04/08/12-stud scales, orientation ticks, rain/fog/wind/snow cells, five lighting rigs, CFrameValue camera presets), PartTextureComparisonLab (A/B twin), PartTextureWallAssemblyLab (ControlledBay vs ContextBay with local review lighting and weather).
- Planning entities from this audit: [[0008-studio-native-lab-lane]], [[ui-studio-harness]], [[ui-component-promotion]].

**What didn't**

- No `ui-catalog.json` registry yet — see `[CF-2]`.
- `roblox-labs` repo not stood up — see `[CF-1]`.

## Surprises

- **Place-embedded Luau at production grade** — the harness has optimistic concurrency, graceful storage fallback, and rate limiting. Generalizes: the native lane produces package-worthy code, not just mockups.
- **Catalog designed but empty** — `UIStudioServer.catalogSnapshot()` reads an attribute contract (`Component`, `State`, `SourceGuiPath`, `Variants`) and entries exist (e.g. `inventory.slot` marked `GeneratedBy: RobloxUIStudio`), but the folders hold no templates. Promotion doesn't start itself; it needs the workflow.
- **GenerationManifest already speaks TGL** — "Status: BLK / local proof only … No FNL promotion or upload authorized". Codex conforms to the asset conventions unprompted; contract v1 builds on this rather than inventing new metadata.
- **Part Textures is script-free by design** — its rigor lives in calibrated structure (stud scales, lighting rigs, camera presets), so version control is the only missing safety net there.

## Decisions made

- **D1**: Studio-native work is the design-and-proving lane with a defined promotion pipeline into the TS or Luau production lanes — formalized in [[0008-studio-native-lab-lane]].
- **D2**: `@trembus/ui-studio-harness` registered as `proposed` / `lane: luau` — the concrete M4 watchlist item ([[ui-studio-harness]], per [[0007-dual-lane-ts-luau]]).

## Carry-forward

- `[CF-1]` Stand up `roblox-labs` repo (Rojo project per experience, Rokit-pinned Rojo 7.6, syncback) and wrap it via `external-locations/` — code-side work, its own session.
- `[CF-2]` Build `tools/build-ui-catalog.mjs` → `previews/dashboards/ui-catalog.json` from an MCP scan; add a command-center lens after.
- `[CF-3]` Fill `UIStudio.Catalog` template instances for the six kits; set `State` honestly (all `prototype` today).
- `[CF-4]` Decide the harness extraction split (one vs. three concerns per [[0004-one-concern-per-package]]) when a second lab place needs it.

## Verification evidence

| Gate | Method | Evidence |
|---|---|---|
| Both experiences inventoried | Studio MCP game-tree scans (StarterGui, ReplicatedStorage, Workspace, ServerScriptService) | this session, 2026-07-19 |
| Harness behavior confirmed | Full script reads of `Protocol` and `UIStudioServer` | this session, 2026-07-19 |
| Catalog contract confirmed | Attribute dump of `UIStudio.Catalog.InventorySlot` | `Component=inventory.slot`, `State=prototype`, `SourceGuiPath=StarterGui.InventoryGui…Slot_1` |
| Visual state captured | Edit-time screenshots of both places | CharacterPanel dossier; Part Textures overview |
| Part Textures script-free | `script_search` across the place | no matches |
