// The packages registry — the second emitted artifact the Command Center consumes, alongside the
// entity contract in ./contract. This module is the ONLY reader of packages.json; the Packages
// Explorer panel derives its whole view from the typed exports here (never re-reads the JSON).
//
// The registry is a deterministic derivation over the monorepo's per-package manifests plus the
// two consumer repos' manifests (tools/build-packages-registry.mjs). Field-presence contract:
// statusNote/supersedes/docs are ABSENT when N/A (no nulls anywhere), so the inspector skips
// those rows rather than showing empties.
import type { GraphContract, GraphEdge, GraphNode, LineageTone } from '@trembus/viz';
import packagesRegistry from '../../../previews/dashboards/packages.json';

// ── The emitted record shapes (mirror of build-packages-registry's output) ──
export type Tier = 'foundation' | 'midlayer' | 'composite' | 'standalone';

export interface InternalDep {
  id: string;
  range: string;
  optional: boolean;
}
export interface ExternalDep {
  name: string;
  range: string;
}
export interface DocRef {
  label: string;
  path: string;
}
export interface PkgFlags {
  built: boolean;
  flamework: boolean;
  rojo: boolean;
  react: boolean;
  examples: boolean;
  readme: boolean;
}
export interface PackageRecord {
  /** Directory basename under packages/ — the stable, unique key. */
  id: string;
  /** Scoped npm name (@trembus/<id>). */
  name: string;
  version: string;
  description: string;
  /** Monorepo-relative dir (packages/<id>). */
  dir: string;
  /** stable | rc | prerelease (open vocabulary — unknown words tone neutral). */
  status: string;
  /** Present only on the dissolve pair — the cutover note, in BOTH directions. */
  statusNote?: string;
  /** Present when this package replaces another at cutover. */
  supersedes?: string;
  tier: Tier;
  internalDeps: InternalDep[];
  externalPeerDeps: ExternalDep[];
  runtimeDeps: ExternalDep[];
  consumedBy: { internal: string[]; external: string[] };
  flags: PkgFlags;
  inClaudeTable: boolean;
  /** Present only when the package ships docs/. */
  docs?: DocRef[];
  npmUrl: string;
}
export interface ConsumerRecord {
  id: string;
  name: string;
  linkStyle: string;
  uses: string[];
}
export interface EdgeRecord {
  from: string;
  to: string;
  range: string;
  optional: boolean;
}
export interface RegistryCounts {
  packages: number;
  byStatus: Record<string, number>;
  byTier: Record<string, number>;
  internalEdges: number;
  optionalEdges: number;
  consumers: number;
  claudeTableDrift: number;
  unbuilt: number;
}
interface RegistryFile {
  generatedBy: string;
  schemaVersion: number;
  built: string;
  builtMs: number;
  monorepo: { name: string; path: string; packageManager: string; scope: string };
  counts: RegistryCounts;
  packages: PackageRecord[];
  consumers: ConsumerRecord[];
  edges: EdgeRecord[];
}

// Cast-only typing: nothing validates the emitted JSON against this mirror, so every
// module-scope dereference below is ??-guarded — a parseable-but-drifted registry must
// degrade to an empty Explorer, never crash the whole app before React mounts.
const file = packagesRegistry as unknown as Partial<RegistryFile>;

const EMPTY_COUNTS: RegistryCounts = {
  packages: 0,
  byStatus: {},
  byTier: {},
  internalEdges: 0,
  optionalEdges: 0,
  consumers: 0,
  claudeTableDrift: 0,
  unbuilt: 0,
};

// ── Typed exports ──
export const packages: PackageRecord[] = Array.isArray(file.packages) ? file.packages : [];
export const consumers: ConsumerRecord[] = Array.isArray(file.consumers) ? file.consumers : [];
export const edges: EdgeRecord[] = Array.isArray(file.edges) ? file.edges : [];
export const counts: RegistryCounts = file.counts ?? EMPTY_COUNTS;
export const monorepo = file.monorepo ?? {
  name: 'roblox-packages-mono',
  path: 'external-locations/code/roblox-packages-mono',
  packageManager: 'pnpm',
  scope: '@trembus',
};
export const built: string = file.built ?? '(unknown)';

export const packageById: Map<string, PackageRecord> = new Map(packages.map((p) => [p.id, p]));
export const consumerById: Map<string, ConsumerRecord> = new Map(consumers.map((c) => [c.id, c]));

// ── Presentation vocabulary ──
// Layering order (dependency altitude): foundation → midlayer → composite → standalone. Also the
// grouped-catalog section order.
export const TIER_ORDER: Tier[] = ['foundation', 'midlayer', 'composite', 'standalone'];

export interface TierStyle {
  label: string;
  /** Trembus Badge/Stat/Lineage tone. */
  tone: LineageTone;
  /** One-line gloss shown in section headers + the inspector. */
  gloss: string;
}
export const TIER_STYLE: Record<Tier, TierStyle> = {
  foundation: { label: 'Foundation', tone: 'success', gloss: 'no internal deps · depended on by others' },
  midlayer: { label: 'Mid-layer', tone: 'info', gloss: 'has internal deps · depended on by others' },
  composite: { label: 'Composite', tone: 'accent', gloss: 'has internal deps · consumed by games' },
  standalone: { label: 'Standalone', tone: 'neutral', gloss: 'no internal deps · no internal dependents' },
};
export const tierStyle = (t: string): TierStyle =>
  TIER_STYLE[t as Tier] ?? { label: t, tone: 'neutral', gloss: '' };

// Registry status → a Badge tone (the explorer's OWN status map, distinct from the entity-status
// ontology in ./status): stable→success, rc→warning, prerelease→info, anything else neutral.
export type PkgStatusTone = 'success' | 'info' | 'warning' | 'neutral';
const STATUS_TONE: Record<string, PkgStatusTone> = {
  stable: 'success',
  rc: 'warning',
  prerelease: 'info',
};
export const pkgStatusTone = (s: string): PkgStatusTone => STATUS_TONE[s] ?? 'neutral';

// Boolean feature flags surfaced as card glyphs (built is a health signal, readme is noise —
// neither is a filterable flag facet). Order is display order.
export type FlagKey = 'react' | 'flamework' | 'rojo' | 'examples';
export const FLAG_KEYS: FlagKey[] = ['react', 'flamework', 'rojo', 'examples'];
export const FLAG_GLYPH: Record<FlagKey, { glyph: string; label: string }> = {
  react: { glyph: '⚛', label: 'React (@rbxts/react)' },
  flamework: { glyph: '⚙', label: 'Flamework transformer' },
  rojo: { glyph: '⧉', label: 'Rojo project file' },
  examples: { glyph: '▤', label: 'Ships examples/' },
};

// ── Filter helpers (client-side; the whole registry is in memory) ──
export interface PkgFilters {
  q: string;
  tier: '' | Tier;
  status: string;
  /** Package id — keeps only packages whose internalDeps include it. */
  dependsOn: string;
  /** Consumer repo id — keeps only packages that repo uses. */
  consumedBy: string;
  flag: '' | FlagKey;
}
export const EMPTY_FILTERS: PkgFilters = { q: '', tier: '', status: '', dependsOn: '', consumedBy: '', flag: '' };

export function matchesFilters(p: PackageRecord, f: PkgFilters): boolean {
  const needle = f.q.trim().toLowerCase();
  return (
    (!f.tier || p.tier === f.tier) &&
    (!f.status || p.status === f.status) &&
    (!f.dependsOn || p.internalDeps.some((d) => d.id === f.dependsOn)) &&
    (!f.consumedBy || p.consumedBy.external.includes(f.consumedBy)) &&
    (!f.flag || p.flags[f.flag]) &&
    (!needle || `${p.name} ${p.description}`.toLowerCase().includes(needle))
  );
}

/** Total consumer count for a card's "n consumers" line (internal dependents + game repos). */
export const consumerCount = (p: PackageRecord): number =>
  p.consumedBy.internal.length + p.consumedBy.external.length;

// ── Graph contracts (@trembus/viz <Lineage>) ──
// Consumer overlay nodes are namespaced so they can never collide with a package id.
export const CONSUMER_NODE_PREFIX = 'consumer:';
export const isConsumerNode = (id: string): boolean => id.startsWith(CONSUMER_NODE_PREFIX);
export const consumerIdOfNode = (id: string): string => id.slice(CONSUMER_NODE_PREFIX.length);

const pkgNode = (p: PackageRecord): GraphNode => ({
  id: p.id,
  label: p.id,
  kind: p.tier,
  sub: `v${p.version}`,
  tone: tierStyle(p.tier).tone,
});

const depEdge = (e: EdgeRecord): GraphEdge => ({
  from: e.from,
  to: e.to,
  // Optional integrations render dashed (the weak-dependency convention); required stay solid.
  dashed: e.optional ? true : undefined,
  tone: e.optional ? 'neutral' : undefined,
});

/**
 * The whole internal dependency graph as a Lineage contract. With `withConsumers`, the two game
 * repos join as extra (neutral, "consumer"-subtitled) nodes with a dashed edge to every package
 * they use — the reach overlay.
 */
export function depGraphContract(withConsumers = false): GraphContract {
  const nodes: GraphNode[] = packages.map(pkgNode);
  const graphEdges: GraphEdge[] = edges.map(depEdge);
  if (withConsumers) {
    for (const c of consumers) {
      const nodeId = `${CONSUMER_NODE_PREFIX}${c.id}`;
      nodes.push({ id: nodeId, label: c.id, kind: 'consumer', sub: 'consumer repo', tone: 'warning' });
      for (const use of c.uses) {
        if (packageById.has(use)) graphEdges.push({ from: nodeId, to: use, dashed: true, tone: 'neutral' });
      }
    }
  }
  return {
    view: 'lineage',
    brand: monorepo.scope,
    title: 'Internal dependency graph',
    caption: withConsumers
      ? `${counts.packages} packages · ${counts.internalEdges} internal edges (${counts.optionalEdges} optional, dashed) · ${counts.consumers} consumer repos overlaid`
      : `${counts.packages} packages · ${counts.internalEdges} internal edges · ${counts.optionalEdges} optional (dashed)`,
    direction: 'LR',
    nodes,
    edges: graphEdges,
  };
}

/**
 * A scoped Lineage contract centered on one package: the subject + its 1-hop neighborhood —
 * internal deps (out), internal dependents (in), and the consumer repos that use it — with every
 * registry edge among that set. Top-down so it fits the inspector (grows in height, not width).
 */
export function egoGraph(id: string): GraphContract {
  const center = packageById.get(id);
  const neighborIds = new Set<string>([id]);
  for (const e of edges) {
    if (e.from === id) neighborIds.add(e.to);
    if (e.to === id) neighborIds.add(e.from);
  }
  const nodes: GraphNode[] = [...neighborIds]
    .map((nid) => packageById.get(nid))
    .filter((p): p is PackageRecord => Boolean(p))
    .map(pkgNode);
  const graphEdges: GraphEdge[] = edges
    .filter((e) => neighborIds.has(e.from) && neighborIds.has(e.to))
    .map(depEdge);
  for (const c of consumers) {
    if (!c.uses.includes(id)) continue;
    const nodeId = `${CONSUMER_NODE_PREFIX}${c.id}`;
    nodes.push({ id: nodeId, label: c.id, kind: 'consumer', sub: 'consumer repo', tone: 'warning' });
    graphEdges.push({ from: nodeId, to: id, dashed: true, tone: 'neutral' });
  }
  return {
    view: 'lineage',
    brand: center?.tier ?? 'package',
    title: center?.name ?? id,
    caption: `${nodes.length - 1} linked · ${graphEdges.length} edges`,
    direction: 'TB',
    nodes,
    edges: graphEdges,
  };
}

// ── Copy-to-clipboard snippet builders (copy-only — the static build stays fully functional) ──
/** The registry-install command for a package. */
export const pnpmAddSnippet = (id: string): string => `pnpm add ${monorepo.scope}/${id}`;
/** The sibling-checkout link: spec (what the two consumer repos actually use). */
export const linkSnippet = (id: string): string => `link:../${monorepo.name}/packages/${id}`;
/** Space-relative package directory path (through the external-locations symlink). */
export const dirPath = (p: PackageRecord): string => `${monorepo.path}/${p.dir}`;
