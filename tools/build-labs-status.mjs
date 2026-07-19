#!/usr/bin/env node
// ============================================================================
// build-labs-status.mjs — Roblox-Development-Studio labs status probe (v1)
// ============================================================================
//
// ZERO-DEPENDENCY Node ESM prober (node built-ins only: fs, path, url,
// child_process). Companion to build-packages-registry.mjs; feeds the
// Command Center's Tools lens.
//
// Reads the Studio-labs repo through the read-only symlink at
//   external-locations/code/roblox-labs
// (NEVER writes into it), and emits
//   previews/dashboards/labs-status.json
// — a moment-in-time status snapshot of the lab serialization loop
// (decision 0008-studio-native-lab-lane):
//
//   toolchain   rojo pin parsed from the labs rokit.toml (and the monorepo's,
//               for comparison), the rojo/rokit versions that actually
//               resolve inside the labs repo, and whether `rojo syncback`
//               is available there
//   labs repo   branch, HEAD, dirty file count, last 5 commits
//   projects    every <dir>/default.project.json in the labs repo (discovered,
//               never hardcoded — a new lab auto-appears): its places/<id>.rbxl
//               snapshot (presence, size, mtime), serialization file counts
//               under <id>/src (.luau / .rbxm / .model.json / .meta.json),
//               the last commit touching the project, and a derived sync state:
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
// FIELD-PRESENCE CONTRACT: snapshot.{bytes,savedAt} and
// serialization.lastSync are OPTIONAL — absent (not null) when N/A.
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
const LABS_HINT = "external-locations/code/roblox-labs";
const LABS_LINK = join(PROJECT_ROOT, "external-locations", "code", "roblox-labs");
const MONO_LINK = join(PROJECT_ROOT, "external-locations", "code", "roblox-packages-mono");
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
const git = (...args) => run("git", ["-C", LABS_LINK, ...args]);

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

// ── labs repo ─────────────────────────────────────────────────────────────
const present = existsSync(join(LABS_LINK, ".git"));
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

// ── toolchain ─────────────────────────────────────────────────────────────
const toolchain = {
  rojoPinLabs: rojoPin(LABS_LINK),
  rojoPinMono: rojoPin(MONO_LINK),
  rojoResolved: present ? run("rojo", ["--version"], LABS_LINK) : null,
  rokitResolved: run("rokit", ["--version"], PROJECT_ROOT),
  syncbackAvailable: present
    ? spawnSync("rojo", ["syncback", "--help"], { cwd: LABS_LINK, encoding: "utf8", timeout: 15_000 }).status === 0
    : false,
};
for (const k of Object.keys(toolchain)) if (toolchain[k] === null) delete toolchain[k];

// ── projects (discovered: every top-level dir carrying default.project.json) ──
const projects = !present
  ? []
  : readdirSync(LABS_LINK, { withFileTypes: true })
      .filter((e) => e.isDirectory() && existsSync(join(LABS_LINK, e.name, "default.project.json")))
      .map((e) => e.name)
      .sort()
      .map((id) => {
        const snapFile = `places/${id}.rbxl`;
        const snapPath = join(LABS_LINK, snapFile);
        const snapshot = { present: existsSync(snapPath), file: snapFile };
        if (snapshot.present) {
          const st = statSync(snapPath);
          snapshot.bytes = st.size;
          snapshot.savedAt = st.mtime.toISOString();
        }

        const lastSyncRaw = git("log", "-1", `--format=%h${US}%cI${US}%s`, "--", `${id}/`);
        const lastSync = parseCommit(lastSyncRaw);
        const serialization = { files: census(join(LABS_LINK, id, "src")) };
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
          snapshot,
          serialization,
          sync,
          commands: {
            dryRun: `rojo syncback ${id} --input ${snapFile} --dry-run`,
            apply: `rojo syncback ${id} --input ${snapFile} -y`,
          },
        };
      });

// ── payload ───────────────────────────────────────────────────────────────
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
  schemaVersion: 1,
  built: new Date().toISOString(),
  builtMs: Date.now() - startedAt,
  labs: {
    name: "roblox-labs",
    path: LABS_HINT,
    present,
    ...(branch ? { branch } : {}),
    ...(head ? { head } : {}),
    dirty,
    recentCommits,
  },
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
  console.log(
    `labs: ${present ? `${projects.length} projects, ${counts.luau} luau, ${counts.rbxm} rbxm, ` : "repo missing, "}` +
      `${counts.syncbackDue} syncback-due, ${dirty} dirty`,
  );
}
