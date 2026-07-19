---
title: "@trembus/animation-catalog"
status: active
updated: 2026-05-16
tags: { lane: ts }
---

# @trembus/animation-catalog

> **Status:** active (2026-05-16)

## Purpose

Typed composable animation catalog — logical names resolve to catalog entries with assetId, rig compatibility, length, priority, and status.

## Public API

`external-locations/code/roblox-packages-mono/packages/animation-catalog/src/index.ts` is the export surface.

## Dependencies

Live dependency data is generated, not transcribed — see the registry (`previews/dashboards/packages.json`).

## Consumers

See `consumedBy` in the registry. External consumers use `link:../roblox-packages-mono/packages/animation-catalog`.

## Notes

Carries its own `scripts/` (sync-from-sources, validate-catalog) that read the Soul-Steel assets tree through a project-space path — the only package with out-of-repo tooling reach.
