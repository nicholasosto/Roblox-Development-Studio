---
title: "Add a package"
status: active
updated: 2026-07-19
links:
  - { rel: references, target: decisions/0004-one-concern-per-package }
---

# Add a package

> **Status:** active (2026-07-19)

## Purpose

A new `@trembus` package goes from proposal to built, linked, and recorded — one concern per package, every time. Swimlane transcription of the repo SOP (`external-locations/code/roblox-packages-mono/docs/sops/adding-a-package.md`).

## Workflow

```json
{
  "caption": "A new @trembus package scaffolded, built, consumer-linked, and recorded.",
  "lanes": [
    { "id": "you", "label": "You", "kind": "human" },
    { "id": "tooling", "label": "Repo tooling", "kind": "tool" }
  ],
  "steps": [
    { "id": "gate", "lane": "you", "label": "One-concern proposal gate", "detail": "State the single concern; if the proposal needs an 'and', it is two packages", "note": "Decision 0004. Variants (Flamework / Rojo / React / internal deps) are declared here too.", "to": ["scaffold"] },
    { "id": "scaffold", "lane": "you", "label": "Scaffold packages/<name>", "detail": "src/, package.json, tsconfig.json; main out/init.lua, types out/index.d.ts", "outputs": [{ "label": "packages/<name>/", "op": "create" }], "to": ["wire"] },
    { "id": "wire", "lane": "you", "label": "Wire dependencies", "detail": "Peers + workspace:* dev mirrors; peerDependenciesMeta for optional integrations", "note": "Decision 0003 — never direct dependencies for shared libs.", "to": ["install"] },
    { "id": "install", "lane": "tooling", "label": "pnpm install (workspace root)", "to": ["build"] },
    { "id": "build", "lane": "tooling", "label": "pnpm --filter @trembus/<name> build", "detail": "rbxtsc emits out/", "outputs": [{ "label": "packages/<name>/out/", "op": "create" }], "to": ["smoke"] },
    { "id": "smoke", "lane": "you", "label": "Consumer link: smoke test", "detail": "Add link: dep in roblox-testing-environment and build it", "to": ["record"] },
    { "id": "record", "lane": "you", "label": "Commit + CLAUDE.md table row", "outputs": [{ "label": "CLAUDE.md", "op": "modify" }], "to": ["registry"] },
    { "id": "registry", "lane": "tooling", "label": "Regenerate packages registry", "detail": "node tools/build-packages-registry.mjs (this space)", "outputs": [{ "label": "previews/dashboards/packages.json", "op": "modify" }], "to": [] }
  ]
}
```
