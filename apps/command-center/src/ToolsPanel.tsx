// The Tools lens — lab tooling + serialization status over the labs probe (./labs), routed from
// App like the other lenses. It adds presentation only: a status header read O(1) from `counts`,
// the toolchain/repo cards, the recent-commit log, and one card per discovered lab project with
// its sync state and copy-ready syncback commands. Every datum comes from the emitted probe JSON
// via ./labs — the panel names no field the generator doesn't emit, and never re-reads the JSON.
//
// Timestamps render RELATIVE (./time) with the absolute always in a title attr; a slow tick
// keeps them honest while the lens sits open, and the header badges "probe stale" once the
// build-time snapshot ages past a day. The live poll distinguishes three states — first poll in
// flight ("checking…"), collector down (a NORMAL quiet state), collector up — and each
// experience card owns its own copy flash, beside the toolbar it confirms.
//
// All actions are COPY-ONLY (clipboard, never the filesystem or a dev-server API) so the static
// build stays fully functional — the probe itself is re-run from a shell:
//   node tools/build-labs-status.mjs && pnpm --dir apps/command-center build
import { useEffect, useState } from 'react';
import { Badge, Callout, Card, EmptyState, Inline, Stat, Table, Toolbar } from '@trembus/ui';
import { copyText } from './clipboard';
import { LIVE_POLL_MS, fetchLive, fmtUptime, isFresh, sessionLabel } from './live';
import type { LiveFeed } from './live';
import { agoMs, fmtAgo, fmtClock } from './time';
import {
  built,
  censusLine,
  counts,
  fmtBytes,
  fmtWhen,
  labDirPath,
  labs,
  loopSnippet,
  projects,
  syncStyle,
  toolchain,
} from './labs';
import type { ProjectStatus } from './labs';

// Pin "owner/repo@x.y.z" → "x.y.z" (for the resolved-vs-pinned drift check).
const pinVersion = (pin?: string): string | undefined => pin?.split('@')[1];

// The probe is a build-time snapshot; past this age the header badges it stale.
const PROBE_STALE_MS = 24 * 60 * 60 * 1000;

// Re-render tick — fmtAgo reads a `now` per render, so one slow interval keeps every relative
// stamp honest while the lens sits open (StudioNow re-renders itself via its 5s poll).
function useNow(intervalMs = 60_000): number {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), intervalMs);
    return () => window.clearInterval(t);
  }, [intervalMs]);
  return now;
}

export function ToolsPanel() {
  const now = useNow();

  if (!labs.present) {
    return (
      <div className="cc-explorer">
        <EmptyState
          title="roblox-labs not found"
          description={`Expected the labs repo at ${labs.path}. Clone it beside the other Roblox repos, then re-run node tools/build-labs-status.mjs and rebuild the app.`}
        />
      </div>
    );
  }

  // Resolved rojo drifting from the labs pin is the one toolchain failure worth shouting about —
  // syncback lives in 7.7+, and a stale shim quietly falls back to an older binary.
  const wantVersion = pinVersion(toolchain.rojoPinLabs);
  const rojoDrift = Boolean(
    wantVersion && toolchain.rojoResolved && !toolchain.rojoResolved.includes(wantVersion),
  );

  // '(unknown)' built → agoMs null → no badge; the raw text degrades on its own.
  const probeAge = agoMs(built, now);
  const probeStale = probeAge !== null && probeAge > PROBE_STALE_MS;

  return (
    <div className="cc-explorer">
      {/* 1 — STATUS HEADER */}
      <section className="cc-section">
        <h3 className="cc-section-title">
          Lab tooling{' '}
          <span className="cc-explorer__built" title={fmtWhen(built)}>
            status probed {fmtAgo(built, now)}
          </span>
          {probeStale && (
            <span title="Status is a build-time snapshot — re-run node tools/build-labs-status.mjs and rebuild.">
              <Badge tone="warning" variant="outline" size="sm" dot>
                probe stale
              </Badge>
            </span>
          )}
        </h3>
        <div className="cc-explorer__stats">
          <Stat label="Lab projects" value={counts.projects} tone="neutral" />
          <Stat label="Luau modules" value={counts.luau} tone="info" />
          <Stat label="Instance models" value={counts.rbxm} tone="accent" />
          <Stat
            label="Syncback due"
            value={counts.syncbackDue}
            tone={counts.syncbackDue > 0 ? 'warning' : 'success'}
          />
          <Stat
            label="Dirty files"
            value={counts.dirty}
            tone={counts.dirty > 0 ? 'warning' : 'neutral'}
          />
        </div>
      </section>

      {/* 2 — STUDIO NOW (live heartbeats via the collector's /live endpoint) */}
      <section className="cc-section">
        <StudioNow />
      </section>

      {/* 3 — TOOLCHAIN + REPO */}
      <section className="cc-section">
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
              {rojoDrift && (
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
            {rojoDrift && (
              <Callout tone="warning" title="Toolchain drift">
                The rojo resolving inside the labs repo does not match its rokit pin — run{' '}
                <code className="cc-explorer__mono">rokit install</code> there.
              </Callout>
            )}
          </Card>

          <Card className="cc-tools-card">
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
              {labs.head && (
                <div>
                  <dt>HEAD</dt>
                  <dd>
                    <code className="cc-explorer__mono">{labs.head.sha}</code> {labs.head.subject}
                  </dd>
                </div>
              )}
              {labs.head && (
                <div>
                  <dt>Committed</dt>
                  <dd title={fmtWhen(labs.head.when)}>{fmtAgo(labs.head.when, now)}</dd>
                </div>
              )}
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

      {/* 4 — EXPERIENCES */}
      <section className="cc-section">
        <h3 className="cc-section-title">Experiences</h3>
        {projects.length === 0 ? (
          <EmptyState
            title="No lab experiences discovered"
            description={`The probe found no <dir>/default.project.json under ${labs.path}. Scaffold a Rojo project there (any top-level directory with a default.project.json is auto-discovered), then re-run node tools/build-labs-status.mjs and rebuild the app.`}
          />
        ) : (
          <div className="cc-pkg-grid">
            {projects.map((p) => (
              <ExperienceCard key={p.id} project={p} now={now} />
            ))}
          </div>
        )}
      </section>

      {/* 5 — THE LOOP */}
      <section className="cc-section">
        <Callout tone="info" title="The serialization loop (decision 0008)">
          Work in Studio → <strong>File → Save to File As…</strong> into{' '}
          <code className="cc-explorer__mono">places/</code> → dry-run syncback → apply → review the
          diff → commit. Each experience card above carries copy-ready commands; run them inside{' '}
          <code className="cc-explorer__mono">{labs.path}</code>. Status here is a build-time probe —
          refresh with <code className="cc-explorer__mono">node tools/build-labs-status.mjs</code>{' '}
          and rebuild the app.
        </Callout>
      </section>
    </div>
  );
}

// ── "Studio now" — polls the collector's /live endpoint while the lens is mounted. Collector
// offline is a NORMAL state (the collector is a dev-time process), rendered as a quiet note, so
// the static build stays fully functional without it. feed === null (first poll in flight) is a
// third, distinct state — without it every mount flashes a false "collector offline" for up to
// the 2s fetch timeout, even when the collector is up. ──
function StudioNow() {
  const [feed, setFeed] = useState<LiveFeed | null>(null);
  useEffect(() => {
    let cancelled = false;
    const poll = () => {
      void fetchLive().then((f) => {
        if (!cancelled) setFeed(f);
      });
    };
    poll();
    const t = window.setInterval(poll, LIVE_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, []);

  return (
    <>
      <h3 className="cc-section-title">
        Studio now{' '}
        {feed === null ? (
          <Badge tone="neutral" variant="soft" size="sm">
            checking…
          </Badge>
        ) : feed.up ? (
          <>
            <Badge tone="success" variant="soft" size="sm" dot>
              collector up
            </Badge>
            {feed.updatedAt && (
              <span className="cc-explorer__built" title={fmtWhen(feed.updatedAt)}>
                as of {fmtClock(feed.updatedAt)}
              </span>
            )}
          </>
        ) : (
          <Badge tone="neutral" variant="outline" size="sm">
            collector offline
          </Badge>
        )}
      </h3>
      {feed === null ? (
        <p className="cc-pkg-card__desc">Checking for a local collector…</p>
      ) : !feed.up ? (
        <p className="cc-pkg-card__desc">
          Start <code className="cc-explorer__mono">node tools/telemetry-collector.mjs</code> to see
          live Studio session heartbeats here.
        </p>
      ) : feed.sessions.length === 0 ? (
        <p className="cc-pkg-card__desc">
          No Studio heartbeats — open a lab place with the{' '}
          <code className="cc-explorer__mono">@trembus/studio-telemetry</code> plugin installed
          (loads on Studio start).
        </p>
      ) : (
        <div className="cc-pkg-grid">
          {feed.sessions.map((s) => {
            const fresh = isFresh(s, feed.staleAfterSeconds);
            return (
              <Card key={`${s.placeId}:${s.place}`} className="cc-tools-card">
                <div className="cc-pkg-card__head">
                  <span className="cc-pkg-card__name">{sessionLabel(s)}</span>
                  <Badge tone={fresh ? 'success' : 'warning'} variant="soft" size="sm" dot>
                    {fresh ? 'live' : 'stale'}
                  </Badge>
                  <Badge tone={s.mode === 'play' ? 'accent' : 'neutral'} variant="outline" size="sm">
                    {s.mode}
                  </Badge>
                </div>
                <dl className="cc-explorer__facts">
                  <div>
                    <dt>Session uptime</dt>
                    <dd>{fmtUptime(s.uptimeSeconds)}</dd>
                  </div>
                  <div>
                    <dt>Instances</dt>
                    <dd>{s.instanceCount.toLocaleString()}</dd>
                  </div>
                  {/* Fresh sessions omit the row — their beat IS now (field-presence ethos). */}
                  {!fresh && (
                    <div>
                      <dt>Last seen</dt>
                      <dd title={fmtWhen(s.lastSeenAt)}>{fmtAgo(s.lastSeenAt)}</dd>
                    </div>
                  )}
                  {s.placeId > 0 && (
                    <div>
                      <dt>Place id</dt>
                      <dd>
                        <code className="cc-explorer__mono">{s.placeId}</code>
                      </dd>
                    </div>
                  )}
                </dl>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}

// ── A single experience card — sync state, snapshot/serialization facts, and the copy bar.
// Each card owns its copy flash so the confirmation appears beside the toolbar it confirms
// (the Packages inspector's footer pattern), never up in the panel header. ──
function ExperienceCard({ project: p, now }: { project: ProjectStatus; now: number }) {
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

  const style = syncStyle(p.sync);
  return (
    <Card className="cc-tools-card">
      <div className="cc-pkg-card__head">
        <span className="cc-pkg-card__name">{p.id}</span>
        <Badge tone={style.tone} variant="soft" size="sm" dot>
          {style.label}
        </Badge>
      </div>
      <p className="cc-pkg-card__desc">{style.gloss}</p>
      <dl className="cc-explorer__facts">
        <div>
          <dt>Snapshot</dt>
          <dd>
            {p.snapshot.present ? (
              <>
                {fmtBytes(p.snapshot.bytes)} ·{' '}
                <span title={fmtWhen(p.snapshot.savedAt)}>
                  saved {fmtAgo(p.snapshot.savedAt, now)}
                </span>
              </>
            ) : (
              <>none — save from Studio</>
            )}
          </dd>
        </div>
        <div>
          <dt>Serialized</dt>
          <dd>{censusLine(p.serialization.files)}</dd>
        </div>
        {p.serialization.lastSync && (
          <div className="cc-tools-card__lastsync">
            <dt>Last sync</dt>
            <dd title={`${p.serialization.lastSync.subject} — ${fmtWhen(p.serialization.lastSync.when)}`}>
              <code className="cc-explorer__mono">{p.serialization.lastSync.sha}</code> ·{' '}
              {fmtAgo(p.serialization.lastSync.when, now)}
              <span className="cc-tools-card__subject">{p.serialization.lastSync.subject}</span>
            </dd>
          </div>
        )}
      </dl>
      <div className="cc-explorer__footerbar cc-tools-card__bar">
        <Toolbar aria-label={`${p.id} commands`}>
          <Toolbar.Group aria-label="Copy syncback commands">
            <Toolbar.Button title={p.commands.dryRun} onClick={() => void copy('dry-run', p.commands.dryRun)}>
              ⎘ dry-run
            </Toolbar.Button>
            <Toolbar.Button title={p.commands.apply} onClick={() => void copy('apply', p.commands.apply)}>
              ⎘ apply
            </Toolbar.Button>
            <Toolbar.Button title="The whole loop as a shell block" onClick={() => void copy('loop', loopSnippet(p))}>
              ⎘ loop
            </Toolbar.Button>
            <Toolbar.Button title={labDirPath(p)} onClick={() => void copy('dir path', labDirPath(p))}>
              ⎘ dir
            </Toolbar.Button>
          </Toolbar.Group>
        </Toolbar>
        {flash && (
          <span className="cc-explorer__flash" role="status">
            {flash}
          </span>
        )}
      </div>
    </Card>
  );
}
