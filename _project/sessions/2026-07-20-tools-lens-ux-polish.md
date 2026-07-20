---
title: "Tools lens UX polish"
status: completed
updated: 2026-07-20
---

# Tools lens UX polish

> **Status:** completed (2026-07-20)

## Goal

Scan the command-center Tools lens for UX rough edges and land the agreed fixes — the six obvious ones plus dev auto-refresh of `labs-status.json` — without changing the lens's copy-only character.

## Success Criteria

- Studio-now distinguishes checking / offline / up, and stamps live data (`as of HH:MM:SS`, stale sessions show `Last seen Ns ago`) — verified against a real Studio session and a synthetic curl heartbeat.
- Copy confirmation flashes beside the toolbar it confirms (per-card), never in the panel header.
- Every probe/commit/snapshot stamp is relative (`21h ago`) with the absolute in `title`; the header badges `probe stale` past 24h.
- Experiences renders an actionable EmptyState when the probe finds zero projects; last-sync commit subjects are visible inline (ellipsized).
- `vite dev` regenerates `labs-status.json` on labs-repo changes, including commits, with no self-trigger loop from the probe's own `git status`.

## Source References

- `apps/command-center/src/ToolsPanel.tsx` · `src/time.ts` (new) · `src/styles/app.css` · `vite.config.ts` (`liveLabs()`)
- Scope deliberately skipped: live perf/health/log upgrades (collector untouched; `metrics`/`log`/`state` channels still tallied-and-dropped) — candidates for pipeline M3/M4 work.

## Decisions

- Relative-time helpers live in a shared `src/time.ts` (clipboard.ts precedent); `fmtWhen` stays in `labs.ts` for absolutes.
- `liveLabs()` is a sibling of `livePackages()`, not a refactor — but watches via plugin-local recursive `fs.watch`, because Vite's chokidar hard-ignores `**/.git/**` (append-only option), which would have made commit-driven refreshes impossible. Under `.git/` only `HEAD`, `packed-refs`, `refs/**` count; excluding `.git/index` prevents the probe's `git status` from self-triggering (verified quiet).
- Bonus fix found during verification: `.cc-panel--hub { display: block }` was overriding `[hidden]{display:none}`, leaving the empty Overview panel ~240px of dead flex space above every other lens on tall viewports. One-line `[hidden]` override added.
- `LIVE_URL` stays hardcoded — endpoint configurability remains parked at pipeline M4.

## Outputs

- Six UX fixes + `liveLabs()` plugin + the panel-gap fix; static bundle rebuilt into `previews/app/` after a fresh probe run.
- Verified live in dev: three Studio-now states, stale window (15–60s) and 60s prune, per-card flash, HMR on every `labs-status.json` change, `[live-labs]` watcher armed through the symlink's real path.

## Blockers

- none

## Next Action

Trigger the watcher's active path once through a genuine loop action (Studio save / syncback / commit in `roblox-labs`) and confirm the `[live-labs] labs status regenerated → reloading` log line.

## Handoff Notes

Collector-side data the lens still drops (`metrics` FPS/memory, `log` tail, `GET /` health tallies) was surveyed and declined this round — the scan notes live in the conversation; re-raise them when M3 (QA channel) shapes the collector anyway. `ui-catalog.json` picked up an identity rewrite from the live Studio session during verification (place `part-textures.rbxl`, placeId 0) — regenerable, commit or discard freely.
