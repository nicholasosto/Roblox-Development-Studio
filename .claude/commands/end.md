---
description: End-of-session reconciliation — sync the Command Center with _project/ and the Studio lanes, then capture high-value concepts
argument-hint: "[optional notes on what to prioritize capturing]"
allowed-tools: Bash(node tools/check-dashboard-drift.mjs:*), Bash(node .project-system/tools/render-hub.mjs:*), Bash(node .project-system/tools/validate.mjs:*), Bash(node tools/build-packages-registry.mjs:*), Bash(node tools/build-labs-status.mjs:*), Bash(pnpm --dir apps/command-center build:*), Bash(git status:*), Bash(git diff:*), Bash(git add:*)
---
Run the end-of-session reconciliation for **Roblox-Development-Studio**. Two halves, in order — do **not** skip half 2, it is the reason this ritual exists. (This does not quit the session; it's the wrap-up you run before you do.)

Extra priorities for the capture step, if any: **$ARGUMENTS**

## 1 · Detect drift (mechanical)
Run `node tools/check-dashboard-drift.mjs` and read the signals. If it prints "no drift", jump to step 3 — but still glance at the Studio-lane check in step 2's last bullet if Studio was open this session.

## 2 · Reconcile the Command Center (mechanical)
Resolve the signals **in order A → C → B** (fixing A/C is what dirties B, so commit last, once, covering everything):

- **Signal A — source edited, contracts not regenerated:** run `node .project-system/tools/render-hub.mjs` (graph + hub JSON). Sanity-check with `node .project-system/tools/validate.mjs --summary` if the corpus changed. If monorepo `package.json`s changed this session, run `node tools/build-packages-registry.mjs --check` and rebuild if stale.
- **Signal C — static bundle behind the contract:** run `pnpm --dir apps/command-center build` to refresh `previews/app/` (JSON is inlined at build time). Skip only if nothing a contract feeds changed — say so.
- **Signal B — regenerated but uncommitted:** do **not** auto-commit. Show `git status` + `git diff --stat -- previews/`, then **propose** a commit split by logical change and **wait for the user's explicit yes**. The commit is the human's call.
- **Studio-lane check (this workspace only):** if Roblox Studio was open this session, run `node tools/build-labs-status.mjs` and read the `syncback-due` / `dirty` counts. Any non-zero means the roblox-labs loop is owed (in Studio: File → Save to File As… → `places/<project>.rbxl`, then `rojo syncback` **in the roblox-labs repo** — code work happens there, not here). Also remind the user if an Edit-mode place mutation from this session still needs File → Publish; `ui-catalog.json` regenerates via the telemetry collector on ledger change, not by a CLI — if it's dirty, it just needs committing.

Re-run `node tools/check-dashboard-drift.mjs` to confirm the mechanical drift is cleared (only the awaiting-approval commit may remain).

## 3 · Capture high-value concepts (judgment — never skip)
Review **this session** for what would otherwise be re-derived next time: decisions made, non-obvious constraints discovered, corrections or preferences the user voiced, new patterns, live phase-state changes. Fold in any **$ARGUMENTS** priorities.

- **Durable cross-session knowledge** → write or update a file-memory (`memory/<slug>.md` + a one-line `MEMORY.md` pointer) per the memory conventions: one fact per file, correct `type`, absolute dates, link related notes with `[[…]]`. Update the existing file if one already covers it; don't duplicate.
- **Roblox platform/API knowledge** (engine behavior, API constraints, Studio quirks verified this session) → `roblox-dev:capture` into the Roblox Brain. Cross-domain or lore-adjacent concepts → the artificial-brain synthesis path. Only when something genuinely rises to that bar — both are heavier than a memory note.
- **Planning state shifted** → update the affected `_project/` entity's **Status**/sections with Edit (the guard validates); a genuinely new decision, session log, or other entity goes through `/new <kind> "<title>"` — never hand-written frontmatter.

Don't capture what the repo already records (code structure, git history, existing entities). If nothing clears the bar, say so plainly — do not invent concepts to look thorough.

## 4 · Report
Close with a tight summary: what was reconciled (commands run), the Studio-lane verdict (syncback owed or clear), what was captured (memories/brain notes written, entities touched), and anything left for the user — most importantly any commit awaiting approval or unpublished Studio state.
