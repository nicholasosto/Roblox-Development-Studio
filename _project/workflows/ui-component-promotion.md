---
title: "UI component promotion"
status: active
updated: 2026-07-19
links:
  - { rel: references, target: decisions/0008-studio-native-lab-lane }
---

# UI component promotion

> **Status:** active (2026-07-19)

## Purpose

The promotion path for Studio-native work, per [[0008-studio-native-lab-lane]]: a component moves lab prototype → cataloged → proven → productized (TS or Luau lane), and its texture assets move BLK → FNL with upload only at FNL.

## Workflow

<!-- lanes: who acts; kind is one of human, ai, system, tool, neutral.
     steps: each needs a lane + label. Optional: status (done|active|pending|blocked|skipped)
     tints the card; detail shows on the card; note shows in the inspector when the step is
     clicked; to[] lists the next step id(s) ([] marks a terminal step); outputs lists files the
     step writes — "path" or { label, op } with op create|modify|delete (drawer shows +/~/−). -->
```json
{
  "caption": "A lab prototype becomes a cataloged, proven, productized component with FNL assets.",
  "lanes": [
    { "id": "agent", "label": "Agents (Codex / Claude)", "kind": "ai" },
    { "id": "you", "label": "You", "kind": "human" },
    { "id": "tooling", "label": "Tooling (Rojo / Open Cloud)", "kind": "tool" }
  ],
  "steps": [
    { "id": "prototype", "lane": "agent", "label": "Build kit in lab place", "status": "done", "detail": "Studio MCP, free-form; GenerationManifest required (TGL status BLK)", "note": "Masters in ReplicatedStorage.UIMockups; previews deployed to StarterGui. No uploads at this stage.", "to": ["catalog"] },
    { "id": "catalog", "lane": "agent", "label": "Register catalog entry", "status": "active", "detail": "Attributes: Component, State=prototype, SourceGuiPath, Variants", "note": "UIStudio.Catalog entry + template instance; the in-place ledger both agents maintain (contract v1 in decision 0008).", "to": ["qa"] },
    { "id": "qa", "lane": "you", "label": "Prove in lab rigs", "status": "pending", "detail": "Icon / tile-state / motion labs; set State=proven", "note": "The labs are the QA rigs: pixel rulers, tint/state/fallback probes, reduced-motion checks, texture galleries.", "to": ["export", "fnl-assets"] },
    { "id": "export", "lane": "tooling", "label": "Syncback to roblox-labs", "status": "pending", "detail": "rojo syncback; git history begins", "outputs": [{ "label": "roblox-labs/<experience>/", "op": "modify" }], "to": ["decide-lane"] },
    { "id": "fnl-assets", "lane": "tooling", "label": "Promote assets BLK→FNL", "status": "pending", "detail": "Open Cloud upload at FNL only; record rbxassetid in manifest", "to": ["productize"] },
    { "id": "decide-lane", "lane": "you", "label": "Choose production lane", "status": "pending", "detail": "rbx-ui React (ts) vs instance-template + Luau controller (luau)", "note": "First Luau-lane promotion triggers the M4 lane scaffold per decision 0007.", "to": ["productize"] },
    { "id": "productize", "lane": "agent", "label": "Implement package in mono", "status": "pending", "detail": "State=promoted; catalog entry links the package", "outputs": [{ "label": "roblox-packages-mono/…", "op": "create" }], "to": [] }
  ]
}
```
