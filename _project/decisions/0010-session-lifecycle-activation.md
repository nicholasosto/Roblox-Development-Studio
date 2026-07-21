---
title: "Session lifecycle activation"
status: accepted
updated: 2026-07-21
---

# Session lifecycle activation

> **Status:** accepted (2026-07-21)

## Context

The session kind declares a full lifecycle (`planned → active → blocked → completed → shelved`) that was never exercised: all six pre-existing sessions were hand-created retroactively at `completed`. `/end` produced only an in-chat report — no durable marker recorded that a session was properly closed, so a new session could not detect dangling (un-ended) work. There was also no open-of-session ritual bringing the workspace's context systems and the previous handoff front and center.

## Decision

- `/start "<goal>"` opens an **engram-style session entity** via `new-entity.mjs session … --status active` — dense tracking in minimal space: registered tags `last-active` (`YYYY-MM-DDTHH:MM`, intra-day recency) and `kos` (quoted, comma-separated slugs of context systems actually used; vocabulary = the roster in `start.md`), plus a scaffold-only `First-Principles Candidates` body section that `/end`'s Capture pass consumes as the session's export queue.
- `/end` closes the open session (propose-then-apply): backfills Outputs/Blockers/Next Action/Handoff Notes, reconciles the tags, and flips to an end state. **Legal end states: `completed | blocked | shelved`; `planned | active` after a session ends = dangling**, surfaced by `/start`'s wake-check next time.
- `proseStatusEnforcement.rollout` tightened `warn → error` — the lifecycle now exercises status flips, so the paired frontmatter + `> **Status:**` prose edit is guard-enforced (one Edit spanning both lines).
- `.claude/commands/end.md` diverges from the consumer template via two delimited `consumer-extension` blocks (session-lifecycle; command-center-reconciliation) pending upstream into Project-System.

## Consequences

- Dangling work becomes visible and machine-checkable; the wake-check is exact, not heuristic.
- Every status flip must be a paired edit — the guard now blocks sloppy half-flips anywhere in `_project/`.
- One vendored-by-discipline command file diverges until upstreamed; re-vendoring must re-apply the delimited blocks (grep `consumer-extension`).

## Options considered

- **SessionEnd-hook auto-close** — rejected: engines validate, they never mutate; a hook cannot judge which end state the work earned.
- **Separate `/close` command** — rejected: `/end` is already the closing ritual; two commands is two things to forget.
- **Auto-applied status flip in `/end`** — rejected: the propose-don't-apply ethos; the close is offered in the checklist and applied on approval.
- **Sentinel state file (consciousness-on style)** — rejected: an off-contract state surface when the session entity itself can carry the marker.

## Cites

- `.claude/commands/start.md` (the wake/orient/open procedure and engram-maintenance convention)
- `.claude/commands/end.md` (`consumer-extension: session-lifecycle` block)
- `~/Master-Managed/Project-Spaces/Project-System/templates/consumer/.claude/commands/end.md` (the vendored base this extends)
- `project-system.config.json` (tagRegistry `last-active`/`kos`, session `scaffoldSections`, rollout tighten)

## Re-open if

Upstreaming into canonical Project-System lands (the extension blocks retire and this becomes framework behavior), or the lifecycle proves too heavy for short sessions in practice.
