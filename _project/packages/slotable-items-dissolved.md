---
title: "@trembus/slotable-items-dissolved"
status: incubating
updated: 2026-07-18
links:
  - { rel: supersedes, target: packages/slotable-items }
  - { rel: decided-in, target: decisions/0005-open-taxonomy-slotable-items }
tags: { lane: ts }
---

# @trembus/slotable-items-dissolved

> **Status:** incubating (2026-07-18)

## Purpose

Open-taxonomy rebuild (ADR [[0005-open-taxonomy-slotable-items]]) of slotable-items — runtime slot-category and item-kind registries; every pre-revamp export preserved.

## Public API

`external-locations/code/roblox-packages-mono/packages/slotable-items-dissolved/src/index.ts` is the export surface.

## Dependencies

Live dependency data is generated, not transcribed — see the registry (`previews/dashboards/packages.json`).

## Consumers

See `consumedBy` in the registry. Smoke-tested in `roblox-testing-environment`'s `src-slotable` lane.

## Notes

`0.2.0-rc.0`, awaiting cutover via the [[slotable-items-cutover]] pipeline. At cutover it renames back to `@trembus/slotable-items` and this entity's `supersedes` edge resolves.
