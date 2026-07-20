// The package dossier — the detail half of the Packages lens's master-detail layout, following
// the Trembus "Package Dossier" example page (Examples/Package Dossier in the component-library
// Storybook): header chrome (name · path · copy actions · status chips), a condensed meta strip,
// a tier/cutover Callout, a Brief reference document, the dependency tables, and the ego-graph
// neighborhood. Every datum comes from the registry via ./packages — where the example carries
// mock API-surface data the registry doesn't emit, the section is simply absent, never invented.
//
// All actions are COPY-ONLY except the npm link (a plain anchor), so the static build stays
// fully functional. Each dossier owns its copy flash, beside the buttons it confirms.
import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { Badge, Brief, Button, Callout, Card, Inline, Stack, Table, Text } from '@trembus/ui';
import { Lineage } from '@trembus/viz';
import { copyText } from './clipboard';
import {
  DOSSIER_COLLAPSED,
  FLAG_GLYPH,
  FLAG_KEYS,
  consumerCount,
  dirPath,
  dossierBrief,
  egoGraph,
  isConsumerNode,
  linkSnippet,
  monorepo,
  packageById,
  packages,
  pkgStatusTone,
  pnpmAddSnippet,
  tierStyle,
} from './packages';
import type { PackageRecord } from './packages';

// ── header chrome ────────────────────────────────────────────────────────────
function StatusChips({ pkg }: { pkg: PackageRecord }) {
  const tier = tierStyle(pkg.tier);
  return (
    <Inline gap={1} wrap align="center">
      <Badge tone={pkgStatusTone(pkg.status)} variant="soft" size="sm" dot>
        {pkg.status}
      </Badge>
      <Badge tone={tier.tone} variant="outline" size="sm">
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
  );
}

function ActionBar({ pkg }: { pkg: PackageRecord }) {
  // Transient confirmation for the copy actions (self-clears) — the house flash pattern, owned
  // per dossier so switching packages resets it (the parent keys this component by pkg.id).
  const [flash, setFlash] = useState<string | null>(null);
  useEffect(() => {
    if (!flash) return;
    const t = window.setTimeout(() => setFlash(null), 1600);
    return () => window.clearTimeout(t);
  }, [flash]);
  const copy = async (label: string, text: string) => {
    const ok = await copyText(text);
    setFlash(ok ? `Copied ${label}` : 'Copy failed');
  };
  return (
    <Stack gap={1} align="end">
      <Inline gap={2} wrap justify="end">
        <Button
          variant="outline"
          tone="neutral"
          size="sm"
          onPress={() => void copy('pnpm add', pnpmAddSnippet(pkg.id))}
        >
          pnpm add
        </Button>
        <Button
          variant="outline"
          tone="neutral"
          size="sm"
          onPress={() => void copy('link: spec', linkSnippet(pkg.id))}
        >
          link
        </Button>
        <Button variant="outline" tone="neutral" size="sm" onPress={() => void copy('dir path', dirPath(pkg))}>
          dir path
        </Button>
        <Button asChild variant="outline" tone="neutral" size="sm">
          <a href={pkg.npmUrl} target="_blank" rel="noreferrer">
            npm ↗
          </a>
        </Button>
      </Inline>
      {flash && (
        <Text size="xs" tone="success" role="status">
          {flash}
        </Text>
      )}
    </Stack>
  );
}

// ── at-a-glance meta strip (one quiet line of label→value pairs) ─────────────
function MetaStrip({ pkg }: { pkg: PackageRecord }) {
  const none = (n: number): string | number => (n === 0 ? 'none' : n);
  const items: Array<[label: string, value: string | number]> = [
    ['Consumers', consumerCount(pkg)],
    ['Internal deps', none(pkg.internalDeps.length)],
    ['Peer deps', none(pkg.externalPeerDeps.length)],
    ['Runtime deps', none(pkg.runtimeDeps.length)],
  ];
  return (
    <div className="cc-dossier-meta">
      {items.map(([label, value]) => (
        <span key={label} className="cc-dossier-meta__item">
          <span className="cc-dossier-meta__label">{label}</span>
          <span className="cc-dossier-meta__value">{value}</span>
        </span>
      ))}
    </div>
  );
}

// ── the one Callout: a cutover note when the registry carries one, else the tier note ──
function TierNote({ pkg, onSelectPackage }: { pkg: PackageRecord; onSelectPackage: (id: string) => void }) {
  const supersededBy = packages.find((p) => p.supersedes === pkg.id);
  if (pkg.statusNote) {
    return (
      <Callout tone="warning" title="Cutover">
        {pkg.statusNote}
        {pkg.supersedes && (
          <>
            {' — supersedes '}
            <button type="button" className="cc-pkg-link" onClick={() => onSelectPackage(pkg.supersedes!)}>
              {pkg.supersedes}
            </button>
          </>
        )}
        {supersededBy && (
          <>
            {' — superseded by '}
            <button type="button" className="cc-pkg-link" onClick={() => onSelectPackage(supersededBy.id)}>
              {supersededBy.id}
            </button>
          </>
        )}
      </Callout>
    );
  }
  const tier = tierStyle(pkg.tier);
  return (
    <Callout tone="info" title={`${tier.label} package`}>
      {pkg.internalDeps.length === 0
        ? 'No internal dependencies — safe to depend on from any package or game repo.'
        : `Builds on ${pkg.internalDeps.map((d) => `${monorepo.scope}/${d.id}`).join(' + ')}.`}{' '}
      {tier.gloss && <>({tier.gloss})</>}
    </Callout>
  );
}

// ── dependency relationships (tabular, auto-fit grid) ────────────────────────
// A dependency table (internal / external peer / runtime); renders nothing when empty.
function DepTable({
  title,
  rows,
  onSelectPackage,
}: {
  title: string;
  rows: { key: string; name: ReactNode; range: string; note?: string }[];
  onSelectPackage?: (id: string) => void;
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
            {onSelectPackage ? <Table.HeaderCell>Tier</Table.HeaderCell> : null}
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
              {onSelectPackage ? <Table.Cell>{packageById.get(r.key)?.tier ?? '—'}</Table.Cell> : null}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </section>
  );
}

function RelationTables({ pkg, onSelectPackage }: { pkg: PackageRecord; onSelectPackage: (id: string) => void }) {
  return (
    <div className="cc-dossier-tables">
      <DepTable
        title="Internal @trembus dependencies"
        onSelectPackage={onSelectPackage}
        rows={pkg.internalDeps.map((d) => ({
          key: d.id,
          name: (
            <button type="button" className="cc-pkg-link" onClick={() => onSelectPackage(d.id)}>
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
      <section className="cc-pkg-deptable">
        <h4>Consumed by</h4>
        <Table density="compact">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Consumer</Table.HeaderCell>
              <Table.HeaderCell align="end">Type</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {consumerCount(pkg) === 0 ? (
              <Table.Empty colSpan={2}>Nothing depends on this yet.</Table.Empty>
            ) : (
              <>
                {pkg.consumedBy.internal.map((id) => (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <button type="button" className="cc-pkg-link" onClick={() => onSelectPackage(id)}>
                        {id}
                      </button>
                    </Table.Cell>
                    <Table.Cell align="end">
                      <Badge size="sm" tone="info" variant="soft">
                        package
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {pkg.consumedBy.external.map((id) => (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <span className="cc-explorer__mono">{id}</span>
                    </Table.Cell>
                    <Table.Cell align="end">
                      <Badge size="sm" tone="accent" variant="soft">
                        game repo
                      </Badge>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </>
            )}
          </Table.Body>
        </Table>
      </section>
    </div>
  );
}

// ── the dossier ──────────────────────────────────────────────────────────────
export function PackageDossier({
  pkg,
  onSelectPackage,
}: {
  pkg: PackageRecord;
  onSelectPackage: (id: string) => void;
}) {
  // The ego-graph re-derives per selection.
  const ego = useMemo(() => egoGraph(pkg.id), [pkg.id]);
  return (
    <Card>
      <Card.Header>
        <Stack gap={3}>
          <Inline justify="between" align="start" wrap gap={3}>
            <Stack gap={1}>
              <Text as="h2" size="lg" weight="bold">
                {pkg.name}
              </Text>
              <Text mono size="xs" tone="dim">
                {pkg.dir} · {monorepo.name}
              </Text>
            </Stack>
            <ActionBar pkg={pkg} />
          </Inline>
          <StatusChips pkg={pkg} />
          <Text tone="dim" size="sm">
            {pkg.description}
          </Text>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Stack gap={5}>
          <MetaStrip pkg={pkg} />
          <TierNote pkg={pkg} onSelectPackage={onSelectPackage} />
          {/* Brief owns the reference document: Setup open, Docs disclosed on click. */}
          <Brief data={dossierBrief(pkg)} headingLevel={3} defaultCollapsed={DOSSIER_COLLAPSED} />
          <RelationTables pkg={pkg} onSelectPackage={onSelectPackage} />
          <section className="cc-pkg-ego">
            <h4>Neighborhood</h4>
            <Lineage
              data={ego}
              selectedId={pkg.id}
              onSelect={(id) => {
                if (!isConsumerNode(id) && id !== pkg.id) onSelectPackage(id);
              }}
            />
          </section>
        </Stack>
      </Card.Body>
    </Card>
  );
}
