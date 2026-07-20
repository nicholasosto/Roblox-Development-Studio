---
title: "Packages dossier master-detail"
status: completed
updated: 2026-07-20
---

# Packages dossier master-detail

> **Status:** completed (2026-07-20)

## Goal

Rebuild the Packages lens's browse surface as the component library's "Package Dossier" example (Examples/Package Dossier, Trembus-Component-Library Storybook): a selectable rail beside an always-visible dossier, replacing the card grid and Dialog inspector.

## Success Criteria

- Rail lists the filtered packages (tier-grouped per the existing Switch) with status dots; selecting swaps the dossier; selection survives filtering (rail just drops the highlight).
- Dossier carries the example's chrome over REAL registry fields only: header + copy actions (pnpm add / link / dir path / npm ↗), status chips, meta strip, tier/cutover Callout, a Brief Reference (Setup commands + shipped Docs, docs collapsed), dependency tables with cross-nav links, and the ego-graph Neighborhood.
- Summary header, filter bar + chips, and the whole dependency graph are untouched; graph package-clicks select the dossier, overlay-clicks still filter.

## Source References

- Example: `Trembus-Component-Library/packages/ui/src/examples/packageDossier/` (PackageDossier.stories.tsx · toBrief.ts · packages.ts)
- Landed in: `apps/command-center/src/PackageDossier.tsx` (new) · `PackagesExplorer.tsx` · `packages.ts` (`dossierBrief`) · `styles/app.css` (`cc-dossier-*`)

## Decisions

- Master-detail replaces both the card grid and the Dialog inspector (Nicholas's call); theme stays `dark` — the example's pinned `reliquary` theme ships in the installed @trembus/ui but was declined for now.
- The Brief renders only registry truth: Setup commands + shipped docs. The example's API-surface sections (Types/Interfaces/Functions, "N exports" stat) have no registry source and were omitted, not mocked — a future `build-packages-registry` enhancement could extract exports.
- Selection is an id with pure-derivation fallback (no effect): unknown/filtered-out ids keep their dossier ("chosen deliberately"), empty registry falls back to the rail's first row.
- Dead CSS from the removed card/dialog surfaces was excised; `cc-pkg-grid`/`cc-pkg-card__head|name|desc` survive as shared vocabulary for the Tools + Catalog lenses.

## Outputs

- The dossier lens, verified live: rc cutover Callout with supersedes/superseded-by cross-links (both directions), docs disclosure, Table.Empty consumed-by, package/game-repo badges, filter-survival, zero console errors; static bundle rebuilt into `previews/app/`.

## Blockers

- none

## Next Action

Consider a registry enhancement emitting per-package `updated` (git mtime) and a public-API census so the dossier's meta strip can match the example's "Updated · Public API" facts.

## Handoff Notes

The rail reuses the existing filter state — the depends-on/consumed-by chips that used to live on cards are now reachable only via the filter Selects and graph overlay clicks. If card-style at-a-glance chips are missed, they'd return as rail-item adornments, not a second grid.
