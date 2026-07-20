---
title: "@trembus/camera"
status: incubating
updated: 2026-07-20
tags: { lane: ts }
---

# @trembus/camera

> **Status:** incubating (2026-07-20)

## Purpose

State-machine camera system — follow, orbit, fixed, free-cam, and cinematic states with smooth 0.3s CFrame transition blending, plus shake presets (earthquake, explosion, impact) that compose onto either the custom or the Roblox default camera.

## Public API

`external-locations/code/roblox-packages-mono/packages/camera/src/index.ts` is the export surface.

## Dependencies

Live dependency data is generated, not transcribed — see the registry (`previews/dashboards/packages.json`).

## Consumers

See `consumedBy` in the registry. No consumers yet — incubating until a game project wires it in (`examples/camera-controller.example.ts` shows the Flamework wrapper pattern).

## Notes

Recovered 2026-07-20 from the pre-monorepo archive (`soul-steel-gold`'s `src/client/camera/`, extracted copy in `Archive/Brain-Extracted-Post-Processing/camera/`) and migrated as-is with one adaptation: the game-local `createLogger` was swapped for [[logger]]'s `Logger.create`. The old Flamework `camera-controller.ts` wrapper deliberately stayed behind — packages are framework-agnostic per the [[0004-one-concern-per-package]] era conventions; its wiring survives as the example file. Design background lives in the roblox-brain note `camera-state-machine-pattern.md`.
