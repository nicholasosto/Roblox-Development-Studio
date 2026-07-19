#!/usr/bin/env node
// ============================================================================
// build-packages-registry.mjs — Roblox-Development-Studio packages registry (v1)
// ============================================================================
//
// ZERO-DEPENDENCY Node ESM scanner (node built-ins only: fs, path, url).
//
// Reads the @trembus package monorepo through the read-only symlink at
//   external-locations/code/roblox-packages-mono
// (NEVER writes into it), scans every packages/*/package.json, probes a small
// set of on-disk flag files, parses the monorepo CLAUDE.md "## Current
// Packages" table, matches docs/*.md filenames to packages, and walks the
// sibling consumer repos (CONSUMER_DIRS, resolved from the monorepo REALPATH
// so `link:../...` deps land on the true sibling dirs) for reverse
// `link:../roblox-packages-mono/packages/<x>` edges. Emits
//   previews/dashboards/packages.json
// (a top-level summary object + packages / consumers / edges arrays).
//
// DERIVED FIELDS (all deterministic, pure functions of the inputs):
//   status      version contains "-rc." -> 'rc'; any other prerelease tag ->
//               'prerelease'; else 'stable'
//   tier        from the internal dep graph:
//                 foundation = no internal deps AND >=1 internal dependent
//                 composite  = internal deps AND no internal dependents
//                 midlayer   = both · standalone = neither
//   dissolve pair (data-derived, no hardcoded names): "<X>-dissolved" with a
//               sibling "<X>" -> supersedes:"<X>" + statusNote "awaiting
//               cutover → @trembus/<X>"; the sibling gets statusNote
//               "superseded at cutover by <X>-dissolved"
//   flags       built (out/init.lua|init.luau AND out/index.d.ts; for
//               plugin-shaped packages — those with a build:plugin script —
//               out/main.server.luau|lua instead) · flamework
//               (flamework.build) · rojo (default.project.json) · react
//               (@rbxts/react peer) · examples (examples/ dir) · readme
//               (README.md)
//   inClaudeTable  the package id appears as a `| \`id\` |` row in the
//               monorepo CLAUDE.md "## Current Packages" table
//   docs        docs/*.md whose filename stem is "<id>" or "<id>-…"
//               (longest-id-wins so slotable-items never claims
//               slotable-items-dissolved docs)
//
// DEP CLASSIFICATION: internalDeps = @trembus/* peerDependencies (optional
// from peerDependenciesMeta) · externalPeerDeps = non-@trembus peers ·
// runtimeDeps = the "dependencies" block. devDependencies are IGNORED except
// to cross-check that every internal peer has a workspace:* devDep mirror
// (violations are console warnings, never JSON fields).
//
// FIELD-PRESENCE CONTRACT: statusNote, supersedes, docs are OPTIONAL — they
// are absent (not null) when N/A. Everything else is always present.
//
// Deterministic + idempotent in every DERIVED field: no randomness, no
// wall-clock. The built/builtMs stamp is the one exception — every rebuild
// diffs the JSON by those two lines, which is exactly what --check ignores.
// All arrays sorted (packages by id, dep arrays by name/id, consumers by id,
// edges by from,to) so output is byte-stable.
//
// Usage:
//   node tools/build-packages-registry.mjs               # write previews/dashboards/packages.json
//   node tools/build-packages-registry.mjs --print-json  # dump payload to stdout (no disk writes)
//   node tools/build-packages-registry.mjs --check       # re-derive + diff date-insensitively;
//                                                        #   exit 1 with a message when stale, 0 when clean
// ============================================================================

import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  realpathSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ── paths ─────────────────────────────────────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PROJECT_ROOT = resolve(__dirname, ".."); // tool lives in tools/, root is one up
const MONO_HINT = "external-locations/code/roblox-packages-mono"; // space-relative, for the payload
const MONO_LINK = join(PROJECT_ROOT, "external-locations", "code", "roblox-packages-mono");
const DASHBOARD_DIR = join(PROJECT_ROOT, "previews", "dashboards");
const OUT = join(DASHBOARD_DIR, "packages.json");

// Consumer repos — sibling checkouts of the monorepo REALPATH (the symlink is
// resolved first so "../x" means "next to the real monorepo", matching how the
// `link:../roblox-packages-mono/...` deps inside them resolve at install time).
const CONSUMER_DIRS = [
  "../soul-steel-official",
  "../roblox-testing-environment",
];

const GENERATED_BY = "tools/build-packages-registry.mjs@1";
const SCHEMA_VERSION = 1;

const args = new Set(process.argv.slice(2));
const PRINT_JSON = args.has("--print-json");
const CHECK = args.has("--check");

// ── tiny helpers ──────────────────────────────────────────────────────────
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
const byName = (a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0);
const sortedTally = (items, keyFn) => {
  const out = {};
  for (const it of items) {
    const k = keyFn(it);
    out[k] = (out[k] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => (a < b ? -1 : 1)));
};
const readJson = (p) => JSON.parse(readFileSync(p, "utf8"));

// ── package scan ──────────────────────────────────────────────────────────
// One record per packages/<id>/package.json. Flag probes are pure existsSync
// checks; dep classification reads only peers / peerDependenciesMeta /
// dependencies (devDependencies used ONLY for the workspace:* mirror check).
function scanPackages(monoRoot) {
  const pkgsDir = join(monoRoot, "packages");
  const ids = readdirSync(pkgsDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && existsSync(join(pkgsDir, e.name, "package.json")))
    .map((e) => e.name)
    .sort();

  const warnings = [];
  const records = [];
  for (const id of ids) {
    const dir = join(pkgsDir, id);
    const pkg = readJson(join(dir, "package.json"));
    const peers = pkg.peerDependencies || {};
    const peersMeta = pkg.peerDependenciesMeta || {};
    const devDeps = pkg.devDependencies || {};

    const internalDeps = [];
    const externalPeerDeps = [];
    for (const [name, range] of Object.entries(peers)) {
      if (name.startsWith("@trembus/")) {
        const depId = name.slice("@trembus/".length);
        internalDeps.push({ id: depId, range, optional: peersMeta[name]?.optional === true });
        // devDependencies cross-check: every internal peer needs a workspace:* mirror
        if (devDeps[name] !== "workspace:*") {
          warnings.push(`${id}: internal peer ${name} has no workspace:* devDependency mirror (found: ${devDeps[name] ?? "absent"})`);
        }
      } else {
        externalPeerDeps.push({ name, range });
      }
    }
    internalDeps.sort(byId);
    externalPeerDeps.sort(byName);

    const runtimeDeps = Object.entries(pkg.dependencies || {})
      .map(([name, range]) => ({ name, range }))
      .sort(byName);

    // status from the version string alone
    const version = pkg.version || "0.0.0";
    const prerelease = version.includes("-");
    const status = version.includes("-rc.") ? "rc" : prerelease ? "prerelease" : "stable";

    // Plugin-shaped packages (a `build:plugin` script) compile with `rbxtsc --type model` —
    // no out/init.lua or index.d.ts ever exists; their built signal is the compiled plugin
    // entry instead.
    const isPlugin = Boolean(pkg.scripts && pkg.scripts["build:plugin"]);
    const flags = {
      built: isPlugin
        ? existsSync(join(dir, "out", "main.server.luau")) || existsSync(join(dir, "out", "main.server.lua"))
        : (existsSync(join(dir, "out", "init.lua")) || existsSync(join(dir, "out", "init.luau"))) &&
          existsSync(join(dir, "out", "index.d.ts")),
      flamework: existsSync(join(dir, "flamework.build")),
      rojo: existsSync(join(dir, "default.project.json")),
      react: Object.prototype.hasOwnProperty.call(peers, "@rbxts/react"),
      examples: existsSync(join(dir, "examples")),
      readme: existsSync(join(dir, "README.md")),
    };

    records.push({
      id,
      name: pkg.name || `@trembus/${id}`,
      version,
      description: pkg.description || "",
      dir: `packages/${id}`,
      status,
      internalDeps,
      externalPeerDeps,
      runtimeDeps,
      flags,
    });
  }
  return { records, warnings };
}

// ── dissolve-pair detection (data-derived) ────────────────────────────────
// "<X>-dissolved" whose sibling "<X>" exists -> supersedes + statusNote pair.
function markDissolvePairs(records) {
  const idSet = new Set(records.map((r) => r.id));
  for (const rec of records) {
    if (!rec.id.endsWith("-dissolved")) continue;
    const base = rec.id.slice(0, -"-dissolved".length);
    if (!idSet.has(base)) continue;
    rec.supersedes = base;
    rec.statusNote = `awaiting cutover → @trembus/${base}`;
    const sibling = records.find((r) => r.id === base);
    sibling.statusNote = `superseded at cutover by ${rec.id}`;
  }
}

// ── tier derivation from the internal dep graph ───────────────────────────
function deriveTiers(records) {
  const dependents = new Map(); // id -> Set of internal dependent ids
  for (const rec of records) {
    for (const dep of rec.internalDeps) {
      if (!dependents.has(dep.id)) dependents.set(dep.id, new Set());
      dependents.get(dep.id).add(rec.id);
    }
  }
  for (const rec of records) {
    const hasDeps = rec.internalDeps.length > 0;
    const hasDependents = (dependents.get(rec.id)?.size ?? 0) > 0;
    rec.tier =
      hasDeps && hasDependents ? "midlayer"
      : hasDeps ? "composite"
      : hasDependents ? "foundation"
      : "standalone";
  }
  return dependents;
}

// ── CLAUDE.md "## Current Packages" table ─────────────────────────────────
// Rows look like: | `animation-catalog` | `@trembus/animation-catalog` | … |
// Section ends at the next "## " heading. Missing file/section -> empty set.
function parseClaudeTable(monoRoot) {
  const p = join(monoRoot, "CLAUDE.md");
  if (!existsSync(p)) return new Set();
  const lines = readFileSync(p, "utf8").split(/\r?\n/);
  const ids = new Set();
  let inSection = false;
  for (const line of lines) {
    if (/^##\s/.test(line)) {
      inSection = /^##\s+Current Packages\b/.test(line);
      continue;
    }
    if (!inSection) continue;
    const m = line.match(/^\|\s*`([^`]+)`\s*\|/);
    if (m) ids.add(m[1]);
  }
  return ids;
}

// ── docs/*.md filename-match heuristic ────────────────────────────────────
// Non-recursive. A doc belongs to the package whose id is the LONGEST prefix
// of the filename stem (exact stem, or stem starting "<id>-" / "<id>.").
// Label = the titleized remainder ("pets-and-mounts-overview" -> "Overview"),
// or "Docs" when the stem IS the id. Path is monorepo-relative.
function matchDocs(monoRoot, ids) {
  const docsDir = join(monoRoot, "docs");
  const out = new Map(); // id -> [{label, path}]
  if (!existsSync(docsDir)) return out;
  const idsByLength = [...ids].sort((a, b) => b.length - a.length);
  const files = readdirSync(docsDir, { withFileTypes: true })
    .filter((e) => e.isFile() && e.name.endsWith(".md"))
    .map((e) => e.name)
    .sort();
  for (const file of files) {
    const stem = file.slice(0, -".md".length);
    const owner = idsByLength.find(
      (id) => stem === id || stem.startsWith(`${id}-`) || stem.startsWith(`${id}.`),
    );
    if (!owner) continue;
    const remainder = stem.slice(owner.length).replace(/^[-.]+/, "");
    const label = remainder
      ? remainder.split(/[-_.]+/).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
      : "Docs";
    if (!out.has(owner)) out.set(owner, []);
    out.get(owner).push({ label, path: `docs/${file}` });
  }
  for (const list of out.values()) list.sort((a, b) => (a.path < b.path ? -1 : 1));
  return out;
}

// ── consumer repos ────────────────────────────────────────────────────────
// Every dep valued `link:…/roblox-packages-mono/packages/<x>` where the dep
// name is @trembus/<x> and <x> is a real monorepo package becomes a reverse
// consumedBy edge. All dep blocks scanned (in practice: "dependencies").
function scanConsumers(monoRealRoot, idSet) {
  const consumers = [];
  for (const rel of CONSUMER_DIRS) {
    const dir = resolve(monoRealRoot, rel);
    const pkgPath = join(dir, "package.json");
    if (!existsSync(pkgPath)) continue; // absent checkout — silently skipped, counts reflect reality
    const pkg = readJson(pkgPath);
    const id = basename(dir);
    const uses = new Set();
    for (const block of ["dependencies", "devDependencies", "peerDependencies", "optionalDependencies"]) {
      for (const [name, spec] of Object.entries(pkg[block] || {})) {
        if (!name.startsWith("@trembus/") || typeof spec !== "string") continue;
        const m = spec.match(/^link:.*\/roblox-packages-mono\/packages\/([^/]+)$/);
        if (!m) continue;
        const target = m[1];
        if (name === `@trembus/${target}` && idSet.has(target)) uses.add(target);
      }
    }
    consumers.push({ id, name: pkg.name || id, linkStyle: "link:", uses: [...uses].sort() });
  }
  consumers.sort(byId);
  return consumers;
}

// ── payload assembly ──────────────────────────────────────────────────────
function buildPayload() {
  if (!existsSync(MONO_LINK)) {
    console.error(`monorepo not found: ${MONO_LINK}`);
    process.exit(1);
  }
  const monoReal = realpathSync(MONO_LINK);

  const { records, warnings } = scanPackages(monoReal);
  markDissolvePairs(records);
  const dependents = deriveTiers(records);
  const claudeIds = parseClaudeTable(monoReal);
  const docsById = matchDocs(monoReal, records.map((r) => r.id));
  const idSet = new Set(records.map((r) => r.id));
  const consumers = scanConsumers(monoReal, idSet);

  // scope: the most common package scope (expected: a single one, @trembus)
  const scopeTally = sortedTally(records.filter((r) => r.name.startsWith("@")), (r) => r.name.split("/")[0]);
  const scope = Object.entries(scopeTally).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "@trembus";

  // reverse external edges: consumer id lists per package
  const externalBy = new Map();
  for (const c of consumers) for (const u of c.uses) {
    if (!externalBy.has(u)) externalBy.set(u, []);
    externalBy.get(u).push(c.id);
  }

  // edges — flat internal dep list, sorted by from then to
  const edges = [];
  for (const rec of records) {
    for (const dep of rec.internalDeps) {
      edges.push({ from: rec.id, to: dep.id, range: dep.range, optional: dep.optional });
    }
  }
  edges.sort((a, b) => (a.from < b.from ? -1 : a.from > b.from ? 1 : a.to < b.to ? -1 : 1));

  // per-package emit shape — optional fields (statusNote/supersedes/docs)
  // spread in ONLY when present, per the field-presence contract
  const packages = records.sort(byId).map((rec) => ({
    id: rec.id,
    name: rec.name,
    version: rec.version,
    description: rec.description,
    dir: rec.dir,
    status: rec.status,
    ...(rec.statusNote ? { statusNote: rec.statusNote } : {}),
    ...(rec.supersedes ? { supersedes: rec.supersedes } : {}),
    tier: rec.tier,
    internalDeps: rec.internalDeps,
    externalPeerDeps: rec.externalPeerDeps,
    runtimeDeps: rec.runtimeDeps,
    consumedBy: {
      internal: [...(dependents.get(rec.id) ?? [])].sort(),
      external: (externalBy.get(rec.id) ?? []).sort(),
    },
    flags: rec.flags,
    inClaudeTable: claudeIds.has(rec.id),
    ...(docsById.has(rec.id) ? { docs: docsById.get(rec.id) } : {}),
    npmUrl: `https://www.npmjs.com/package/${rec.name}`,
  }));

  const now = new Date();
  const payload = {
    generatedBy: GENERATED_BY,
    schemaVersion: SCHEMA_VERSION,
    built: now.toISOString().slice(0, 10),
    builtMs: now.getTime(),
    monorepo: {
      name: basename(monoReal),
      path: MONO_HINT,
      packageManager: existsSync(join(monoReal, "pnpm-workspace.yaml")) ? "pnpm" : "unknown",
      scope,
    },
    counts: {
      packages: packages.length,
      byStatus: sortedTally(packages, (p) => p.status),
      byTier: sortedTally(packages, (p) => p.tier),
      internalEdges: edges.length,
      optionalEdges: edges.filter((e) => e.optional).length,
      consumers: consumers.length,
      claudeTableDrift: packages.filter((p) => !p.inClaudeTable).length,
      unbuilt: packages.filter((p) => !p.flags.built).length,
    },
    packages,
    consumers,
    edges,
  };
  return { payload, warnings };
}

// ── --check: re-derive + date-insensitive diff ────────────────────────────
// Strips the two wall-clock fields (built/builtMs) from both sides and
// compares the rest byte-for-byte (both sides re-serialized the same way, so
// key order can't false-positive). Exit 1 = stale/missing, 0 = clean.
function stripDates(obj) {
  const { built, builtMs, ...rest } = obj;
  return rest;
}

function runCheck() {
  if (!existsSync(OUT)) {
    console.error(`check: packages.json MISSING — run node tools/build-packages-registry.mjs`);
    process.exit(1);
  }
  let onDisk;
  try {
    onDisk = readJson(OUT);
  } catch (e) {
    console.error(`check: packages.json UNPARSEABLE (${e.message}) — run node tools/build-packages-registry.mjs`);
    process.exit(1);
  }
  const { payload } = buildPayload();
  const want = JSON.stringify(stripDates(payload), null, 2);
  const have = JSON.stringify(stripDates(onDisk), null, 2);
  if (want !== have) {
    console.error(`check: packages.json DRIFT — sources changed since last build; run node tools/build-packages-registry.mjs`);
    process.exit(1);
  }
  console.log("check: in sync");
}

// ── main ──────────────────────────────────────────────────────────────────
function main() {
  if (CHECK) {
    runCheck();
    return;
  }

  const { payload, warnings } = buildPayload();

  if (PRINT_JSON) {
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

  mkdirSync(DASHBOARD_DIR, { recursive: true });
  const pendingOut = `${OUT}.tmp-${process.pid}`;
  try {
    writeFileSync(pendingOut, JSON.stringify(payload, null, 2));
    renameSync(pendingOut, OUT);
  } finally {
    rmSync(pendingOut, { force: true });
  }

  const c = payload.counts;
  console.log(`packages-registry: ${c.packages} packages scanned`);
  console.log(`  byStatus:  ${JSON.stringify(c.byStatus)}`);
  console.log(`  byTier:    ${JSON.stringify(c.byTier)}`);
  console.log(`  edges:     ${c.internalEdges} internal (${c.optionalEdges} optional)`);
  console.log(`  consumers: ${c.consumers} (${payload.consumers.map((x) => `${x.id}:${x.uses.length}`).join(", ")})`);
  console.log(`  claudeTableDrift: ${c.claudeTableDrift} · unbuilt: ${c.unbuilt}`);
  for (const w of warnings) console.warn(`  WARN: ${w}`);
  console.log(`  wrote ${OUT}`);
}

main();
