---
title: "Tools lens improvements with the TCL Command Bar"
status: completed
updated: 2026-07-26
tags: { last-active: 2026-07-26T04:34, kos: "command-center, trembus-skills, dashboards" }
---

# Tools lens improvements with the TCL Command Bar

> **Status:** completed (2026-07-26)

## Goal

Improve the command-center's Tools section — assess what the Tools lens does today, where it falls
short, and rework it around the new `CommandBar` component in the Trembus Component Library
(`@trembus/ui`, already a dependency at ^0.10.0).

## Success Criteria

- The current Tools lens is assessed against what it is actually for — each surface it exposes
  named, with the friction in reaching it stated concretely (not "it could be nicer").
- `CommandBar`'s contract is read from source (props, actions, keyboard model) and its fit for the
  Tools lens judged explicitly — adopt or reject, with the reason recorded.
- If adopted, the Tools lens is rebuilt around it and verified running (`command-center` dev server,
  port 5176), not just type-checked.
- No new local reimplementation of anything TCL already ships — TCL is the source, this repo consumes.

## Source References

- `apps/command-center/src/tools/ToolsPanel.tsx` — the Tools lens today; `App.tsx` for how it mounts
- `~/Master-Managed/Repositories/Trembus-Component-Library/packages/ui/src/components/CommandBar/`
  — `CommandBar.tsx` · `.contract.ts` · `.stories.tsx` · `.test.tsx`
- `@trembus/ui` ^0.10.0 (TCL `packages/ui` is at 0.10.0 — CommandBar should be in the installed copy)
- Prior engram: [[2026-07-20-tools-lens-ux-polish]]
- `trembus-consumer` skill (component chooser, tokens, theming) · `.claude/launch.json` → `command-center`

## Decisions

- The premise shifted on contact: `CommandBar` is **already adopted** — `CommandDock` (landed in
  `6efb7ba`, the most recent commit) is a CommandBar over the `commands.ts` roster. So this is a
  fit review of a live adoption, not a "should we use it" evaluation.
- Generators become **one disclosing `Generate` menu** rather than five flat top-level commands —
  the group carrying the most-run commands was the one overflow ate first, and a menu matches the
  shape every other group in the dock already has.
- The dock's copy-failure fallback **shows the command in its own readout** instead of pointing at
  a hover. `Command` carries no title/description field, so the hover the message promised does not
  exist on this bar (it does everywhere else in the lens, via `title` attr or `Tooltip`).

## First-Principles Candidates

- Overflow order is a **value judgment encoded as array order** — whatever group is built last is
  what the user loses first, so a command roster must be ordered by what you would give up, not by
  topic → memory
- A component's failure message must only name affordances **that component** has; inheriting the
  phrasing from a sibling surface ("shows on hover") ships a lie about the UI → memory
- A hint computed once at module load must express a **state**, not a **stamp** — "6d ago" freezes
  while the lens ticks on around it, "stale" stays true → memory

## Outputs

- Assessment of the Tools lens's CommandBar adoption — three findings confirmed against the live
  app, two fixed here, one left as an upstream TCL candidate.
- `apps/command-center/src/tools/commands.ts` — `generatorGroup()` folded into a single `Generate`
  menu; each leaf hints what it produces, flagged `· stale` past the 24h threshold (the same
  threshold the toolbox badge uses).
- `apps/command-center/src/tools/CommandDock.tsx` — copy-failure readout now carries the shell line.
- Verified live on `command-center` (5176): all four groups on the bar (1022px of 1205 available,
  `overflow: false` at a 1276px viewport — Generators had been collapsing at every width), the
  `Generate` menu opens upward with five hinted leaves, invoking one announces `Copied <cmd>`.
  `tsc --noEmit` clean.

## Blockers

- none

## Next Action

Decide the dock's **selection-awareness** question: the rail selects an experience but the dock's
Dry-run / Apply / Full loop submenus still list all six projects, duplicating the dossier's own
context copy row. Either the dock reflects the selection (its leading command acts on it) or the
per-project submenus leave the dock — it should not be both surfaces at once.

## Handoff Notes

_(reconstructed at close-out, 2026-07-26)_

- Both edits are **uncommitted** — `apps/command-center/src/tools/CommandDock.tsx` and
  `commands.ts` show as ` M` in the working tree. They match the Outputs above; committing
  them is the operator's call.
- The Next Action above (dock selection-awareness) is a **design fork, not a bug** — the dock
  and the dossier both carry per-project context rows today. Whichever way it resolves, one
  surface loses its copy row.
- One finding was left as an **upstream TCL candidate**, not fixed here: `Command` carries no
  title/description field, so a CommandBar cannot offer hover detail the way the rest of the
  lens does.
- Three First-Principles Candidates above are unharvested (all → memory); this close-out did
  not run /end's Capture pass.
