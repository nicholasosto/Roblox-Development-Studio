#!/usr/bin/env node
// ============================================================================
// build-labs-status.mjs — Roblox-Development-Studio sync-lane status probe (v2)
// ============================================================================
//
// ZERO-DEPENDENCY Node ESM prober (node built-ins only: fs, path, url,
// child_process). Companion to build-packages-registry.mjs; feeds the
// Command Center's Tools lens.
//
// v2: probes BOTH content-first syncback repos through the read-only
// symlinks (NEVER writes into them):
//   external-locations/code/roblox-labs           (decision 0008 — lab experiences)
//   external-locations/code/soul-steel-universe   (decision 0009 — game-universe shell)
// and emits previews/dashboards/labs-status.json — a moment-in-time status
// snapshot of every lab/place serialization loop:
//
//   toolchain   rojo pins parsed from each repo's rokit.toml (and the
//               monorepo's, for comparison), the rojo/rokit versions that
//               actually resolve, and whether `rojo syncback` is available
//   labs        the roblox-labs repo block: branch, HEAD, dirty count,
//               last 5 commits   (name kept from v1 — the lens reads it)
//   universe    the soul-steel-universe repo block, same shape
//   projects    every <dir>/default.project.json across BOTH repos
//               (discovered, never hardcoded — a new lab or place
//               auto-appears), each tagged with `repo: {name, path}` so the
//               lens builds repo-correct cd/copy snippets: its
//               places/<id>.rbxl snapshot (presence, size, mtime),
//               serialization file counts under <id>/src, the last commit
//               touching the project, and a derived sync state:
//                 no-snapshot   places/<id>.rbxl absent (it is gitignored —
//                               normal on a fresh clone)
//                 never-synced  snapshot present, no commit touches the project
//                 syncback-due  snapshot mtime is NEWER than the last commit
//                               touching the project (a resave of identical
//                               content also trips this — it is a "may be
//                               due" heuristic, not a content diff)
//                 in-sync       otherwise
//   commands    the copy-ready dry-run/apply snippets per project (the Tools
//               lens is COPY-ONLY, like the Packages explorer)
//
// FIELD-PRESENCE CONTRACT: snapshot.{bytes,savedAt}, serialization.lastSync,
// and per-project repo are OPTIONAL — absent (not null) when N/A. counts and
// dirty aggregate across both repos; each repo block carries its own dirty.
//
// Unlike the registry, this probe is inherently time-based (mtimes, git
// stamps, tool versions) — there is no --check mode; re-run it whenever you
// want fresh status, then rebuild the app (JSON is inlined at build time).
//
// Usage:
//   node tools/build-labs-status.mjs               # write previews/dashboards/labs-status.json
//   node tools/build-labs-status.mjs --print-json  # dump payload to stdout (no disk writes)
// ============================================================================

import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

// ── paths ─────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, "..");
const codeLink = (name) => join(PROJECT_ROOT, "external-locations", "code", name);

// The probed syncback repos. `key` is the payload block name (labs kept from
// v1 so existing lens reads keep working); order fixes project sort stability.
const REPOS = [
  { key: "labs", name: "roblox-labs", hint: "external-locations/code/roblox-labs" },
  { key: "universe", name: "soul-steel-universe", hint: "external-locations/code/soul-steel-universe" },
];
const MONO_LINK = codeLink("roblox-packages-mono");
const OUT_FILE = join(PROJECT_ROOT, "previews", "dashboards", "labs-status.json");

const startedAt = Date.now();
const printJson = process.argv.includes("--print-json");

// ── tiny runners (never throw; absent facts stay absent) ──────────────────
const US = "\x1f"; // unit separator — git subjects may contain any printable char

function run(cmd, args, cwd) {
  const r = spawnSync(cmd, args, { cwd, encoding: "utf8", timeout: 15_000 });
  if (r.error || r.status !== 0) return null;
  return r.stdout.trim();
}

function parseCommit(line) {
  const [sha, when, subject] = (line ?? "").split(US);
  return sha && when ? { sha, when, subject: subject ?? "" } : null;
}

/** rokit.toml `rojo = "owner/repo@x.y.z"` → the pin string, or null. */
function rojoPin(repoDir) {
  const toml = join(repoDir, "rokit.toml");
  if (!existsSync(toml)) return null;
  const m = readFileSync(toml, "utf8").match(/^\s*rojo\s*=\s*"([^"]+)"/m);
  return m ? m[1] : null;
}

/** Recursive file-type census of a project's src/ (`.gitkeep` placeholders excluded). */
function census(dir, tally = { luau: 0, rbxm: 0, modelJson: 0, metaJson: 0, other: 0 }) {
  if (!existsSync(dir)) return tally;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) census(p, tally);
    else if (entry.name === ".gitkeep") continue;
    else if (entry.name.endsWith(".luau")) tally.luau += 1;
    else if (entry.name.endsWith(".rbxm") || entry.name.endsWith(".rbxmx")) tally.rbxm += 1;
    else if (entry.name.endsWith(".model.json")) tally.modelJson += 1;
    else if (entry.name.endsWith(".meta.json")) tally.metaJson += 1;
    else tally.other += 1;
  }
  return tally;
}

// ── per-repo probe: git block + discovered projects ───────────────────────
function probeRepo({ name, hint }) {
  const link = codeLink(name);
  const git = (...args) => run("git", ["-C", link, ...args]);

  const present = existsSync(join(link, ".git"));
  const branch = present ? git("rev-parse", "--abbrev-ref", "HEAD") : null;
  const head = present ? parseCommit(git("log", "-1", `--format=%h${US}%cI${US}%s`)) : null;
  const dirtyOut = present ? git("status", "--porcelain") : null;
  const dirty = dirtyOut ? dirtyOut.split("\n").filter(Boolean).length : 0;
  const recentCommits = present
    ? (git("log", "-5", `--format=%h${US}%cI${US}%s`) ?? "")
        .split("\n")
        .map(parseCommit)
        .filter(Boolean)
    : [];

  const block = {
    name,
    path: hint,
    present,
    ...(branch ? { branch } : {}),
    ...(head ? { head } : {}),
    dirty,
    recentCommits,
  };

  // Projects: every top-level dir carrying default.project.json (discovered).
  const projects = !present
    ? []
    : readdirSync(link, { withFileTypes: true })
        .filter((e) => e.isDirectory() && existsSync(join(link, e.name, "default.project.json")))
        .map((e) => e.name)
        .sort()
        .map((id) => {
          const snapFile = `places/${id}.rbxl`;
          const snapPath = join(link, snapFile);
          const snapshot = { present: existsSync(snapPath), file: snapFile };
          if (snapshot.present) {
            const st = statSync(snapPath);
            snapshot.bytes = st.size;
            snapshot.savedAt = st.mtime.toISOString();
          }

          const lastSyncRaw = git("log", "-1", `--format=%h${US}%cI${US}%s`, "--", `${id}/`);
          const lastSync = parseCommit(lastSyncRaw);
          const serialization = { files: census(join(link, id, "src")) };
          if (lastSync) serialization.lastSync = lastSync;

          // Epoch comparison — savedAt is UTC-Z while git %cI carries a local
          // offset; comparing the strings lexicographically would be wrong.
          const sync = !snapshot.present
            ? "no-snapshot"
            : !lastSync
              ? "never-synced"
              : Date.parse(snapshot.savedAt) > Date.parse(lastSync.when)
                ? "syncback-due"
                : "in-sync";

          return {
            id,
            projectFile: `${id}/default.project.json`,
            repo: { name, path: hint },
            snapshot,
            serialization,
            sync,
            commands: {
              dryRun: `rojo syncback ${id} --input ${snapFile} --dry-run`,
              apply: `rojo syncback ${id} --input ${snapFile} -y`,
            },
          };
        });

  return { block, projects };
}

const probed = REPOS.map((r) => ({ key: r.key, ...probeRepo(r) }));
const labsProbe = probed.find((p) => p.key === "labs");
const projects = probed.flatMap((p) => p.projects);

// ── toolchain ─────────────────────────────────────────────────────────────
const labsLink = codeLink("roblox-labs");
const labsPresent = labsProbe.block.present;
const toolchain = {
  rojoPinLabs: rojoPin(labsLink),
  rojoPinUniverse: rojoPin(codeLink("soul-steel-universe")),
  rojoPinMono: rojoPin(MONO_LINK),
  rojoResolved: labsPresent ? run("rojo", ["--version"], labsLink) : null,
  rokitResolved: run("rokit", ["--version"], PROJECT_ROOT),
  syncbackAvailable: labsPresent
    ? spawnSync("rojo", ["syncback", "--help"], { cwd: labsLink, encoding: "utf8", timeout: 15_000 }).status === 0
    : false,
};
for (const k of Object.keys(toolchain)) if (toolchain[k] === null) delete toolchain[k];

// ── payload ───────────────────────────────────────────────────────────────
const dirty = probed.reduce((n, p) => n + p.block.dirty, 0);
const counts = {
  projects: projects.length,
  luau: projects.reduce((n, p) => n + p.serialization.files.luau, 0),
  rbxm: projects.reduce((n, p) => n + p.serialization.files.rbxm, 0),
  modelJson: projects.reduce((n, p) => n + p.serialization.files.modelJson, 0),
  metaJson: projects.reduce((n, p) => n + p.serialization.files.metaJson, 0),
  dirty,
  syncbackDue: projects.filter((p) => p.sync === "syncback-due").length,
};

const payload = {
  generatedBy: "tools/build-labs-status.mjs",
  schemaVersion: 2,
  built: new Date().toISOString(),
  builtMs: Date.now() - startedAt,
  ...Object.fromEntries(probed.map((p) => [p.key, p.block])),
  toolchain,
  counts,
  projects,
};

const json = `${JSON.stringify(payload, null, 2)}\n`;
if (printJson) {
  process.stdout.write(json);
} else {
  mkdirSync(dirname(OUT_FILE), { recursive: true });
  writeFileSync(OUT_FILE, json);
  console.log(`wrote previews/dashboards/labs-status.json`);
  const repoNote = probed.map((p) => `${p.block.name}: ${p.block.present ? `${p.projects.length}` : "missing"}`).join(", ");
  console.log(
    `lanes: ${counts.projects} projects (${repoNote}), ${counts.luau} luau, ${counts.rbxm} rbxm, ` +
      `${counts.syncbackDue} syncback-due, ${dirty} dirty`,
  );
}
