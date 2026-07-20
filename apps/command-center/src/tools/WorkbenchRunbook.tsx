// Regions F + G — the quiet reference tail, as three SIBLING sections (one shared rhythm
// with the rest of the lens). F: the toolchain + repo cards (the repo card carries the id
// the Dirty stat scrolls to; its HEAD facts are NOT repeated — the commits table's first
// row IS head). G: the workspace toolbox — every dashboard generator as a row with its
// copy-ready command and the freshness of the JSON it produces (each timestamp read from
// that artifact's own inlined module — no new backend) — and the serialization loop as a
// numbered step strip (footer-reference altitude, not document chrome).
import { Badge, Callout, Card, IconButton, Inline, Table, Tooltip } from '@trembus/ui';
import { receivedAt } from '../catalog';
import { built as packagesBuilt } from '../packages';
import { hub } from '../contract';
import { COLLECTOR_CMD, built as labsBuilt, fmtWhen, labs, toolchain } from '../labs';
import { agoMs, fmtAgo } from '../time';
import { rojoDrift } from './AttentionBanner';
import { useCopyFlash } from './useCopyFlash';

// A generator's output counts fresh for a day — same threshold as the probe-stale badge.
const FRESH_MS = 24 * 60 * 60 * 1000;

interface ToolRow {
  id: string;
  label: string;
  command: string;
  output: string;
  /** ISO (or date-only) stamp of the artifact this tool last produced; absent → no badge. */
  freshIso?: string;
  freshLabel?: string;
}

// The workspace generator roster (CLAUDE.md's dashboard section, made copyable).
const TOOLBOX: ToolRow[] = [
  {
    id: 'labs',
    label: 'Labs status probe',
    command: 'node tools/build-labs-status.mjs',
    output: 'labs-status.json',
    freshIso: labsBuilt,
  },
  {
    id: 'packages',
    label: 'Packages registry',
    command: 'node tools/build-packages-registry.mjs',
    output: 'packages.json',
    freshIso: packagesBuilt,
  },
  {
    id: 'hub',
    label: 'Hub render',
    command: 'node .project-system/tools/render-hub.mjs',
    output: 'roblox-development-studio-{graph,hub}.json',
    freshIso: (hub as { updated?: string }).updated,
  },
  {
    id: 'collector',
    label: 'Telemetry collector',
    command: COLLECTOR_CMD,
    output: 'ui-catalog.json + /live',
    freshIso: receivedAt,
    freshLabel: 'last envelope',
  },
  {
    id: 'bundle',
    label: 'Explorer rebuild',
    command: 'pnpm --dir apps/command-center build',
    output: 'previews/app/',
  },
];

function FreshnessBadge({ row, now }: { row: ToolRow; now: number }) {
  const age = agoMs(row.freshIso, now);
  if (age === null) return <span className="cc-pkg-card__desc">—</span>;
  const stale = age > FRESH_MS;
  return (
    <span title={fmtWhen(row.freshIso)}>
      <Badge tone={stale ? 'warning' : 'success'} variant="soft" size="sm" dot>
        {row.freshLabel ? `${row.freshLabel} ` : ''}
        {fmtAgo(row.freshIso, now)}
      </Badge>
    </span>
  );
}

// The serialization loop (decision 0008) as a numbered step strip — same visual weight as
// the toolbox it sits beside, provenance carried by the section title.
const LOOP_STEPS: { step: string; gloss: string }[] = [
  { step: 'Work in Studio', gloss: 'File → Save to File As… into places/' },
  { step: 'Dry-run syncback', gloss: '⎘ dry-run on the experience dossier' },
  { step: 'Apply · diff · commit', gloss: `inside ${labs.path}` },
  { step: 'Refresh the lens', gloss: '⎘ refresh cmd in the status strip' },
];

export function WorkbenchRunbook({ now }: { now: number }) {
  const { flash, copy } = useCopyFlash();
  const drift = rojoDrift();

  return (
    <>
      {/* F — TOOLCHAIN + REPO */}
      <section className="cc-section">
        <h3 className="cc-section-title">Workbench</h3>
        <div className="cc-tools-grid">
        <Card className="cc-tools-card">
          <h4 className="cc-tools-card__title">Toolchain</h4>
          <Inline wrap gap={1}>
            {toolchain.syncbackAvailable ? (
              <Badge tone="success" variant="soft" size="sm" dot>
                syncback available
              </Badge>
            ) : (
              <Badge tone="danger" variant="soft" size="sm" dot>
                syncback missing
              </Badge>
            )}
            {drift && (
              <Badge tone="warning" variant="outline" size="sm" dot>
                resolved rojo ≠ pin
              </Badge>
            )}
          </Inline>
          <dl className="cc-explorer__facts">
            {toolchain.rojoPinLabs && (
              <div>
                <dt>Rojo pin (labs)</dt>
                <dd>
                  <code className="cc-explorer__mono">{toolchain.rojoPinLabs}</code>
                </dd>
              </div>
            )}
            {toolchain.rojoResolved && (
              <div>
                <dt>Resolves to</dt>
                <dd>{toolchain.rojoResolved}</dd>
              </div>
            )}
            {toolchain.rojoPinMono && (
              <div>
                <dt>Rojo pin (mono)</dt>
                <dd>
                  <code className="cc-explorer__mono">{toolchain.rojoPinMono}</code>
                </dd>
              </div>
            )}
            {toolchain.rokitResolved && (
              <div>
                <dt>Rokit</dt>
                <dd>{toolchain.rokitResolved}</dd>
              </div>
            )}
          </dl>
          {drift && (
            <Callout tone="warning" title="Toolchain drift">
              The rojo resolving inside the labs repo does not match its rokit pin — run{' '}
              <code className="cc-explorer__mono">rokit install</code> there.
            </Callout>
          )}
        </Card>

        <Card className="cc-tools-card" id="cc-repo-card">
          <h4 className="cc-tools-card__title">{labs.name} repo</h4>
          <Inline wrap gap={1}>
            {labs.branch && (
              <Badge tone="neutral" variant="soft" size="sm">
                {labs.branch}
              </Badge>
            )}
            {labs.dirty > 0 ? (
              <Badge tone="warning" variant="soft" size="sm" dot>
                {labs.dirty} dirty
              </Badge>
            ) : (
              <Badge tone="success" variant="soft" size="sm" dot>
                clean
              </Badge>
            )}
          </Inline>
          <dl className="cc-explorer__facts">
            {/* No HEAD facts — the commits table's first row IS head; repeating it here
                was the wrap-prone jumble the 2.0 polish removed. */}
            <div>
              <dt>Path</dt>
              <dd>
                <code className="cc-explorer__mono">{labs.path}</code>
              </dd>
            </div>
          </dl>
          {labs.recentCommits.length > 0 && (
            <Table density="compact">
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>Commit</Table.HeaderCell>
                  <Table.HeaderCell>When</Table.HeaderCell>
                  <Table.HeaderCell>Subject</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {labs.recentCommits.map((c) => (
                  <Table.Row key={c.sha}>
                    <Table.Cell>
                      <code className="cc-explorer__mono">{c.sha}</code>
                    </Table.Cell>
                    <Table.Cell>
                      <span title={fmtWhen(c.when)}>{fmtAgo(c.when, now)}</span>
                    </Table.Cell>
                    <Table.Cell>{c.subject}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Card>
        </div>
      </section>

      {/* G — WORKSPACE TOOLBOX */}
      <section className="cc-section">
        <h3 className="cc-section-title">
          Workspace toolbox
          {flash && (
            <span className="cc-explorer__flash" role="status">
              {flash}
            </span>
          )}
        </h3>
        <Table density="compact" className="cc-runbook">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Tool</Table.HeaderCell>
              <Table.HeaderCell>Produces</Table.HeaderCell>
              <Table.HeaderCell>Freshness</Table.HeaderCell>
              <Table.HeaderCell>Command</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {TOOLBOX.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>{row.label}</Table.Cell>
                <Table.Cell>
                  <span className="cc-pkg-card__desc">{row.output}</span>
                </Table.Cell>
                <Table.Cell>
                  <FreshnessBadge row={row} now={now} />
                </Table.Cell>
                <Table.Cell>
                  <span className="cc-runbook__cmd">
                    <code className="cc-explorer__mono">{row.command}</code>
                    <Tooltip content={<code>{row.command}</code>} openDelay={300}>
                      <IconButton
                        aria-label={`Copy: ${row.label}`}
                        size="sm"
                        variant="ghost"
                        onPress={() => void copy(row.label, row.command)}
                      >
                        ⎘
                      </IconButton>
                    </Tooltip>
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <p className="cc-runbook__note">
          Explorer rebuild inlines the JSONs above at build time — rebuild after any regen.
        </p>
      </section>

      {/* G — THE LOOP (reference strip, decision 0008) */}
      <section className="cc-section">
        <h3 className="cc-section-title">Serialization loop · decision 0008</h3>
        <ol className="cc-loop">
          {LOOP_STEPS.map((s) => (
            <li key={s.step}>
              <strong>{s.step}</strong>
              <span>{s.gloss}</span>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
