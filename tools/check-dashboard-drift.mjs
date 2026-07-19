#!/usr/bin/env node
// ============================================================================
// check-dashboard-drift.mjs — Command Center ⇄ sources drift detector (v1)
// ============================================================================
//
// PURPOSE
//   A DETECT-AND-WARN probe for the gap between the two sources of truth —
//   the planning graph (_project/) and the @trembus monorepo (read through
//   external-locations/code/roblox-packages-mono) — and the emitted Command
//   Center contracts. It never mutates anything and never fails a session —
//   it prints what is out of sync and the exact command that reconciles it,
//   then exits 0. Wired into the SessionStart + SessionEnd hooks
//   (.claude/settings.json).
//
//   Reconciliation itself — running render-hub / build-packages-registry,
//   committing, rebuilding the static bundle — stays a DELIBERATE act; this
//   tool only makes drift visible. Cf. the validate.mjs --summary
//   SessionStart hook: advisory, exit 0, never gates a session (a red tree
//   must not stop you opening one to fix it).
//
// LAYERED SIGNALS  (source → derived → committed → built)
//   A1 planning staleness  Delegates to `render-hub.mjs --check` — the
//                          AUTHORITY (date-insensitive content diff; exit 0 =
//                          in sync). Fires when _project/ was edited but the
//                          graph/hub JSON was never regenerated.
//                          fix → node .project-system/tools/render-hub.mjs
//   A2 registry staleness  Delegates to `build-packages-registry.mjs --check`
//                          (same discipline). Fires when the monorepo changed
//                          but packages.json was never regenerated.
//                          fix → node tools/build-packages-registry.mjs
//   B  uncommitted regen   `git status --porcelain` on previews/dashboards
//                          *.json. Fires when the JSON was regenerated but
//                          not committed.  fix → git add + commit
//   C  stale static bundle Dashboard JSON newer than the newest previews/app/
//                          build artifact (a heuristic mtime check — the dev
//                          server hot-reloads the JSON, the COMMITTED static
//                          site does not; the contracts are inlined at build
//                          time). fix → pnpm --dir apps/command-center build
//
//   A is upstream of B is upstream of C: fixing A dirties B; committing B can
//   stale C. The report lists them in that order so the fix sequence reads
//   top to bottom.
//
// ZERO-DEPENDENCY (node built-ins only: fs, path, child_process, url).
// READ-ONLY: both --check delegates do not write; git status does not write.
//
// Usage:
//   node tools/check-dashboard-drift.mjs           # verbose report (manual)
//   node tools/check-dashboard-drift.mjs --quiet   # silent when clean; prints only on drift (hook mode)
// ============================================================================

import { existsSync, readdirSync, statSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DASHBOARDS = join(ROOT, "previews/dashboards");
const GRAPH = join(DASHBOARDS, "roblox-development-studio-graph.json");
const HUB = join(DASHBOARDS, "roblox-development-studio-hub.json");
const PACKAGES = join(DASHBOARDS, "packages.json");
const APP_DIR = join(ROOT, "previews/app");
const APP_ENTRY = join(APP_DIR, "index.html");
const RENDER_HUB = join(ROOT, ".project-system/tools/render-hub.mjs");
const BUILD_REGISTRY = join(ROOT, "tools/build-packages-registry.mjs");

const QUIET = process.argv.slice(2).includes("--quiet");

function newestMtimeMs(paths) {
  let newest = 0;
  for (const p of paths) if (existsSync(p)) newest = Math.max(newest, statSync(p).mtimeMs);
  return newest;
}

// Shared shape for the two --check delegates: run the generator's own checker,
// surface its "check: …" diagnosis lines, stay silent when it can't run.
function delegateCheck(script, extraArgs) {
  if (!existsSync(script)) return undefined; // no generator here → can't judge
  const r = spawnSync(process.execPath, [script, "--check", ...extraArgs], { cwd: ROOT, encoding: "utf8" });
  if (r.error) return undefined; // couldn't run the checker → don't cry wolf
  if (r.status === 0) return null; // "check: in sync"
  const detail = `${r.stdout || ""}\n${r.stderr || ""}`
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.startsWith("check:"))
    .map((l) => l.replace(/^check:\s*/, ""))
    .join("; ");
  return { detail };
}

// --- Signal A1: planning-graph staleness — delegate to the authority (render-hub --check) ---
function signalHubStale() {
  const c = delegateCheck(RENDER_HUB, ["--root", ROOT]);
  if (!c) return null;
  return {
    label: "_project/ edited but planning contracts NOT regenerated",
    detail: c.detail || "render-hub --check reports the graph/hub JSON is out of sync with _project/",
    fix: "node .project-system/tools/render-hub.mjs",
  };
}

// --- Signal A2: packages-registry staleness — delegate to build-packages-registry --check ---
function signalRegistryStale() {
  const c = delegateCheck(BUILD_REGISTRY, []);
  if (!c) return null;
  return {
    label: "monorepo changed but packages.json NOT regenerated",
    detail: c.detail || "build-packages-registry --check reports packages.json is out of sync with the monorepo",
    fix: "node tools/build-packages-registry.mjs",
  };
}

// --- Signal B: regenerated but uncommitted ---
function signalUncommitted() {
  const r = spawnSync("git", ["status", "--porcelain", "--", DASHBOARDS], { cwd: ROOT, encoding: "utf8" });
  if (r.status !== 0 || !r.stdout) return null; // not a repo / git absent / clean → skip
  const dirty = r.stdout.split("\n").filter((l) => l.trim() && l.trim().endsWith(".json")).length;
  if (!dirty) return null;
  return {
    label: `${dirty} dashboard contract file(s) regenerated but UNCOMMITTED`,
    detail: "previews/dashboards/*.json differs from HEAD — the render happened but was never persisted",
    fix: "git add previews/dashboards && git commit",
  };
}

// --- Signal C: committed contract newer than the built static bundle (heuristic) ---
function signalBundleStale() {
  if (!existsSync(APP_ENTRY)) return null; // no static build in this checkout → skip
  const contractNewest = newestMtimeMs([GRAPH, HUB, PACKAGES]);
  if (!contractNewest) return null;
  // Compare against the newest build artifact (index.html + hashed asset chunks),
  // not index.html alone — a real `vite build` restamps the chunks even when the
  // entry HTML is byte-stable.
  const artifacts = [APP_ENTRY];
  const assetsDir = join(APP_DIR, "assets");
  if (existsSync(assetsDir)) for (const f of readdirSync(assetsDir)) artifacts.push(join(assetsDir, f));
  if (contractNewest <= newestMtimeMs(artifacts)) return null;
  return {
    label: "static Command Center bundle is BEHIND the contracts (heuristic)",
    detail: "previews/app/ was built before the current dashboards JSON — the dev server hot-reloads, the committed static site does not",
    fix: "pnpm --dir apps/command-center build",
  };
}

function main() {
  const signals = [signalHubStale(), signalRegistryStale(), signalUncommitted(), signalBundleStale()].filter(Boolean);

  if (!signals.length) {
    if (!QUIET) console.log("[dashboard-drift] ✓ Command Center in sync with _project/ + monorepo — no drift");
    return; // advisory: always exit 0
  }

  const n = signals.length;
  console.log(`[dashboard-drift] ⚠ ${n} drift signal${n > 1 ? "s" : ""} — the Command Center is behind its sources:`);
  for (const s of signals) {
    console.log(`  • ${s.label}`);
    console.log(`      ${s.detail}`);
    console.log(`      → fix: ${s.fix}`);
  }
  console.log("  (advisory — nothing was changed; reconcile with the fixes above)");
  // Never process.exit(1): this must not gate a session (cf. validate.mjs --summary).
}

main();
