---
title: "Start command and session lifecycle"
status: completed
updated: 2026-07-21
tags: { last-active: 2026-07-21T13:32, kos: "decisions, dashboards, memory" }
---

# Start command and session lifecycle

> **Status:** completed (2026-07-21)

## Goal

Ship the `/start` command and activate the session lifecycle: engram-style session entities opened by `/start`, closed by `/end`, with dangling-session detection and a one-shot orientation brief.

## Success Criteria

- `/start` exists as `.claude/commands/start.md` with Wake · Orient · Open passes and the engram-maintenance convention
- `/end` closes open sessions via a delimited `consumer-extension` block; the restored Command Center reconciliation block is back
- Config registers `last-active`/`kos` tags, scaffolds First-Principles Candidates, and enforces prose↔status at error level
- The scaffolder, validator, and guard all pass the verification battery (dry-runs, blocked half-flips, clean full flips)

## Source References

- plan: ~/.claude/plans/hello-your-awesomeness-can-golden-lake.md
- decisions/0010-session-lifecycle-activation
- .project-system/schema/project-config.schema.json (tagSpec), lib/md.mjs (flow-map-only tags)

## Decisions

- Engram tracking lives in registered `tags` (the contract's sanctioned open extension point), not top-level frontmatter — `last-active` + `kos` only; first-principles candidates are a body section because they are sentence-length and /end's Capture pass consumes them
- End states after /end are `completed|blocked|shelved`; `active|planned` = dangling (recorded as ADR 0010)
- The clobbered pre-template /end content (A→C→B reconciliation, Studio-lane check) restored as a second delimited consumer-extension block
- Post-review fixes: scaffold invocation split into two commands (inline `$(date …)` defeats the permission prefix rule — empirically confirmed); Studio-lane check reworded to direct syncback to each project's owning repo (build-labs-status v2 spans both syncback repos)

## First-Principles Candidates

- Vendored-by-discipline files with no automated drift check need in-file delimiters as their only clobber defense → memory
- A dormant status enum is free infrastructure: activating a declared-but-unused lifecycle needs zero framework changes → none yet

## Outputs

- `.claude/commands/start.md` — new Wake · Orient · Open command with engram-maintenance convention and KOS roster
- `.claude/commands/end.md` — two delimited `consumer-extension` blocks (session-lifecycle close; restored command-center reconciliation with repo-correct Studio-lane check)
- `project-system.config.json` — tagRegistry `last-active`/`kos`, session `scaffoldSections` (+First-Principles Candidates), sectionHint, `proseStatusEnforcement: error`
- `CLAUDE.md` — Session lifecycle section; hard-rule-4 ledger count fixed
- `_project/decisions/0010-session-lifecycle-activation.md` — the convention ADR (accepted)
- This session entity — the first lifecycle-opened-and-closed engram
- Regenerated hub/graph contracts + rebuilt `previews/app/` bundle

## Blockers

- none

## Next Action

Execute the upstream checklist (plan file, "Later: generalization" section) in `~/Master-Managed/Project-Spaces/Project-System`: both `start.md` variants, session-close folded into both `end.md` variants, preset tags in `init-config.mjs` + `docs/spec/schema.md`, then re-vendor to consumers.

## Handoff Notes

- After ANY re-vendor of commands from the template: `grep -rn "consumer-extension" .claude/commands/` and re-apply missing blocks from git history — no automated check protects command files.
- The KOS roster table in `start.md` is the canonical `kos` slug vocabulary; keep new tag values within it or extend the table deliberately.
- Never inline `$(…)` into documented command invocations — the permission matcher denies command substitution under prefix rules (see memory `no-command-substitution-in-allowed-tools`).
- Pre-existing owed work spotted in passing: `labs-status.json` shows crystal-sanctum `syncback-due` in the **soul-steel-universe** repo.
- Full design rationale + upstream checklist: `~/.claude/plans/hello-your-awesomeness-can-golden-lake.md`.
