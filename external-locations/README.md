# external-locations/

Symlinks to directories that live outside this project space. They give CLAUDE.md, docs, and tooling stable in-tree paths to reference, without leaking absolute paths everywhere.

| Link | Target | Purpose |
|---|---|---|
| `code/` | `/Users/nicholasosto/Master-Managed/Repositories/Gaming/Roblox-Repositories` | All Roblox code. The wrapped repo is `roblox-packages-mono` (the @trembus/* package platform this space plans); siblings `soul-steel-official` and `roblox-testing-environment` are its `link:` consumers. |
| `assets/` | `/Users/nicholasosto/Master-Managed/Assets` | TGL-conformant production library + AI-output staging + master asset-ID registry. |

## Contract

- **Read-through windows**: treat these as references, not project content. Edits made through these symlinks land in the source folders.
- **Don't mutate via symlink in this project space**: if you need to change code or assets, work in the source folder directly so it's clear which workspace authored the change.
- **Stable indirection**: prefer in-tree references like `external-locations/code/roblox-packages-mono/...` in CLAUDE.md, docs, and tooling. Avoid embedding the absolute `/Users/...` paths.
- **One-level deep**: `code/` points at the Roblox-Repositories parent rather than at each child individually, so reorganizing children (renaming, splitting, adding) doesn't require updating this folder.

## Read-only exception

Space tooling (`tools/build-packages-registry.mjs`) **reads** through `code/` to derive the packages registry — that is the read-through window working as intended. Nothing in this space writes through these links.
