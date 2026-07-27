#!/usr/bin/env node
// ============================================================================
// build-spec-registry.mjs — Roblox-Development-Studio spatial spec registry (v1)
// ============================================================================
//
// ZERO-DEPENDENCY Node ESM scanner (node built-ins only: fs, path, url, crypto).
//
// Scans this space for spatial documents of BOTH formats and emits
//   previews/dashboards/spatial-specs.json
// so the Command Center's Spatial lens can list what exists instead of
// requiring a file picker every time.
//
// No `spec` entity kind exists and none is wanted — decision 0015. Planning
// state for a spatial build already lives in its `_project/pipeline/` entity;
// this registry carries only facts, exactly as the `package` entity's own rule
// says ("live dependency data is generated, not transcribed").
//
// SCANNED:
//   apps/command-center/src/spatial/fixtures/*.json   grid specs (canonical)
//   apps/command-center/src/spatial/*.example.json    drafts + proposals
//   output/imagegen/<bundle>/*-grid-spec.json         portable copies
//   output/architecture/<slug>/roblox-build-manifest.json   build manifests
//
// DERIVED FIELDS (deterministic, pure functions of the inputs):
//   format      'grid-spec' | 'build-manifest' | 'unknown'
//   precision   'exact' (a grid spec states measured footprints) | 'envelope'
//               (a manifest states bounds and intent) — decision 0015 §2
//   loadable    whether the shipped lens can actually open it, with a `reason`
//               when it cannot. This is the field that makes the multi-level
//               draft show up as present-but-unsupported rather than missing.
//   copies      a document declaring `authority.canonicalSpec` that is not its
//               own path is a COPY of that canonical, and is folded into it
//               rather than listed twice. Each copy carries `matches`, the
//               sha256 comparison — the byte-identity rule the workflow and the
//               bundle README both state and NOTHING has ever enforced. This
//               registry does not enforce it either; it reports it, which is
//               one step better than a hand-run shasum.
//   pipelines   `_project/pipeline/*.md` whose body mentions the spec's path or
//               its containing directory — a real derived edge, not a
//               transcription.
//
// Deterministic + idempotent in every derived field: no randomness, no
// wall-clock except the built/builtMs stamp, which is exactly what --check
// ignores. All arrays sorted so output is byte-stable.
//
// Usage:
//   node tools/build-spec-registry.mjs               # write the registry
//   node tools/build-spec-registry.mjs --print-json  # dump payload, no writes
//   node tools/build-spec-registry.mjs --check       # diff date-insensitively;
//                                                    #   exit 1 when stale
// ============================================================================

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const DASHBOARD_DIR = join(PROJECT_ROOT, "previews", "dashboards");
const OUT = join(DASHBOARD_DIR, "spatial-specs.json");
const PIPELINE_DIR = join(PROJECT_ROOT, "_project", "pipeline");

const GENERATED_BY = "tools/build-spec-registry.mjs@1";
const SCHEMA_VERSION = 1;

const args = new Set(process.argv.slice(2));
const PRINT_JSON = args.has("--print-json");
const CHECK = args.has("--check");

const rel = (abs) => relative(PROJECT_ROOT, abs).split("\\").join("/");
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
const byPath = (a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0);

function tally(items, keyFn) {
  const out = {};
  for (const item of items) {
    const key = keyFn(item);
    out[key] = (out[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(out).sort(([a], [b]) => (a < b ? -1 : 1)));
}

function listFiles(dir, filter) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((name) => filter(name))
    .map((name) => join(dir, name))
    .filter((p) => statSync(p).isFile())
    .sort();
}

function listDirs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .map((name) => join(dir, name))
    .filter((p) => statSync(p).isDirectory())
    .sort();
}

// ── candidate discovery ───────────────────────────────────────────────────
function candidatePaths() {
  const found = [];
  const spatialDir = join(PROJECT_ROOT, "apps", "command-center", "src", "spatial");

  found.push(...listFiles(join(spatialDir, "fixtures"), (n) => n.endsWith(".json")));
  found.push(...listFiles(spatialDir, (n) => n.endsWith(".json")));

  for (const bundle of listDirs(join(PROJECT_ROOT, "output", "imagegen"))) {
    found.push(...listFiles(bundle, (n) => n.endsWith("-grid-spec.json")));
  }
  for (const slug of listDirs(join(PROJECT_ROOT, "output", "architecture"))) {
    found.push(...listFiles(slug, (n) => n === "roblox-build-manifest.json"));
  }
  return [...new Set(found)].sort();
}

// ── classification ────────────────────────────────────────────────────────
function classify(doc) {
  if (Array.isArray(doc?.assemblies)) return "build-manifest";
  if (doc?.coordinateSystem || doc?.hex || Array.isArray(doc?.levels)) return "grid-spec";
  return "unknown";
}

/**
 * Whether the shipped lens can open this document. Mirrors the two refusals in
 * validateGridSpec (a `levels[]` body and a declared root `schema`) plus the
 * manifest reader's single hard requirement.
 */
function loadability(format, doc) {
  if (format === "build-manifest") {
    const usable = doc.assemblies.some(
      (a) => a && typeof a.id === "string" && typeof a.layer_y === "number",
    );
    return usable
      ? { loadable: true }
      : { loadable: false, reason: "no assembly declares both an id and a layer_y" };
  }
  if (format === "grid-spec") {
    if (Array.isArray(doc.levels)) {
      return { loadable: false, reason: "multi-level levels[] body is not implemented" };
    }
    if (doc.schema != null) {
      return { loadable: false, reason: `declares body schema "${doc.schema}", which the reader does not implement` };
    }
    if (!doc.hex || !doc.approaches) {
      return { loadable: false, reason: "single-level body is missing hex or approaches" };
    }
    return { loadable: true };
  }
  return { loadable: false, reason: "not a recognized spatial document" };
}

function summarize(format, doc) {
  if (format === "build-manifest") {
    const layers = new Set();
    let parts = 0;
    for (const a of doc.assemblies) {
      if (a && typeof a.layer_y === "number") layers.add(a.layer_y);
      if (a && typeof a.part_budget === "number") parts += a.part_budget;
    }
    const envelope = doc.coordinate_contract?.envelope_studs;
    return {
      assemblies: doc.assemblies.length,
      layers: layers.size,
      envelopeStuds: Array.isArray(envelope) ? envelope : null,
      partBudget: parts,
      preservePaths: Array.isArray(doc.preserve) ? doc.preserve.length : 0,
    };
  }
  if (format === "grid-spec") {
    const angles = doc.approaches?.normalAnglesDegreesFromPositiveX;
    return {
      hexBands: doc.hex ? Object.keys(doc.hex).filter((k) => k !== "orientation" && k !== "construction").length : 0,
      approaches: Array.isArray(angles) ? angles.length : 0,
      levels: Array.isArray(doc.levels) ? doc.levels.length : 1,
      declaresElevation: doc.elevation != null,
      declaresAppearance: doc.appearance != null,
      viewStuds: Array.isArray(doc.view?.sizeStuds) ? doc.view.sizeStuds : null,
    };
  }
  return {};
}

// ── pipeline edges ────────────────────────────────────────────────────────
function pipelineIndex() {
  return listFiles(PIPELINE_DIR, (n) => n.endsWith(".md")).map((p) => ({
    id: basename(p, ".md"),
    body: readFileSync(p, "utf8"),
  }));
}

/**
 * Exact path always. The containing directory counts only under `output/`, where a directory is
 * slug-specific — matching on `apps/command-center/src/spatial/` instead would link every draft in
 * that folder to whichever pipeline happened to mention the folder.
 */
function pipelinesFor(specPath, pipelines) {
  const dir = dirname(specPath);
  const dirIsSpecific = specPath.startsWith("output/");
  return pipelines
    .filter((p) => p.body.includes(specPath) || (dirIsSpecific && p.body.includes(`${dir}/`)))
    .map((p) => p.id)
    .sort();
}

// ── payload ───────────────────────────────────────────────────────────────
function buildPayload() {
  const warnings = [];
  const pipelines = pipelineIndex();
  const entries = [];

  for (const abs of candidatePaths()) {
    const raw = readFileSync(abs);
    const path = rel(abs);
    let doc;
    try {
      doc = JSON.parse(raw.toString("utf8"));
    } catch (error) {
      warnings.push(`${path} is not valid JSON (${error.message}) — skipped`);
      continue;
    }
    const format = classify(doc);
    if (format === "unknown") continue;

    const { loadable, reason } = loadability(format, doc);
    entries.push({
      // A manifest's filename is fixed, so its slug directory is what identifies it; two of them
      // would otherwise both be "roblox-build-manifest".
      id: format === "build-manifest" ? basename(dirname(abs)) : basename(abs, ".json"),
      path,
      format,
      precision: format === "build-manifest" ? "envelope" : "exact",
      title:
        typeof doc.title === "string"
          ? doc.title
          : typeof doc.design_id === "string"
            ? doc.design_id
            : basename(abs, ".json"),
      status: typeof doc.status === "string" ? doc.status : "unknown",
      revision: String(doc.revision ?? doc.schema_version ?? "—"),
      date: String(doc.date ?? doc.studio_evidence?.captured_on ?? "—"),
      bytes: raw.byteLength,
      sha256: createHash("sha256").update(raw).digest("hex"),
      loadable,
      ...(reason ? { reason } : {}),
      canonicalSpec:
        typeof doc.authority?.canonicalSpec === "string" ? doc.authority.canonicalSpec : null,
      summary: summarize(format, doc),
      pipelines: pipelinesFor(path, pipelines),
    });
  }

  // Fold copies into their declared canonical. A document that names a
  // canonicalSpec other than itself is a portable duplicate, not a second spec.
  const byPathIndex = new Map(entries.map((e) => [e.path, e]));
  const specs = [];
  for (const entry of entries) {
    const canonical = entry.canonicalSpec;
    if (canonical && canonical !== entry.path && byPathIndex.has(canonical)) {
      const target = byPathIndex.get(canonical);
      target.copies = target.copies ?? [];
      target.copies.push({
        path: entry.path,
        sha256: entry.sha256,
        bytes: entry.bytes,
        matches: entry.sha256 === target.sha256,
      });
      if (entry.sha256 !== target.sha256) {
        warnings.push(
          `${entry.path} is NOT byte-identical to its declared canonical ${canonical}`,
        );
      }
      continue;
    }
    if (canonical && canonical !== entry.path) {
      warnings.push(
        `${entry.path} names canonicalSpec ${canonical}, which was not found in the scan`,
      );
    }
    specs.push(entry);
  }

  for (const spec of specs) {
    delete spec.canonicalSpec;
    if (spec.copies) spec.copies.sort(byPath);
  }
  specs.sort(byId);

  const identityGroups = specs.filter((s) => s.copies?.length).length;
  const identityMismatches = specs.reduce(
    (sum, s) => sum + (s.copies ?? []).filter((c) => !c.matches).length,
    0,
  );

  const payload = {
    schemaVersion: SCHEMA_VERSION,
    generatedBy: GENERATED_BY,
    built: new Date().toISOString(),
    builtMs: Date.now(),
    counts: {
      specs: specs.length,
      loadable: specs.filter((s) => s.loadable).length,
      byFormat: tally(specs, (s) => s.format),
      byPrecision: tally(specs, (s) => s.precision),
      identityGroups,
      identityMismatches,
    },
    specs,
  };
  return { payload, warnings };
}

// ── --check ───────────────────────────────────────────────────────────────
function stripDates(obj) {
  const { built, builtMs, ...rest } = obj;
  return rest;
}

function runCheck() {
  if (!existsSync(OUT)) {
    console.error("check: spatial-specs.json MISSING — run node tools/build-spec-registry.mjs");
    process.exit(1);
  }
  let onDisk;
  try {
    onDisk = JSON.parse(readFileSync(OUT, "utf8"));
  } catch (error) {
    console.error(
      `check: spatial-specs.json UNPARSEABLE (${error.message}) — run node tools/build-spec-registry.mjs`,
    );
    process.exit(1);
  }
  const { payload } = buildPayload();
  const want = JSON.stringify(stripDates(payload), null, 2);
  const have = JSON.stringify(stripDates(onDisk), null, 2);
  if (want !== have) {
    console.error(
      "check: spatial-specs.json DRIFT — sources changed since last build; run node tools/build-spec-registry.mjs",
    );
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
  const pending = `${OUT}.tmp-${process.pid}`;
  try {
    writeFileSync(pending, JSON.stringify(payload, null, 2));
    renameSync(pending, OUT);
  } finally {
    rmSync(pending, { force: true });
  }

  const c = payload.counts;
  console.log(`spec-registry: ${c.specs} spatial spec(s) · ${c.loadable} loadable by the lens`);
  console.log(`  byFormat:    ${JSON.stringify(c.byFormat)}`);
  console.log(`  byPrecision: ${JSON.stringify(c.byPrecision)}`);
  console.log(
    `  identity:    ${c.identityGroups} canonical/copy group(s) · ${c.identityMismatches} mismatch(es)`,
  );
  for (const spec of payload.specs) {
    if (!spec.loadable) console.log(`  NOT LOADABLE: ${spec.path} — ${spec.reason}`);
  }
  for (const w of warnings) console.warn(`  WARN: ${w}`);
  console.log(`  wrote ${rel(OUT)}`);
}

main();
