// The Packages Explorer — the bespoke panel over the packages registry (./packages), routed from
// App like the Overview. It adds presentation only: a summary header read O(1) from `counts`, a
// filter bar, the master-detail dossier, and the whole dependency graph. Every package datum
// comes from the emitted registry JSON via ./packages — the panel names no field the generator
// doesn't emit, and never re-reads the JSON.
//
// Four stacked regions inside the standard scrollable .cc-panel (mirroring AssetExplorer):
//   1. SUMMARY HEADER — Stat tiles (packages · edges · consumers · drift · unbuilt) + a stacked
//      Meter (byStatus) + a DonutChart (byTier), all off `counts` so the header never iterates.
//   2. FILTER BAR — search + tier/status/depends-on/consumed-by/flag Selects, plus a
//      removable-chip strip reflecting the active filters. Client-side filtering.
//   3. DOSSIER — the master-detail layout from the Trembus "Package Dossier" example: a
//      selectable rail of the FILTERED packages (optionally grouped by tier) beside the always-
//      visible <PackageDossier> for the selection. Selection survives filtering (a package
//      chosen deliberately keeps its dossier even when the rail no longer lists it).
//   4. GRAPH — the whole-graph <Lineage> (with a consumer-overlay Switch); clicking a package
//      node selects it in the dossier, clicking an overlay node applies the consumed-by filter.
// All actions are COPY-ONLY (no dev-server APIs) so the static build is fully functional.
import { Fragment, useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Button,
  DataStatusBar,
  DonutChart,
  EmptyState,
  IconButton,
  Inline,
  Input,
  Meter,
  Select,
  Stat,
  Switch,
} from '@trembus/ui';
import type { DataFilter } from '@trembus/ui';
import { Lineage } from '@trembus/viz';
import { PackageDossier } from './PackageDossier';
import {
  EMPTY_FILTERS,
  FLAG_KEYS,
  TIER_ORDER,
  built,
  consumerIdOfNode,
  consumers,
  counts,
  depGraphContract,
  isConsumerNode,
  matchesFilters,
  monorepo,
  packageById,
  packages,
  pkgStatusTone,
  tierStyle,
} from './packages';
import type { FlagKey, PackageRecord, PkgFilters, Tier } from './packages';

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
  // The dossier selection — an id, not a record, so a regenerated registry never strands a stale
  // object. Falls back below when the id is unknown (or the registry emptied).
  const [selId, setSelId] = useState<string | undefined>(undefined);

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

  // Grouped rail: one section per tier in layering order; ungrouped: one flat name-sorted list.
  const groups: { tier: Tier | null; rows: PackageRecord[] }[] = useMemo(() => {
    const sorted = visible.slice().sort((a, b) => a.id.localeCompare(b.id));
    if (!groupByTier) return [{ tier: null, rows: sorted }];
    return TIER_ORDER.map((tier) => ({ tier, rows: sorted.filter((p) => p.tier === tier) })).filter(
      (g) => g.rows.length > 0,
    );
  }, [visible, groupByTier]);

  // Pure derivation, no effect: an explicit selection survives filtering (chosen deliberately —
  // the rail just stops highlighting it); an unknown/unset id falls back to the rail's first row.
  const selected: PackageRecord | undefined =
    (selId ? packageById.get(selId) : undefined) ?? groups[0]?.rows[0];

  const selectPackage = (id: string) => {
    if (packageById.has(id)) setSelId(id);
  };

  // Graph node click: a package selects its dossier; a consumer overlay node applies the
  // consumed-by filter (the node IS the filter facet).
  const onGraphSelect = (id: string) => {
    if (isConsumerNode(id)) set('consumedBy', consumerIdOfNode(id));
    else selectPackage(id);
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

      {/* 3 — DOSSIER (master rail + detail, per the Trembus Package Dossier example) */}
      <section className="cc-section">
        {visible.length === 0 || !selected ? (
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
          <div className="cc-dossier">
            <nav className="cc-dossier__rail" aria-label="Packages">
              {groups.map((g) => (
                <Fragment key={g.tier ?? 'all'}>
                  <span className="cc-dossier__railcap">
                    {g.tier ? (
                      <>
                        <Badge tone={tierStyle(g.tier).tone} variant="soft" size="sm" dot>
                          {tierStyle(g.tier).label}
                        </Badge>
                        <span className="cc-dossier__railcount">{g.rows.length}</span>
                      </>
                    ) : (
                      'Packages'
                    )}
                  </span>
                  {g.rows.map((p) => (
                    <RailItem
                      key={p.id}
                      pkg={p}
                      selected={p.id === selected.id}
                      onSelect={() => setSelId(p.id)}
                    />
                  ))}
                </Fragment>
              ))}
            </nav>
            <div className="cc-dossier__detail">
              {/* Keyed by id so switching packages resets the copy flash + Brief disclosure. */}
              <PackageDossier key={selected.id} pkg={selected} onSelectPackage={selectPackage} />
            </div>
          </div>
        )}
      </section>

      {/* 4 — GRAPH */}
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
          <Lineage data={graphData} selectedId={selected?.id} onSelect={onGraphSelect} />
        </div>
      </section>
    </div>
  );
}

// ── A rail item — one selectable package row: name + status dot, then a mono sub-line. The
// aria-pressed state doubles as the selected-styling hook (the Package Dossier example's rail). ──
function RailItem({
  pkg,
  selected,
  onSelect,
}: {
  pkg: PackageRecord;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className="cc-dossier-item"
      onClick={onSelect}
      aria-pressed={selected}
      aria-current={selected ? 'true' : undefined}
    >
      <span className="cc-dossier-item__head">
        <span className="cc-dossier-item__name">{pkg.name}</span>
        <span className="cc-dossier-item__dot" data-tone={pkgStatusTone(pkg.status)} aria-hidden="true" />
      </span>
      <span className="cc-dossier-item__sub">
        v{pkg.version} · {tierStyle(pkg.tier).label} · {pkg.status}
      </span>
    </button>
  );
}
