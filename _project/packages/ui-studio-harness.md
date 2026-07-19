---
title: "@trembus/ui-studio-harness"
status: proposed
updated: 2026-07-19
links:
  - { rel: decided-in, target: decisions/0008-studio-native-lab-lane }
tags: { lane: luau }
---

# @trembus/ui-studio-harness

> **Status:** proposed (2026-07-19)

## Purpose

Reusable Studio-lab spine extracted from the "User Interface Development" place: versioned request protocol (operation allowlist, payload caps), player profile persistence with DataStore→memory fallback, deterministic fixtures, per-player diagnostics attributes, and catalog snapshotting — so every lab place runs the same harness instead of re-growing one.

## Public API

Currently place-embedded, not yet a package: `ReplicatedStorage.UIStudio.Shared.{Protocol, InventoryModel, ProfileSchema}`, `ServerScriptService.UIStudioServer`, `ServerStorage.UIStudio.{Fixtures, PersistenceStore}`, remotes `UIStudio.Remotes.{Request, StateChanged}`. Extraction shape is decided at promotion time.

## Dependencies

None today (pure Luau + Roblox services). Post-extraction, factual dependency data lives in the generated registry, per house rule.

## Consumers

Prospective — lab places: "User Interface Development" (today), "Part Textures" (if it gains a script layer), future labs. Rule of two: extraction starts when a second place needs the harness.

## Notes

First credible **M4 candidate** ([[0007-dual-lane-ts-luau]]); direction set in [[0008-studio-native-lab-lane]]. Open one-concern question per [[0004-one-concern-per-package]]: protocol + persistence + fixtures may be two or three packages (`lab-protocol`, `profile-store`, `lab-fixtures`) — resolve at extraction, not before. `lane: luau` is intentional: promoting this harness is what un-reserves the Luau lane.
