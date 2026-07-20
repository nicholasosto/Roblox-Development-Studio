import { useState } from 'react';
import { Brief, Card, Hub, Tabs } from '@trembus/ui';
import type { BriefContract, SectionKind } from '@trembus/ui';
import { domainById, entities, entitiesOfKinds, hub, hubData, kinds, prettify } from './contract';
import { CatalogPanel } from './CatalogPanel';
import { PackagesExplorer } from './PackagesExplorer';
import { ToolsPanel } from './tools/ToolsPanel';
import { groupByStatus } from './status';

// The four areas: the Hub overview (the Project-System contract made legible), the Packages
// explorer (the registry surface), the Catalog lens (the decision-0008 lab ledger feed), and the
// Tools lens (lab toolchain + syncback status). Per-kind auto-tabs are deliberately omitted — the
// hex drawer already lists every kind's entities.
type NavEntry = { value: 'overview' | 'packages' | 'catalog' | 'tools'; label: string };
const AREAS: NavEntry[] = [
  { value: 'overview', label: 'Overview' },
  { value: 'packages', label: 'Packages' },
  { value: 'catalog', label: 'Catalog' },
  { value: 'tools', label: 'Tools' },
];

// Deep-link support: the static landing shell links to `app/#packages`. Honor a leading hash that
// names a real nav tab on first load; `#tools=<projectId>` (the Tools lens's own deep link — the
// panel reads the id itself) opens Tools; anything unknown (or no hash) falls back to Overview.
// Exact tab names match FIRST so `#packages`-style links can never regress. Read once at mount —
// the tabs are in-page state, not routes, so we don't sync back to the URL.
function initialTab(): NavEntry['value'] {
  if (typeof window === 'undefined') return 'overview';
  const hash = window.location.hash.replace(/^#/, '');
  if (AREAS.some((a) => a.value === hash)) return hash as NavEntry['value'];
  if (hash.startsWith('tools=')) return 'tools';
  return 'overview';
}

// Section kind per control-surface facet (the non-kind hex petals that carry `entries`).
const FACET_SECTION: Record<string, SectionKind> = {
  commands: 'commands',
  workflows: 'artifacts',
};

// A compact, config-ordered status rollup for a kind's entities — e.g. "1 active · 1 proposed".
const statusRollup = (kind: string, rows: ReturnType<typeof entitiesOfKinds>): string =>
  groupByStatus(kind, rows)
    .map(([s, g]) => `${g.length} ${s}`)
    .join(' · ');

// Selecting a hub tile reveals that tile's detail in the right-side drawer. The selected id is
// the domain id — an entity kind for kind-petals, a facet id for control-surface petals, or
// 'contract' for the center. Projects the selection into a Trembus BriefContract:
//   · the CENTER lists every conforming entity, categorized BY KIND (declared order), each kind's
//     `note` rolling up its status spread — then its sources;
//   · a KIND PETAL categorizes that one kind's entities BY STATUS (config enum order);
//   · a FACET petal lists its `entries`.
function hexBrief(id: string): BriefContract {
  const domain = domainById.get(id);
  const rows = entitiesOfKinds(id);
  const entries = domain?.entries ?? [];
  const dot = domain?.dot;
  const isCenter = domain?.kind === 'center' || id === 'contract';
  const sections: NonNullable<BriefContract['sections']> = [];

  if (isCenter) {
    for (const kind of kinds) {
      const group = entitiesOfKinds(kind);
      if (!group.length) continue;
      const sorted = group.slice().sort((a, b) => b.updated.localeCompare(a.updated));
      sections.push({
        id: `kind-${kind}`,
        heading: `${prettify(kind)}s`,
        kind: 'artifacts',
        note: statusRollup(kind, group),
        items: sorted.map((e) => ({ text: e.title, status: e.status, ref: e.updated })),
      });
    }
  } else if (rows.length) {
    for (const [status, group] of groupByStatus(id, rows)) {
      sections.push({
        id: `status-${status}`,
        heading: prettify(status),
        kind: 'artifacts',
        note: `${group.length} of ${rows.length}`,
        items: group.map((e) => ({ text: e.title, ref: e.updated })),
      });
    }
  } else if (entries.length) {
    sections.push({
      id: 'entries',
      heading: domain?.name ?? 'Details',
      kind: FACET_SECTION[id] ?? 'reference',
      items: entries.map((e) => ({ text: e.text, desc: e.desc, status: e.status, ref: e.ref })),
    });
  }

  // Sources: the center keeps its provenance as a trailing section beneath the categorized
  // entities; any other tile falls back to sources only when it would otherwise be empty.
  if (domain?.sources?.length && (isCenter || !sections.length)) {
    sections.push({
      id: 'sources',
      heading: 'Sources',
      kind: 'reference',
      items: domain.sources.map((s) => (typeof s === 'string' ? s : { text: s.label, ref: s.href })),
    });
  }

  // Eyebrow (the gold mono `id` slot): the tile's first source path — its most identifying
  // handle — falling back to the shared tag only when a tile declares no source.
  const firstSource = domain?.sources?.[0];
  const eyebrow = (typeof firstSource === 'string' ? firstSource : firstSource?.label) ?? domain?.tag;

  // Meta pills — scannable + toned, no repetition. Lead with a count; every tile shows the
  // rollup — the part of `status` after the leading "N · ", which would otherwise repeat it.
  const meta: NonNullable<BriefContract['meta']> = [];
  if (isCenter) {
    meta.push({ label: 'entities', value: entities.length, tone: dot });
    meta.push({ label: 'kinds', value: kinds.filter((k) => entitiesOfKinds(k).length).length });
    if (domain?.status) meta.push({ label: 'conformant', value: domain.status });
  } else if (rows.length) {
    meta.push({ label: 'entities', value: rows.length, tone: dot });
    const categories = new Set(rows.map((e) => e.status)).size;
    if (categories > 1) meta.push({ label: 'categories', value: categories });
  } else if (entries.length) {
    meta.push({ label: domain?.name?.toLowerCase() ?? 'items', value: entries.length, tone: dot });
  }
  const rollup = (domain?.status ?? '').split(' · ').slice(1).join(' · ').trim();
  if (rollup) meta.push({ label: 'state', value: rollup });
  if (!meta.length && domain?.status) meta.push({ label: 'state', value: domain.status });

  return {
    view: 'brief',
    kind: 'spec',
    id: eyebrow ?? id,
    title: domain?.name ?? id,
    summary: domain?.note ?? domain?.sub,
    meta,
    sections,
  };
}

export function App() {
  const [tab, setTab] = useState<NavEntry['value']>(initialTab);
  const [hubSel, setHubSel] = useState<string | undefined>(undefined);

  const overviewBody = (
    <div className="cc-overview">
      <div className="cc-overview__hub">
        <Hub data={hubData} selectedId={hubSel} onSelect={setHubSel} />
      </div>
      <aside className="cc-detailpanel" data-open={Boolean(hubSel)} aria-label="Entity details">
        <div className="cc-detailpanel__inner">
          {hubSel ? (
            <Card className="cc-detailpanel__card">
              <button
                type="button"
                className="cc-detailpanel__close"
                onClick={() => setHubSel(undefined)}
                aria-label="Close details"
              >
                ✕
              </button>
              <Brief data={hexBrief(hubSel)} />
              {hubSel === 'package' && (
                <button type="button" className="cc-guide__cta" onClick={() => setTab('packages')}>
                  Open Packages explorer →
                </button>
              )}
            </Card>
          ) : null}
        </div>
      </aside>
    </div>
  );

  return (
    <div className="tcl-root cc-app">
      <header className="cc-head">
        <h1 className="cc-title">{hub.brand} · Command Center</h1>
      </header>

      <Tabs value={tab} onValueChange={(v) => setTab(v as NavEntry['value'])} className="cc-tabs">
        <Tabs.List aria-label="Project areas" className="cc-tablist">
          {AREAS.map((a) => (
            <Tabs.Tab key={a.value} value={a.value}>
              {a.label}
            </Tabs.Tab>
          ))}
        </Tabs.List>

        <Tabs.Panel value="overview" className="cc-panel cc-panel--hub">
          {overviewBody}
        </Tabs.Panel>
        <Tabs.Panel value="packages" className="cc-panel">
          <PackagesExplorer />
        </Tabs.Panel>
        <Tabs.Panel value="catalog" className="cc-panel">
          <CatalogPanel />
        </Tabs.Panel>
        <Tabs.Panel value="tools" className="cc-panel">
          <ToolsPanel />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
