# Roblox-Development-Studio

Planning layer for the `@trembus` Roblox package platform. This space is a **Project-System consumer**: it wraps the code repo `roblox-packages-mono` (via `external-locations/code/`) and holds the plans, decisions, and dashboards that don't belong inside a package repo.

| Where | What |
|---|---|
| `_project/` | The planning graph — decisions (ADRs 0001+), packages, pipeline, roadmap, workflows, sessions, reports |
| `external-locations/code/roblox-packages-mono/` | The wrapped monorepo (read-through window; edit code in the repo, not through the symlink) |
| `previews/dashboards/` | Emitted JSON contracts — framework graph/hub + the packages registry |
| `previews/app/` | The built command-center (packages explorer) — serve `previews/` statically |
| `apps/command-center/` | The explorer app source (Vite + React) |
| `tools/` | Space-owned zero-dep generators (`build-packages-registry.mjs`, drift check) |
| `.project-system/` | Vendored framework — **never edit**; drift-checked against canonical |

## Daily commands

```bash
# Validate the planning graph (0 errors expected)
node .project-system/tools/validate.mjs

# Re-render the framework dashboards (graph + hub JSON)
node .project-system/tools/render-hub.mjs

# Regenerate the packages registry after any package.json change in the monorepo
node tools/build-packages-registry.mjs

# Rebuild the explorer static site
pnpm --dir apps/command-center build
```

New planning entities are created only via `/new <kind> "<title>"` or `node .project-system/tools/new-entity.mjs` — never hand-written (the guard hook enforces this).

## Founding decisions

ADRs `0001`–`0005` are backfilled from the monorepo's real history (git-grounded dates); `0005-open-taxonomy-slotable-items` homes the previously dangling "ADR 0005" citation. `0006` records this space's founding; `0007` records the dual-lane TS + Luau strategy (Luau lane reserved, scaffolds on first package).
