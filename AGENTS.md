# Roblox-Development-Studio (Project-System consumer)

Planning space for the `@trembus` Roblox package platform. Wraps `roblox-packages-mono` via `external-locations/code/`. **Code work happens in the repo; planning happens here.**

## Hard rules

1. **Entities only via tooling** — create `_project/` files with `/new <kind> "<title>"` (or `node .project-system/tools/new-entity.mjs`). Never hand-write frontmatter; fill scaffolded sections with Edit afterward. A PreToolUse guard validates every `_project/` write.
2. **Never edit `.project-system/`** — it is the vendored framework, drift-checked against `Project-Spaces/Project-System`. If it needs a change, change canonical and re-vendor.
3. **Never mutate code through `external-locations/`** — those are read-through windows. Edit `roblox-packages-mono` in its own repo/workspace.
4. **Decisions are serial** — `_project/decisions/0001…0007` exist; ADR 0005 is the slotable-items open-taxonomy decision cited by the repo. Do not renumber.

## Kinds

Standard six (decision, report, pipeline, roadmap, session, workflow) plus the domain kind **`package`** (`_project/packages/`, status `proposed|incubating|active|superseded|retired`) — one entity per `@trembus/*` package, carrying planning state only. Factual data (versions, deps, consumers) lives in the generated registry `previews/dashboards/packages.json`; never transcribe dep lists into entities.

Tags: `lane: ts | luau` on package entities. The Luau lane is **reserved** — no Wally/Rokit/Selene/StyLua tooling lands until the first real Luau package passes the one-concern gate (decision `0007-dual-lane-ts-luau`, roadmap M4).

## Dashboards

- `node .project-system/tools/render-hub.mjs` → `previews/dashboards/roblox-development-studio-{graph,hub}.json`
- `node tools/build-packages-registry.mjs` → `previews/dashboards/packages.json` (reads the monorepo through `external-locations/code/`; run after any package.json change; `--check` probes staleness)
- `pnpm --dir apps/command-center build` → `previews/app/` (static explorer; JSON is inlined at build time, so rebuild after regenerating)
- `node tools/telemetry-collector.mjs` → long-running collector on `127.0.0.1:4320` (Studio telemetry envelopes → `previews/dashboards/ui-catalog.json`, live heartbeats at `GET /live`)
- Serve locally via `.claude/launch.json` → `previews-static` (port 4319) or `command-center` (vite dev, port 5176)
- Ports (4319/4320/5176) are claimed in the cross-space port registry (`~/Master-Managed/Project-Spaces/Project-System/docs/port-registry.md`) — claim there before adding a server

## Related

- Canonical framework: `~/Master-Managed/Project-Spaces/Project-System/`
- Reference consumer: `~/Master-Managed/Project-Spaces/Asset-Studio/`
- The wrapped repo's own instructions: `external-locations/code/roblox-packages-mono/AGENTS.md`
