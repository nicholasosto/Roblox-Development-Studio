// The Catalog lens — the decision-0008 lab ledger over the ui-catalog feed (./catalog), routed
// from App like the other lenses. It adds presentation only: a place picker, a status header read
// O(1) from the selected place's `counts`, the catalog-entry cards, the kit inventory table, and
// the GenerationManifests verbatim. Every datum comes from the emitted feed JSON via ./catalog —
// the panel names no field the collector doesn't emit, and never re-reads the JSON.
//
// The feed is live-ish: the Studio plugin posts ledger snapshots every 30s; the collector writes
// ui-catalog.json only on change; the static app inlines it at build time.
//
// The feed is keyed by place (schema v2), so the picker lists every place that has ever reported.
// Places carrying no ledger are kept and shown — honestly, as their own row — but sorted last, so
// opening the hub in Studio can never take the lens away from the lab you're working in.
import { useState } from 'react';
import { Badge, Callout, Card, EmptyState, Select, Stat, Table } from '@trembus/ui';
import {
  defaultPlaceKey,
  manifestStatusLine,
  places,
  stateTone,
  type PlaceLedger,
} from './catalog';
import { fmtWhen } from './labs';

export function CatalogPanel() {
  const [selectedKey, setSelectedKey] = useState(defaultPlaceKey);

  if (places.length === 0) {
    return (
      <div className="cc-explorer">
        <EmptyState
          title="No ledger snapshot yet"
          description="Start the collector (node tools/telemetry-collector.mjs), open a lab place in Studio with the @trembus/studio-telemetry plugin installed, then rebuild the app to inline the feed."
        />
      </div>
    );
  }

  const active: PlaceLedger = places.find((p) => p.key === selectedKey) ?? places[0];
  const { counts } = active;

  return (
    <div className="cc-explorer">
      {/* 1 — PLACE PICKER + STATUS HEADER */}
      <section className="cc-section">
        <h3 className="cc-section-title">
          Lab catalog{' '}
          <span className="cc-explorer__built">
            {places.length} place{places.length === 1 ? '' : 's'} reporting
          </span>
        </h3>

        {places.length > 1 && (
          <Select
            label="Place"
            size="sm"
            containerClassName="cc-catalog-picker"
            value={active.key}
            onChange={(e) => setSelectedKey(e.currentTarget.value)}
          >
            {places.map((p) => (
              <option key={p.key} value={p.key}>
                {p.displayName}
                {p.hasLedger ? ` — ${p.counts.entries} entries · ${p.counts.kits} kits` : ' — no ledger'}
              </option>
            ))}
          </Select>
        )}

        <p className="cc-explorer__built">
          placeId {active.placeId || '(unsaved)'} · reported {fmtWhen(active.receivedAt)}
        </p>

        <div className="cc-explorer__stats">
          <Stat label="Catalog entries" value={counts.entries} tone="accent" />
          <Stat label="Mockup kits" value={counts.kits} tone="info" />
          <Stat label="Manifests" value={counts.manifests} tone="neutral" />
          <Stat
            label="Empty registry slots"
            value={counts.emptySlots}
            tone={counts.emptySlots > 0 ? 'warning' : 'success'}
          />
        </div>
      </section>

      {!active.hasLedger && (
        <section className="cc-section">
          <Callout tone="info" title={`${active.displayName} carries no decision-0008 ledger`}>
            This place reported an empty snapshot — no{' '}
            <code className="cc-explorer__mono">ReplicatedStorage.UIStudio.Catalog</code> and no{' '}
            <code className="cc-explorer__mono">UIMockups</code>. That is an honest "no catalog
            here", not a failed feed; pick another place above to see its ledger.
          </Callout>
        </section>
      )}

      {/* 2 — CATALOG ENTRIES */}
      {active.catalog.length > 0 && (
        <section className="cc-section">
          <h3 className="cc-section-title">Catalog entries</h3>
          <div className="cc-pkg-grid">
            {active.catalog.map((e) => (
              <Card key={e.name} className="cc-tools-card">
                <div className="cc-pkg-card__head">
                  <span className="cc-pkg-card__name">{e.component ?? e.name}</span>
                  {e.state && (
                    <Badge tone={stateTone(e.state)} variant="soft" size="sm" dot>
                      {e.state}
                    </Badge>
                  )}
                  {e.templates === 0 ? (
                    <Badge tone="warning" variant="outline" size="sm" dot>
                      no template
                    </Badge>
                  ) : (
                    <Badge tone="success" variant="outline" size="sm">
                      {e.templates} template{e.templates === 1 ? '' : 's'}
                    </Badge>
                  )}
                </div>
                <dl className="cc-explorer__facts">
                  <div>
                    <dt>Entry</dt>
                    <dd>{e.name}</dd>
                  </div>
                  {e.sourceGuiPath && (
                    <div>
                      <dt>Source GUI</dt>
                      <dd>
                        <code className="cc-explorer__mono">{e.sourceGuiPath}</code>
                      </dd>
                    </div>
                  )}
                  {e.variants && (
                    <div>
                      <dt>Variants</dt>
                      <dd>
                        <code className="cc-explorer__mono">{e.variants}</code>
                      </dd>
                    </div>
                  )}
                  {e.generatedBy && (
                    <div>
                      <dt>Generated by</dt>
                      <dd>
                        {e.generatedBy}
                        {e.harnessVersion !== undefined ? ` · harness v${e.harnessVersion}` : ''}
                      </dd>
                    </div>
                  )}
                </dl>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 3 — MOCKUP KITS */}
      {active.kits.length > 0 && (
        <section className="cc-section">
          <h3 className="cc-section-title">Mockup kits (UIMockups masters)</h3>
          <Table density="compact">
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Kit</Table.HeaderCell>
                <Table.HeaderCell>Class</Table.HeaderCell>
                <Table.HeaderCell>Descendants</Table.HeaderCell>
                <Table.HeaderCell>Manifest</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {active.kits.map((k) => (
                <Table.Row key={k.name}>
                  <Table.Cell>{k.name}</Table.Cell>
                  <Table.Cell>
                    <code className="cc-explorer__mono">{k.className}</code>
                  </Table.Cell>
                  <Table.Cell>{k.descendants}</Table.Cell>
                  <Table.Cell>
                    {k.hasManifest ? (
                      <Badge tone="success" variant="soft" size="sm" dot>
                        present
                      </Badge>
                    ) : (
                      <Badge tone="warning" variant="outline" size="sm">
                        missing
                      </Badge>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </section>
      )}

      {/* 4 — GENERATION MANIFESTS */}
      {active.manifests.length > 0 && (
        <section className="cc-section">
          <h3 className="cc-section-title">Generation manifests</h3>
          <div className="cc-tools-grid">
            {active.manifests.map((m) => (
              <Card key={m.path} className="cc-tools-card">
                <div className="cc-pkg-card__head">
                  <span className="cc-pkg-card__name">{manifestStatusLine(m.value)}</span>
                </div>
                <p className="cc-pkg-card__desc">
                  <code className="cc-explorer__mono">{m.path}</code>
                </p>
                <pre className="cc-catalog-pre">{m.value}</pre>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 5 — FEED NOTE */}
      <section className="cc-section">
        <Callout tone="info" title="How this feed works (pipeline M1)">
          The <code className="cc-explorer__mono">@trembus/studio-telemetry</code> plugin posts the
          in-place ledger every 30s to the local collector (
          <code className="cc-explorer__mono">node tools/telemetry-collector.mjs</code>, port 4320),
          which rewrites <code className="cc-explorer__mono">previews/dashboards/ui-catalog.json</code>{' '}
          only when that place's ledger actually changed. The registry is keyed by placeId, so each
          place keeps its own entry. Rebuild the app to inline the latest snapshot.
        </Callout>
      </section>
    </div>
  );
}
