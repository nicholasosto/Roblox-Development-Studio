// Regions F + G — the quiet reference tail, as three SIBLING sections (one shared rhythm
// with the rest of the lens). F: the toolchain + repo cards (the repo card carries the id
// the Dirty stat scrolls to; its HEAD facts are NOT repeated — the commits table's first
// row IS head). G: the workspace toolbox — every dashboard generator as a row with its
// copy-ready command and the freshness of the JSON it produces (each timestamp read from
// that artifact's own inlined module — no new backend) — and the serialization loop as a
// numbered step strip (footer-reference altitude, not document chrome).
import { Badge, Callout, Card, IconButton, Inline, Stat, Table, Toolbar, Tooltip } from '@trembus/ui';
import { receivedAt } from '../catalog';
import { built as packagesBuilt } from '../packages';
import { hub } from '../contract';
import { COLLECTOR_CMD, built as labsBuilt, fmtWhen, labs, toolchain, universe } from '../labs';
import type { LabsRepo } from '../labs';
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

// The serialization loop (decisions 0008 + 0009) as a numbered step strip — same visual
// weight as the toolbox it sits beside, provenance carried by the section title. The loop is
// per-repo now (labs + universe shell); the dossier's ⎘ loop snippet carries the right cd.
const LOOP_STEPS: { step: string; gloss: string }[] = [
  { step: 'Work in Studio', gloss: 'Publish, then File → Save to File As… into places/' },
  { step: 'Dry-run syncback', gloss: '⎘ dry-run on the experience dossier' },
  { step: 'Apply · diff · commit', gloss: "inside the project's repo — ⎘ loop carries the cd" },
  { step: 'Refresh the lens', gloss: '⎘ refresh cmd in the status strip' },
];

// One syncback repo's git state — rebuilt on the 2.0 compound-Card vocabulary: a header
// (name · branch/clean badges · path subtitle), the recent-commits table sitting flush
// between header and footer (its first row IS head, now tagged), and a copy-only footer.
// Rendered once per probed repo (roblox-labs always; the soul-steel-universe shell when the
// probe is schemaVersion ≥ 2). The labs card carries the cc-repo-card scroll anchor the
// status strip's dirty count targets.
function RepoCard({ repo, id, now }: { repo: LabsRepo; id?: string; now: number }) {
  const { flash, copy } = useCopyFlash();
  return (
    <Card className="cc-workbench-card" id={id}>
      <Card.Header className="cc-workbench-card__head">
        <div className="cc-workbench-card__headrow">
          <span className="cc-pkg-card__name">{repo.name}</span>
          <Inline wrap gap={1}>
            {repo.branch && (
              <Badge tone="neutral" variant="soft" size="sm">
                {repo.branch}
              </Badge>
            )}
            {repo.dirty > 0 ? (
              <Badge tone="warning" variant="soft" size="sm" dot>
                {repo.dirty} dirty
              </Badge>
            ) : (
              <Badge tone="success" variant="soft" size="sm" dot>
                clean
              </Badge>
            )}
          </Inline>
        </div>
        <span className="cc-workbench-card__path">{repo.path}</span>
      </Card.Header>
      {repo.recentCommits.length > 0 ? (
        <Table density="compact">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>Commit</Table.HeaderCell>
              <Table.HeaderCell>When</Table.HeaderCell>
              <Table.HeaderCell>Subject</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            {repo.recentCommits.map((c, i) => (
              <Table.Row key={c.sha}>
                <Table.Cell>
                  <code className="cc-explorer__mono cc-workbench__sha">{c.sha}</code>
                  {i === 0 && <span className="cc-workbench__headtag">HEAD</span>}
                </Table.Cell>
                <Table.Cell>
                  <span className="cc-workbench__when" title={fmtWhen(c.when)}>
                    {fmtAgo(c.when, now)}
                  </span>
                </Table.Cell>
                <Table.Cell>{c.subject}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p className="cc-workbench-card__empty">No commits probed.</p>
      )}
      <Card.Footer className="cc-explorer__footerbar cc-workbench-card__foot">
        <Toolbar aria-label={`${repo.name} commands`}>
          <Toolbar.Group aria-label="Copy repo commands">
            <Toolbar.Button title={`cd ${repo.path}`} onClick={() => void copy('cd', `cd ${repo.path}`)}>
              ⎘ cd
            </Toolbar.Button>
            <Toolbar.Button
              title={`git -C ${repo.path} status`}
              onClick={() => void copy('git status', `git -C ${repo.path} status`)}
            >
              ⎘ status
            </Toolbar.Button>
          </Toolbar.Group>
        </Toolbar>
        {flash && (
          <span className="cc-explorer__flash" role="status">
            {flash}
          </span>
        )}
      </Card.Footer>
    </Card>
  );
}

export function WorkbenchRunbook({ now }: { now: number }) {
  const { flash, copy } = useCopyFlash();
  const drift = rojoDrift();

  // Toolchain rail values — versions only (strip the tool name), pins compared for the note.
  // Every field is optional; an undefined value lets Stat fall back to its "—" default.
  const rojoValue = toolchain.rojoResolved?.replace(/^Rojo\s+/i, '');
  const rokitValue = toolchain.rokitResolved?.replace(/^rokit\s+/i, '');
  const pinLabs = toolchain.rojoPinLabs?.split('@')[1];
  const pinUniverse = toolchain.rojoPinUniverse?.split('@')[1];
  const pinNote = drift
    ? `pinned ${pinLabs ?? '?'} · drifted`
    : pinLabs && pinUniverse && pinLabs === pinUniverse
      ? `pinned ${pinLabs} · labs + universe`
      : pinLabs
        ? `pinned ${pinLabs}`
        : undefined;

  return (
    <>
      {/* F — TOOLCHAIN RAIL + MATCHED REPO PAIR */}
      <section className="cc-section">
        <h3 className="cc-section-title">Workbench</h3>
        <div className="cc-workbench-rail">
          <Stat
            label="Rojo"
            value={rojoValue}
            tone={drift ? 'warning' : 'success'}
            target={pinNote}
            badge={
              drift ? (
                <Badge tone="warning" variant="soft" size="sm" dot>
                  drift
                </Badge>
              ) : undefined
            }
          />
          <Stat label="Rokit" value={rokitValue} tone="neutral" target="toolchain manager" />
          <Stat
            label="Syncback"
            value={toolchain.syncbackAvailable ? 'available' : 'missing'}
            tone={toolchain.syncbackAvailable ? 'success' : 'danger'}
            target={toolchain.syncbackAvailable ? 'rojo syncback ready' : 'no syncback-capable rojo'}
          />
        </div>
        {drift && (
          <div className="cc-workbench-drift">
            <Callout tone="warning" title="Toolchain drift">
              The rojo resolving inside the labs repo does not match its rokit pin — run{' '}
              <code className="cc-explorer__mono">rokit install</code> there.
            </Callout>
          </div>
        )}
        <div className="cc-workbench-pair">
          <RepoCard repo={labs} id="cc-repo-card" now={now} />
          {universe && <RepoCard repo={universe} now={now} />}
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
        <h3 className="cc-section-title">Serialization loop · decisions 0008 + 0009</h3>
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
