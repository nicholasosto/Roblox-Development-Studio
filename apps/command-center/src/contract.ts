// The single reader of the space's Project-System contract (the Overview's data source).
// The app reads ONLY these two emitted JSON artifacts; it never re-reads _project/.
// Regenerate them with:
//   node .project-system/tools/render-hub.mjs   (zero-dep)
// The packages registry (previews/dashboards/packages.json) has its OWN single reader —
// src/packages.ts — mirroring Asset-Studio's contract.ts / registry.ts split.
import type { LineageTone } from '@trembus/viz';
import type { HubContract } from '@trembus/ui';
import rdsGraph from '../../../previews/dashboards/roblox-development-studio-graph.json';
import rdsHub from '../../../previews/dashboards/roblox-development-studio-hub.json';

// ── Emitted contract shapes (mirror of render-hub's buildModel()/hubContract() output) ──
export interface KindBucket {
  total: number;
  byStatus: Record<string, number>;
  ids: string[];
  /** Lineage tone for this kind's entities, derived by render-hub from the kind's accent dot. */
  tone?: LineageTone;
  /** The kind's declared status enum, in config order — the category order for entity briefs. */
  statusOrder?: string[];
}
// Per-entity record — the navigable detail the aggregate byKind buckets can't express.
export interface RawNode {
  id: string;
  kind: string;
  title: string | null;
  status: string | null;
  updated: string | null;
  file: string;
  /** The entity's tag map (omitted when none) — lets a view filter/group by a facet. */
  tags?: Record<string, string>;
  /** First-paragraph gist of the body (markdown-stripped, ~220 chars). Omitted for a prose-less body. */
  excerpt?: string;
}
export interface RawEdge {
  from: string;
  fromKind: string;
  rel: string;
  target: string;
}
export interface RawGraph {
  generatedBy: string;
  project: string;
  folderByKind: Record<string, string>;
  entities: number;
  migrated: number;
  counts: { error: number; warning: number; info: number };
  nodes: RawNode[];
  byKind: Record<string, KindBucket>;
  edges: RawEdge[];
  edgesByRel: Record<string, number>;
  [k: string]: unknown;
}
export interface RawHub {
  brand: string;
  tagline: string;
  stats: { label: string; value: number; color?: string }[];
  scope: { label: string; num: string; value: string }[];
  [k: string]: unknown;
}

const graph = rdsGraph as unknown as RawGraph;
const hub = rdsHub as unknown as RawHub;

// Per-kind lineage tone, DERIVED from the emitted contract (render-hub maps each kind's accent
// dot → a tone). No hardcoded kind names — adding a kind needs no edit here. `danger` stays
// reserved for error states; `neutral` is the defensive fallback for an older contract.
const toneByKind: Record<string, LineageTone> = Object.fromEntries(
  Object.entries(graph.byKind ?? {}).map(([k, b]) => [k, b.tone ?? 'neutral']),
);

// Slug → readable label: drop a leading serial (0001-) or ISO date (2026-06-24-), then de-kebab.
export function prettify(id: string): string {
  const stripped = id.replace(/^\d{4}(-\d{2}-\d{2})?-/, '');
  const words = stripped.replace(/-/g, ' ').trim();
  return words.charAt(0).toUpperCase() + words.slice(1);
}

// Defensive fallback: synthesize bare records from byKind for an older contract with no nodes[].
function fallbackNodes(g: RawGraph): RawNode[] {
  const out: RawNode[] = [];
  for (const [kind, bucket] of Object.entries(g.byKind ?? {})) {
    for (const id of bucket.ids) out.push({ id, kind, title: null, status: null, updated: null, file: '' });
  }
  return out;
}

function rawNodes(g: RawGraph): RawNode[] {
  return Array.isArray(g.nodes) && g.nodes.length ? g.nodes : fallbackNodes(g);
}

// ── The navigable entity list (per-entity detail, from the emitted nodes[]) ──
export interface EntityRecord {
  id: string;
  kind: string;
  title: string;
  status: string;
  updated: string;
  file: string;
  tone: LineageTone;
  tags: Record<string, string>;
  excerpt: string;
}

function toRecord(n: RawNode): EntityRecord {
  return {
    id: n.id,
    kind: n.kind,
    title: n.title ?? prettify(n.id),
    status: n.status ?? '—',
    updated: n.updated ?? '—',
    file: n.file ?? '',
    tone: toneByKind[n.kind] ?? 'neutral',
    tags: n.tags ?? {},
    excerpt: n.excerpt ?? '',
  };
}

export const entities: EntityRecord[] = rawNodes(graph).map(toRecord);

// Declared-order kind list (decision, report, pipeline, …), straight from byKind.
export const kinds: string[] = Object.keys(graph.byKind ?? {});

export function entitiesOfKinds(...wanted: string[]): EntityRecord[] {
  const set = new Set(wanted);
  return entities.filter((e) => set.has(e.kind));
}

// A kind's declared status enum (config order) — the category order for entity briefs. Falls back
// to the statuses actually present (first-seen) for an older contract that predates `statusOrder`.
export function statusOrderForKind(kind: string): string[] {
  const bucket = graph.byKind?.[kind];
  if (bucket?.statusOrder?.length) return bucket.statusOrder;
  return Object.keys(bucket?.byStatus ?? {});
}

// The hub view-model typed for @trembus/ui's <Hub>. hub.json IS the Trembus hub contract,
// so it renders unchanged; this is the same object the header reads via `hub`.
export const hubData = hub as unknown as HubContract;

// ── Hub domain records (the hex tiles' detail payload) ──
export type DomainSource = string | { label: string; href?: string };
export interface HubDomainEntry {
  text: string;
  desc?: string;
  status?: string;
  ref?: string;
}
export interface HubDomainRec {
  id: string;
  kind: string;
  tag: string;
  name: string;
  sub: string;
  status: string;
  dot?: string;
  note?: string;
  sources?: DomainSource[];
  /** Control-surface facets (commands/workflows/hooks) carry their detail rows here. */
  entries?: HubDomainEntry[];
}

export const domains: HubDomainRec[] = (hub.domains as HubDomainRec[]) ?? [];
// Selected hub tile id → its domain record (id is the entity kind for petals; 'contract' for
// the center). Powers the hex details panel.
export const domainById: Map<string, HubDomainRec> = new Map(domains.map((d) => [d.id, d]));

export { graph, hub };
