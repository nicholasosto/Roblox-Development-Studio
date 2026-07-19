// The Packages Explorer — the bespoke panel over the packages registry (./packages), routed from
// App like the Overview. It adds presentation only: a summary header read O(1) from `counts`, a
// filter bar, a catalog card grid, and the dependency graph + Dialog inspector. Every package
// datum comes from the emitted registry JSON via ./packages — the panel names no field the
// generator doesn't emit, and never re-reads the JSON.
//
// Four stacked regions inside the standard scrollable .cc-panel (mirroring AssetExplorer):
//   1. SUMMARY HEADER — Stat tiles (packages · edges · consumers · drift · unbuilt) + a stacked
//      Meter (byStatus) + a DonutChart (byTier), all off `counts` so the header never iterates.
//   2. FILTER BAR — search + tier/status/depends-on/consumed-by/flag Selects, plus a
//      removable-chip strip reflecting the active filters. Client-side filtering.
//   3. CATALOG — a count line + a grid of package Cards, optionally grouped by tier
//      (foundation → midlayer → composite → standalone).
//   4. GRAPH + INSPECTOR — the whole-graph <Lineage> (with a consumer-overlay Switch) and the
//      Dialog inspector (full metadata, three dep tables, ego-graph, copy-snippet Toolbar).
// All actions are COPY-ONLY (no dev-server APIs) so the static build is fully functional.
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Badge,
  Box,
  Button,
  Callout,
  Card,
  DataStatusBar,
  Dialog,
  DonutChart,
  EmptyState,
  IconButton,
  Inline,
  Input,
  Meter,
  Select,
  Stat,
  Switch,
  Table,
  Toolbar,
} from '@trembus/ui';
import type { DataFilter } from '@trembus/ui';
import { Lineage } from '@trembus/viz';
import {
  EMPTY_FILTERS,
  FLAG_GLYPH,
  FLAG_KEYS,
  TIER_ORDER,
  built,
  consumerCount,
  consumerIdOfNode,
  consumers,
  counts,
  depGraphContract,
  dirPath,
  egoGraph,
  isConsumerNode,
  linkSnippet,
  matchesFilters,
  monorepo,
  packageById,
  packages,
  pkgStatusTone,
  pnpmAddSnippet,
  tierStyle,
} from './packages';
import type { FlagKey, PackageRecord, PkgFilters, Tier } from './packages';

// ── Copy-to-clipboard (the explorer's only side effect — clipboard, never the filesystem) ──
async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API needs a secure context; file:// / plain-http static serves fall back to the
    // legacy execCommand path so copy still works from the built bundle.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

// Status options come from the counts rollup (the statuses actually present), so the Select never
// offers a value with zero matches; the full vocab stays open (prerelease appears when emitted).
const STATUS_OPTIONS = Object.keys(counts.byStatus ?? {}).sort();

// Tier tone → the DonutChart segments, in layering order, zero tiers skipped.
const TIER_SEGMENTS = TIER_ORDER.filter((t) => (counts.byTier[t] ?? 0) > 0).map((t) => ({
  id: t,
  label: t,
  value: counts.byTier[t] ?? 0,
  tone: tierStyle(t).tone,
}));

export function PackagesExplorer() {
  const [filters, setFilters] = useState<PkgFilters>(EMPTY_FILTERS);
  const [groupByTier, setGroupByTier] = useState(true);
  const [showConsumers, setShowConsumers] = useState(false);
  const [sel, setSel] = useState<PackageRecord | undefined>(undefined);

  const set = <K extends keyof PkgFilters>(key: K, value: PkgFilters[K]) =>
    setFilters((f) => ({ ...f, [key]: value }));

  // The single derived pass over packages[], keyed on the whole filter state.
  const visible = useMemo(() => packages.filter((p) => matchesFilters(p, filters)), [filters]);

  // The whole-graph contract re-derives only when the overlay toggles.
  const graphData = useMemo(() => depGraphContract(showConsumers), [showConsumers]);

  const hasFilter = Boolean(
    filters.q.trim() || filters.tier || filters.status || filters.dependsOn || filters.consumedBy || filters.flag,
  );

  // The active-filter chips (DataStatusBar `filters` — removable via onRemoveFilter).
  const chips: DataFilter[] = [];
  if (filters.q.trim()) chips.push({ id: 'q', label: 'Search', value: filters.q.trim() });
  if (filters.tier) chips.push({ id: 'tier', label: 'Tier', value: tierStyle(filters.tier).label, tone: 'accent' });
  if (filters.status) chips.push({ id: 'status', label: 'Status', value: filters.status });
  if (filters.dependsOn) chips.push({ id: 'dependsOn', label: 'Depends on', value: filters.dependsOn, tone: 'accent' });
  if (filters.consumedBy) chips.push({ id: 'consumedBy', label: 'Consumed by', value: filters.consumedBy, tone: 'accent' });
  if (filters.flag) chips.push({ id: 'flag', label: 'Flag', value: filters.flag });

  const removeChip = (id: string) => set(id as keyof PkgFilters, '' as never);
  const clearAll = () => setFilters(EMPTY_FILTERS);

  // Grouped catalog: one section per tier in layering order; ungrouped: one flat name-sorted grid.
  const groups: { tier: Tier | null; rows: PackageRecord[] }[] = useMemo(() => {
    const sorted = visible.slice().sort((a, b) => a.id.localeCompare(b.id));
    if (!groupByTier) return [{ tier: null, rows: sorted }];
    return TIER_ORDER.map((tier) => ({ tier, rows: sorted.filter((p) => p.tier === tier) })).filter(
      (g) => g.rows.length > 0,
    );
  }, [visible, groupByTier]);

  // A filter change can remove the inspected package from the result set; keep the inspector open
  // anyway (it was opened deliberately) — but if the registry itself lost the id, drop it.
  useEffect(() => {
    if (sel && !packageById.has(sel.id)) setSel(undefined);
  }, [sel]);

  const openPackage = (id: string) => {
    const p = packageById.get(id);
    if (p) setSel(p);
  };

  // Graph node click: a package opens its inspector; a consumer overlay node applies the
  // consumed-by filter (the node IS the filter facet).
  const onGraphSelect = (id: string) => {
    if (isConsumerNode(id)) set('consumedBy', consumerIdOfNode(id));
    else openPackage(id);
  };

  return (
    <div className="cc-explorer">
      {/* 1 — SUMMARY HEADER */}
      <section className="cc-section">
        <h3 className="cc-section-title">
          {monorepo.name} <span className="cc-explorer__built">registry built {built}</span>
        </h3>
        <div className="cc-explorer__summary">
          <div className="cc-explorer__summary-main">
            <div className="cc-explorer__stats">
              <Stat label="Packages" value={counts.packages} tone="neutral" onSelect={clearAll} />
              <Stat
                label="Internal edges"
                value={counts.internalEdges}
                unit={counts.optionalEdges ? `(${counts.optionalEdges} opt)` : undefined}
                tone="info"
              />
              <Stat label="Consumers" value={counts.consumers} tone="accent" />
              <Stat
                label="Table drift"
                value={counts.claudeTableDrift}
                tone={counts.claudeTableDrift > 0 ? 'warning' : 'neutral'}
              />
              <Stat
                label="Unbuilt"
                value={counts.unbuilt}
                tone={counts.unbuilt > 0 ? 'danger' : 'neutral'}
              />
            </div>
            <Meter
              variant="stacked"
              max={counts.packages || 1}
              segments={[
                { value: counts.byStatus.stable ?? 0, tone: 'success', label: 'stable' },
                { value: counts.byStatus.rc ?? 0, tone: 'warning', label: 'rc' },
                { value: counts.byStatus.prerelease ?? 0, tone: 'info', label: 'prerelease' },
              ]}
              label="Packages by status"
            />
          </div>
          <div className="cc-explorer__donut">
            <DonutChart
              size={150}
              selectedId={filters.tier || undefined}
              onSelect={(id) => set('tier', id === filters.tier ? '' : (id as Tier))}
              data={{
                view: 'donut',
                title: 'By tier',
                centerValue: String(counts.packages),
                centerLabel: 'packages',
                segments: TIER_SEGMENTS,
              }}
            />
          </div>
        </div>
      </section>

      {/* 2 — FILTER BAR */}
      <section className="cc-section">
        <Box className="cc-explorer__toolbar" material="glass" p={3}>
          <Inline wrap gap={2} align="end">
            <Input
              type="search"
              label="Search"
              placeholder="name or description…"
              value={filters.q}
              onChange={(e) => set('q', e.currentTarget.value)}
              startSlot={<span aria-hidden>⌕</span>}
              endSlot={
                filters.q ? (
                  <IconButton aria-label="Clear search" size="sm" variant="ghost" onPress={() => set('q', '')}>
                    ✕
                  </IconButton>
                ) : undefined
              }
              containerClassName="cc-explorer__search"
            />
            <Select
              label="Tier"
              placeholder="All tiers"
              value={filters.tier}
              onChange={(e) => set('tier', e.currentTarget.value as '' | Tier)}
            >
              <option value="">All tiers</option>
              {TIER_ORDER.map((t) => (
                <option key={t} value={t}>
                  {tierStyle(t).label} ({counts.byTier[t] ?? 0})
                </option>
              ))}
            </Select>
            <Select
              label="Status"
              placeholder="Any status"
              value={filters.status}
              onChange={(e) => set('status', e.currentTarget.value)}
            >
              <option value="">Any status</option>
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>
                  {s} ({counts.byStatus[s] ?? 0})
                </option>
              ))}
            </Select>
            <Select
              label="Depends on"
              placeholder="Any package"
              value={filters.dependsOn}
              onChange={(e) => set('dependsOn', e.currentTarget.value)}
            >
              <option value="">Any package</option>
              {packages
                .filter((p) => p.consumedBy.internal.length > 0)
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.id} ({p.consumedBy.internal.length})
                  </option>
                ))}
            </Select>
            <Select
              label="Consumed by"
              placeholder="Any repo"
              value={filters.consumedBy}
              onChange={(e) => set('consumedBy', e.currentTarget.value)}
            >
              <option value="">Any repo</option>
              {consumers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} ({c.uses.length})
                </option>
              ))}
            </Select>
            <Select
              label="Flag"
              placeholder="Any flag"
              value={filters.flag}
              onChange={(e) => set('flag', e.currentTarget.value as '' | FlagKey)}
            >
              <option value="">Any flag</option>
              {FLAG_KEYS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </Select>
            <Switch
              label="Group by tier"
              checked={groupByTier}
              onChange={(e) => setGroupByTier(e.currentTarget.checked)}
            />
          </Inline>
        </Box>
        {chips.length > 0 && (
          <div className="cc-explorer__activechips">
            <DataStatusBar
              dense
              status="live"
              statusLabel="Filtered"
              aria-label="Active filters"
              filters={chips}
              onRemoveFilter={(id) => removeChip(String(id))}
              metrics={[{ id: 'shown', label: 'shown', value: visible.length }]}
            />
            <Button size="sm" variant="ghost" onPress={clearAll}>
              Clear all
            </Button>
          </div>
        )}
        <p className="cc-explorer__count">
          {counts.packages} packages · {visible.length} shown
        </p>
      </section>

      {/* 3 — CATALOG */}
      <section className="cc-section">
        {visible.length === 0 ? (
          <EmptyState
            title="No packages match"
            description="No packages match the current filters."
            action={
              hasFilter ? (
                <Button size="sm" variant="outline" onPress={clearAll}>
                  Clear filters
                </Button>
              ) : undefined
            }
          />
        ) : (
          groups.map((g) => (
            <div key={g.tier ?? 'all'} className="cc-pkg-group">
              {g.tier && (
                <header className="cc-pkg-group__head">
                  <Badge tone={tierStyle(g.tier).tone} variant="soft" size="sm" dot>
                    {tierStyle(g.tier).label}
                  </Badge>
                  <span className="cc-pkg-group__gloss">{tierStyle(g.tier).gloss}</span>
                  <span className="cc-pkg-group__count">{g.rows.length}</span>
                </header>
              )}
              <div className="cc-pkg-grid">
                {g.rows.map((p) => (
                  <PackageCard
                    key={p.id}
                    pkg={p}
                    showTier={!g.tier}
                    onOpen={() => setSel(p)}
                    onDependsOn={(id) => set('dependsOn', id)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </section>

      {/* 4 — GRAPH + INSPECTOR */}
      <section className="cc-section">
        <div className="cc-pkg-graphhead">
          <h3 className="cc-section-title">Dependency graph</h3>
          <Switch
            label="Overlay consumer repos"
            checked={showConsumers}
            onChange={(e) => setShowConsumers(e.currentTarget.checked)}
          />
        </div>
        <div className="cc-pkg-graph">
          <Lineage data={graphData} selectedId={sel?.id} onSelect={onGraphSelect} />
        </div>
      </section>

      <Inspector pkg={sel} onClose={() => setSel(undefined)} onOpenPackage={openPackage} />
    </div>
  );
}

// ── A single package card — clickable (opens the inspector); the internal-dep chips are nested
// buttons that stop propagation and apply the depends-on filter instead. ──
function PackageCard({
  pkg,
  showTier,
  onOpen,
  onDependsOn,
}: {
  pkg: PackageRecord;
  showTier: boolean;
  onOpen: () => void;
  onDependsOn: (id: string) => void;
}) {
  const nConsumers = consumerCount(pkg);
  return (
    <Card interactive className="cc-pkg-card" onClick={onOpen}>
      <button type="button" className="cc-pkg-card__hit" onClick={onOpen} aria-label={`Inspect ${pkg.name}`} />
      <div className="cc-pkg-card__head">
        <span className="cc-pkg-card__name">{pkg.name}</span>
        <Badge tone={pkgStatusTone(pkg.status)} variant="soft" size="sm" dot>
          v{pkg.version} · {pkg.status}
        </Badge>
        {showTier && (
          <Badge tone={tierStyle(pkg.tier).tone} variant="outline" size="sm">
            {pkg.tier}
          </Badge>
        )}
        {!pkg.inClaudeTable && (
          <Badge tone="warning" variant="outline" size="sm" dot>
            not in CLAUDE.md table
          </Badge>
        )}
        {!pkg.flags.built && (
          <Badge tone="danger" variant="outline" size="sm" dot>
            unbuilt
          </Badge>
        )}
      </div>
      <p className="cc-pkg-card__desc">{pkg.description}</p>
      {pkg.statusNote && (
        <span className="cc-pkg-card__cutover" role="note" title={pkg.statusNote}>
          ⚠ {pkg.statusNote}
        </span>
      )}
      <div className="cc-pkg-card__foot">
        {pkg.internalDeps.length > 0 && (
          <span className="cc-pkg-card__deps">
            {pkg.internalDeps.map((d) => (
              <button
                key={d.id}
                type="button"
                className="cc-pkg-depchip"
                data-optional={d.optional || undefined}
                title={`${d.optional ? 'Optional dep' : 'Depends on'} ${d.id} ${d.range} — click to filter`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDependsOn(d.id);
                }}
              >
                {d.id}
                {d.optional ? '?' : ''}
              </button>
            ))}
          </span>
        )}
        <span className="cc-pkg-card__meta">
          {nConsumers} consumer{nConsumers === 1 ? '' : 's'}
        </span>
        <span className="cc-pkg-card__flags" aria-hidden>
          {FLAG_KEYS.filter((k) => pkg.flags[k]).map((k) => (
            <span key={k} className="cc-pkg-flag" title={FLAG_GLYPH[k].label}>
              {FLAG_GLYPH[k].glyph}
            </span>
          ))}
        </span>
      </div>
    </Card>
  );
}

// One essentials fact — a label-over-value cell in the inspector's at-a-glance grid. Skips absent
// values so a sparse record shows only the facts it actually carries (field-presence contract).
function Fact({ label, value }: { label: string; value: ReactNode }) {
  if (value === null || value === undefined || value === '') return null;
  return (
    <div>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

// A dependency table (internal / external peer / runtime); renders nothing when empty.
function DepTable({
  title,
  rows,
  onOpenPackage,
}: {
  title: string;
  rows: { key: string; name: ReactNode; range: string; note?: string }[];
  onOpenPackage?: (id: string) => void;
}) {
  if (!rows.length) return null;
  return (
    <section className="cc-pkg-deptable">
      <h4>{title}</h4>
      <Table density="compact">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Package</Table.HeaderCell>
            <Table.HeaderCell>Range</Table.HeaderCell>
            {onOpenPackage ? <Table.HeaderCell>Tier</Table.HeaderCell> : null}
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((r) => (
            <Table.Row key={r.key}>
              <Table.Cell>{r.name}</Table.Cell>
              <Table.Cell>
                <code className="cc-explorer__mono">{r.range}</code>
                {r.note && (
                  <Badge tone="neutral" variant="soft" size="sm" className="cc-pkg-deptable__note">
                    {r.note}
                  </Badge>
                )}
              </Table.Cell>
              {onOpenPackage ? <Table.Cell>{packageById.get(r.key)?.tier ?? '—'}</Table.Cell> : null}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  );
}

// ── The Dialog inspector — full metadata for the selected package, with the COPY BAR in the
// footer: pnpm add · link: · dir path, all clipboard-only. ──
function Inspector({
  pkg,
  onClose,
  onOpenPackage,
}: {
  pkg: PackageRecord | undefined;
  onClose: () => void;
  onOpenPackage: (id: string) => void;
}) {
  // Transient confirmation label for the copy actions (self-clears). Hooks stay above the early
  // return — this component is always mounted (pkg may be undefined).
  const [flash, setFlash] = useState<string | null>(null);
  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(null), 1600);
    return () => window.clearTimeout(t);
  }, [flash]);
  // The ego-graph re-derives per selection.
  const ego = useMemo(() => (pkg ? egoGraph(pkg.id) : null), [pkg]);
  if (!pkg || !ego) return null;

  const copy = async (label: string, text: string) => {
    const ok = await copyText(text);
    setFlash(ok ? `Copied ${label}` : 'Copy failed');
  };

  const supersededBy = packages.find((p) => p.supersedes === pkg.id);
  const tier = tierStyle(pkg.tier);

  return (
    <Dialog
      open
      onClose={onClose}
      size="md"
      title={pkg.name}
      description={`${pkg.dir} · ${monorepo.name}`}
      className="cc-explorer__dialogglass"
      footer={
        <div className="cc-explorer__footerbar">
          <Toolbar aria-label="Package actions" className="cc-explorer__cmdbar">
            <Toolbar.Group aria-label="Copy install snippets">
              <Toolbar.Button
                title={pnpmAddSnippet(pkg.id)}
                onClick={() => void copy('pnpm add', pnpmAddSnippet(pkg.id))}
              >
                ⎘ pnpm add
              </Toolbar.Button>
              <Toolbar.Button
                title={linkSnippet(pkg.id)}
                onClick={() => void copy('link: spec', linkSnippet(pkg.id))}
              >
                ⎘ link:
              </Toolbar.Button>
              <Toolbar.Button title={dirPath(pkg)} onClick={() => void copy('dir path', dirPath(pkg))}>
                ⎘ dir path
              </Toolbar.Button>
            </Toolbar.Group>
            <Toolbar.Separator />
            <Toolbar.Group aria-label="External">
              <Toolbar.Button title={pkg.npmUrl} onClick={() => window.open(pkg.npmUrl, '_blank', 'noopener')}>
                ↗ npm
              </Toolbar.Button>
            </Toolbar.Group>
          </Toolbar>
          {flash && (
            <span className="cc-explorer__flash" role="status">
              {flash}
            </span>
          )}
        </div>
      }
    >
      <div className="cc-explorer__inspector">
        <Inline wrap gap={1} className="cc-explorer__inspectorbadges">
          <Badge tone={pkgStatusTone(pkg.status)} variant="soft" size="sm" dot>
            {pkg.status}
          </Badge>
          <Badge tone={tier.tone} variant="soft" size="sm">
            {tier.label}
          </Badge>
          <Badge tone="neutral" variant="soft" size="sm">
            v{pkg.version}
          </Badge>
          {pkg.flags.built ? (
            <Badge tone="success" variant="outline" size="sm" dot>
              built
            </Badge>
          ) : (
            <Badge tone="danger" variant="outline" size="sm" dot>
              unbuilt
            </Badge>
          )}
          {!pkg.inClaudeTable && (
            <Badge tone="warning" variant="outline" size="sm" dot>
              not in CLAUDE.md table
            </Badge>
          )}
          {FLAG_KEYS.filter((k) => pkg.flags[k]).map((k) => (
            <Badge key={k} tone="neutral" variant="outline" size="sm">
              {FLAG_GLYPH[k].glyph} {k}
            </Badge>
          ))}
        </Inline>

        <p className="cc-pkg-inspector__desc">{pkg.description}</p>

        {pkg.statusNote && (
          <Callout tone="warning" title="Cutover">
            {pkg.statusNote}
            {pkg.supersedes && (
              <>
                {' — supersedes '}
                <button type="button" className="cc-pkg-link" onClick={() => onOpenPackage(pkg.supersedes!)}>
                  {pkg.supersedes}
                </button>
              </>
            )}
            {supersededBy && (
              <>
                {' — superseded by '}
                <button type="button" className="cc-pkg-link" onClick={() => onOpenPackage(supersededBy.id)}>
                  {supersededBy.id}
                </button>
              </>
            )}
          </Callout>
        )}

        <dl className="cc-explorer__facts">
          <Fact label="Version" value={pkg.version} />
          <Fact label="Tier" value={`${tier.label} — ${tier.gloss}`} />
          <Fact label="Directory" value={<code className="cc-explorer__mono">{pkg.dir}</code>} />
          <Fact label="Internal deps" value={pkg.internalDeps.length} />
          <Fact label="Consumers" value={consumerCount(pkg)} />
        </dl>

        <DepTable
          title="Internal @trembus dependencies"
          onOpenPackage={onOpenPackage}
          rows={pkg.internalDeps.map((d) => ({
            key: d.id,
            name: (
              <button type="button" className="cc-pkg-link" onClick={() => onOpenPackage(d.id)}>
                {monorepo.scope}/{d.id}
              </button>
            ),
            range: d.range,
            note: d.optional ? 'optional' : undefined,
          }))}
        />
        <DepTable
          title="External peer dependencies"
          rows={pkg.externalPeerDeps.map((d) => ({ key: d.name, name: d.name, range: d.range }))}
        />
        <DepTable
          title="Runtime dependencies"
          rows={pkg.runtimeDeps.map((d) => ({ key: d.name, name: d.name, range: d.range }))}
        />

        <section className="cc-pkg-consumedby">
          <h4>Consumed by</h4>
          {consumerCount(pkg) === 0 ? (
            <p className="cc-pkg-inspector__none">Nothing consumes this package yet.</p>
          ) : (
            <>
              {pkg.consumedBy.internal.length > 0 && (
                <p>
                  <span className="cc-pkg-consumedby__label">In-repo packages:</span>{' '}
                  {pkg.consumedBy.internal.map((id) => (
                    <button key={id} type="button" className="cc-pkg-link" onClick={() => onOpenPackage(id)}>
                      {id}
                    </button>
                  ))}
                </p>
              )}
              {pkg.consumedBy.external.length > 0 && (
                <p>
                  <span className="cc-pkg-consumedby__label">Game repos:</span>{' '}
                  {pkg.consumedBy.external.map((id) => (
                    <span key={id} className="cc-pkg-consumer">
                      {id}
                    </span>
                  ))}
                </p>
              )}
            </>
          )}
        </section>

        {pkg.docs && pkg.docs.length > 0 && (
          <section className="cc-pkg-docs">
            <h4>Docs</h4>
            <ul>
              {pkg.docs.map((d) => (
                <li key={d.path}>
                  {d.label} — <code className="cc-explorer__mono">{d.path}</code>{' '}
                  <Button
                    size="sm"
                    variant="ghost"
                    onPress={() => void copy('doc path', `${dirPath(pkg)}/${d.path}`)}
                  >
                    copy path
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="cc-pkg-ego">
          <h4>Neighborhood</h4>
          <Lineage
            data={ego}
            selectedId={pkg.id}
            onSelect={(id) => {
              if (!isConsumerNode(id) && id !== pkg.id) onOpenPackage(id);
            }}
          />
        </section>
      </div>
    </Dialog>
  );
}
