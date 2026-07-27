// The ONLY reader of previews/dashboards/spatial-specs.json, mirroring how src/packages.ts owns
// the packages registry. The Spatial lens derives its spec list entirely from the typed exports
// here and never re-reads the JSON.
//
// Two halves, deliberately kept apart:
//   - the registry (a static import) carries the FACTS about each spec — format, precision,
//     revision, byte-identity of its copies, which pipeline entity owns it;
//   - the glob below inlines each spec's actual CONTENT at build time, so picking one in the lens
//     needs no file picker, no fetch, and no filesystem — and works identically in `vite dev` and
//     in the static previews/app/ bundle.
//
// The content is globbed rather than embedded in the registry so a spec edit produces one diff
// instead of two. Regenerate the facts with `node tools/build-spec-registry.mjs`.
import specRegistry from '../../../../previews/dashboards/spatial-specs.json';

export type SpecFormat = 'grid-spec' | 'build-manifest';
export type SpecPrecision = 'exact' | 'envelope';

export interface SpecCopy {
  path: string;
  sha256: string;
  bytes: number;
  /** False means the portable copy has drifted from its canonical — the rule nothing enforces. */
  matches: boolean;
}

export interface SpecRegistryEntry {
  id: string;
  path: string;
  format: SpecFormat;
  precision: SpecPrecision;
  title: string;
  status: string;
  revision: string;
  date: string;
  bytes: number;
  sha256: string;
  /** Whether the shipped reader can open it; `reason` says why not when false. */
  loadable: boolean;
  reason?: string;
  summary: Record<string, unknown>;
  pipelines: string[];
  copies?: SpecCopy[];
}

export interface SpecRegistryCounts {
  specs: number;
  loadable: number;
  byFormat: Record<string, number>;
  byPrecision: Record<string, number>;
  identityGroups: number;
  identityMismatches: number;
}

const registry = specRegistry as unknown as {
  schemaVersion: number;
  built: string;
  counts: SpecRegistryCounts;
  specs: SpecRegistryEntry[];
};

export const spatialSpecs: SpecRegistryEntry[] = registry.specs;
export const spatialSpecCounts: SpecRegistryCounts = registry.counts;
export const spatialSpecsBuilt: string = registry.built;

// Inlined at build time. Keys arrive as module-relative paths; they are normalized to the same
// repo-relative form the registry uses so the two halves can be joined by path.
const documents = import.meta.glob<unknown>(
  [
    // This module lives in src/spatial/, so the fixtures are a sibling directory — `../fixtures`
    // would resolve to src/fixtures and silently match nothing.
    './fixtures/*.json',
    './*.example.json',
    '../../../../output/architecture/*/roblox-build-manifest.json',
    '../../../../output/imagegen/*/*-grid-spec.json',
  ],
  { eager: true, import: 'default' },
);

const SPATIAL_DIR = 'apps/command-center/src/spatial';

function normalize(globKey: string): string {
  // '../../../../output/x/y.json' -> 'output/x/y.json'
  // './fixtures/x.json'           -> 'apps/command-center/src/spatial/fixtures/x.json'
  if (globKey.startsWith('../')) return globKey.replace(/^(\.\.\/)+/, '');
  return `${SPATIAL_DIR}/${globKey.replace(/^\.\//, '')}`;
}

const byPath = new Map<string, unknown>(
  Object.entries(documents).map(([key, value]) => [normalize(key), value]),
);

/** The parsed spec at a registry path, or undefined when the glob did not reach it. */
export function specDocument(path: string): unknown | undefined {
  return byPath.get(path);
}

/** Registry entries the lens can actually open, in registry (id) order. */
export const loadableSpecs: SpecRegistryEntry[] = spatialSpecs.filter(
  (spec) => spec.loadable && byPath.has(spec.path),
);

/**
 * Copies that have drifted from their canonical. Byte-identity is stated in the workflow and the
 * bundle README and enforced by nothing; surfacing it is not enforcement, but it beats remembering
 * to run shasum by hand.
 */
export const identityMismatches: { spec: SpecRegistryEntry; copy: SpecCopy }[] = spatialSpecs
  .flatMap((spec) => (spec.copies ?? []).map((copy) => ({ spec, copy })))
  .filter(({ copy }) => !copy.matches);
