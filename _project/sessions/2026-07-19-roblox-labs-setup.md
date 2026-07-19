---
title: "roblox-labs setup"
status: completed
updated: 2026-07-19
links:
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
---

# roblox-labs setup

> **Status:** completed (2026-07-19)

## Goal

Stand up the `roblox-labs` repo (`[CF-1]` of [[2026-07-19-studio-labs-audit]]) so both Studio lab experiences serialize to git via Rojo syncback.

## Success Criteria

- Repo exists at `Repositories/Gaming/Roblox-Repositories/roblox-labs`, visible at `external-locations/code/roblox-labs` — **done**
- Rojo pinned at a syncback-capable version; both projects `rojo build` clean — **done** (7.7.0)
- Initial commit on `main` — **done** (`4562a5e`)
- First syncback of both places committed — **done** (`cb40049`: 13 `.luau`, 53 `.rbxm`, 43 meta/property JSON)

## Source References

- [[0008-studio-native-lab-lane]] (home, ledger, promotion)
- [[2026-07-19-studio-labs-audit]] `[CF-1]`
- `external-locations/code/roblox-labs/README.md` (the loop)

## Decisions

- Pin Rojo **7.7.0**: 7.6.1 (the estate's prior pin) has no `syncback` subcommand; 7.7.0 is the first release with it. [[0008-studio-native-lab-lane]] amended accordingly.
- Repo home is the `external-locations/code` symlink target (`Repositories/Gaming/Roblox-Repositories/`), matching the three sibling repos — no extra wiring needed for visibility.
- Full-DataModel project trees mapping 8 services per experience; `places/` is a gitignored `.rbxl` drop zone; serialized source lives in each project's `src/`.

## Outputs

- `roblox-labs` repo: `rokit.toml` (rojo 7.7.0), README with the syncback loop, `user-interface-development/` + `part-textures/` Rojo projects, `places/` drop zone; commit `4562a5e` on `main`.
- Planning space: [[0008-studio-native-lab-lane]] version amendment; CLAUDE.md wrap + labs pointers.

## Blockers

- None — the user-only snapshot step (Studio **File → Save to File As…**) was completed 2026-07-19.

## Next Action

`[CF-2]` of [[2026-07-19-studio-labs-audit]]: build `tools/build-ui-catalog.mjs` → `previews/dashboards/ui-catalog.json` from an MCP scan.

## Handoff Notes

`[CF-1]` is **closed**: repo founded (`4562a5e`), first serialization landed (`cb40049`). The loop is proven end-to-end — dry-runs were clean on the first try (no ignorePaths tuning needed; syncback itself captured service `$properties`/`$attributes` into the project files, which is desirable and committed). Serialization shape: standalone Luau modules come out as diffable `.luau` (harness, shared protocol, a `UIStudioTests/RunUnitTest` not seen in the audit); instance-heavy trees (mockup kits, accessories, labs) come out as `.rbxm` models. The Part Textures snapshot also contained a `PartTextureBeamTestLab` newer than the audit — labs are actively growing between sessions. Recurring loop per the roblox-labs README: save snapshot → `rojo syncback <project> --input places/<project>.rbxl --dry-run` → apply with `-y` → review → commit.
