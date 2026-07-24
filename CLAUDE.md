# Roblox-Development-Studio (Project-System consumer)

Planning space for the `@trembus` Roblox package platform. Wraps five code repos via `external-locations/code/` (read-through symlinks into `~/Master-Managed/Repositories/Gaming/Roblox-Repositories/`): the `roblox-packages-mono` monorepo, the syncback repos `roblox-labs` and `soul-steel-universe`, and the code-first repos `soul-steel-official` and `roblox-testing-environment` — see **Wrapped repos & rojo lanes** below. **Code work happens in the repos; planning happens here.**

## Hard rules

1. **Entities only via tooling** — create `_project/` files with `/new <kind> "<title>"` (or `node .project-system/tools/new-entity.mjs`). Never hand-write frontmatter; fill scaffolded sections with Edit afterward. A PreToolUse guard validates every `_project/` write.
2. **Never edit `.project-system/`** — it is the vendored framework, drift-checked against `Project-Spaces/Project-System`. If it needs a change, change canonical and re-vendor.
3. **Never mutate code through `external-locations/`** — those are read-through windows. Edit `roblox-packages-mono` / `roblox-labs` in their own repos/workspaces.
4. **Decisions are serial** — `_project/decisions/0001…0010` exist; ADR 0005 is the slotable-items open-taxonomy decision cited by the repo. Do not renumber.

## Kinds

Standard six (decision, report, pipeline, roadmap, session, workflow) plus the domain kind **`package`** (`_project/packages/`, status `proposed|incubating|active|superseded|retired`) — one entity per `@trembus/*` package, carrying planning state only. Factual data (versions, deps, consumers) lives in the generated registry `previews/dashboards/packages.json`; never transcribe dep lists into entities.

Tags: `lane: ts | luau` on package entities. The Luau lane is **reserved** — no Wally/Rokit/Selene/StyLua tooling lands until the first real Luau package passes the one-concern gate (decision `0007-dual-lane-ts-luau`, roadmap M4).

## Session lifecycle

`/start "<goal>"` opens a session entity (status `active`); `/end` closes it — backfills Outputs/Blockers/Next Action/Handoff Notes and flips to `completed|blocked|shelved` (decision `0010-session-lifecycle-activation`). A session still `planned|active` when a new chat starts was never /end-ed; `/start` surfaces it. Tags `last-active`/`kos` are command-maintained (single-line flow map; quote comma values); first-principles candidates go in the body section. The lifecycle (session close included) is now native to the vendored command templates; `/reflect` (bridge review over closed sessions) ships alongside them. Note: `.claude/commands/end.md` carries one local `consumer-extension` block — `command-center-reconciliation` — re-apply it and its four workspace `allowed-tools` entries after any re-vendor (grep "consumer-extension").

## Dashboards

- `node .project-system/tools/render-hub.mjs` → `previews/dashboards/roblox-development-studio-{graph,hub}.json`
- `node tools/build-packages-registry.mjs` → `previews/dashboards/packages.json` (scans `roblox-packages-mono/packages/*` **plus the consumer repos `soul-steel-official` and `roblox-testing-environment`** through `external-locations/code/`; run after any package.json change; `--check` probes staleness)
- `node tools/build-labs-status.mjs` → `previews/dashboards/labs-status.json` (probes both syncback repos — `roblox-labs` and `soul-steel-universe` — through `external-locations/code/`; time-based status — re-run for fresh state, no `--check`)
- `node tools/telemetry-collector.mjs` → long-running collector on `127.0.0.1:4320`; receives `@trembus/studio-telemetry` envelopes from Studio, rewrites `previews/dashboards/ui-catalog.json` on ledger change (M1 — schema v2, **keyed by placeId**: each place owns its entry, so a place with no ledger can no longer clobber a lab's; v1 files migrate on first post), and serves live session heartbeats at `GET /live` for the Tools lens's "Studio now" card (M2 — in-memory by design, never a committed file)
- `pnpm --dir apps/command-center build` → `previews/app/` (static explorer; JSON is inlined at build time, so rebuild after regenerating)
- Serve locally via `.claude/launch.json` → `previews-static` (port 4319) or `command-center` (vite dev, port 5176)
- Ports (4319/4320/5176) are claimed in the cross-space port registry (`~/Master-Managed/Project-Spaces/Project-System/docs/port-registry.md`) — claim there before adding a server; 4320 is pinned (Studio senders + `live.ts` hardcode it)

## Wrapped repos & rojo lanes

Five repos are wrapped read-only through `external-locations/code/` (symlinks into `~/Master-Managed/Repositories/Gaming/Roblox-Repositories/`). Two rojo lanes run in **opposite directions** — **syncback** (Studio is master, git is the record; needs rojo 7.7) and **code-first** (git is master, `rojo serve`/build; rojo 7.6.1). Never point a syncback project at a code-first place.

| Repo | Lane | Rojo pin | Role |
|---|---|---|---|
| `roblox-packages-mono` | code-first (pnpm · rbxtsc) | — | the `@trembus/*` package monorepo; registry source |
| `roblox-labs` | **syncback** | 7.7.0 | Studio-lab experiences (decision 0008): `user-interface-development`, `part-textures` |
| `soul-steel-universe` | **syncback** | 7.7.0 | universe world places (decision 0009): `hub`, `crystal-sanctum`, `lab-architecture`, `lab-emergent-behavior` |
| `soul-steel-official` | code-first | 7.6.1 | Steel City sub-game (`@trembus/steel-city`), git-as-master |
| `roblox-testing-environment` | code-first | 7.6.1 | `TrembusUITesting` — cross-platform UI/asset testing harness; maps `assets/library/` (Props, Rigs) |

The 7.7.0 / 7.6.1 split is **intentional**: syncback shipped in rojo 7.7, so only the syncback lanes pin it; the global fallback (7.6.1) lacks syncback, so run syncback from inside the repo (never from this planning root).

**Trembus-Game-Library (TGL)** is a **Roblox Package** (`rbxassetid://119571962868471`, v15; v16 pending = folding the staged normalized effects in) — **one grand library**, the Roblox-side distribution of the master Assets library: six content families (Effects, Props, Rigs, Accessories, Animations, Environment) plus nested packages under `00-Subpackages`. Its linked home copy lives in the **hub's `Workspace`** (`soul-steel-universe`); it is *not* an `@trembus/*` npm package and does **not** appear in `packages.json`. The package alone owns the library name (decision `0012-tgl-grand-package-model-and-satellite-naming`): satellites are renamed — `TGL-Staging` (crystal-sanctum's un-linked staging folder, Studio rename pending) and `TGL-Preview` (the rojo-built projection in `roblox-testing-environment`). Because syncback strips `PackageLink` (rojo#222), the ignore boundary follows **wherever a linked copy lives** — today the hub (`ignoreTrees: ["Workspace/Trembus-Game-Library"]`, pending) — while staging stays syncback-recorded; see decisions `0011` (as amended) + `0012`.

## Related

- Canonical framework: `~/Master-Managed/Project-Spaces/Project-System/`
- Reference consumer: `~/Master-Managed/Project-Spaces/Asset-Studio/`
- The wrapped repo's own instructions: `external-locations/code/roblox-packages-mono/CLAUDE.md`
- Labs repo (decision 0008): `external-locations/code/roblox-labs/` — Rojo 7.7 syncback serialization of the Studio lab experiences; the loop is in its README
- Universe-shell repo (decision 0009): `external-locations/code/soul-steel-universe/` — content-first syncback lane for the Soul Steel game universe's world places (hub, Crystal Sanctum, the two in-universe game labs); the code-first sub-game lane is `soul-steel-official` (`@trembus/steel-city`)
