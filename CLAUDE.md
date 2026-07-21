# Roblox-Development-Studio (Project-System consumer)

Planning space for the `@trembus` Roblox package platform. Wraps `roblox-packages-mono` and the Studio-lab repo `roblox-labs` via `external-locations/code/`. **Code work happens in the repos; planning happens here.**

## Hard rules

1. **Entities only via tooling** — create `_project/` files with `/new <kind> "<title>"` (or `node .project-system/tools/new-entity.mjs`). Never hand-write frontmatter; fill scaffolded sections with Edit afterward. A PreToolUse guard validates every `_project/` write.
2. **Never edit `.project-system/`** — it is the vendored framework, drift-checked against `Project-Spaces/Project-System`. If it needs a change, change canonical and re-vendor.
3. **Never mutate code through `external-locations/`** — those are read-through windows. Edit `roblox-packages-mono` / `roblox-labs` in their own repos/workspaces.
4. **Decisions are serial** — `_project/decisions/0001…0010` exist; ADR 0005 is the slotable-items open-taxonomy decision cited by the repo. Do not renumber.

## Kinds

Standard six (decision, report, pipeline, roadmap, session, workflow) plus the domain kind **`package`** (`_project/packages/`, status `proposed|incubating|active|superseded|retired`) — one entity per `@trembus/*` package, carrying planning state only. Factual data (versions, deps, consumers) lives in the generated registry `previews/dashboards/packages.json`; never transcribe dep lists into entities.

Tags: `lane: ts | luau` on package entities. The Luau lane is **reserved** — no Wally/Rokit/Selene/StyLua tooling lands until the first real Luau package passes the one-concern gate (decision `0007-dual-lane-ts-luau`, roadmap M4).

## Session lifecycle

`/start "<goal>"` opens a session entity (status `active`); `/end` closes it — backfills Outputs/Blockers/Next Action/Handoff Notes and flips to `completed|blocked|shelved` (decision `0010-session-lifecycle-activation`). A session still `planned|active` when a new chat starts was never /end-ed; `/start` surfaces it. Tags `last-active`/`kos` are command-maintained (single-line flow map; quote comma values); first-principles candidates go in the body section. Note: `.claude/commands/end.md` carries local `consumer-extension` blocks — re-apply after any re-vendor (grep "consumer-extension").

## Dashboards

- `node .project-system/tools/render-hub.mjs` → `previews/dashboards/roblox-development-studio-{graph,hub}.json`
- `node tools/build-packages-registry.mjs` → `previews/dashboards/packages.json` (reads the monorepo through `external-locations/code/`; run after any package.json change; `--check` probes staleness)
- `node tools/build-labs-status.mjs` → `previews/dashboards/labs-status.json` (probes both syncback repos — `roblox-labs` and `soul-steel-universe` — through `external-locations/code/`; time-based status — re-run for fresh state, no `--check`)
- `node tools/telemetry-collector.mjs` → long-running collector on `127.0.0.1:4320`; receives `@trembus/studio-telemetry` envelopes from Studio, rewrites `previews/dashboards/ui-catalog.json` on ledger change (M1), and serves live session heartbeats at `GET /live` for the Tools lens's "Studio now" card (M2 — in-memory by design, never a committed file)
- `pnpm --dir apps/command-center build` → `previews/app/` (static explorer; JSON is inlined at build time, so rebuild after regenerating)
- Serve locally via `.claude/launch.json` → `previews-static` (port 4319) or `command-center` (vite dev, port 5176)

## Related

- Canonical framework: `~/Master-Managed/Project-Spaces/Project-System/`
- Reference consumer: `~/Master-Managed/Project-Spaces/Asset-Studio/`
- The wrapped repo's own instructions: `external-locations/code/roblox-packages-mono/CLAUDE.md`
- Labs repo (decision 0008): `external-locations/code/roblox-labs/` — Rojo 7.7 syncback serialization of the Studio lab experiences; the loop is in its README
- Universe-shell repo (decision 0009): `external-locations/code/soul-steel-universe/` — content-first syncback lane for the Soul Steel game universe's world places (hub, Crystal Sanctum, the two in-universe game labs); the code-first sub-game lane is `soul-steel-official` (`@trembus/steel-city`)
